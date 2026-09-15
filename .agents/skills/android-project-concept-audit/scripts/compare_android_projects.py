#!/usr/bin/env python3
"""Read-only source inventory alongside Invoke-AndroidConceptAudit.ps1.

Stdlib only. No builds, network, grading, or AI-authorship inference. Output contains
paths/metrics, never source excerpts. See references/comparison-method.md.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from datetime import datetime
import hashlib
import json
import os
from pathlib import Path
import re
import statistics
import subprocess

EXCLUDED_DIRS = {'.git', '.gradle', '.idea', 'build', 'generated', 'out',
                 'node_modules', 'vendor', '.venv', 'venv', '__pycache__', '.kotlin'}
EXCLUDED_FILES = {'local.properties', 'google-services.json', 'gradlew', 'gradlew.bat',
                  'gradle-wrapper.properties', 'gradle-daemon-jvm.properties', 'firebase.properties'}
CODE_EXTS = {'.java', '.kt', '.js', '.ts', '.py', '.ps1', '.cs', '.sh', '.mjs'}
TEXT_EXTS = CODE_EXTS | {'.xml', '.gradle', '.kts', '.toml', '.properties',
                         '.json', '.txt', '.csv', '.md', '.html', '.yml', '.yaml', '.rules'}
CORE_CATEGORIES = {'production_code', 'production_xml', 'build_config',
                   'unit_test', 'instrumented_test', 'variant_code', 'auxiliary_code'}
DECISIONS = re.compile(r'\b(?:if|for|while|case|catch)\b|&&|\|\||\?(?![.?])')
# Heuristics nominate files for inspection, not rubric credits. Match executable
# text after comments/strings/imports have been removed; include line evidence.
SIGNALS = {
    'thread_handler': r'\b(?:new\s+Thread|new\s+Handler|Executors\s*\.|\.postDelayed\s*\()',
    'observable_state': r'\b(?:MutableLiveData|LiveData|MutableStateFlow)\b|\.observe\s*\(',
    'atomic_file': r'\bAtomicFile\b|\.startWrite\s*\(|\.failWrite\s*\(',
    'undo_redo': r'\b(?:undo|redo|canUndo|canRedo)\s*\(',
    'search_solver': r'\b(?:backtrack|search|solve|countSolutions|findHint|findBestMove)\s*\(',
    'bounded_work': r'\b(?:nodeLimit|maxNodes|deadline|maxAttempts|MAX_ATTEMPTS|NODE_LIMIT|budget)\b',
    'accessibility': r'\b(?:ExploreByTouchHelper|AccessibilityNodeInfoCompat|onPopulateNodeForVirtualView)\b|\.setContentDescription\s*\(',
    'lifecycle_cleanup': r'\b(?:onStop|onPause|onCleared|onDestroyView)\s*\(',
    'listener_removal': r'\.removeEventListener\s*\(|\.removeCallbacks(?:AndMessages)?\s*\(',
    'database_read': r'\.add(?:ValueEventListener|ListenerForSingleValueEvent|SnapshotListener)\s*\(|\.rawQuery\s*\(|\.getReadableDatabase\s*\(',
    'database_write': r'\.setValue\s*\(|\.updateChildren\s*\(|\.runTransaction\s*\(|\.getWritableDatabase\s*\(',
    'speech_recognition': r'\bSpeechRecognizer\s*\.|\bRecognizerIntent\s*\.',
    'genai_client_candidate': r'\b(?:GenerativeModel|GenerativeModelFutures|FirebaseAI)\b|\.generateContent\s*\(',
    'domain_assertions': r'\b(?:assertEquals|assertTrue|assertFalse|assertThrows|assertArrayEquals|assertNotNull)\s*\(',
}


def mask_source(text: str, xml: bool = False, strings: bool = False) -> str:
    """Preserve newlines/offsets while masking comments, optionally literals.

    Java/Kotlin/C-like lexical scanner, including text blocks and nested block
    comments. Not a parser. Python/PowerShell metrics are physical/nonblank only.
    """
    if xml:
        return re.sub(r'<!--.*?-->', lambda m: re.sub(r'[^\r\n]', ' ', m[0]), text, flags=re.S)
    out = list(text)
    i = 0
    while i < len(text):
        start = i
        if text.startswith('//', i):
            end = text.find('\n', i)
            i = len(text) if end < 0 else end
            hide = True
        elif text.startswith('/*', i):
            depth, i = 1, i + 2
            while i < len(text) and depth:
                if text.startswith('/*', i): depth, i = depth + 1, i + 2
                elif text.startswith('*/', i): depth, i = depth - 1, i + 2
                else: i += 1
            hide = True
        elif text.startswith('"""', i):
            end = text.find('"""', i + 3)
            i = len(text) if end < 0 else end + 3
            hide = strings
        elif text[i] in ('"', "'"):
            quote, i = text[i], i + 1
            while i < len(text):
                if text[i] == '\\': i += 2
                elif text[i] == quote:
                    i += 1
                    break
                else: i += 1
            hide = strings
        else:
            i += 1
            continue
        if hide:
            for j in range(start, min(i, len(text))):
                if text[j] not in '\r\n': out[j] = ' '
    return ''.join(out)


def category(path: Path) -> str:
    parts = path.parts
    if 'src' in parts:
        idx = parts.index('src')
        source_set = parts[idx + 1] if idx + 1 < len(parts) else ''
        if source_set == 'test': return 'unit_test'
        if source_set == 'androidTest': return 'instrumented_test'
        if 'assets' in parts or 'raw' in parts: return 'data_assets'
        if path.suffix in {'.java', '.kt'}:
            return 'production_code' if source_set == 'main' else 'variant_code'
        if path.suffix == '.xml':
            return 'production_xml' if source_set == 'main' else 'variant_code'
    if path.suffix in {'.gradle', '.kts', '.toml', '.properties'}: return 'build_config'
    if path.suffix in CODE_EXTS: return 'auxiliary_code'
    if path.suffix in {'.json', '.txt', '.csv'}: return 'data_assets'
    return 'documentation_other'


def iter_files(root: Path):
    for current, directories, files in os.walk(root, followlinks=False):
        directories[:] = sorted(d for d in directories if d not in EXCLUDED_DIRS
                               and not (Path(current) / d).is_symlink())
        for name in sorted(files):
            p = Path(current) / name
            if p.is_symlink() or name in EXCLUDED_FILES: continue
            if re.search(r'(?:secret|credential|service.account|keystore|\.env)', name, re.I): continue
            yield p


def package_name(root: Path) -> str:
    for name in ('app/build.gradle.kts', 'app/build.gradle'):
        p = root / name
        if p.is_file():
            m = re.search(r'\bnamespace\s*(?:=\s*)?[\'"]([^\'"]+)', p.read_text(encoding='utf-8-sig'))
            if m: return m[1]
    return ''


def normalized(text: str, package: str, suffix: str) -> str:
    if suffix in {'.java', '.kt', '.xml'}:
        text = mask_source(text, xml=suffix == '.xml')
    if package: text = text.replace(package, 'PROJECT_PACKAGE')
    # Normalize formatting between tokens, without erasing whitespace in literals.
    tokens = re.findall(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|[A-Za-z0-9_$]+|[^\s]', text)
    return ' '.join(tokens)


def test_signature(text: str, package: str, suffix: str) -> str:
    # A changed/stale application-id literal does not make the template's context
    # smoke test a domain test. Preserve all other tokens, so real additions count.
    text = re.sub(r'(assertEquals\s*\()"[^"]+"(\s*,\s*appContext\.getPackageName\s*\(\)\s*\))',
                  r'\1"APPLICATION_ID"\2', text)
    return hashlib.sha256(normalized(text, package, suffix).encode()).hexdigest()


def inventory(root: Path) -> dict:
    root = root.resolve()
    if not root.is_dir() or not any((root / n).is_file() for n in
        ('settings.gradle', 'settings.gradle.kts', 'build.gradle', 'build.gradle.kts')):
        raise ValueError(f'Not a Gradle project: {root}')
    namespace = package_name(root)
    rows, unreadable, binaries = [], [], Counter()
    fingerprint = hashlib.sha256()
    for p in iter_files(root):
        relative = p.relative_to(root)
        if p.suffix.lower() not in TEXT_EXTS:
            binaries['files'] += 1
            binaries['bytes'] += p.stat().st_size
            continue
        try:
            raw = p.read_bytes()
            text = raw.decode('utf-8-sig')
        except (UnicodeError, OSError) as exc:
            unreadable.append({'file': relative.as_posix(), 'reason': type(exc).__name__})
            continue
        cat = category(relative)
        c_style = p.suffix in {'.java', '.kt', '.kts', '.gradle', '.js', '.ts', '.cs', '.mjs'}
        stripped = mask_source(text, xml=p.suffix == '.xml') if c_style or p.suffix == '.xml' else text
        code = mask_source(text, strings=True) if c_style else ''
        code = re.sub(r'(?m)^[^\S\r\n]*(?:import|package)\b[^\n]*',
                      lambda m: re.sub(r'[^\r\n]', ' ', m[0]), code)
        # Package statements are single-line in supported Java/Kotlin conventions.
        # Replacing their text preserves line count for evidence.
        signals = {}
        if p.suffix in {'.java', '.kt'}:
            for label, pattern in SIGNALS.items():
                found = [i for i, line in enumerate(code.splitlines(), 1) if re.search(pattern, line)]
                if found: signals[label] = found[:6]
            todos = [i for i, line in enumerate(text.splitlines(), 1)
                     if re.search(r'\b(?:TODO|FIXME|UnsupportedOperationException)\b', line)]
            if todos: signals['unfinished_marker'] = todos[:6]
        fingerprint.update(relative.as_posix().encode())
        fingerprint.update(hashlib.sha256(raw).digest())
        rows.append({
            'path': relative.as_posix(), 'category': cat, 'bytes': len(raw),
            'physical': len(text.splitlines()),
            'nonblank': sum(bool(x.strip()) for x in text.splitlines()),
            'sloc': sum(bool(x.strip()) for x in stripped.splitlines()),
            'sloc_method': 'noncomment_nonblank' if c_style or p.suffix == '.xml' else 'nonblank_only',
            'sha256': hashlib.sha256(raw).hexdigest(),
            'normalized_sha256': hashlib.sha256(normalized(text, namespace, p.suffix).encode()).hexdigest(),
            'test_signature': test_signature(text, namespace, p.suffix),
            'decision_tokens': len(DECISIONS.findall(code)) if p.suffix in {'.java', '.kt'} else 0,
            'lexical_tokens': len(re.findall(r'\b\w+\b|[^\w\s]', code)) if p.suffix in {'.java', '.kt'} else 0,
            'semicolon_count': code.count(';'),
            'multi_statement_lines': sum(line.count(';') >= 3 for line in code.splitlines()),
            'classes': len(re.findall(r'\b(?:class|interface|enum|record)\s+\w+', code)),
            'test_annotations': len(re.findall(r'@Test\b', code)),
            'android_imports': bool(re.search(r'(?m)^\s*import\s+(?:android\.|androidx\.)', stripped)),
            'signals': signals,
        })
    return {'name': root.name, 'root': str(root), 'namespace': namespace, 'files': rows,
            'source_fingerprint': fingerprint.hexdigest(), 'unreadable': unreadable,
            'excluded_binary_inventory': dict(binaries)}


def summarize(project: dict, baseline: dict) -> None:
    baseline_hashes = {r['normalized_sha256'] for r in baseline['files']}
    baseline_test_hashes = {r['test_signature'] for r in baseline['files']
                            if r['category'] in {'unit_test', 'instrumented_test'}}
    groups = defaultdict(Counter)
    for row in project['files']:
        row['baseline_equivalent'] = row['normalized_sha256'] in baseline_hashes
        row['baseline_test_equivalent'] = row['test_signature'] in baseline_test_hashes
        g = groups[row['category']]
        g['files'] += 1
        for key in ('physical', 'nonblank', 'sloc', 'decision_tokens', 'lexical_tokens', 'multi_statement_lines', 'classes', 'test_annotations'):
            g[key] += row[key]
        if row['baseline_equivalent']: g['baseline_equivalent_sloc'] += row['sloc']
    project['categories'] = {k: dict(v) for k, v in groups.items()}
    prod = [r for r in project['files'] if r['category'] == 'production_code']
    test = [r for r in project['files'] if r['category'] in {'unit_test', 'instrumented_test'}]
    project['summary'] = {
        'maintained_code_config_physical': sum(r['physical'] for r in project['files'] if r['category'] in CORE_CATEGORIES),
        'maintained_code_config_sloc': sum(r['sloc'] for r in project['files'] if r['category'] in CORE_CATEGORIES),
        'production_sloc': sum(r['sloc'] for r in prod),
        'production_physical': sum(r['physical'] for r in prod),
        'production_files': len(prod),
        'median_production_file_sloc': statistics.median(r['sloc'] for r in prod) if prod else 0,
        'largest_production_files': sorted(prod, key=lambda r: (-r['sloc'], r['path']))[:5],
        'test_sloc': sum(r['sloc'] for r in test),
        'nonbaseline_test_sloc': sum(r['sloc'] for r in test if not r['baseline_test_equivalent']),
        'nonbaseline_test_annotations': sum(r['test_annotations'] for r in test if not r['baseline_test_equivalent']),
        'baseline_test_files': sum(r['baseline_test_equivalent'] for r in test),
        'production_decision_tokens': sum(r['decision_tokens'] for r in prod),
        'production_lexical_tokens': sum(r['lexical_tokens'] for r in prod),
        'production_multi_statement_lines': sum(r['multi_statement_lines'] for r in prod),
        'files_without_android_imports': sum(not r['android_imports'] for r in prod),
    }
    for key in ('production_sloc', 'production_physical', 'maintained_code_config_physical', 'maintained_code_config_sloc'):
        base = baseline.get('summary', {}).get(key)
        if base is not None:
            project['summary'][key + '_delta'] = project['summary'][key] - base
            project['summary'][key + '_ratio'] = round(project['summary'][key] / base, 2) if base else None
    evidence = defaultdict(list)
    for row in prod:
        for label, lines in row['signals'].items():
            evidence[label].extend(f"{row['path']}:{line}" for line in lines)
    project['review_signals'] = dict(evidence)
    # Workload cues are transparent retrieval rules, not validated student norms.
    prompts = []
    if prod:
        large = max(prod, key=lambda r: r['sloc'])
        if large['sloc'] >= 500:
            prompts.append({'cue': 'large_file', 'evidence': f"{large['path']}:1",
                            'question': 'Trace one action through this file, name its separate responsibilities, and modify one rule.'})
    for key, question in {
        'search_solver': 'Explain the state, branching, termination and correctness of one search; trace a tiny example.',
        'bounded_work': 'Explain the work limit, failure/fallback behavior, and its effect on correctness.',
        'atomic_file': 'Interrupt a save and explain which complete version is loaded after restart.',
        'thread_handler': 'Explain thread ownership, lifecycle cancellation, and stale-result handling.',
        'undo_redo': 'Predict and test which state undo restores and which cumulative counters it preserves.',
        'genai_client_candidate': 'Trace the AI request, response validation, fallback and provenance; do not reveal credentials.',
        'unfinished_marker': 'Inspect this marker and its caller: is required behavior unfinished, deliberately omitted, or already implemented?',
    }.items():
        if evidence.get(key): prompts.append({'cue': key, 'evidence': evidence[key][0], 'question': question})
    project['defense_prompts'] = prompts
    project['authorship_assessment'] = 'Not inferable from static metrics; collect attributed sources and student demonstration.'
    project['verification'] = {'build': 'not_run', 'runtime': 'not_run', 'student_understanding': 'not_assessed'}


def run_concepts(project: dict, scanner: Path) -> list:
    result = subprocess.run(['powershell.exe', '-NoProfile', '-ExecutionPolicy', 'Bypass',
                             '-File', str(scanner), '-ProjectPath', project['root'],
                             '-OutputFormat', 'Json', '-EvidenceLimit', '3'],
                            capture_output=True, text=True, encoding='utf-8-sig', errors='replace', check=True)
    return json.loads(result.stdout)


def markdown(data: dict) -> str:
    rows = ['# Android project measurements', '',
            'Static inventory. No grade, runtime pass, or AI-authorship inference. See comparison-method.md.', '',
            '| Project | Prod Java/Kotlin physical | Prod SLOC | Delta SLOC | Baseline ratio | XML SLOC | Test SLOC (nonbaseline) | Code/config physical |',
            '|:---|---:|---:|---:|---:|---:|---:|---:|']
    for p in [data['baseline']] + data['projects']:
        s = p['summary']
        ratio = s.get('production_sloc_ratio', 1)
        ratio_label = f'{ratio:.2f}x' if ratio is not None else 'undefined'
        rows.append(f"| {p['name']} | {s['production_physical']:,} | {s['production_sloc']:,} | "
                    f"{s.get('production_sloc_delta', 0):+,} | {ratio_label} | "
                    f"{p['categories'].get('production_xml', {}).get('sloc', 0):,} | "
                    f"{s['test_sloc']:,} ({s['nonbaseline_test_sloc']:,}) | {s['maintained_code_config_physical']:,} |")
    for p in data['projects']:
        rows += ['', f"## {p['name']}", '', f"Input: `{p['root']}`", '',
                 f"Source fingerprint: `{p['source_fingerprint']}`", '',
                 'Largest production files (SLOC, decision-token proxy):', '']
        rows += [f"- `{r['path']}:1`: {r['sloc']:,} SLOC; {r['decision_tokens']} decision tokens."
                 for r in p['summary']['largest_production_files']]
        rows += ['', 'Student explanation/modification prompts (workload cues, not allegations):', '']
        rows += [f"- `{r['evidence']}`: {r['question']}" for r in p['defense_prompts']]
        if p.get('concepts'):
            base_present = {c['Id'] for c in data['baseline'].get('concepts', []) if c['Status'] == 'Present'}
            rows += ['', 'Legacy concept scanner candidates (inspect source before credit):', '',
                     '| Concept | Baseline also detects | Evidence |', '|:---|:---:|:---|']
            rows += [f"| {c['Concept']} | {'yes' if c['Id'] in base_present else 'no'} | " +
                     '; '.join(f'`{e}`' for e in c['Evidence']) + ' |'
                     for c in p['concepts'] if c['Status'] == 'Present']
        if p['unreadable']: rows += ['', f"Unreadable files: {len(p['unreadable'])}; inspect JSON before interpreting absence."]
    return '\n'.join(rows) + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--baseline', required=True, type=Path)
    parser.add_argument('--projects', required=True, nargs='+', type=Path)
    parser.add_argument('--output-dir', required=True, type=Path)
    parser.add_argument('--concepts-json', type=Path, help='Reuse prior legacy scans, keyed by unique project folder name; may be stale.')
    parser.add_argument('--skip-concepts', action='store_true', help='Metrics only; does not satisfy a concept audit.')
    args = parser.parse_args()
    roots = [args.baseline.resolve()] + [p.resolve() for p in args.projects]
    if len({p.name for p in roots}) != len(roots): parser.error('Project folder names must be unique, including baseline.')
    output = args.output_dir.resolve()
    if any(output == p or output.is_relative_to(p) for p in roots): parser.error('Output must be outside every assessed project.')
    saved = json.loads(args.concepts_json.read_text(encoding='utf-8-sig')) if args.concepts_json else None
    baseline = inventory(args.baseline)
    summarize(baseline, baseline)
    projects = []
    for p in [baseline] + [inventory(root) for root in args.projects]:
        if p is not baseline: summarize(p, baseline)
        if not args.skip_concepts:
            p['concepts'] = saved[p['name']] if saved is not None else run_concepts(
                p, Path(__file__).resolve().with_name('Invoke-AndroidConceptAudit.ps1'))
        if p is not baseline: projects.append(p)
    data = {'schema_version': 1, 'created_at': datetime.now().astimezone().isoformat(),
            'script_sha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'concept_scanner_sha256': hashlib.sha256(Path(__file__).with_name('Invoke-AndroidConceptAudit.ps1').read_bytes()).hexdigest(),
            'concepts_reused': saved is not None, 'baseline': baseline, 'projects': projects}
    output.mkdir(parents=True, exist_ok=True)
    (output / 'measurements.json').write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    (output / 'measurements.md').write_text(markdown(data), encoding='utf-8')
    print(output / 'measurements.md')


if __name__ == '__main__':
    main()
