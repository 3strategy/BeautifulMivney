# Lesson sequence navigation

The shared `assets/js/sequence-navigation.js` is loaded by the footer and activates
only when `main` contains tagged links. Enabled sequences are the numbered
`modelim` lessons, TicTacMenu 011–021b (including lettered steps), CollectCircles, Connect4, the two Android opening lessons, and Hex 01–09.
The `modelim` course map and historical submissions remain outside its sequence.

The Data Structures sequence follows the numbered menu from recursion (1),
complexity (2), and linked lists (3) to queues (4), stacks (5), and binary
trees (6), then ends at the data structures Bagrut question index.

## Android routes

TicTacMenu follows 011 → 012 → 013 → 014a → 014b → 015a → 015b → 016 → 017 →
018a → 018b → standard 018c → 018d → 019a → 019b → 019c → 020 → 021a → 021b.
The Hebrew/View Binding variant of 018c also supports previous/next, returning
to 018b or continuing to 018d. Optional shortcut links remain ordinary links.
The core route begins at 011 and ends at 021b. The shortcut from 021a to 019c and
the follow-up project links from 021b are ordinary links.

CollectCircles follows 1 → 2 → 3 → 4 → 5 → 6 → 8 → 9 → 10 → 11 → 12 →
13 → 14 → 15b. The student route skips teacher cloud setup (7), and the short
route ends at 15b after introducing periodic notifications and Brag. From 14,
students can also choose the optional long sequence 15 → 16 → 17 → 18. Chapter
4 now has a back-link to 3; chapter 5's back-link goes to 4 so the main route is
reciprocal.

Side pages retain their existing choices: 1a goes back to 1 or forward to 2;
the 5–7 roadmap goes back to 3 or forward to 5; chapter 7 goes back to 6 or
forward to the 8–18 roadmap; that roadmap goes back to 6 or forward to 8.
15b goes back to 14 and is an ending, with no next swipe. The optional long
sequence is still swipeable when a student chooses chapter 15. Return swipes
from the main route follow that route, not the previously visited side page.
The teacher/development plan is not enabled.


The published Hex route (`/android/hex5/`) follows 01 → 02 → 03 → 04 → 05 →
06 → 07 → 08 → 09. Its map link is ordinary navigation.

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

On BeautifulMivney, the title in the top bar uses these same links. Once the
page heading scrolls out of view, a left arrow opens the next lesson and a
right arrow opens the previous lesson. The bar shows an arrow only when its
destination is available. Translated lessons use the links in the displayed
version.

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

BeautifulYesodot uses the same gesture handling for its Taba student sequence.
Keep gesture fixes aligned across both repositories and run
both browser suites; course link targets and sequence fixtures remain site-local.
