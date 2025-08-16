---
title: "Leaf Bullets — Approach A (.leafify per list)"
layout: page
tags: [הגדרת בוטלטים כעלים, svg, bullets design markdown]
lang: en
---


<style>
body {
  direction: ltr !important;
  text-align: left !important;
}
</style>

Use this page to **test the per-list approach** that keeps your Markdown clean and avoids HTML `<ul class="…">` wrappers. The idea: add a one-line Kramdown attribute (`{: .leafify}`) before a list to opt-in.

## 1) Put the SVG in your assets

{: .leafify}
- Place your bullet icon at:  
  **`/assets/img/simple_leaf_half.svg`**
- If your repo builds with a `baseurl` (e.g., GitHub Pages project site), we'll use Liquid's `relative_url` filter so paths resolve correctly.

## 2) Create/Update your stylesheet

Create (or open) **`/assets/css/custom-styles.css`** and add:

```css
.leafify {
    list-style: none;
    padding-left: 0;
    padding-right: 0 ;
    padding-inline-start: 1.4em;
}

.leafify>li {
    position: relative;
    padding-inline-start: 1.4em;
    /* replaces padding-left for LTR, padding-right for RTL */
}

.leafify>li::before {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    top: .25em;
    width: 1em;
    height: 1em;
    background: no-repeat center/contain;
    background-image: url('/assets/img/simple_leaf_half.svg');
}
```

## 3) Ensure the stylesheet is loaded

{: .leafify}
- In your main layout (e.g., `_layouts/default.html` or a shared head include), add **one** of these:
    ```html
    <link rel="stylesheet" href="{{ '/assets/css/custom-styles.css' | relative_url }}">
    ```
- If you already have a bundle pipeline, just ensure `custom-styles.css` is included.

## 4) Use it in pure Markdown (no HTML)


{: .leafify}
- Add `/assets/img/simple_leaf_half.svg`
- Add rules to `/assets/css/custom-styles.css`
- Link the stylesheet in your layout
- Opt-in per list using `{: .leafify}`


Another example list (also opt-in):

{: .leafify}
- Works in posts and pages
- Safe with Kramdown/GitHub Pages
- No `<ul class="…">` needed


## 5) Troubleshooting

{: .leafify}
- **404 on the SVG** → path is wrong; check DevTools → Network for `/assets/img/simple_leaf_half.svg` (status **200** expected).
- **Icon too small/misaligned** → tweak `width/height/top` in the CSS.
- **Self-host, not Jekyll** → replace Liquid path with `/assets/img/simple_leaf_half.svg` (absolute URL from web root).
- **Some lists untouched** → you probably forgot `{: .leafify}` on those lists.
