---
layout: page
title: "Tic Tac Toe RTDB Classroom Plan"
subtitle: "A staged path from Auth and schema to realtime multiplayer"
tags: [Android, Firebase, RTDB, TicTacToe, Teaching, Authentication, Lobby]
lang: en
---

{: .box-note}
Goal: keep RTDB simple first, while still ending with working realtime multiplayer between students.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

## Design Constraints (Agreed)

- Teach Firebase Authentication and UID usage early.
- Lobby list is core UX.
- Host should not always start; first turn must be random.
- Keep rules open at first (`read: true`, `write: true`), then teach security later.
- Split into at least 3 lessons.
- Match history is bonus; leaderboard is preferred bonus.
- Use a new `LobbyFragment`, then navigate to the existing game screen in `Main2Activity.java` (duplicated in step `017DuplicateAndAddActivityToMenu.md`).
- Keep schema security-friendly and dedicate a full schema lesson with alternatives.
- Solve interoperability so students can actually play each other.

## Core Pedagogical Strategy

Teach in this order:

1. Auth plus UID plus schema thinking.
2. Write and read with predictable manual flow.
3. Room lifecycle and two-player coordination.
4. Realtime subscriptions only after the model is stable.

This keeps cognitive load low and makes debugging easier.

## Step File Numbering Plan

- This RTDB series will use `018a`, `018a3`, `018b`, `018c`, and follow-up letters.
- Existing `181connectDatabase.md` and `185newFBref.md` are considered deprecated for this track unless a specific section is a perfect fit and is explicitly referenced.

## Interoperability Strategy (Critical)

### Recommended: Shared classroom Firebase project

1. Classroom project mode:
All students use one shared Firebase project (owned by the student lead) for multiplayer lessons, so everyone is in the same RTDB universe.
2. Optional personal project mode:
Students may still keep personal Firebase projects for private experiments.

Why this matters:

- If each student stays on a separate Firebase project, they cannot discover or join each other.
- One shared classroom backend restores the "works out of the box with peers" experience you had with SignalR.
- Practical first-run option: students can connect to the teacher/shared backend first, then later create their own backend.

Practical note for Google OAuth:

- Google sign-in on Android depends on Google identity and Play-services-backed components.
- For classroom shared project, each signing fingerprint used by students must be registered in that Firebase Android app.

## Shared Firebase Namespace Convention

To support multiple app experiments on one shared Firebase project, each app gets its own top-level root.

Examples:

- `/tictac` for this course app
- `/backgammon` for a different app
- `/gogo` for another app

Recommended high-level tree:

- `/tictac/rooms/{roomId}`
- `/tictac/leaderboard/{uid}`
- `/tictac/presence/{uid}`
- `/tictac/users/{uid}/profile`

Benefits:

- Avoids collisions with other projects in the same Firebase quota.
- Keeps students signed in and reusing the same backend context.
- Makes future security rules easier to scope by prefix (`/tictac/**`).

## Emulator and OAuth Reality

Google OAuth on emulators is possible, but not friction-free.

- Use emulator images with Google APIs / Play support.
- Students need correct Firebase config and SHA fingerprints for the signing keys they build with.
- If this setup overhead is too high for early lessons, teach with Anonymous Auth first, then add Google OAuth in a dedicated upgrade lesson.

## Auth Migration Note (Anonymous -> Google)

Starting anonymous and later adding Google is a valid teaching path if account linking is planned.

- If anonymous account is linked to Google, the same UID can be preserved.
- If students sign in with Google without linking, a different UID is created and their data may split.
- To keep UID as a core habit, all user data should always be keyed by UID from day one.

## Clarification: Google OAuth vs Firebase Authentication

Google OAuth and Firebase Authentication are related but not the same layer.

- Google OAuth:
  proves identity to Google and can return tokens from Google.
- Firebase Authentication:
  creates a Firebase user session, Firebase ID token, and Firebase UID used by RTDB security rules.

What happens if Google OAuth is done but Firebase Auth is not configured for Google provider:

- You may still get Google account information in the app.
- But you do not get a Firebase-authenticated user session from that flow.
- In RTDB rules context, `auth` is typically `null` (unless another Firebase auth method is active).

Teaching implication:

- You can demonstrate OAuth concepts first.
- But if the goal is UID habits and security-rule readiness, convert OAuth result into a Firebase login in the same lesson track.
- If you postpone that conversion, treat app identity and Firebase identity as separate states and say this explicitly.

## Lesson Sequence (High-Level)

### 018a: Intro to RTDB (concepts only)

- Explain RTDB mental model and why this flow is different from SignalR.
- Clarify identity terms: OAuth vs Firebase Auth vs UID.
- Present target architecture (lobby, room, game, realtime updates).
- Keep this as a conceptual kickoff with no implementation.

Success target:

- Students understand the full roadmap and terminology.

### 018a3: LoginActivity shell from GUI (pre-Firebase auth wiring)

- Create `LoginActivity` from Android Studio GUI as `Empty Views Activity`.
- Select `Launcher Activity` in the wizard to save manifest wiring time.
- Add login UI shell (username/email, password, login button, Google button).
- Add temporary delayed navigation to `MenuActivity` so app flow continues before auth is implemented.

Success target:

- App starts in `LoginActivity`, then auto-navigates to menu after short delay.

### 018b: Firebase project + RTDB + Email/Password setup (no-code)

- Connect project through Android Studio Firebase Assistant.
- Create Firebase project, RTDB, and Authentication provider (Email/Password).
- Keep Google OAuth out of this step.
- End with backend-switch strategy using `google-services.json` in a separate commit.

Success target:

- App is connected to Firebase; register/login path works; RTDB is reachable.

### 018c: Login wiring to Firebase Auth + initial `FBRef`

- Replace delayed bypass with real email/password auth flow.
- Introduce first `FBRef` root references and user-scoped initialization.
- Keep login responsibilities clear: auth first, game/lobby later.
- Verify UID is available and stable after login.

Success target:

- Login screen authenticates with Firebase and app enters menu with user context.

### 018d: Lobby + first data flow (manual refresh) + `FBRef` usage

- Build `LobbyFragment` with visible rooms list.
- Create room/join room with 2-player cap and status flow.
- Use manual refresh reads first (no listeners yet).
- Use `FBRef` references for room paths and user branches.

Success target:

- One student creates room, another joins from lobby, both enter same room.

### 018e: `Main2Activity` Game + Rules + Random Starter + `FBRef` expansion

- Move from `LobbyFragment` into `Main2Activity.java` (from step `017DuplicateAndAddActivityToMenu.md`).
- Enforce legal moves and turn ownership.
- Choose starter randomly when room becomes active (host is not guaranteed to begin).
- Expand `FBRef` to room/game references used by game screen.

Success target:

- Two players complete a full game with valid turns and deterministic final state.

### 018f: Realtime Subscriptions

- Add listeners to room state, board, and turn fields.
- Remove normal manual refresh behavior.
- Handle attach/detach lifecycle for listeners.

Success target:

- Moves and room changes appear live on both devices.

### 018g (Bonus): Leaderboard

- Add wins/losses/draw counters per UID.
- Update leaderboard at game end.

### 018h (Bonus): Security Rules

- Replace open rules with UID-based access controls.
- Explain how chosen schema enables simple and safe rule expressions.

## Schema Workshop: Candidate Trees and Tradeoffs

### Option 1: Room-centric minimal tree (simple start)

```text
/tictac
├── rooms
│   └── {roomId}
│       ├── hostUid
│       ├── guestUid
│       ├── status              # waiting | active | finished
│       ├── currentTurnUid
│       ├── starterUid
│       ├── board
│       │   ├── 0_0: "X"
│       │   ├── 0_1: ""
│       │   └── ...
│       └── winnerUid
├── presence
│   └── {uid}: true
└── users
    └── {uid}
        └── profile
```

Pros:

- Very easy for beginners to read and debug.
- Good for first playable milestone.

Cons:

- Harder to scale queries and history later.
- Rules can become crowded on one hot path.

### Option 2: Room meta + game state split (balanced)

```text
/tictac
├── rooms
│   └── {roomId}
│       ├── meta
│       │   ├── hostUid
│       │   ├── guestUid
│       │   ├── createdAt
│       │   └── status
│       ├── state
│       │   ├── currentTurnUid
│       │   ├── starterUid
│       │   ├── board
│       │   └── winnerUid
│       └── players
│           ├── {uidA}: "X"
│           └── {uidB}: "O"
├── leaderboard
│   └── {uid}
│       ├── wins
│       ├── losses
│       └── draws
└── users
    └── {uid}
        └── profile
```

Pros:

- Cleaner separation of concerns.
- Better long-term maintainability and security-rule readability.

Cons:

- Slightly more abstraction for beginners.

### Option 3: Normalized multi-collection (advanced)

```text
/tictac
├── rooms
│   └── {roomId}
│       ├── status
│       ├── createdBy
│       └── createdAt
├── roomMembers
│   └── {roomId}
│       ├── {uidA}
│       │   └── symbol: "X"
│       └── {uidB}
│           └── symbol: "O"
├── roomStates
│   └── {roomId}
│       ├── currentTurnUid
│       ├── starterUid
│       ├── board
│       └── winnerUid
├── roomMoves
│   └── {roomId}
│       └── {moveId}
│           ├── byUid
│           ├── cell
│           └── ts
├── leaderboard
│   └── {uid}
└── users
    └── {uid}
```

Pros:

- Best for scaling and clear ownership boundaries.
- Strong base for advanced querying and analytics.

Cons:

- Too complex for earliest lessons if introduced too soon.

### Option 4: Generic school app example (reference tree)

```text
/school_app
├── teachers
│   └── {teacherUid}
│       ├── name
│       └── courses
├── rooms
│   └── {roomId}
│       ├── title
│       └── teacherUid
├── courses
│   └── {courseId}
│       ├── name
│       └── roomId
└── students
    ├── uid_001
    │   ├── name: "Alice Johnson"
    │   ├── age: 20
    │   ├── email: "alice@example.com"
    │   ├── grade: "A"
    │   └── courses
    │       ├── course_01: "Mathematics"
    │       ├── course_02: "Physics"
    │       └── course_03: "Computer Science"
    ├── uid_002
    │   ├── name: "Bob Smith"
    │   ├── age: 22
    │   ├── email: "bob@example.com"
    │   ├── grade: "B"
    │   └── courses
    │       ├── course_01: "History"
    │       └── course_02: "Literature"
    └── uid_003
        ├── name: "Carol White"
        ├── age: 21
        ├── email: "carol@example.com"
        ├── grade: "A+"
        └── courses
            ├── course_01: "Biology"
            ├── course_02: "Chemistry"
            └── course_03: "Statistics"
```

Recommended classroom choice:

- Start with Option 1 in `018d`.
- Refactor toward Option 2 in `018h` when introducing security rules.

## Classroom "Done" Checklist

Every student should be able to:

1. Sign in and identify their UID in app and DB.
2. Open lobby and see at least one room list refresh cycle.
3. Create room and have another student join it.
4. Start game with random first turn (not fixed host-first).
5. Complete one full game with synchronized state on both devices.

## Open Decisions To Finalize

1. Core auth path:
Anonymous first, then Google upgrade, or Google from day one?
2. Shared project naming:
What root names are reserved in the shared Firebase project (`/tictac`, `/backgammon`, `/gogo`, ...), and who owns each one?
