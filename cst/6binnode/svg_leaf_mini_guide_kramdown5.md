---
title: "Leaf Bullets — Approach B (style all content lists)"
layout: default
---

Use this page to **test the global approach** that automatically styles *all* Markdown `<ul>` lists inside your content container (no per-list markers). You can still opt-out per list when needed.

## 1) Put the SVG in your assets

- Place your bullet icon at:  
  **`/assets/img/simple_leaf_half.svg`**

## 2) Create/Update your stylesheet

Create (or open) **`/assets/css/custom-styles.css`** and add the **container-scoped** rules. Pick the selector that matches your theme's content wrapper. The combined selector below covers common cases—trim it if you prefer narrower scope.

```css
/* --- Leaf bullets: global styling within content area --- */
main ul, article ul, .markdown-body ul, .post-content ul{
  list-style: none; padding-left: 0;
}
main ul > li, article ul > li, .markdown-body ul > li, .post-content ul > li{
  position: relative; padding-left: 1.4em;
}
main ul > li::before, article ul > li::before,
.markdown-body ul > li::before, .post-content ul > li::before{
  content: "";
  position: absolute; left: 0; top: .25em;
  width: 1em; height: 1em;
  background: no-repeat center/contain;
  /* Jekyll-friendly path (works with baseurl) */
  background-image: url('{{ "/assets/img/simple_leaf_half.svg" | relative_url }}');
}

/* Optional: per-list opt-out
.no-leaves{ list-style: disc; padding-left: 1.25em; }
.no-leaves > li{ position: static; padding-left: 0; }
.no-leaves > li::before{ content: none; }
*/
```

> Tip: If your theme wraps Markdown inside a different class (e.g., `.content`, `.page-content`), replace or add it in the selectors above.

## 3) Ensure the stylesheet is loaded

In your main layout (e.g., `_layouts/default.html` or a shared head include), add:

```html
<link rel="stylesheet" href="{{ '/assets/css/custom-styles.css' | relative_url }}">
```

## 4) Use it in pure Markdown (no HTML)

All lists in the content container will automatically get leaf bullets:


- Add the SVG under `/assets/img/`
- Add the CSS to `/assets/css/custom-styles.css`
- Link the stylesheet in your layout
- Enjoy automatic leaf bullets in regular lists


### Opt-out for a particular list (still pure Markdown)

```md
{: .no-leaves}
- This list uses the default bullets again
- Because we opted out with `.no-leaves`
```
⟶result:

{: .no-leaves}
- This list uses the default bullets again
- Because we opted out with `.no-leaves`

## 5) Troubleshooting

- **Too aggressive (navs/sidebars affected)** → narrow the selector (e.g., only `article ul`).
- **SVG not showing** → check the path resolves; look for a **200** Network status for `/assets/img/simple_leaf_half.svg`.
- **Spacing off** → adjust `top`, `width`, `height`, or `padding-left`.
- **Not using Jekyll** → replace Liquid path with `/assets/img/simple_leaf_half.svg`.
