# Course verification

This directory is excluded from Jekyll publication by its leading underscore.
It checks the new numbered lessons without changing the historical submissions.

## Mathematical checks

From the repository root, run:

```sh
python modelim/_checks/check_models.py
```

Python 3.8 or newer is sufficient; no packages are required. The script reads the
transition tables and Mermaid diagrams from the lessons themselves. It compares
them with independent language predicates, rather than with copied expected
transition tables. The current suite covers 180,605 bounded DFA/NFA/PDA inputs,
511 bit-inversion inputs, unary remainder inputs 0–80, and parity-dependent unary
computation inputs 2–80. It checks the output delimiters, contiguity, head positions
where specified, and termination within a generous execution bound.

Table selection uses each lesson's table order. If tables are added or reordered,
update the selectors and inspect their source before relying on the result.
Bounded tests do not prove unbounded correctness or termination; the state/stack
invariants and mathematical arguments are part of the lessons.

## Browser checks

Build and serve the site with the repository's Ruby environment, then run:

```sh
node modelim/_checks/check_render.cjs
```

The default server is `http://127.0.0.1:4001`. Set `COURSE_URL` to use a different
server. The script needs Playwright and its Chromium browser; `PLAYWRIGHT_MODULE`
can point to a bundled Playwright installation. Set `QA_OUTPUT` to an external
scratch directory to save screenshots and `render-results.json`.

The browser check covers all 15 pages at desktop and mobile widths, source and
lesson links, opening note/success/warning boxes, expandable solutions, MathJax
errors and unrendered delimiters, Mermaid rendering and label scale, symbolic
table direction, and unwanted page-level horizontal overflow. Wide diagrams and
tables intentionally scroll inside their own containers.

The implementation was verified with a successful Jekyll build and all 30
page/viewport combinations passing. Screenshots were also inspected for layout,
callout presentation and readable diagram labels.
