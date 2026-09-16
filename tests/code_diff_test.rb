require "jekyll"
require_relative "../_plugins/code_diff"
require_relative "../_plugins/highlight"

# Keep the checks runnable with the site's existing Gemfile (no test gem needed).
class CodeDiffTest
  def assert_equal(expected, actual)
    raise "Expected #{expected.inspect}, got #{actual.inspect}" unless expected == actual
  end

  def assert_includes(actual, expected)
    raise "Missing #{expected.inspect}" unless actual.include?(expected)
  end

  def refute_includes(actual, unexpected)
    raise "Unexpected #{unexpected.inspect}" if actual.include?(unexpected)
  end

  def assert_nil(actual)
    assert_equal(nil, actual)
  end

  def assert_operator(left, operator, right)
    raise "Failed comparison" unless left.public_send(operator, right)
  end

  def assert_raises(type)
    begin
      yield
    rescue type
      return
    end
    raise "Expected #{type}"
  end
  def html(source)
    Liquid::Template.parse("{% code_diff %}\n#{source}\n{% endcode_diff %}").render!
  end

  def test_only_binding_prefix_is_inserted_on_repeated_lines
    source = <<~DIFF
      -    String email = eTemail.getText().toString();
      -    String password = eTpass.getText().toString();
      +    String email = binding.eTemail.getText().toString();
      +    String password = binding.eTpass.getText().toString();
    DIFF
    output = html(source)
    assert_equal ["binding.", "binding."], output.scan(/<ins>(.*?)<\/ins>/).flatten
    refute_includes output, "<del>"
    assert_equal 4, output.scan('class="code-diff-line').length
    assert_operator output.index("לפני"), :<, output.index("אחרי")
  end

  def test_multiple_word_changes_and_punctuation
    output = html("-send(oldValue, first);\n+send(newValue, second);")
    assert_equal %w[oldValue first], output.scan(/<del>(.*?)<\/del>/).flatten
    assert_equal %w[newValue second], output.scan(/<ins>(.*?)<\/ins>/).flatten
  end

  def test_inserted_line_does_not_shift_following_replacement
    rows = TutorialCodeDiff.rows(["start();", "email.read();", "finish();"],
                                  ["start();", "log();", "binding.email.read();", "finish();"])
    assert_equal 4, rows.length
    assert_nil rows[1][0]
    assert_equal "email.read();", rows[2][0][0].join
    assert_equal "binding.email.read();", rows[2][1][0].join
  end

  def test_deletion_empty_side_and_html_escaping
    output = html('-<script>alert("x")</script>')
    assert_includes output, "&lt;script&gt;"
    refute_includes output, "<script>"
    assert_equal 1, output.scan('class="code-diff-line code-diff-gap"').length
    assert_equal [[], ["x();"]], TutorialCodeDiff.parse("+x();")
  end

  def test_hebrew_crlf_blank_lines_and_shared_indentation
    source = "-    show(\"ישן\");\r\n+    show(\"חדש\");\r\n \r\n     end();"
    before, after = TutorialCodeDiff.parse(source)
    assert_equal ['show("ישן");', "", "end();"], before
    assert_equal ['show("חדש");', "", "end();"], after
    assert_includes html(source), "<ins>חדש</ins>"
  end

  def test_prose_highlighter_leaves_equality_operators_and_code_untouched
    source = "==note==\n{% code_diff %}\n if (a == b && c == d) {}\n{% endcode_diff %}\n==after=="
    protected = HighlightEquals.process(source)
    assert_includes protected, "<mark>note</mark>"
    assert_includes protected, "if (a == b && c == d) {}"
    assert_includes protected, "<mark>after</mark>"
  end

  def test_invalid_input_is_reported
    assert_raises(ArgumentError) { TutorialCodeDiff.parse("@@ -1,2 +1,2 @@") }
  end
end

checks = CodeDiffTest.new
tests = CodeDiffTest.instance_methods.grep(/^test_/).sort
tests.each { |name| checks.public_send(name); puts "PASS #{name}" }
puts "#{tests.length} checks passed"
