# AGENTS Context Map

## Current project

- Repo (WSL): `/home/stra/repos/BeautifulMivney`
- Repo (Windows): `\\wsl.localhost\Ubuntu\home\stra\repos\BeautifulMivney`
- Android lesson pages live mainly under: `/home/stra/repos/BeautifulMivney/android/projectSteps`
- Bagrut assets used by pages in this repo: `/home/stra/repos/BeautifulMivney/bagruyot`

## Main Android codebase (source app for many tutorials)

- Android Studio project (Windows): `C:\Users\3stra\AndroidStudioProjects\TicTacMenu`
- Android Studio project (WSL mount): `/mnt/c/Users/3stra/AndroidStudioProjects/TicTacMenu`
- Use this repo for real code truth when markdown tutorials reference:
  - `MainActivity`, `Main2Activity`
  - `MenuActivity`
  - `menu_drawer.xml` / `drawer_menu.xml`
  - `AndroidManifest.xml`

## Sandbox-first Android workflow (important)

- Sandbox project (Windows): `C:\Users\3stra\AndroidStudioProjects\TicTacToeSignalR`
- Sandbox project (WSL mount): `/mnt/c/Users/3stra/AndroidStudioProjects/TicTacToeSignalR`
- Purpose:
  - Use this project as a "go wild" sandbox for fast experimentation / vibe-coding.
  - After a flow works, write/refresh the tutorial in this Jekyll repo.
  - Then apply the documented steps on `TicTacMenu` as a controlled validation path with more granular commit phases.
- This pattern is reusable for future tutorial series even when the concrete project names change.

## Sibling Jekyll projects

- BeautifulYesodot:
  - WSL: `/home/stra/repos/BeautifulYesodot`
  - Windows: `\\wsl.localhost\Ubuntu\home\stra\repos\BeautifulYesodot`
  - Useful as style/reference baseline for lesson summaries and timestamped YouTube links.

- mathBeautifulFork:
  - WSL: `/home/stra/sites/mathBeautifulFork`
  - Windows: `\\wsl.localhost\Ubuntu\home\stra\sites\mathBeautifulFork`

## Shared tooling / broader workflow

- `bag_splitter` (shared utility for splitting/organizing bagrut PDFs used by multiple content repos):
  - WSL: `/home/stra/repos/bag_splitter`
  - Typical related outputs are consumed by:
    - `/home/stra/repos/BeautifulMivney/bagruyot`
    - `/home/stra/repos/BeautifulYesodot/bagruyot`

## RTDB reference projects (guidance, not strict lock-in)

- Principle:
  - These projects are reference points for Firebase RTDB flows.
  - Prefer better current practice when found; references can be diverged from intentionally.

- Albert's Tasks (instructor baseline):
  - Windows: `C:\Users\3stra\AndroidStudioProjects\TasksONAlbertsFB`
  - WSL mount: `/mnt/c/Users/3stra/AndroidStudioProjects/TasksONAlbertsFB`
  - Notes: local clone exists; upstream public repo may also be consulted. This clone does not contain your own commit history.

- Presence (private evolved tasks / attendance / same RTDB as CodeClassroom):
  - Windows: `C:\Users\3stra\AndroidStudioProjects\Presence`
  - WSL mount: `/mnt/c/Users/3stra/AndroidStudioProjects/Presence`
  - Privacy rule: private project; do not expose code/content/links outside authorized local work context.

- Nick's FinalProj (contains important long-range tutorial candidates):
  - Windows: `C:\Users\3stra\StudioProjects\FinalProj`
  - WSL mount: `/mnt/c/Users/3stra/StudioProjects/FinalProj`
  - Notes: year-long collaborative project; includes substantial material for future tutorials. Some parts were authored by Nick or his school teacher; your main contribution focus there is algorithmic support (especially backgammon rules).

## Practical cross-repo workflow note

- For Android tutorials in this Jekyll repo:
  1. Prototype and de-risk in sandbox (`TicTacToeSignalR`) first.
  2. Translate into tutorial markdown under `android/projectSteps`.
  3. Apply and validate on `TicTacMenu` with controlled commit phases.
  4. Keep terminology consistent across BeautifulMivney and BeautifulYesodot when lessons are parallel.
