# Measurement and evidence rules

## Counting contract

The comparison script walks all directories of each selected Gradle project, pruning
build/generated/vendor caches and symlinks. It reads UTF-8 text and reports decoding
failures rather than silently interpreting them as absence. It ignores common local
credentials and Firebase client configuration. It never emits source excerpts.

Report these scopes, without adding them together indiscriminately:

| Measure | Included | Interpretation |
|:---|:---|:---|
| Production code | Java/Kotlin under any `src/main` | Main comparison of implementation size |
| Production XML | Manifest and resource XML under `src/main` | UI/configuration/artwork; vector path complexity is poorly represented by lines |
| Variant code | Debug/release/other source sets | Explain what ships versus development-only scaffolding |
| Tests | `src/test`, `src/androidTest` | Distinguish stock tests, domain tests, and tests actually executed |
| Build/config | Gradle/KTS, TOML, non-secret properties | Infrastructure, not teaching achievement |
| Auxiliary code | Tools/backend scripts outside main sources | Identify tools and external services separately; not automatically installed in the app |
| Data/assets | JSON/text/binary assets and catalogs | Count separately; generated puzzle banks are not handwritten logic |
| Documentation/other | Markdown/HTML/YAML/etc. | Evidence for inspection, not a validated project dossier |

`maintained_code_config_physical` sums production code/XML, variants, tests, build/config,
and auxiliary code. It intentionally excludes prose, data assets, wrappers and binary files.
It is the defined **code/config project line count**, not every line anywhere in the folder.
Mixed source/config SLOC is secondary: scripts such as Python/PowerShell use nonblank lines
only, while Java/Kotlin/XML use noncomment/nonblank lines.

Physical lines include blanks and comments. Production SLOC excludes both, but still counts
imports, braces, and declarative constants. This is neither statement count nor logical LOC.
The Java/Kotlin token proxy excludes comments, literals, imports and package declarations;
it counts identifiers, numbers, operators and punctuation. Generic wildcards and ternary
operators complicate the decision-token proxy: **do not call it cyclomatic complexity**.
Neither proxy measures nesting, asymptotic complexity, accessibility, usability, correctness,
student effort, or quality. Inspect algorithms and responsibilities independently.

For compressed Java, compare tokens alongside SLOC and show files with multiple statements
on a line. Do not reformat or edit inputs to measure them. More tokens can be UI boilerplate
or repetition; they do not automatically mean more sophisticated algorithms.

## Baseline and authorship

Always show the actual baseline counts. Delta = project count minus baseline count; ratio =
project count / baseline count using the same scope. Do not clamp negative deltas, and use
an undefined ratio when the baseline measure is zero. A Basic Views baseline may contain
more navigation infrastructure than a later single-screen game; it is not an obligatory
minimum and need not be an ancestor of the project.

The normalized whole-file match ignores comments, formatting between tokens and the app
namespace. It preserves string literals and has no fuzzy clone detector. It identifies
some retained scaffolding, not every inherited line. It cannot establish actual added,
deleted or authored lines; use an explicitly tracked ancestral commit if that is requested.
Namespace discovery currently targets `app/build.gradle[.kts]`; unusual/multi-module packages
need manual review. Files under `src/main` that were generated and checked in as ordinary
source still count: identify data tables or vendored sources separately on inspection.

Template-test matching also ignores the expected application ID in the standard
`useAppContext` assertion. A stale package string does not turn a stock test into a domain
test, and the assertion may actually fail. Conversely, meaningful tests in `ExampleUnitTest`
must count. Nonbaseline tests remain candidates: only source review can assess relevance.

## Evidence and completeness

Keep this ladder explicit: pattern candidate → reviewed implementation → observed behavior
→ student explanation and modification. A successful build proves none of the later steps.
Sample evidence from each project should include a primary flow, a complex mechanism,
persistence read/write, error/lifecycle handling, and meaningful tests where available.

For database credit, trace both read and write to a real database. `LiveData.setValue` is not
a database write. FCM is not Firebase RTDB; JSON and AtomicFile are not databases. An API
client does not imply a submitted server implementation. Inspect relevant external source
when supplied; mark otherwise unresolved. A README may point to authored source under an
excluded directory such as `.idea`; report that exclusion and assess that specific source
separately when necessary. Do not silently include all IDE cache content.

Do not present API breadth as a quality leaderboard. Compare algorithmic difficulty,
asynchronous/distributed state, modularity, recovery, testing and interface demands as
separate axes with explanations. Relative judgments should name the cohort and scope;
there is no universal school-project LOC cutoff.

Store scan date, source fingerprint, script version/hash, source state/dirty status when
available, command and outcome of each executed check, and rubric version/access date.
Existing test XML or validation reports alone are historical evidence. A task reported
UP-TO-DATE establishes Gradle's current input check but is not a fresh test execution;
label it, or rerun the specific test task when fresh execution is required.

Reports may expose private names, paths or project behavior even without source snippets.
Keep them in the user's local assessment folder unless publication is explicitly requested.
