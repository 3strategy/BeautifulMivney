---
layout: page
title: "Diff Document Rules (Kramdown)"
subtitle: "General prompt for commit-based tutorials"
tags: [Diff, Git, Kramdown, Tutorial, Markdown]
lang: he
---

## Quick usage

To apply these rules, provide:

- Local repo path: `<PATH_TO_GIT>`
- Start commit: `<START_COMMIT>`
- Target commit: `<TARGET_COMMIT>`

## Front Matter rules

The generated document must start with Front Matter (YAML) and include:

- `layout: page`
- `title: "..."` (Hebrew title)
- `subtitle: "..."` (Hebrew subtitle)
- `tags: [...]`
- `lang: he`

Short example:

```
---
layout: page
title: "כותרת בעברית"
subtitle: "תת־כותרת בעברית"
tags: [Diff, Steps, Git]
lang: he
---
```

## General prompt (use as-is)

```
You are writing a step-by-step tutorial for a learning project that is different from the project you are diffing.
The learning project is the context, and the diff itself comes from another repo.

Input you will receive:
- Local repo path to analyze the diff: <PATH_TO_GIT>
- Start commit: <START_COMMIT>
- Target commit: <TARGET_COMMIT>

Mandatory rules:
1) Write the document in Hebrew using Kramdown.
2) Every document must start with Front Matter (YAML) including:
   layout: page, title, subtitle, tags, lang: he.
3) In every diff block, '+' and '-' must be in the first column so Rouge recognizes them. Even if the line is part of an indented the  + - must be "unindented" and absolutely be at the first column.
4) When lines are marked with '+' or '-', do not use mark_lines. mark_lines is allowed only for other lines without '+'/'-'.
5) Build two-column blocks (Left = after, Right = before) and show only relevant snippets.
6) If parts were auto-generated (e.g., created via UI), do not show full diffs — just note the files to add.
7) Do not dump entire files; show only essential excerpts with brief explanations.

Two-column block structure (use this exact HTML/Kramdown wrapper. Note the unorthodox placement of note '+'/'-' in the first column, for Rouge diff detection):

<div class="two-columns">

<div markdown="1" class="column">

    {% highlight diff %}
    <menu xmlns:android="http://schemas.android.com/apk/res/android">
+       <item android:id="@+id/nav_home" />
    </menu>
    {% endhighlight %}

</div>
<div markdown="1" class="column">

    {% highlight diff %}
    <menu xmlns:android="http://schemas.android.com/apk/res/android">
-       <item android:id="@+id/nav_main" />
    </menu>
    {% endhighlight %}

</div>
</div>


The output should be **a structured tutorial document** with ## and ### headings, brief explanations, and diff blocks for each changed file.
```
