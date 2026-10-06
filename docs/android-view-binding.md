# Shared View Binding section

The reusable lesson section lives in `_includes/android/view-binding.md`.
Edit that file to update every tutorial that embeds it.

Place this call on its own line, outside a code fence, with blank lines around it:

```liquid
{% include android/view-binding.md namespace="com.example.hex" %}
```

Set `namespace` to the consuming project's Gradle namespace. For example:

```liquid
{% include android/view-binding.md namespace="com.example.tictacmenu" %}
```

The include contains the complete `<details open markdown="1">` section.
Jekyll renders it within the page; no iframe or separate asset fetch is needed.
Its image URLs use `relative_url`, so they work in local previews and on the live site.

Use it for a Java Empty Views Activity with `build.gradle.kts`, `MainActivity`,
`activity_main.xml`, and a root view whose ID is `main`. The excerpt assumes the
template's EdgeToEdge and window-insets listener. Other Activity/layout names or
template structures need a different example.

Set `full-width: true` in the consuming page's front matter for the side-by-side
`code_diff` comparison.
