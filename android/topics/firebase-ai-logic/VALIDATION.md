---
published: false
---

# Firebase AI Logic tutorial validation — 24 October 2026

- Deliverables: one short app page and one separate secure-setup page, each in English and Hebrew. Both language pairs share identical Java/XML/Gradle examples.
- No application Git repository was created. Existing TopicProjects projects were only read. An isolated Empty Views compile fixture is outside the site at `C:/Temp/firebase-ai-lesson/validation-app`.
- The simplified single classroom setup passed `assembleDebug` with Google services plugin 4.5.0, Firebase BoM 35.1.0, and Guava 31.0.1-android. The compile fixture uses an explicitly dummy Firebase configuration, never an instructor credential.
- User-requested simplification: one App Check debug dependency, installed directly in MainActivity. Removed both AppCheckSetup helper classes, variant-specific folders and Play Integrity/release instructions. This is a private classroom test app with one token per installation, not a distribution exercise. Earlier release-provider checks describe the superseded version and do not apply to this setup.
- No live model request was sent. No Firebase app was registered, API enabled, App Check setting changed, key restriction saved, billing plan modified, or budget created in the source console project. Live attestation/token registration, provider activation and inference remain owner-performed setup checks.
- Three actual console screenshots were captured as crops, without generated/altered UI: provider-choice.jpg (840 x 1051), app-check-start.jpg (900 x 260), cloud-api-details.jpg (1150 x 510). Saved files were visually reviewed. Crops exclude account identity, project IDs, billing data, API-key values and debug tokens. No EXIF data is present. The screenshots show onboarding/before-activation states, explicitly labelled as such.
- Official Firebase setup, security/App Check, model, quota and pricing documentation was checked on the above date, including the announced 2 November 2026 App Check enforcement requirement.
- Jekyll build passed. Both generated language mappings and 202 local page/image links passed static checks. New Markdown was scanned for source-project identifiers and credential patterns.
- Browser checks passed for all four pages at desktop and phone width (312 CSS pixels with the current browser zoom): correct LTR/RTL prose, LTR code, no document horizontal overflow, no unresolved Liquid and no broken images. The small flowchart rendered six nodes; the View Binding comparison keeps Before on the left and After on the right.
- The original Cloud dashboard tab was restored after inspection. The local tutorial was left open for review. There was no app deployment or new remote repository. The subsequent menu/commit/push request authorizes publishing these scoped tutorial changes.

- Menu follow-up: four direct Android-menu entries added for the Hebrew/English app and setup pages. Jekyll rebuilt successfully and the generated page contains all four navigation targets.

- Focused tutorial-improvement review removed variant scaffolding at first introduction. Read-only churn audit found no Java cosmetic-edit candidates (four non-Java/context regions required manual review). Both language pairs retain identical code examples. No console settings or tokens were changed.

- 25 October 2026 ownership/free-tier correction: each student uses their own Google account and Firebase/Cloud project, preferably the yearly-project backend. Reuse an existing Android registration or create it for the actual applicationId; the sample package is not a required student identity. Added project creation and same-project-ID explanation, Spark/no Cloud Billing checkpoint, no-billing Gemini Developer API/model choice and quota-exhaustion guidance. Removed the budget/billing-enabled teaching path and end-of-exercise token revocation so the same project can continue through the year. Official pricing, project relationship, setup, model and quota pages were rechecked; the existing model is still documented as billing-not-required. No Java/XML/Gradle logic changed, no student/instructor console changed and no live inference verified.
- Ownership revision checks: Jekyll build passed; bilingual code parity passed; generated setup pages and all three screenshot assets verified. The prose-only change did not require recompiling the unchanged Android logic.
