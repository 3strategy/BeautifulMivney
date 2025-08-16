---
layout: page
title: "ציור עלים"
subtitle: "מושגים שונים והבהרות "
tags: [ציור עלים, svg]
lang: en
---

# SVG Leaf Mini‑Guide
<style>
html {
  direction: ltr !important;
}
body {
  text-align: left !important;
}
.leaf-bullet {
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  margin-left: -2px;
  width: 16px;
  height: 16px;
}
</style>

*A tiny, kid‑friendly intro using our leaf as the example.*

## 1) The stage: `viewBox="0 0 40 40"`

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">Think of a **40×40** square grid.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**(0,0)** is the **top‑left**.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**x** grows to the **right**, **y** grows **down**.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Mid‑top** point is **(20,0)** (great for connecting stems in a tree diagram).

```
(0,0)        x→
  ┌──────────────────────┐
  │                      │
  │                      │  y↓
  │                      │
  └──────────────────────┘ (40,40)
```

---

## 2) Three path commands you need

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**M x y** → **Move to** (no drawing yet)

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**V y** → **Vertical line to** this y (keep the same x)

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**C x1 y1, x2 y2, x y** → **Cubic curve**: draw from current point to (x,y), pulled by two control handles at (x1,y1) and (x2,y2)

> <img src="simple_leaf_svg.svg" class="leaf-bullet" alt="">Memory trick: **C** has **two** control points.

---

## 3) A minimal, copy‑paste leaf (spade/heart top)

This one keeps it simple: a short top‑center stem, a heart‑like leaf using cubic curves, and a midrib.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <linearGradient id="gB" x1="0" y1="2.6" x2="0" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#9bd989"/>
      <stop offset="1" stop-color="#2c6f3d"/>
    </linearGradient>
  </defs>

  <!-- short connector stem -->
  <path d="M20 0V4" stroke="#2c6f3d" stroke-width="1.6" stroke-linecap="round" fill="none"/>

  <!-- wider, cordate top (pronounced notch) -->
  <path d="M19.7 6
           C17.0 0, 13.8 0.5, 9.5 3.4
           C2.0 7, 0.0 13.2, 3.6 20.2
           C7.0 29.2, 14.5 35.0, 22 40
           C25.5 35.0, 33.0 29.2, 35.4 21
           C38.0 13.2, 34.0 7.4, 28.2 3.4
           C25.2 1.4, 22.0 1.2, 20 3.6 Z"
        fill="url(#gB)" stroke="#1e5631" stroke-width="0.7" stroke-linejoin="round"/>

  <!-- midrib + veins -->
  <path d="M20 2.6
           C19 10, 19 25, 22 40
           M18.0 7.6  C13.8 9.6, 11.0 12.8, 10.0 16.4
           M22.2 11.2 C26.6 13.2, 29.6 16.2, 30.4 19.8"
        fill="none" stroke="#1e5631" stroke-width="0.8" stroke-linecap="round"/>
</svg>
```

> <img src="simple_leaf_svg.svg" class="leaf-bullet" alt="">Copy‑paste safe: no comments **inside** the `d` attribute.

### 3b) Same leaf in a 20×20 viewBox (all coordinates halved)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
  <defs>
    <linearGradient id="gB" x1="0" y1="1.3" x2="0" y2="19" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#9bd989"/>
      <stop offset="1" stop-color="#2c6f3d"/>
    </linearGradient>
  </defs>

  <!-- short connector stem -->
  <path d="M10 0V2" stroke="#2c6f3d" stroke-width="1.6" stroke-linecap="round" fill="none"/>

  <!-- leaf body (all numbers halved) -->
  <path d="M9.85 3
           C8.5 0, 6.9 0.25, 4.75 1.7
           C1.0 3.5, 0.0 6.6, 1.8 10.1
           C3.5 14.6, 7.25 17.5, 11 20
           C12.75 17.5, 16.5 14.6, 17.7 10.5
           C19.0 6.6, 17.0 3.7, 14.1 1.7
           C12.6 0.7, 11.0 0.6, 10 1.8 Z"
        fill="url(#gB)" stroke="#1e5631" stroke-width="0.7" stroke-linejoin="round"/>

  <!-- midrib + veins (halved) -->
  <path d="M10 1.3
           C9.5 5, 9.5 12.5, 11 20
           M9.0 3.8  C6.9 4.8, 5.5 6.4, 5.0 8.2
           M11.1 5.6 C13.3 6.6, 14.8 8.1, 15.2 9.9"
        fill="none" stroke="#1e5631" stroke-width="0.8" stroke-linecap="round"/>
</svg>
```

### 3c) Scaling note

Multiplying **every coordinate** (and gradient points if you use `userSpaceOnUse`) by a scalar **keeps the shape the same** – just bigger or smaller. Two common ways to scale:

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Change only the viewBox** (e.g., keep the 40×40 paths but set `width/height` to display size) — the browser scales everything uniformly, including strokes.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Numerically scale the coordinates** (like we did for 20×20) — the geometry scales, but **stroke-widths are not coordinates**, so you may want to scale those too for the same visual thickness.

### 3d) Using SVG in Markdown

Most Markdown renderers (including kramdown) accept **inline SVG**. You can simply paste the `<svg>...</svg>` block in your document.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">Inline example (this should render right here as the bullet icon)

If your platform sanitizes raw SVG, use an `<img>` tag pointing to an `.svg` file or a data URI as a fallback.

---

## 4) What those numbers mean (intuition)

Starting point is `M19.7 6` (a bit below the top edge), creating a **heart‑shaped notch** where the stem meets the blade.

We then draw **cubic curves** around the outline:

1. `C17 1.5, 12 2, 7 8` → from (20,3) toward the **left lobe**, ending at **(7,8)**.
2. `C3 13, 3 21, 12 30` → down the **left side**, ending at **(12,30)**.
3. `C15 33, 18 36, 20 38` → to the **bottom tip** at **(20,38)**.
4. `C22 36, 25 33, 28 30` → up the **right side**, ending at **(28,30)**.
5. `C37 21, 37 13, 33 8` → up to the **right lobe**, ending at **(33,8)**.
6. `C28 2, 23 1.5, 20 3` → back to the **top notch**.

Finally, `Z` **closes** the shape.

<img src="simple_leaf_svg.svg" class="leaf-bullet" alt="">Tip: The left side and right side are roughly **mirror images** across x=20. That's why the leaf looks balanced.

---

## 5) The "knobs" you can turn

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Notch depth (heart look):** raise/lower the first `M20 y`.
  Smaller `y` (e.g., `M20 2.2`) → **shallower** notch. Bigger `y` (e.g., `M20 4`) → **deeper** notch.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Leaf width:** push the far left/right x values outward/inward (e.g., change **7 → 5** and **33 → 35** to get **wider**).

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Bottom point:** change the bottom y (like `... 20 38`) to something like `20 37` for a slightly **flatter** tip.

<img src="simple_leaf_half.svg" class="leaf-bullet" alt="">**Stem length:** change `V1.8` to `V3` for a longer connector, `V1` for a shorter one.

---

## 6) Add a gradient (optional polish)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <defs>
    <linearGradient id="leafGrad" x1="0" y1="2" x2="0" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#9bd989"/>
      <stop offset="1" stop-color="#2c6f3d"/>
    </linearGradient>
  </defs>

  <path d="M20 0V1.8" stroke="#2c6f3d" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  <path d="M20 3 