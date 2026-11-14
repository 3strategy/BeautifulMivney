# Shareable menu links

Add `?menu=<menu-id>` to any page URL to open it with that menu selected.
If the URL already has a query string, append `&menu=<menu-id>` before its fragment.

- Agentic course: `https://מבני.שלי.com/agentic/00-opener?menu=agentic`
- Yesodot Taba: `https://יסודות.שלי.com/?menu=taba`
- A lesson anchor: `/agentic/01-online-vs-agentic?menu=agentic#section`

On untagged pages, a valid URL choice overrides the visitor's saved `menu-set` cookie and becomes
that site's remembered choice. Normal internal navigation keeps the menu via
the cookie on untagged pages. Each page puts its selected menu in the address
bar, so copying the address also shares the menu. On Mivney, the selector next
to the site logo shows the current course and opens links to all five course
pages. Other query parameters, fragments, and history state are preserved when
the current page synchronizes its URL. Back/forward
restores the menu specified by the URL on untagged pages.

Missing, empty, and unknown menu values use the saved preference, then the site's
default if that preference is invalid. IDs are case-sensitive. Menu links do not
change the lesson language preference (`lang` is independent). Browser cookie
restrictions can prevent remembering a choice on subsequent unparameterized links;
an explicit menu URL still selects its requested menu.

Menu IDs come from each site's `_config.yml`:

- BeautifulMivney: `data-structures`, `oop`, `android`, `modelim`, `agentic`.
- BeautifulYesodot: `part-a`, `part-a-ru`, `part-b`, `part-c`, `taba`.

Keep the menu URL behavior in `assets/js/custom-script.js` aligned between the
two repositories. Preserve their existing validation sources:
Mivney discovers populated menus, while Yesodot reads `data-menu-set-ids` to allow
intentionally empty named menus. Yesodot's `expandAllDetails()` stays independent.

After building with `bundle exec jekyll build`, run:

```sh
npx playwright test tests/menu-deep-links.spec.js --workers=4 --reporter=line
```

## Select a menu whenever a page opens

Add a configured menu ID to the page's YAML front matter:

```yaml
menu_set: android
```

On Yesodot, use its own IDs, such as `menu_set: taba`. The setting works for
pages and posts. `menu_set` is the only supported page tag for this feature.

A valid page tag takes precedence over the incoming `?menu=` parameter, then
the saved cookie, then the site's default. It selects and remembers that menu
on every arrival, whether through search, a navbar link, a bookmark, or a direct
URL. Other query parameters and fragments are preserved. Unknown page tags
fall back to the usual URL and cookie selection.

Mivney also sets `menu_set` by course directory in `_config.yml`, so older lessons
and direct links use the right chapter menu. Shared pages such as פתיחת שנה keep
the visitor's selection. An explicit `menu_set` in front matter overrides the
directory default.

The site's search results also include the tagged menu in their links. For
example, `android/topics-index.md` (tagged with `menu_set: android`)
appears as **מפת נושאים באנדרואיד** with search URL
`/android/topics-index/?menu=android`. Yesodot's `taba/00-student-roadmap.md`
uses `menu_set: taba`.

The page tag does not control which URL external search engines display, but
opening their result selects the page's menu just like any other visit.
