"""Compare the Hebrew and English CollectCircles program examples.

Run with Python 3 from any directory. This check reads files without changing them.
It compares code-fence languages and executable tokens, including string and
character literals, after removing comments. It also compares non-Hebrew inline
code references in the prose. Mermaid and explanatory text blocks
are excluded: their labels and prose are translated. Whitespace is ignored.
This is a translation parity check, not an Android build or a runtime test.
"""

from pathlib import Path
from collections import Counter
import re


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "android" / "CollectCircles"
TOKEN = re.compile(
    r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\''
    r'|<!--.*?-->|/\*.*?\*/|//[^\n]*'
    r'|[A-Za-z_$][A-Za-z0-9_$]*|\d+(?:\.\d+)?|[^\s]',
    re.S,
)


def code_blocks(text):
    """Extract fenced examples and the two Liquid code-comparison formats."""
    result = []
    lines = None
    language = None
    for line in text.splitlines():
        fence = re.match(r"\s*```([^\s`]*)", line)
        liquid = re.search(r"\{%\s*(end)?(highlight|code_diff)(?:\s+(\w+))?", line)
        if fence or liquid:
            if lines is None:
                language = fence[1] if fence else (liquid[3] or "diff")
                lines = []
            else:
                result.append((language, lines))
                lines = None
        elif lines is not None:
            lines.append(line)
    if lines is not None:
        raise ValueError("Unclosed code block")
    return result


def executable_tokens(lines):
    # Strings come before comments in TOKEN, preserving URLs and comment markers
    # that occur inside string literals.
    return [
        match.group()
        for match in TOKEN.finditer("\n".join(lines))
        if not match.group().startswith(("//", "/*", "<!--"))
    ]


def inline_code(text):
    """Count code references without requiring Hebrew and English word order to match."""
    text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.S)
    result = Counter()
    inside_block = False
    for line in text.splitlines():
        if line.lstrip().startswith("```") or re.search(
            r"\{%\s*(?:end)?(?:highlight|code_diff)", line
        ):
            inside_block = not inside_block
            continue
        if not inside_block:
            result.update(
                value for value in re.findall(r"`([^`\n]+)`", line)
                if not re.search(r"[\u0590-\u05ff]", value)
            )
    return result


def main():
    pairs = [(file, SOURCE / "en" / file.name) for file in sorted(SOURCE.glob("*.md"))]
    for name in ("project-start", "view-binding"):
        pairs.append((
            ROOT / f"_includes/android/{name}.md",
            ROOT / f"_includes/android/en/{name}.md",
        ))
    errors = []
    examples = literals = references = 0
    for original, translated in pairs:
        label = original.relative_to(ROOT).as_posix()
        if not translated.exists():
            errors.append(f"{label}: English copy missing")
            continue
        original_text = original.read_text(encoding="utf-8-sig")
        translated_text = translated.read_text(encoding="utf-8-sig")
        original_refs, translated_refs = inline_code(original_text), inline_code(translated_text)
        references += sum(original_refs.values())
        if original_refs != translated_refs:
            errors.append(
                f"{label}: inline code references differ:\n"
                f"  Missing: {dict(original_refs - translated_refs)!r}\n"
                f"  Added:   {dict(translated_refs - original_refs)!r}"
            )
        left = code_blocks(original_text)
        right = code_blocks(translated_text)
        if [kind for kind, _ in left] != [kind for kind, _ in right]:
            errors.append(f"{label}: code-block count or language differs")
            continue
        for number, ((kind, before), (_, after)) in enumerate(zip(left, right), 1):
            if kind in ("mermaid", "text", "plaintext", ""):
                continue
            a, b = executable_tokens(before), executable_tokens(after)
            examples += 1
            literals += sum(token.startswith(('"', "'")) for token in a)
            if a != b:
                index = next(
                    (i for i, (x, y) in enumerate(zip(a, b)) if x != y),
                    min(len(a), len(b)),
                )
                errors.append(
                    f"{label}, block {number} ({kind}), token {index}:\n"
                    f"  Original: {a[max(0, index - 3):index + 4]!r}\n"
                    f"  English:  {b[max(0, index - 3):index + 4]!r}"
                )
    if errors:
        print("\n".join(errors))
        return 1
    print(
        f"PASS: {examples} program examples and {literals} string/character literals "
        f"match after removing comments; {references} inline code references are preserved."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
