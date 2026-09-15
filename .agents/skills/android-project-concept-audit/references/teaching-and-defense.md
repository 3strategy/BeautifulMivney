# Extract teachable behavior and assess understanding

## A large submission is a prompt for inquiry

Never report an “AI probability”, an authorship percentage, or automatic disqualification
from lines, comments, architecture, polish or advanced algorithms. Those observables do not
identify the author. User-provided authorship history can be reported as attributed context;
it does not validate an automated detector. Avoid encoding expectations that particular
project names must look suspicious.

Instead identify **defense burden**: concrete mechanisms that require knowledge the student
has not yet demonstrated. The scanner provides retrieval cues (such as a 500-SLOC file,
search, asynchronous work, undo or atomic saving). The 500-line trigger is only a configurable
review convenience, not a research-backed norm or rubric threshold. Review signal accuracy;
an innocent method called `search` is not proof of an advanced search engine.

For each major mechanism, ask the student to locate the code, explain the invariant, trace
a small example, change one requirement and verify the result. Score demonstrated skill
with observations; mark understanding unknown until the interview. Collect required source/
AI attribution and compare to actual taught material and prior independent work if supplied.
Git history is supporting provenance, never proof of independent authorship by itself.

Useful short defenses:

- **Model/UI boundary:** change scoring in one place without changing drawing; test both
  legal and illegal input. Explain why animation completion must not re-commit a move.
- **Undo:** predict exactly which fields revert and which cumulative counters do not;
  add one regression test after changing the behavior.
- **Search:** trace a tiny state space; explain branching, pruning, termination and a work
  budget. Distinguish “no solution” from “search stopped before deciding”.
- **Persistence:** identify the actual storage backend, read/write code and saved fields;
  restart with valid and malformed data. Explain any difference between a file and a database.
- **Asynchronous work:** start request A, then request B; explain how a late result from A
  is prevented from overwriting B and how listeners/work are detached.
- **Generated content:** verify one level independently, reproduce the seed, and distinguish
  generation tools from code shipped on the phone.
- **Hint claims:** trace the explanation to the operation performed. A stored-answer reveal
  must not be described as a deduction/search that the code did not perform.

Do not infer lack of understanding from difficulty alone. If a student explains and modifies
advanced code, update the assessment accordingly. Sanctions are human decisions under the
applicable policy, not tool outputs.

## Professional practices that fit a classroom

Identify specific observed practices, not “professional project” versus “student project” as
fixed identities. A small clear model can be better engineering than a large abstraction
hierarchy. A product can have robust storage and still contain dense code, misleading hints,
insufficient documentation or untested errors.

Unless the teacher specifies otherwise, propose additions of 1–3 lessons of roughly 45
minutes for students who already know Java classes, arrays, listeners and basic Android
navigation. These are estimates, not validated teaching durations. Each proposal needs:

1. A source file/method and the smallest behavior to extract.
2. Existing prerequisites and what can remain as supplied scaffolding.
3. An observable student outcome and an independent variation/verification task.
4. Why it helps the rubric or software quality, without promising eligibility by itself.

High-return slices often include a pure rules method with three edge-case tests; a deep-copy
snapshot for one-step undo; rejecting an invalid save with an explicit fallback; detaching a
listener; returning a small result object; exposing useful accessible labels; and distinguishing
elapsed play time from wall-clock time. The teacher can demonstrate a sophisticated complete
app while students build only one of those increments.

Treat full constraint solvers, adaptive generators, numerical fluid geometry, multi-user
consistency, complex accessibility virtual trees and large import pipelines as separate larger
units unless the class already has their prerequisites. Do not promise that copying a short
but dense file makes these topics teachable in one lesson.

Use the repository's `android/topics-index.md` to locate existing teaching, and
`android/not-yet-covered.md` to identify genuine gaps. A project feature is not yet curriculum
coverage. Proposing a mini-lesson does not authorize changing the student validation projects
or creating all the lessons; respect the owner's transition/teaching workflow when later asked.
