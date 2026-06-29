---
layout: page
title: "03b One-shot GitHub Markdown Site"
subtitle: "GitHub Pages only, without local WSL Jekyll"
tags: [agentic, github-pages, jekyll, prompt]
lang: he
---

## דרישות קדם - חיבור ל-GitHub CLI

<details open markdown="1"><summary>הוראות התקנה</summary>

**פותחים cmd ומתקינים:**

```powershell
winget install --id GitHub.cli -e
```

**מתחברים:**

```powershell
gh auth login
```

![alt text](/assets/img/agentic/ghcli.png)

```powershell
git config --global --list
```

**אם לא מוגדר לכם עדיין מייל לגיט הוסיפו באופן הבא (עם השם והמייל שלכם):**

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

עכשיו אפשר לעבוד עם Git מקומי ו־GitHub מה־CLI. לא פחות חשוב: **גם לאייג'נט יותר קל לעבוד. עם `gh` מותקן ומאומת.*- סוכנים כמו Claude Code ו-Codex יכולים לבדוק סטטוס של CI, ולתשאל issues/PRs ישירות מה-shell - בלי שתצטרך להעביר להם טוקן API בתוך ה-prompt. זה בעצם מרחיב להם את היכולות מעבר ל-git הבסיסי (commit/push/clone) לכל מה שדורש את ה-API של GitHub. שווה לבדוק שה-scopes שנבחרו ב-`gh auth login` מספיקים למה שתרצה שהסוכן יעשה.

</details>

## agent settings, and github share.

- צרו תיקיה לפרוייקט במקום שנראה לכם. שימו לב שפתיחת תיקייה מתוך Codex Desktop תיצור תיקייה תחת document שעלול להיות חלק מ-OneDrive. זה לא מצב מוצלח לפרוייקט גדול
- נעביר את האייג'נט ל-Full Access
- נאתחל פרוייקט על ידי `/init` **ואז**
- נשלח פרומפט איתחול לקודקס

{: .box-note}
publish on github as **public**


![alt text](/assets/img/agentic/imageAgentSettigns.png)



##  פרומפט בניית האתר

זהו פרומפט - one-shot ליצירת אתר מארקדאון חי וזמין לתלמידים. הפרומפט הבא מניח שכבר הרצנו `/init`, וכבר פרסמנו את התיקייה כ-repo ציבורי ב-GitHub.

<div markdown="1" class="english box-note">

```markdown
Create and publish a small, maintainable Hebrew educational website using Jekyll and GitHub Pages.

The objective is not merely to produce a page. Complete a clean content repository and publishing harness that a teacher can continue extending through Markdown, with rendering handled by the actual GitHub Pages site.

## Hard non-goals

Do **not*- try to make this project run locally through WSL, Ruby, Bundler or `bundle exec jekyll serve`.

Specifically:

- do not initialize or manage the workshop repository from WSL;
- do not run `wsl`, `bundle`, `jekyll`, `ruby`, `gem` or `bundle exec jekyll serve`;
- do not install Ruby, Bundler, Jekyll or Linux packages;
- do not require a local preview server as part of the definition of done;
- do not spend time fixing local WSL, filesystem, VS Code or Ruby environment problems.

Reason: in a short teacher workshop, WSL Git permissions and local Ruby/Jekyll setup are too risky. The reliable path is: Windows folder -> GitHub repository -> GitHub Actions -> deployed GitHub Pages site.

If you mention local preview in documentation, present it only as an optional advanced path for users who already have Ruby and Bundler working. It must not be required for this workshop prompt.

## Architecture

Create a minimal Jekyll content repository.

Use this pinned remote theme:

```yaml
remote_theme: just-the-docs/just-the-docs@v0.12.0
```

Do not:

- fork the theme;
- clone the complete theme;
- copy all theme layouts or assets into this repository;
- depend on the theme's `main` branch;
- add unrelated frameworks or JavaScript libraries.

The repository should contain only the educational content, configuration, small local customizations, documentation and deployment harness.

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

- `_config.yml`
- `index.md`
- `about.md`
- the example lesson pages
- the minimal custom Sass/CSS required for RTL
- `.gitignore`
- `README.md`
- `AGENTS.md`
- `THIRD_PARTY_NOTICES.md`
- an official-style GitHub Actions workflow under `.github/workflows/` that builds and deploys the Jekyll site to GitHub Pages

`AGENTS.md` should explain:

- where pages and lessons belong;
- the required front matter;
- that the site is primarily Hebrew and RTL;
- that code and technical tokens remain LTR;
- that theme source files must not be copied unnecessarily;
- that no private student or school data may be committed;
- that every meaningful change must leave the GitHub Pages build passing;
- that local WSL/Bundler/Jekyll serving is not part of this workshop repository's required workflow.
- that after this initial setup, future agents can read the repo but must not commit, pull or push unless explicitly asked.

`README.md` should explain:

- how to add a new Markdown lesson;
- how navigation is controlled;
- how GitHub Actions deployment works;
- where to inspect a failed deployment;
- how to change the pinned theme version deliberately;
- that public visibility does not automatically define a reuse license for the teacher's original content;
- that local preview with Ruby/Bundler is optional only for advanced users who already have that environment working, and is not required for the workshop.

`THIRD_PARTY_NOTICES.md` must identify Just the Docs, its repository, the pinned version and its MIT license. Do not claim that the teacher's original content is MIT-licensed.

## GitHub and deployment

1. Run `gh auth status`.
2. Inspect `git status` and the configured `origin` remote.
3. Confirm that the GitHub repository is public.
4. Review all generated files before committing.
5. Commit the site setup with a clear commit message.
6. Push `main`.
7. Configure GitHub Pages to use the custom Actions workflow. You may use the GitHub API through `gh api`.
8. Trigger or observe the deployment workflow.
9. Inspect the workflow result. If it fails, diagnose and fix the repository rather than merely describing the failure.
10. Retrieve the final Pages URL from GitHub when available.

If Pages was already configured and the API returns a conflict, inspect the existing configuration and continue safely.

## Verification

Before finishing:

- inspect the repository tree;
- inspect `git status`;
- confirm that no secrets or private data were added;
- verify that the theme is pinned;
- verify that the site builds successfully in GitHub Actions;
- inspect the deployed home page when tooling permits;
- confirm that internal links use the correct GitHub project-site base path;
- report the repository URL, Pages URL, deployment status and any remaining manual step.

Do not stop after merely generating files. The task is complete only when the repository has been pushed and the deployment result has been checked on GitHub.
```
</div>
