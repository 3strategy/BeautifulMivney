---
layout: page
title: "CollectPlan"
subtitle: "Agentic Plan for Goal and parallel work on Android and on Tutorial project"
tags: [Codex, Plan, Goal]
lang: en
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

{: .box-note}
This page preserves the teacher/development plan. Students should use the shorter [student roadmap for chapters 8–18](/android/CollectCircles/08-18.student-roadmap), which follows the final implemented chapter order.

{: .box-note}
Extend `android/CollectCircles` from chapter 07 through a sequence of small, runnable lessons. The original five-circle timed game remains available; a persisted autonomous mode adds endless spawning, spendable/lifetime circle totals, purchasable animated “pushers,” offline progress, WorkManager eligibility notifications, and classroom brag notifications.

Execution will run under `/goal` mode. Every chapter follows this gate:

1. Draft the tutorial and expected diffs first.
2. Implement that chapter in the Android project by following the tutorial.
3. Build, test, and revise the tutorial against the working code.
4. Stop and wait for the user to test.
5. Commit both project checkpoints only after explicit user approval.
6. Continue to the next chapter.

Existing unrelated dirty changes in both repositories must be preserved and separated before the first checkpoint.

## Tutorial Sequence

1. **08 — Persistent circle economy**
   - Add spendable circles, lifetime circles, and pusher count to a compact HUD.
   - Every manual collection in the timed game increments both circle totals.
   - Introduce a small SharedPreferences-backed state class; lifetime totals never decrease.
   - Replace the single game-finished callback with collection and completion callbacks.

2. **09 — Autonomous endless mode**
   - Add an immediately available, persisted autonomous-mode switch.
   - Timed mode retains five circles, stopwatch, best time, and Start/Restart.
   - Autonomous mode spawns indefinitely, allows manual dragging, and caps the live board at 12 circles.
   - Spawn timing uses elapsed time rather than assuming a fixed frame rate.

3. **10 — The pusher shop**
   - Add a compact purchase dialog within `MainActivity`; no second activity or fragment.
   - First pusher costs 64 spendable circles; later prices are `64 × 2ᵖ`, where `p` is the number already owned.
   - Buying deducts the price, increments the pusher count, and refreshes the HUD.
   - Keep the price formula behind one method so a later pacing function can replace it safely.

4. **11 — Drawing and animating a pusher**
   - Introduce `Pusher` as a Canvas-drawn stick figure smaller than a collectible circle.
   - Draw the body from simple primitives and animate alternating arms/legs from elapsed time.
   - Teach position, direction, animation phase, `invalidate()`, and `postOnAnimation()`.
   - Pushers walk visibly but do not collect circles yet.

5. **12 — Attaching and pushing**
   - Give each pusher a simple state: idle/walking to circle/pushing.
   - Assign each available pusher a different circle, walk to it, attach behind it, and push it into the target.
   - One collection cycle lasts five seconds, giving each pusher a known performance of `0.20` circles/second.
   - If the user grabs an assigned circle, release that assignment and let the pusher choose another.
   - Both manual and pusher collections update spendable and lifetime totals through the same method.

6. **13 — Offline progress**
   - Extract a pure calculator shared by lifecycle and background code.
   - Accrual is:
     `elapsedSeconds × min(spawnRate, pusherCount × 0.20)`.
   - Spawn rate is approximately 10% above aggregate pusher performance, with a small minimum foreground rate when no pushers exist.
   - Persist fractional circles and the last settlement timestamp so repeated calculations neither lose fractions nor double-count time.
   - Offline progress occurs only while autonomous mode is enabled and at least one pusher exists.
   - On resume, settle progress, update totals, and rebuild a visually interesting board containing no more than 12 circles.

7. **14 — WorkManager fundamentals**
   - Add WorkManager through the version catalog.
   - Schedule two unique periodic jobs:
     - every 30 minutes with `RequiresCharging`;
     - every 3 hours with `BatteryNotLow`.
   - Both jobs call the same idempotent worker and shared offline-settlement code.
   - Explain that periodic execution is inexact and controlled by Android.

8. **15 — Lesson schedule and purchase notification**
   - Seed SharedPreferences from a replaceable sample JSON resource:
     `{"timeZone":"Asia/Jerusalem","lessons":[{"day":"SUNDAY","start":"08:00","end":"09:30"}]}`.
   - Parse weekday/start/end using `org.json`; lesson end is exclusive.
   - Missing or malformed schedules fail closed: progress can settle, but no notification is shown.
   - Notify only when the current spendable balance can buy the next pusher and the current time falls inside a CS lesson.
   - Persist the notified pusher tier so charging and battery jobs cannot duplicate the alert; the next purchase unlocks one future notification.
   - Use a dedicated eligibility notification channel and open the app’s purchase dialog from the notification.

9. **16 — Player profile and brag client**
   - Add a small settings dialog for a persisted player name.
   - Validate a trimmed name of 1–24 characters.
   - Add a “Brag” action that calls `sendCircleBrag` with:
     `{"name": string, "totalCirclesCollected": integer}`.
   - Subscribe every installation to `circle_brags`, including the sender.
   - Handle a fixed `circle_brag` data event and show a notification containing the validated name and lifetime total.

10. **17 — Teacher cloud function for bragging**
    - Add the teacher-facing deployment chapter beside the existing cloud-infrastructure lesson.
    - Validate payload type, name length/control characters, and a nonnegative JavaScript-safe integer.
    - Publish only a fixed event shape to the fixed `circle_brags` topic; clients cannot choose topic, title, or arbitrary data.
    - Apply the same bounded-instance and cooldown teaching safeguards as the existing invitation function.
    - Explicitly explain that without authenticated accounts the server cannot prove that a submitted score is honest.

## Interfaces and Tutorial Presentation

- Persist keys for spendable circles, lifetime circles, pusher count, autonomous mode, fractional progress, last settlement time, last notified tier, lesson-schedule JSON, and player name.
- Centralize state mutations so Activity, game board, and Worker cannot each implement different economy rules.
- Use `long` for whole-circle totals, `double` for fractional offline progress/rates, and saturating price arithmetic to avoid overflow.
- Keep one activity. Use compact rows and dialogs so Start, autonomous mode, notification demonstrations, settings, and shop controls leave adequate board space.
- At least 40% of substantive code transformations across chapters will use the paired `two-columns` before/after pattern from `014a.creatingFragmentsMenu.md`. Small imports, dependencies, strings, and isolated additions remain ordinary single-column diffs.
- Every lesson begins from the preceding runnable checkpoint, emphasizes the immediate visible result, and avoids full-project dumps.

## Test Plan

- Pure unit tests cover price tiers, insufficient/sufficient purchases, lifetime-total invariants, fractional accrual, disabled autonomous mode, zero pushers, spawn/performance minimum, repeated settlement, and overflow boundaries.
- Schedule tests cover inside/outside windows, exact start/end boundaries, weekday changes, Asia/Jerusalem daylight-saving behavior, malformed JSON, and empty schedules.
- Notification-policy tests cover once-per-tier behavior, overlapping workers, insufficient balance, purchase advancement, and execution outside lesson time.
- Manual Android checks cover both game modes, persistence after process restart, 12-circle cap, simultaneous user/pusher collection, stealing an assigned circle, animation lifecycle cleanup, notification deep-link behavior, and brag receipt in foreground/background.
- Each checkpoint runs unit tests, debug build, lint where practical, and a device/emulator smoke test before waiting for user acceptance.

## Assumptions

- “Pusher” is the canonical English name; tutorials may introduce a natural Hebrew translation alongside it.
- Calm classroom pacing is the initial default: `0.20` circles/second per pusher, spawn roughly 10% faster, and 12 live circles maximum.
- The sample lesson JSON is intentionally replaceable and is not claimed to represent the timetable image currently linked by the repo.
- Local eligibility notifications occur once per purchasable tier, not repeatedly during every lesson.
- Brags go to all subscribed classroom devices, including the sender.
- Commits occur only after the user tests and explicitly approves each paired checkpoint.
