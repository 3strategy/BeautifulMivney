# A focused unified diff rendered as two aligned, copyable code panels.
# Usage and limitations: docs/code-diff.md
require "cgi"
require "liquid"

module TutorialCodeDiff
  module_function

  def tokens(text)
    text.scan(/[\p{L}\p{N}_]+|\s+|[^\p{L}\p{N}_\s]/)
  end

  # Longest common subsequence keeps repeated punctuation and multiple edits
  # separate. Whitespace is retained, so the displayed source stays copyable.
  def unchanged(left, right)
    scores = Array.new(left.length + 1) { Array.new(right.length + 1, 0) }
    (left.length - 1).downto(0) do |i|
      (right.length - 1).downto(0) do |j|
        scores[i][j] = if left[i] == right[j]
                         1 + scores[i + 1][j + 1]
                       else
                         [scores[i + 1][j], scores[i][j + 1]].max
                       end
      end
    end
    a, b = Array.new(left.length, false), Array.new(right.length, false)
    i = j = 0
    while i < left.length && j < right.length
      if left[i] == right[j]
        a[i] = b[j] = true
        i += 1
        j += 1
      elsif scores[i + 1][j] > scores[i][j + 1]
        i += 1
      else
        j += 1
      end
    end
    [a, b]
  end

  def parse(source)
    left, right = [], []
    source = source.gsub("\r\n", "\n").sub(/\A\s*\n/, "").sub(/\n\s*\z/, "")
    source.split("\n", -1).each do |line|
      case line[0]
      when "-" then left << line[1..]
      when "+" then right << line[1..]
      when " " then left << line[1..]; right << line[1..]
      when nil then left << ""; right << ""
      else raise ArgumentError, "code_diff: prefix each line with a space, + or - (no patch headers)"
      end
    end
    # Remove only indentation shared by both excerpts, never relative indentation.
    indent = (left + right).reject { |line| line.strip.empty? }.map { |line| line[/\A */].length }.min || 0
    [left, right].map { |lines| lines.map { |line| line[0, indent].strip.empty? ? line[indent..].to_s : line } }
  end

  # Sequence alignment permits inserted/deleted lines without shifting every
  # following comparison. Dissimilar lines appear as separate additions/removals.
  def rows(left, right)
    a, b = left.map { |line| tokens(line) }, right.map { |line| tokens(line) }
    pairs = {}
    costs = Array.new(left.length + 1) { Array.new(right.length + 1, 0.0) }
    steps = {}
    left.length.downto(0) do |i|
      right.length.downto(0) do |j|
        next if i == left.length && j == right.length
        choices = []
        if i < left.length && j < right.length
          common = unchanged(a[i], b[j])
          pairs[[i, j]] = common
          size = a[i].length + b[j].length
          similarity = size.zero? ? 1.0 : 2.0 * common[0].count(true) / size
          if similarity >= 0.5
            choices << [costs[i + 1][j + 1] + 2 * (1 - similarity), :pair]
          end
        end
        choices << [costs[i + 1][j] + 1, :delete] if i < left.length
        choices << [costs[i][j + 1] + 1, :insert] if j < right.length
        costs[i][j], steps[[i, j]] = choices.min_by(&:first)
      end
    end
    result = []
    i = j = 0
    while i < left.length || j < right.length
      case steps[[i, j]]
      when :pair
        result << [[a[i], pairs[[i, j]][0]], [b[j], pairs[[i, j]][1]]]
        i += 1
        j += 1
      when :delete
        result << [[a[i], Array.new(a[i].length, false)], nil]
        i += 1
      when :insert
        result << [nil, [b[j], Array.new(b[j].length, false)]]
        j += 1
      end
    end
    result
  end

  def inline(parts, same, tag)
    parts.zip(same).chunk { |_, unchanged| unchanged }.map do |unchanged, group|
      text = CGI.escapeHTML(group.map(&:first).join)
      unchanged ? text : "<#{tag}>#{text}</#{tag}>"
    end.join
  end

  def render(source)
    aligned = rows(*parse(source))
    panels = ["לפני", "אחרי"].each_with_index.map do |label, side|
      line_number = 0
      lines = aligned.map do |row|
        cell = row[side]
        unless cell
          next '<span class="code-diff-line code-diff-gap" aria-hidden="true"></span>'
        end
        line_number += 1
        parts, same = cell
        changed = same.include?(false) ? " code-diff-changed" : ""
        %(<span class="code-diff-line#{changed}" data-line="#{line_number}">#{inline(parts, same, side.zero? ? "del" : "ins")}</span>)
      end.join("\n")
      %(<section class="column code-diff-panel" aria-label="#{label}"><h4 dir="rtl">#{label}</h4><pre tabindex="0" aria-label="קוד #{label}" dir="ltr"><code>#{lines}</code></pre></section>)
    end.join
    %(<div class="code-diff" dir="rtl"><div class="two-columns before-after">#{panels}</div></div>)
  end

  class Block < Liquid::Block
    def render(context)
      TutorialCodeDiff.render(super)
    end
  end
end

Liquid::Template.register_tag("code_diff", TutorialCodeDiff::Block)
