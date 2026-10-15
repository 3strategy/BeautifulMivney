# Lesson translations and student language preference

The navigation language selector saves a student's preference in this browser
(`localStorage`, key `lesson-language-preference`). It works on all pages, even
when the current lesson has no translation. The site does not infer a preference
from the browser or require an account. With no saved choice, the requested URL
is displayed as usual.

On later visits to a translated lesson, the site selects only versions that
actually exist:

| Preference | Ordered fallback |
|:---|:---|
| Русский | Russian, English, Hebrew |
| English | English, Hebrew |
| עברית | Hebrew |

If none of those versions exists, the requested page remains visible. If a
preferred translation is missing, the lesson translation bar explains the
fallback. Pages with no translation group remain readable in their original
language. The saved preference still applies when visiting the next lesson.

## Adding a translation

Keep the source lesson at its existing address. Put the translated Markdown in
a language subdirectory, as with CollectCircles' English edition:

```yaml
---
layout: page
title: "Наследование — урок 1"
lang: ru
language: ru
translation_of: /oop/01inheritance
---
```

`translation_of` is the source lesson's URL, without the site's domain or
`baseurl`. A trailing slash is optional. Existing source pages need no additional
metadata. English translations use `lang: en`. The shared layout sets the HTML
language and makes Russian and English lesson content left to right. Shared
code and diagram includes can be reused across editions; translated prose stays
in its own Markdown file. The first OOP lessons already share
`_includes/oop/01inheritance-example-1.md` (and examples 2–3) and
`_includes/oop/02Polymorphism-example-1.md`: both the canonical Hebrew page and
its Russian edition include the same C# examples and Mermaid diagrams. Change
those includes once when correcting an example, so editions cannot drift. Keep
the surrounding explanation translated in the lesson files.

`_plugins/lesson_translations.rb` groups existing pages at build time. Missing
source pages and duplicate language editions fail the build rather than
producing broken fallback links. All existing CollectCircles `en/` pages are
registered automatically by their established directory convention. Their
canonical sources are the Hebrew fallback, including legacy mixed-language
source chapters whose old `lang` metadata said `en`.

The shared page layout displays available editions and `hreflang` alternate
links. There is no manually maintained list of translations and no network
probing for nonexistent files. Preference routing uses a small page-specific
map, respects Jekyll's `baseurl`, and retains query parameters and anchors.

## Direct access and graceful fallback

An explicit URL such as `/oop/01inheritance/?lang=he` overrides the saved
preference **for that page only**. Available-edition links include this parameter,
so a student can inspect the source without losing their Russian preference.
The selector saves a new preference and clears a one-page override. This also
prevents preference routing from making a translation inaccessible.

If browser storage is blocked, explicit edition links still work; a selector
change uses `?lang=` for the current navigation. With JavaScript disabled,
original and translated URLs and edition links remain usable; automatic
selection is unavailable.

## Verification

```powershell
node --test tests/language-preference.test.js
wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulMivney && bundle exec jekyll build"
```

The focused JavaScript tests cover preference and override selection, all
fallbacks, blocked/invalid storage, stable redirect destinations, persistence,
and preservation of query parameters and anchors. After adding an edition,
check its rendered translation bar and `lesson-language-data` map, and inspect
the reading direction in a browser.
