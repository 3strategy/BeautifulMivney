You are working in an empty folder. Create and publish a small, maintainable Hebrew educational website using Jekyll and GitHub Pages.

The objective is not merely to produce a page. Create a clean repository and publishing harness that a teacher can continue extending through Markdown.

## Environment

* Git is installed.
* GitHub CLI (`gh`) is installed.
* The user should already be authenticated with GitHub.
* The repository name should be: `<REPOSITORY_NAME>`
* Create the repository under the currently authenticated GitHub account.
* The GitHub repository must be public because it will be hosted using GitHub Pages.
* Do not install Ruby globally unless it is genuinely required.
* Prefer building and deploying through GitHub Actions.

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

* `_config.yml`
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
* that every meaningful change must leave the Pages build passing.

`README.md` should explain:

* how to add a new Markdown lesson;
* how navigation is controlled;
* how to preview locally if Ruby and Bundler are available;
* how GitHub Actions deployment works;
* where to inspect a failed deployment;
* how to change the pinned theme version deliberately;
* that public visibility does not automatically define a reuse license for the teacher's original content.

`THIRD_PARTY_NOTICES.md` must identify Just the Docs, its repository, the pinned version and its MIT license. Do not claim that the teacher's original content is MIT-licensed.

## GitHub and deployment

1. Run `gh auth status`.
2. Initialize Git with `main` as the default branch.
3. Review all generated files before committing.
4. Commit with a clear initial commit message.
5. Create a new public GitHub repository using `gh repo create`.
6. Push `main`.
7. Configure GitHub Pages to use the custom Actions workflow. You may use the GitHub API through `gh api`.
8. Trigger or observe the deployment workflow.
9. Inspect the workflow result. If it fails, diagnose and fix the repository rather than merely describing the failure.
10. Retrieve the final Pages URL from GitHub when available.

If Pages was already configured and the API returns a conflict, inspect the existing configuration and continue safely.

## Verification

Before finishing:

* inspect the repository tree;
* inspect `git status`;
* confirm that no secrets or private data were added;
* verify that the theme is pinned;
* verify that the site builds successfully in GitHub Actions;
* inspect the deployed home page when tooling permits;
* confirm that internal links use the correct GitHub project-site base path;
* report the repository URL, Pages URL, deployment status and any remaining manual step.

Do not stop after merely generating files. The task is complete only when the repository has been pushed and the deployment result has been checked.
