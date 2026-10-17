# Shareable menu links

Add `?menu=<menu-id>` to any page URL to open it with that menu selected.
If the URL already has a query string, append `&menu=<menu-id>` before its fragment.

- Agentic course: `https://מבני.שלי.com/agentic/00-opener?menu=agentic`
- Yesodot Taba: `https://יסודות.שלי.com/?menu=taba`
- A lesson anchor: `/agentic/01-online-vs-agentic?menu=agentic#section`

A valid URL choice overrides the visitor's saved `menu-set` cookie and becomes
that site's remembered choice. Normal internal navigation keeps the menu via
the cookie. Each page puts its selected menu in the address bar, so copying the
address also shares the menu. Choosing another menu updates the address without
reloading or adding history entries. Other query parameters, fragments, and
history state are preserved. Back/forward restores the menu specified by the URL.

Missing, empty, and unknown menu values use the saved preference, then the site's
default if that preference is invalid. IDs are case-sensitive. Menu links do not
change the lesson language preference (`lang` is independent). Browser cookie
restrictions can prevent remembering a choice on subsequent unparameterized links;
an explicit menu URL still selects its requested menu.

Menu IDs come from each site's `_config.yml`:

- BeautifulMivney: `data-structures`, `oop`, `android`, `modelim`, `agentic`.
- BeautifulYesodot: `part-a`, `part-a-ru`, `part-b`, `part-c`, `taba`.

Keep the menu URL behavior in `assets/js/custom-script.js` and its browser suite
aligned between the two repositories. Preserve their existing validation sources:
Mivney discovers populated menus, while Yesodot reads `data-menu-set-ids` to allow
intentionally empty named menus. Yesodot's `expandAllDetails()` stays independent.

After building with `bundle exec jekyll build`, run:

```sh
npx playwright test tests/menu-deep-links.spec.js --workers=4 --reporter=line
```
