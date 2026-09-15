# Smartphone yearly-project rubric: versioned assessment

Primary source: [Ministry smartphone 5-unit project rubric](https://meyda.education.gov.il/files/CSIT/smartphonesProject-5.pdf).
Inspected 2026-09-14: 8 pages, heading תשפ״ו, with explicit changes for תשפ״ז.
Re-fetch the official file for each new assessment year; this reference is a reading guide,
not a substitute for a newer directive or a school-specific rubric supplied by the user.
If browser fetching returns 403, an ordinary local HTTP download and PDF reader may work.
Check the visual tables because Hebrew extraction can reorder columns and qualifiers.

## Eligibility before score

Pages 1–2: requirements 1–5 concern an Android app, operation at the examination, complex
logic, an appropriate interactive graphical interface/screens, and relevant events/permissions.
The document makes these acceptance gates. Do not adjudicate the live-operation gate from
a static scan. A single-screen game is not automatically deficient; the wording ties screens
and permissions to the application's needs. Do not recommend unnecessary dangerous
permissions merely to fill a row.

Pages 3–4 define the additional five-unit gates:

| Item | Through תשפ״ו | From תשפ״ז in this published file |
|:---|:---|:---|
| §6 | At least one qualifying listed topic | At least two qualifying listed topics |
| §7 | Real database read **and** write | Same requirement |
| §8 route A | At least two §9 topics | At least three §9 topics |
| §8 route B | At least one §9 topic plus two §10 topics | At least two §9 topics plus two §10 topics |
| AI requirement, p.2 | Attribute borrowed/AI-generated code | Additionally AI as described in §6 or §9 |

§7 explicitly excludes SharedPreferences, text files and XML/JSON from database credit.
AtomicFile persistence remains file persistence even if reliable, versioned and extensively
tested. Firebase Authentication or Messaging alone does not establish database use.

§6 includes meaningful WorkManager/job scheduling, non-media API data use, a substantial
Android Service, complex relational database work, Thread/Handler, object events, DataBinding,
RecyclerView, ViewPager with Fragments, comprehensive MVVM, and GenAI API/agent integration.
View Binding is **not** DataBinding. A class merely named `Service` or a lone ViewModel is
insufficient. Inspect actual usage and student depth rather than library declarations.

§6 also contains transitional entries: AlarmManager+Notification moves to §9 in תשפ״ז;
ActivityResultContract and ContentProvider usage move to §10; custom animation without an
animation class is removed from §6. Writing a ContentProvider is separately listed: avoid
assuming the usage/authoring distinction or duplicate entries give multiple credits.

§9 includes custom graphical View/SurfaceView, Fragments, maps/location, connectivity,
server API development, a substantial algorithmic engine, a trained ML model, and other
listed technologies. Its multiplayer definition for תשפ״ז requires simultaneous cross-user
effects or shared-resource conflict management. A login or chat-looking screen is not proof.
Speech recognition may support the new-technology option; evaluate actual use and the
examiner's mapping. It does not itself demonstrate training a model.

§10 includes preferences, messaging/receivers, camera/gallery, microphone, GPS, countdown,
speech, sensors, calendar filtering and the applicable transferred entries. Multiple API
calls implementing the same topic are one topic. Do not invent credits for a library name.

The PDF gives conditional §10 equivalences for multiple §6 topics and for remote database
read/write with synchronization. Record any reliance on those notes explicitly. Do not
silently count the same implementation repeatedly across alternatives, or resolve ambiguous
overlaps in the student's favor or against them without examiner interpretation.

For this file, a sophisticated deterministic solver fits the **human-designed algorithm**
option (§9.11); it is not the trained ML option (§9.12). Generating source code with an AI
assistant is also different from implementing the AI functionality described in §6/§9.
Report that distinction when applying the תשפ״ז AI requirement.

## Evidence worksheet

For each project, record:

| Field | Required content |
|:---|:---|
| Rubric/year | Source URL, access date, applicable year and local amendments |
| §1–5 | Relevant source, runtime and interaction evidence; unresolved gates |
| §6 | Distinct reviewed topics, meaningful role, student explanation still needed |
| §7 | Read path, write path, database type, actual data flow; not just imports |
| §8–10 | Proposed route with individual topic IDs and justified equivalences |
| AI | Product AI requirement separately from attribution of development assistance |
| §11–17 | Complexity, OOP, menus/dialogs, style, structures, relevance, cohort originality |
| Dossier | Provided / partial / not supplied; inspect against pp.6–7 separately |
| Demonstration | What built, what ran, what was actually observed, and environment limits |
| Defense | Student explanation, tracing, live change and tests; not inferred from source |

Use source-supported / partial / not detected / externally dependent / unverified. A
negative keyword scan is not proof of absence. Do not automatically output a numeric grade
or “disqualified”: eligibility and grading require evidence unavailable in source alone.

Pages 6–7 grade the dossier separately. Page 8 grades project presentation, functioning,
database use, §6 topics, code mastery, theory and extensions. Code mastery is 25% and theory
15%; a source scanner cannot award those. The report should not conflate the dossier and
project scoring tables, invent a combined weighting, or award bonus points beyond the
100-point cap. Sophistication may warrant bonus consideration; it does not waive missing
mandatory requirements. Originality must be judged against an actual cohort and attribution,
not against an assumed “student style”.
