---
published: false
---

# Petstore JSON lesson validation — 19 October 2026

- Topic3 template baseline: `bf0b0bd` on its local `master` branch. No remote was created. Only this baseline is committed; the implementation remains unstaged/uncommitted.
- Baseline and all five final checkpoints build successfully. Core `assembleDebug`, existing `testDebugUnitTest`, and `lintDebug` pass. Lint has non-fatal warnings for English literals, direct dependency versions, and existing template/tooling resources; it is not warning-free.
- Six emulator test scenarios passed: sample deserialization/table/filter/rename; empty and malformed inputs; preferences restoration after Activity restart; controlled HTTP 404 body display; live GET and POST field comparison; offline failure display. The final core checks were repeated after explicit UTF-8 decoding was added, with a cat emoji in the POST body and response.
- The preferences extension was also checked after an actual `am force-stop` and relaunch: Restore reconstructed three animals including Pixel. No uninstall or data clearing was used.
- POST succeeded without credentials. An immediate independent GET of the created ID returned HTTP 200 and the created fields. This is observed public-demo behavior, not a promise of durable storage.
- The independent temporary instrumentation harness remains under `C:/Temp/petstore-work/`, outside the student delta. Existing template tests and dependencies remain unchanged.
- Every documented edit was replayed from its preceding snapshot and compared with the resulting checkpoint source, normalizing only the presence of a final newline. Every checkpoint ZIP matches that snapshot byte-for-byte. The main Topic3 sources match checkpoint 04; preferences code is confined to the optional checkpoint download.
- Jekyll builds successfully. Local lesson/download links resolve. Browser checks at the normal desktop viewport and 390px width confirmed English LTR content, rendered diagrams, aligned Before/After panels, horizontal code scrolling and no whole-page horizontal overflow.
- Visually inspected the emulator screen, including unchanged response text, editable JSON and a table whose first object's name was changed to Pixel.
- This was implementation/build/device validation and exact edit replay, not an independent fresh-student reproducibility audit. No physical device was used, and no code was pushed.
