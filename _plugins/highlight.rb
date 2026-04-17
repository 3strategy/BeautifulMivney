# _plugins/highlight.rb
module HighlightEquals
  FENCE_RE = /^(\s{0,3})(`{3,}|~{3,})/
  RAW_BLOCK_TAGS = %w[script style].freeze

  def self.process(content)
    in_fence = false
    fence_char = nil
    fence_len = 0
    in_raw_block = nil
    out_lines = []

    content.each_line do |line|
      if in_raw_block
        out_lines << line
        in_raw_block = nil if closes_raw_block?(line, in_raw_block)
        next
      end

      if (match = line.match(FENCE_RE))
        fence = match[2]
        if in_fence
          if fence[0] == fence_char && fence.length >= fence_len
            in_fence = false
          end
        else
          in_fence = true
          fence_char = fence[0]
          fence_len = fence.length
        end
        out_lines << line
        next
      end

      if in_fence
        out_lines << line
        next
      end

      if (tag = opens_raw_block?(line))
        out_lines << line
        in_raw_block = tag unless closes_raw_block?(line, tag)
        next
      end

      out_lines << highlight_outside_inline_code(line)
    end

    out_lines.join
  end

  def self.opens_raw_block?(line)
    RAW_BLOCK_TAGS.find { |tag| line.match?(%r{<#{tag}\b}i) }
  end

  def self.closes_raw_block?(line, tag)
    line.match?(%r{</#{tag}\s*>}i)
  end

  def self.highlight_outside_inline_code(line)
    parts = line.split(/(<code\b[^>]*>.*?<\/code>)/i)
    parts.map do |part|
      if part.match?(/\A<code\b/i)
        part
      else
        highlight_outside_backticks(part)
      end
    end.join
  end

  def self.highlight_outside_backticks(text)
    out = +""
    i = 0
    while i < text.length
      if text[i, 1] == "`"
        j = i + 1
        j += 1 while j < text.length && text[j, 1] == "`"
        ticks = text[i...j]
        k = text.index(ticks, j)
        if k
          out << text[i...(k + ticks.length)]
          i = k + ticks.length
        else
          out << text[i..]
          break
        end
      else
        j = text.index("`", i) || text.length
        segment = text[i...j]
        out << segment.gsub(/==(.+?)==/, '<mark>\1</mark>')
        i = j
      end
    end
    out
  end
end

Jekyll::Hooks.register [:posts, :pages, :documents], :pre_render do |doc|
  next if doc.content.nil?

  # Highlight ==text== while leaving fenced and inline code intact.
  # This makes Jekyll match Blazor's Markdig (EmphasisExtras) behavior.
  doc.content = HighlightEquals.process(doc.content)
end
