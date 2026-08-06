---
layout: page
title: "03c One-shot GitHub Jekyll With Local WSL Bundle"
subtitle: "GitHub Pages plus a working local WSL Jekyll server"
tags: [agentic, github-pages, jekyll, wsl, prompt]
lang: he
---

## דרישות קדם - חיבור ל-GitHub CLI

**מתקינים:**

```powershell
winget install --id GitHub.cli -e
```

**מתחברים:**

```powershell
gh auth login
```

עכשיו אפשר לעבוד עם Git מקומי ו־GitHub מה־CLI. לא פחות חשוב: **גם לאייג'נט יותר קל לעבוד. עם `gh` מותקן ומאומת.** סוכנים כמו Claude Code ו-Codex יכולים לבדוק סטטוס של CI, ולתשאל issues/PRs ישירות מה-shell - בלי שתצטרך להעביר להם טוקן API בתוך ה-prompt. זה בעצם מרחיב להם את היכולות מעבר ל-git הבסיסי (commit/push/clone) לכל מה שדורש את ה-API של GitHub. שווה לבדוק שה-scopes שנבחרו ב-`gh auth login` מספיקים למה שתרצה שהסוכן יעשה.

בגרסת WSL המתקדמת חשוב במיוחד לבדוק את זה מתוך ה־terminal של WSL עצמו: `gh auth status` צריך להצליח שם, לא רק ב־PowerShell של Windows.

## דרישות קדם - פעם אחת במחשב

<div markdown="1" class="box-note">

אם כבר יש לכם אתרים שעובדים מקומית עם `bundle exec jekyll serve`, סביר שחלק גדול מההתקנות הבאות כבר קיימות. בפרויקט חדש לא אמורים להתקין אותן שוב בלי בדיקה. האייג'נט צריך קודם לבדוק גרסאות, ורק אז להתקין את מה שחסר.

</div>

בדיקות מהירות בתוך WSL:

```bash
git --version
gh --version
gh auth status
ruby -v
gem -v
bundle -v
jekyll -v
```

אם Ruby/Jekyll לא קיימים ב־WSL, נקודת הפתיחה הרשמית של Jekyll ל־Ubuntu היא:

```bash
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev
```

לאחר מכן מגדירים התקנת gems בתיקיית המשתמש, ואז מתקינים Jekyll ו־Bundler:

```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install jekyll bundler
```

{: .box-warning}
אין כאן דרישת `npm install` כללית. באתר Jekyll רגיל עם Just the Docs ו־`remote_theme`, העבודה המקומית אמורה להישען על Ruby gems ו־Bundler. Node/npm נדרשים רק אם מוסיפים ביודעין כלי frontend, theme אחר, או build step נוסף שלא מופיעים בפרומפט הזה.

מה שחד־פעמי במחשב:

- WSL Ubuntu עובד.
- VS Code מותקן בצד Windows עם הפקודה `code` זמינה ב־PATH.
- VS Code WSL extension מותקן.
- Git ו־GitHub CLI זמינים ומאומתים בתוך WSL.
- Ruby, Bundler ו־Jekyll זמינים בתוך WSL.

מה שמקומי לכל פרויקט:

- יצירת תיקיית פרויקט חדשה תחת `/home/<user>/repos`.
- `Gemfile` ו־`Gemfile.lock` בתוך ה־repo.
- `bundle install` מתוך תיקיית הפרויקט.
- `bundle exec jekyll build`.
- `bundle exec jekyll serve --port 4000`.

## דרישות קדם - פתיחת תיקיית WSL נכונה

{: .box-warning}
בגרסה הזו של הפרומפט לא מתחילים מתיקיית Windows ריקה. אם המטרה היא להגיע ל־`bundle exec jekyll serve --port 4000`, תיקיית העבודה צריכה להיווצר בתוך מערכת הקבצים של WSL, למשל תחת `~/repos`, ולהיפתח ב־VS Code כ־WSL workspace. כך נמנעים מראש מבעיות הרשאות Git וקבצים במקום לנסות לתקן אותן אחר כך עם `chown`.

הכנה מומלצת:

1. פתחו Command Prompt או PowerShell.
2. היכנסו ל־Ubuntu:

```powershell
wsl
```

3. בתוך ה־terminal של Ubuntu צרו תיקייה לפרויקט:

```bash
mkdir -p ~/repos
cd ~/repos
mkdir <REPOSITORY_NAME>
cd <REPOSITORY_NAME>
```

4. פתחו את התיקייה הזו ב־VS Code דרך WSL:

```bash
code .
```

5. ודאו ש־VS Code נפתח בחיבור WSL, וש־terminal חדש בתוך VS Code מציג נתיב Linux:

```bash
pwd
```

הנתיב צריך להיראות כמו `/home/<user>/repos/<REPOSITORY_NAME>`, ולא כמו `/mnt/c/...`.

אם משתמשים ב־Codex Desktop במקום מתוך VS Code, פתחו מראש workspace שנמצא בתוך WSL, למשל `/home/<user>/repos/<REPOSITORY_NAME>` או דרך הנתיב `\\wsl.localhost\Ubuntu\home\<user>\repos\<REPOSITORY_NAME>`. אל תיצרו את הפרויקט תחת `C:\Users\...` ואז תנסו להריץ עליו Ruby/Jekyll מתוך WSL.

<details markdown="1"><summary>למה זה חשוב?</summary>

לפי תיעוד Microsoft, כשעובדים עם כלי Linux command-line מומלץ לשמור את קבצי הפרויקט בתוך מערכת הקבצים של WSL, למשל `/home/<user>/Project`, ולא תחת `/mnt/c/...` או `C:\Users\...`. לפי תיעוד VS Code, זרימת העבודה הרגילה היא לפתוח WSL terminal, לעבור לתיקייה הרצויה, ולהריץ `code .`, כך ש־VS Code וכלי הפיתוח יעבדו מול סביבת WSL עצמה.

- [Microsoft: Working across Windows and Linux file systems](https://learn.microsoft.com/en-us/windows/wsl/filesystems)
- [VS Code: Developing in WSL](https://code.visualstudio.com/docs/remote/wsl)
- [Jekyll: Ubuntu installation](https://jekyllrb.com/docs/installation/ubuntu/)
- [GitHub Docs: Creating a GitHub Pages site with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)

</details>

## פרומפט - one-shot ליצירת אתר מארקדאון חי וזמין לתלמידים


<div markdown="1" class="english box-note">

You are working in an empty folder inside the WSL Linux filesystem, for example `/home/<user>/repos/<REPOSITORY_NAME>`. This folder was created from a WSL Ubuntu terminal and opened in VS Code as a WSL workspace with `code .`, or it was selected as a WSL workspace in Codex Desktop.

Do not continue if the current folder is a Windows filesystem path such as `C:\Users\...` or a WSL-mounted Windows path such as `/mnt/c/...`. In that case, stop and ask the user to reopen a purpose-made WSL folder before creating files.

Create and publish a small, maintainable Hebrew educational website using Jekyll and GitHub Pages.

This is the advanced version of the workshop prompt. The objective is not merely to produce a page or rely only on GitHub Pages. Create a clean repository, a GitHub Pages deployment harness, and a working local WSL Jekyll harness that can be launched with:

```bash
bundle exec jekyll serve --port 4000
```

## Local WSL goal

The local development goal is part of the definition of done.

Set up the repository so that:

* the project can be opened and edited as a normal repo;
* the Jekyll dependencies are captured in the repo with a `Gemfile` and `Gemfile.lock`;
* `bundle install` succeeds in WSL;
* `bundle exec jekyll build` succeeds in WSL;
* `bundle exec jekyll serve --port 4000` starts a working local server;
* the local server renders the Hebrew pages, navigation, RTL styling, code blocks and internal links correctly.

Prefer running WSL-dependent commands from an Ubuntu login shell when PATH or Ruby environment initialization may matter, for example:

```powershell
wsl.exe -d Ubuntu bash -lic "cd /path/to/repo && bundle exec jekyll serve --port 4000"
```

If port `4000` is already in use, try another explicit port such as `4001` and report the actual URL.

## Environment

* The current working directory is inside the WSL Linux filesystem, preferably under `/home/<user>/repos`.
* VS Code or Codex is attached to that WSL folder, not to a Windows `C:\...` folder.
* Git is installed in WSL.
* GitHub CLI (`gh`) is installed in WSL.
* The user should already be authenticated with GitHub from WSL.
* WSL Ubuntu is available and suitable for Ruby/Bundler/Jekyll work.
* Ruby, Bundler and Jekyll may already be installed in WSL from previous local Jekyll sites. First check `ruby -v`, `gem -v`, `bundle -v` and `jekyll -v`; install only what is missing.
* Do not run `npm install` or add Node tooling unless a concrete dependency in this repository requires it. This prompt should work through Ruby gems and Bundler.
* The repository name should be: `<REPOSITORY_NAME>`
* Create the repository under the currently authenticated GitHub account.
* The GitHub repository must be public because it will be hosted using GitHub Pages.
* Build and deploy through GitHub Actions as well as supporting local WSL preview.

## Architecture

Create a minimal Jekyll content repository.

Use this pinned remote theme:

```yaml
remote_theme: just-the-docs/just-the-docs@v0.12.0
```

Do not:

* fork the theme;
* clone the complete theme;
* copy all theme layouts or assets into this repository;
* depend on the theme's `main` branch;
* add unrelated frameworks or JavaScript libraries.

The repository should contain only the educational content, configuration, small local customizations, dependency files, documentation and deployment harness.

## Required site

Create:

1. A Hebrew home page introducing the site.
2. An `about.md` page.
3. A `lessons/` directory with two example lesson pages.
4. Navigation between the pages.
5. A visible callout box, a Markdown table and a code example.
6. A small local CSS override for Hebrew RTL presentation.
7. Keep code blocks, terminal commands, filenames and inline code left-to-right.
8. Make the layout responsive and readable on mobile.
9. Do not download or generate external images.

Use suitable Jekyll front matter on every page.

## Required repository harness

Create:

* `_config.yml`
* `Gemfile`
* `Gemfile.lock`
* `index.md`
* `about.md`
* the example lesson pages
* the minimal custom Sass/CSS required for RTL
* `.gitignore`
* `README.md`
* `AGENTS.md`
* `THIRD_PARTY_NOTICES.md`
* an official-style GitHub Actions workflow under `.github/workflows/` that builds and deploys the Jekyll site to GitHub Pages

`AGENTS.md` should explain:

* where pages and lessons belong;
* the required front matter;
* that the site is primarily Hebrew and RTL;
* that code and technical tokens remain LTR;
* that theme source files must not be copied unnecessarily;
* that no private student or school data may be committed;
* how to run the local WSL build and server;
* that during the initial site implementation, the agent may commit, push, configure GitHub Pages and inspect the GitHub Actions deployment until the site is running;
* that after the initial implementation, ordinary maintenance agents should verify the local build when relevant, but should not commit, pull, push or claim the GitHub Pages build passed unless the user explicitly asks for a deployment workflow.

`README.md` should explain:

* how to add a new Markdown lesson;
* how navigation is controlled;
* how to install dependencies in WSL with Bundler;
* how to run `bundle exec jekyll build`;
* how to run `bundle exec jekyll serve --port 4000`;
* how GitHub Actions deployment works;
* where to inspect a failed deployment;
* how to change the pinned theme version deliberately;
* that public visibility does not automatically define a reuse license for the teacher's original content.

`THIRD_PARTY_NOTICES.md` must identify Just the Docs, its repository, the pinned version and its MIT license. Do not claim that the teacher's original content is MIT-licensed.

## GitHub and deployment

1. Run `pwd` and confirm the path is under `/home/...`, not `/mnt/c/...`.
2. Run `gh auth status` from WSL.
3. Initialize Git with `main` as the default branch.
4. Review all generated files before committing.
5. Commit with a clear initial commit message.
6. Create a new public GitHub repository using `gh repo create`.
7. Push `main`.
8. Configure GitHub Pages to use the custom Actions workflow. You may use the GitHub API through `gh api`.
9. Trigger or observe the deployment workflow.
10. Inspect the workflow result. If it fails, diagnose and fix the repository rather than merely describing the failure.
11. Retrieve the final Pages URL from GitHub when available.

If Pages was already configured and the API returns a conflict, inspect the existing configuration and continue safely.

## Verification

Before finishing:

* inspect the repository tree;
* inspect `git status`;
* confirm that no secrets or private data were added;
* verify that the theme is pinned;
* run `bundle exec jekyll build` successfully in WSL;
* start `bundle exec jekyll serve --port 4000` successfully in WSL, or use another explicit port if needed;
* inspect the local home page when tooling permits;
* verify that the site builds successfully in GitHub Actions;
* inspect the deployed home page when tooling permits;
* confirm that internal links work locally and on the GitHub project-site base path;
* report the repository URL, local server URL, Pages URL, deployment status and any remaining manual step.

Do not stop after merely generating files. The task is complete only when the local WSL server has been proven to run and the GitHub Pages deployment result has been checked.

</div>
