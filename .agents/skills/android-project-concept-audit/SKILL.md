---
name: android-project-concept-audit
description: Audit Android projects for teaching concepts, compare size and complexity against an empty baseline, and assess evidence and gaps against the Israeli yearly-project rubric (מחוון). Use for student-project evaluation or extracting manageable teaching examples; static results do not establish runtime completeness or AI authorship.
---

# Android Project Concept Audit

This is the canonical repository-local tool, originally added in commit `24bbbce`.
Reuse the concept scanner for inventory; use the comparison layer below for multiple
projects, baseline line counts, rubric gaps, and teaching recommendations. Keep private
assessment reports outside public lesson/site folders. Do not copy private project
source or student data into this skill.

## Select the scope

- **Concept inventory:** run the PowerShell scanner below, then inspect its citations.
- **Comparison / yearly-project evaluation:** read [comparison-method.md](references/comparison-method.md)
  and [smartphone-rubric.md](references/smartphone-rubric.md), then run the comparison command.
- **Teaching extraction / suspiciously advanced submission:** also read
  [teaching-and-defense.md](references/teaching-and-defense.md). Generate specific
  explanation and live-change exercises; do not label a project AI-written or disqualified
  from its size, style, sophistication, or test suite.

## Compare projects

```powershell
python '<skill-folder>\scripts\compare_android_projects.py' `
  --baseline 'C:\path\to\EmptyBasicViews' `
  --projects 'C:\path\to\ProjectA' 'C:\path\to\ProjectB' `
  --output-dir 'C:\path\outside-assessed-projects\assessment'
```

Python 3.10+ and Windows PowerShell are sufficient; there are no Python package
dependencies. The command invokes the existing scanner, produces `measurements.json`
and `measurements.md`, and leaves input projects unchanged. For metrics-only work use
`--skip-concepts`; this is not a replacement for the concept first pass. To reuse scans
from this session, `--concepts-json` accepts an object keyed by unique project folder
name, each value the existing scanner's JSON array. That legacy format has no source
fingerprint: reusing old scans requires an explicit freshness check. Do not imply that
cached citations were revalidated by the comparison command.

Treat automated output as the starting evidence, then deliver a readable comparison:

1. Identify each current source state and the exact empty baseline. Present production
   Java/Kotlin physical lines, nonblank/noncomment SLOC, XML, tests, configuration and
   tools separately. Show arithmetic baseline delta and ratio; neither measures work
   authored. Include token density when formatting changes the apparent ranking.
2. Inspect cited files and representative action-to-model-to-storage flows. Record
   corrections to false positives and inspect likely misses. Concept count is not a
   grade. A template Fragment, dependency, inherited sample test, or service-like name
   does not establish meaningful implementation.
3. Apply the requested rubric/year, keeping eligibility gates separate from quality.
   Track each applicable requirement as source-supported, partial, not detected,
   externally dependent, or unverified. Cite file/line evidence and a concrete next
   demonstration or repair. Never turn missing access or an unrun check into failure.
4. Describe completeness on separate axes: implemented flows, build/tests, observed
   runtime, required project dossier, and student understanding. Use only checks actually
   performed; older `VALIDATION.md` files are claims, not current test results.
5. Contrast supported engineering practices and tradeoffs. For teaching, extract a
   bounded behavior with prerequisites, estimated lesson count, and a student exercise.
   Provide project-specific defense questions for unusually demanding mechanisms.

Builds and runtime checks are separate, task-scoped actions, never hidden inside the
scanner. Select a compatible installed JDK for each Gradle wrapper; distinguish dependency/
toolchain failures from source/test failures. Do not upgrade or repair assessed projects
just to make comparison results look better. Runtime tests that write a shared backend
or replace a student's app state require an appropriate isolated environment.

## Inventory concepts

Run the deterministic PowerShell scanner instead of inferring concepts from filenames or class names. Resolve
`<skill-folder>` from the path of this `SKILL.md`; do not assume the current working directory is the repository root.
Use a process-scoped bypass because Windows can block an unsigned repository script loaded through a WSL UNC path.
This command does not change the machine or user execution policy:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File `
  '<skill-folder>\scripts\Invoke-AndroidConceptAudit.ps1' `
  -ProjectPath 'C:\path\to\AndroidProject'
```

Use `-OutputFormat Table`, `Markdown`, or `Json` when a particular consumer needs it. Markdown is the default. `-EvidenceLimit` controls the maximum number of `file:line` references per concept.

## Interpret the report

- **Present** means a discriminating source/manifest pattern was found. Open the cited evidence before making a teaching or assessment claim.
- **Not detected** means the scanner found no maintained pattern in the files it inspects. It does not prove absence: reflection, generated code, version aliases, wrappers, unusual APIs, or code outside the project can hide a concept.
- A dependency, class name, or comment alone is generally insufficient. In particular, a POJO whose name ends with `Service` is not an Android Service; the detector requires an actual Service superclass or a `<service>` declaration.
- Static evidence does not establish that code builds, runs, is reachable, is correct, is used meaningfully, or is understood by a student. Combine the report with source review, a build, runtime checks, and student explanation as appropriate.

The scanner is read-only. It excludes `.git`, `.gradle`, `.idea`, `build`, `generated`, `out`, and `node_modules`, and skips common local secret/config files. Do not broaden its search into generated artifacts to turn a missing result into a positive.

## Verify detector behavior

When changing the patterns, run the companion-project assertions:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File `
  '<skill-folder>\scripts\Test-AndroidConceptAudit.ps1'
```

The self-test requires the local `TicTacMenu`, `CollectCircles`, and `sqlrequery` projects and checks both known positives and known negatives. Update a detector only after reviewing the cited source that demonstrates a real false result; avoid weakening a pattern merely to make a test pass.

For changes to the comparison layer, run its isolated behavior checks:

```powershell
python '<skill-folder>\scripts\test_comparison.py'
```

These cover count consistency, comment/string handling, line evidence, template tests
versus real tests, package normalization, and generated/secret-file exclusions. Validate
substantial workflow changes on an independent realistic request when authorized and
useful; checks of YAML syntax alone do not validate assessment judgment.
