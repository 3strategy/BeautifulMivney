# Touch navigation for lesson sequences

The shared `assets/js/sequence-navigation.js` is loaded by the footer and activates
only when `main` contains tagged links. Enabled sequences are the numbered
`modelim` lessons, TicTacMenu 013–020 (including lettered steps), and CollectCircles.
The `modelim` course map and historical submissions remain outside its sequence.

## Android routes

TicTacMenu follows 013 → 014a → 014b → 015a → 015b → 016 → 017 →
018a → 018b → standard 018c → 018d → 019a → 019b → 019c → 020.
The Hebrew/View Binding variant of 018c also supports previous/next, returning
to 018b or continuing to 018d. Optional shortcut links remain ordinary links.
013 is the swipe boundary; its existing manual link to 012 remains available.

CollectCircles follows 1 → 2 → 3 → 4 → 5 → 6 → 8 → 9 → 10 → 11 → 12 →
13 → 14 → 15 → 16 → 17 → 18. The student route skips teacher cloud setup (7),
and the full route through 15–18 is the default after 14. Chapter 4 now has a
back-link to 3; chapter 5's back-link goes to 4 so the main route is reciprocal.

Side pages retain their existing choices: 1a goes back to 1 or forward to 2;
the 5–7 roadmap goes back to 3 or forward to 5; chapter 7 goes back to 6 or
forward to the 8–18 roadmap; that roadmap goes back to 6 or forward to 8.
15b goes back to 14 and is an ending, with no next swipe. Return swipes from
the main route follow that route, not the previously visited side page.
The teacher/development plan is not enabled.

## Tagging links

Tag existing Markdown links using Kramdown attributes:

```liquid
[הקודם]({{ '/course/previous-lesson' | relative_url }}){: data-sequence-nav="prev"}
[הבא]({{ '/course/next-lesson' | relative_url }}){: data-sequence-nav="next"}
```

Plain HTML works too: `<a href="/course/next-lesson" data-sequence-nav="next">הבא</a>`.
The first link of each kind within `main` supplies the destination. Top and bottom
navigation may repeat those tags, but must agree. Omit the unavailable link at a
sequence boundary; there is no wraparound or inferred destination. Ordinary links
remain usable without JavaScript and with a keyboard or screen reader.

Moving a finger **right goes next**, **left goes previous**, independent of the
document direction. This is the Hebrew course convention; a future LTR course
may need an explicit direction option before adopting it.

A swipe starts within lesson content, at least 28 CSS pixels from either screen
edge. It must be predominantly horizontal (1.8 times its vertical travel), cover
70–120 CSS pixels depending on viewport width, and finish within 900 ms. Navigation
happens on release. Early vertical/diagonal movement, cancellation, multiple
fingers, selected text, and pinch-zoomed viewports cancel recognition. Browser/OS
edge gestures are left alone.

Links, controls, editable content, media, canvases, embedded documents, and
horizontally scrollable elements retain their gestures. Add `data-swipe-ignore`
to any other widget or container that should own its touch interaction. Only
same-origin HTTP(S) destinations in the same tab are supported.

The touchmove listener is explicitly non-passive and prevents the default action
only after recognizing a horizontal gesture toward an available destination;
vertical scrolling remains native. See the
[MDN touch events guidance](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events).

## Verification

Build Jekyll first, then run from the repository root:

```sh
node node_modules/@playwright/test/cli.js test tests/sequence-navigation.spec.js --fully-parallel --workers=4
```

The suite serves `_site` itself and uses Chromium's native touch injection in a
390×844 mobile viewport. It checks all 14 lessons' rendered link destinations,
navigation, browser history return, ordinary link clicks, boundaries, untagged
pages, scrolling, controls, text selection, cancelled gestures, and zoom. It
requires Playwright's Chromium browser. External resources are blocked so the
gesture checks do not depend on third-party CDNs.

For deployment acceptance, open lesson 02 on Android Chrome and iPhone Safari.
Swipe right over a paragraph to reach 03, then left to return to 02. Also check
normal vertical reading, wide tables, diagram interactions, pinch zoom, browser
Back, and the first/last lessons. Start within the page, away from screen edges.
Desktop emulation cannot fully reproduce phone OS gestures or Safari behavior.

BeautifulYesodot now uses the identical shared script and enables its own Taba
student sequence. Keep gesture fixes aligned across both repositories and run
both browser suites; course link targets and sequence fixtures remain site-local.
