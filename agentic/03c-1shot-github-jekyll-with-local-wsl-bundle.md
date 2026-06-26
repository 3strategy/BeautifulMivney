---
layout: page
title: "03c One-shot GitHub Jekyll With Local WSL Bundle"
subtitle: "GitHub Pages plus a working local WSL Jekyll server"
tags: [agentic, github-pages, jekyll, wsl, prompt]
lang: en
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

You are working in an empty folder that should become a full local-and-remote Jekyll teaching repository. Create and publish a small, maintainable Hebrew educational website using Jekyll and GitHub Pages.

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

* Git is installed.
* GitHub CLI (`gh`) is installed.
* The user should already be authenticated with GitHub.
* WSL Ubuntu is available and suitable for Ruby/Bundler/Jekyll work.
* Ruby and Bundler may already be installed. If they are missing, install the smallest reasonable WSL-local dependencies needed to make the Jekyll harness work.
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
* that every meaningful change must leave both the local build and the GitHub Pages build passing.

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
* run `bundle exec jekyll build` successfully in WSL;
* start `bundle exec jekyll serve --port 4000` successfully in WSL, or use another explicit port if needed;
* inspect the local home page when tooling permits;
* verify that the site builds successfully in GitHub Actions;
* inspect the deployed home page when tooling permits;
* confirm that internal links work locally and on the GitHub project-site base path;
* report the repository URL, local server URL, Pages URL, deployment status and any remaining manual step.

Do not stop after merely generating files. The task is complete only when the local WSL server has been proven to run and the GitHub Pages deployment result has been checked.
