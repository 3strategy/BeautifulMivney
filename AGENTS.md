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

## WSL login-shell commands (important)

- When a command depends on the user's interactive Ubuntu shell environment or PATH setup, prefer:
  - `wsl.exe -d Ubuntu bash -lic "<command>"`
- This is especially important for Ruby/Bundler/Jekyll commands, because plain `wsl bash -lc` may not expose `bundle` even when it works in the Ubuntu terminal UI.
- Preferred Jekyll pattern for this repo:
  - `wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulMivney && bundle exec jekyll build"`
  - `wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulMivney && bundle exec jekyll serve --port 4000"`
- If port `4000` is already in use, try another explicit port such as `4001`.
- Practical rule:
  - Use `wsl bash -lc` for simple read/search filesystem operations.
  - Use `wsl.exe -d Ubuntu bash -lic` for commands that rely on shell init files, gem-installed binaries, or project dev environments.

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

## Questionnaire location convention

- Interactive questionnaires in BeautifulMivney now live under:
  - `/home/stra/repos/BeautifulMivney/interactive`
- When creating new questionnaire pages, prefer `interactive/*.md` rather than placing them under `oop/`.
- Keep `_config.yml` menu links for questionnaires pointed at `/interactive/...`.
- Pages under `interactive/` use the repo's wide-page mode (`full-width: true`) by default so questionnaires can use most of the screen width without presentation scaling.
- If a specific interactive page should go back to normal centered width, override it in front matter with `full-width: false`.
- For safety on pages that must stay wide even if moved later, it is fine to also set `full-width: true` explicitly in the page front matter.
- For question-specific bagrut questionnaires, prefer the pre-split single-question PDF rather than re-extracting from a full exam booklet.
- For bagruyot `381`, the canonical split-question source is the live BeautifulYesodot site and its sibling repo:
  - live URL pattern: `https://יסודות.שלי.com/bagruyot/<exam-id>/qNN.pdf`
  - sibling repo path: `/home/stra/repos/BeautifulYesodot/bagruyot/<exam-id>/qNN.pdf`
- For bagruyot `205` and `271`, the canonical split-question PDFs are stored in this repo under:
  - `/home/stra/repos/BeautifulMivney/bagruyot/<exam-id>/qNN.pdf`
- Prefer embedding the canonical split-question URL/path directly in the questionnaire page instead of duplicating the split PDFs across repos.
- Rationale: keep a single source of truth for split questions so fixes/improvements accumulate in one place over time and questionnaires do not drift from the maintained split source.
- For bagrut-based questionnaires, keep the source question directly visible/linked so students can inspect the original material beside the quiz.
- Prefer embedding the source via the hosted PDF.js `viewer2.html` inside an `<object>` rather than pointing the `<object>` directly at the PDF.
- Use the viewer URL pattern `https://יסודות.שלי.com/assets/pdfjs/web/viewer2.html?file=<encoded-pdf-url>` with the PDF URL percent-encoded for the `file` query parameter.
- In that pattern, the `<object>` should use `type="text/html"` and the fallback content should include both a direct `viewer2` link and a direct PDF link.
- When the source question and the interactive quiz should be visible together, use the `two-columns` pattern with the PDF/source on the left and the quiz on the right.
- Important in this repo's RTL layout: inside `two-columns`, the first child renders on the right and the second child renders on the left.
- Therefore, for `quiz right / PDF left`, place the quiz as the first column and the PDF/source as the second column.
- If the side-by-side layout causes the question to start too low, prefer splitting the questionnaire rendering:
  - put the intro note / given code / questionnaire header above the two columns
  - render only the live question card inside the quiz column
  - keep ordinary single-column questionnaires on the default single `quiz-root` mount
- Shared split-render pattern:
  - add `quiz-header-root`, `quiz-main-root`, and a host `quiz-root`
  - call `window.renderQuestionnaire({ mountId: "quiz-root", headerMountId: "quiz-header-root", mainMountId: "quiz-main-root", ... })`
- Answer layout convention:
  - treat answer-grid layout as shared renderer behavior, not page-local CSS, unless a page has a truly unique visual requirement
  - `assets/js/questionnaire.js` supports per-question `answerColumns: 1` for long answer options that should be shown one below the other
  - prefer setting `answerColumns: 1` on the specific long-answer question objects rather than copying custom grid CSS into each page
  - important for split-render pages: the visible live question card is rendered into `quiz-main-root` via portals, so selectors that only target `#quiz-root .quiz-answers-grid` or `#quiz-root .quiz-answer-*` do not affect the live answers
  - therefore, do not rely on `#quiz-root`-scoped page CSS for answer-button layout on split questionnaires; use the shared questionnaire CSS/JS instead
  - practical rule: default to the shared 2-column answer grid, and switch only the long-text questions to `answerColumns: 1`
- Efficient questionnaire workflow:
  - start from a recent questionnaire page such as `interactive/02questionnaire2022q17.md` or another split-render page and reuse the structure
  - inspect/extract the split PDF text with Python `pypdf` when needed rather than working from the full exam booklet
  - in the intro note, explicitly say which section each cluster of quiz questions assumes
  - when a bagrut question has unrelated subparts, keep the questionnaire grouped in the same order as the PDF before adding any summary/synthesis question
  - for specific-question pages, keep the source visible via the split layout instead of paraphrasing the whole prompt into markdown
  - after creating/updating a questionnaire, add the `_config.yml` nav link and run `wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulMivney && bundle exec jekyll build"`
- Reusable questionnaire pattern:

```html
{: .box-note}
...intro note and given declarations...

<div id="quiz-header-root"></div>
<div id="quiz-root"></div>

<div class="two-columns questionnaire-source-layout">
<div markdown="1" class="column">

<div id="quiz-main-root"></div>
</div>
<div markdown="1" class="column">

{: .box-note}
מקור השאלה:
[PDF]({{ '/bagruyot/example.pdf' | relative_url }}#page=1)

<object
  class="questionnaire-source-viewer"
  data="https://xn--7dbdbn4b5c.xn--eebf2b.com/assets/pdfjs/web/viewer2.html?file=https%3A%2F%2Fxn--7dbdbn4b5c.xn--eebf2b.com%2Fbagruyot%2Fexample.pdf"
  type="text/html">
  <p>
    אם התצוגה לא נטענת בתוך הדף, פתחו את
    <a href="https://xn--7dbdbn4b5c.xn--eebf2b.com/assets/pdfjs/web/viewer2.html?file=https%3A%2F%2Fxn--7dbdbn4b5c.xn--eebf2b.com%2Fbagruyot%2Fexample.pdf" target="_blank" rel="noopener">viewer2</a>
    או את
    <a href="{{ '/bagruyot/example.pdf' | relative_url }}">ה-PDF</a>.
  </p>
</object>

</div>
</div>
```

## Tutorial language/style convention

- Default language direction for this repo should lean Hebrew unless explicitly decided otherwise for a specific page.
- For Hebrew lettered sub-question lists, prefer a real ordered list with `{: .alefbet}` and ordinary Markdown numbering (`1.`, `2.`, `3.`) rather than hand-writing `א.`, `ב.`, `ג.` as separate `{: .subq}` paragraphs.
- Reusable pattern:

```md
{: .alefbet}
1. ...
2. ...
3. ...
```

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
