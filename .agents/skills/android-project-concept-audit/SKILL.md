---
name: android-project-concept-audit
description: Audit an Android project for implemented teaching concepts using read-only static heuristics and file-line evidence. Use when inventorying project features or comparing a project with an Android curriculum; do not use the report as proof of runtime behavior, correctness, or student understanding.
---

# Android Project Concept Audit

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
