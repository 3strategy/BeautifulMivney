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

## Cross-filesystem access fallback (important)

- When direct PowerShell access to sibling repos or `/mnt/c/...` paths fails with permission/IO errors, use direct WSL shell commands instead.
- Preferred pattern:
  - `wsl bash -lc "ls /mnt/c/Users/3stra/AndroidStudioProjects/Presence"`
  - `wsl bash -lc "sed -n '1,200p' /mnt/c/Users/3stra/AndroidStudioProjects/TasksONAlbertsFB/app/src/main/java/com/example/tasks/FBRef.java"`
  - `wsl bash -lc "find /mnt/c/Users/3stra/AndroidStudioProjects -name FBRef.java"`
- This fallback should be used for read/search operations across sibling projects when UNC or mounted-path access is blocked from the current shell context.

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

## Tutorial language/style convention

- Default language direction for this repo should lean Hebrew unless explicitly decided otherwise for a specific page.
- For English markdown tutorials, add this block near the top (after frontmatter and initial note):

```html
<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>
```

- Do not retroactively rewrite in-progress tutorials between Hebrew/English unless explicitly requested.

## Tutorial layout pattern convention

- When a step and a visual (screenshot/diagram) are best understood side-by-side, prefer the `two-columns` pattern instead of stacking.
- Encourage this specifically for GUI walkthroughs (for example: \"Create LoginActivity from GUI\" text on one side, screenshot on the other).
- Reusable pattern:

```html
<div class="two-columns">
<div markdown="1" class="column">
...step text...
</div>
<div markdown="1" class="column">
...image...
</div>
</div>
```
