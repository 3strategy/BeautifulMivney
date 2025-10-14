---
layout: post
title: "React in GPT Canvas"
subtitle: "רלוונטי למורים. ולתלמידים סקרנים. לא קשור לאנדרואיד סטודיו"
tags: [react, GPT, canvas]
comments: true
mathjax: true
author: "גיא סידס"
lang: en
---

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>


{: .box-note}
How to create & share a mini React app in ChatGPT Canvas

1. **Open a coding canvas**
   In any chat on GPT, say “use canvas” / “open a coding canvas”, or click the toolbox icon in the composer and pick **Canvas** (you can also type **/canvas**). Canvas opens as a side-by-side editor+preview. ([OpenAI Help Center](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it))

2. **Paste a single-file React component**

   * Use a **default export** (e.g., `export default function App(){…}`) so Canvas can render it.
   * Styling: Tailwind utility classes work out of the box.
   * You can import many npm libraries; React/HTML runs in a sandboxed preview. ([OpenAI Help Center](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it))

3. **See the live preview**
   React/HTML code is rendered in a sandbox; most npm packages and many JS libraries “just work.” Edits in the code pane update the preview instantly. ([OpenAI Help Center](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it))

4. **Share it**
   Click **Share** in the Canvas toolbar (top-right) → create a shared link. This publishes the canvas (document/code or rendered React/HTML) so others can open it at a URL like `chatgpt.com/canvas/shared/...`. ([OpenAI Help Center](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it))

5. **What viewers can do**
   People who open your link can view the live preview and edit the code **in their own copy** (your original canvas isn’t changed). This works like sharing a conversation, but for Canvas assets. ([OpenAI Help Center](https://help.openai.com/en/articles/6825453-chatgpt-release-notes))



---

### Below is a starter you can use

<details markdown="1"><summary>sample react by GPT that you can put in your canvas</summary>

```JavaScript
import React, { useMemo, useState } from "react";

// ✅ Default export so Canvas can render it
export default function CanvasStarter() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>(["Open a coding canvas", "Paste this component", "Click Share (top right)"]);

  const greeting = useMemo(() => (name ? `Shalom, ${name}!` : "Hello 👋"), [name]);

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 p-6">
      <div className="max-w-3xl mx-auto grid gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Mini React App · Canvas</h1>
          <span className="text-sm opacity-70">Live preview in ChatGPT Canvas</span>
        </header>

        {/* Greeting Card */}
        <section className="rounded-2xl border p-5 shadow-sm">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium" htmlFor="name">Your name</label>
            <input
              id="name"
              className="border rounded-xl px-3 py-2 outline-none focus:ring-2"
              placeholder="Type and see it reflected live…"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-lg mt-2">
              <span className="font-semibold">{greeting}</span>
              {" "}This UI is fully editable; change the code and the preview updates.
            </p>
          </div>
        </section>

        {/* Counter Card */}
        <section className="rounded-2xl border p-5 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Counter</h2>
            <p className="opacity-70 text-sm">Tiny state example using <code>useState</code></p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-2xl px-4 py-2 border shadow-sm hover:shadow active:scale-[.98]"
              onClick={() => setCount((c) => c - 1)}
              aria-label="decrement"
            >−</button>
            <div className="text-2xl font-bold tabular-nums min-w-[3ch] text-center">{count}</div>
            <button
              className="rounded-2xl px-4 py-2 border shadow-sm hover:shadow active:scale-[.98]"
              onClick={() => setCount((c) => c + 1)}
              aria-label="increment"
            >+</button>
          </div>
        </section>

        {/* Checklist / Steps inside the app (for reference) */}
        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">How to share this</h2>
          <ol className="list-decimal ml-5 space-y-1">
            <li>In ChatGPT, open a <strong>coding canvas</strong> (ask: “use canvas” or “open a coding canvas”).</li>
            <li>Paste a default-exported React component (like this file) and tweak it.</li>
            <li>Use Tailwind utility classes for quick styling. NPM packages generally work too.</li>
            <li>Click <strong>Share</strong> in the canvas toolbar (top right) → generate a public link.</li>
            <li>Anyone with the link can view the canvas and preview; edits happen on their own copy.</li>
          </ol>
          <p className="mt-3 text-sm opacity-70">Tip: Keep it to one file. Embed images via URLs or data URIs.</p>
        </section>

        {/* Tiny TODOs to show editing live */}
        <section className="rounded-2xl border p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Editable TODOs</h2>
          <ul className="space-y-2">
            {todos.map((t, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="rounded-full w-2.5 h-2.5 bg-gray-900/80" />
                <span>{t}</span>
                <button
                  className="ml-auto text-xs px-2 py-1 border rounded-lg hover:bg-gray-50"
                  onClick={() => setTodos((arr) => arr.filter((_, j) => j !== i))}
                >remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-2">
            <input
              className="border rounded-xl px-3 py-2 flex-1"
              placeholder="Add another step…"
              onKeyDown={(e) => {
                const v = (e.target as HTMLInputElement).value.trim();
                if (e.key === "Enter" && v) {
                  setTodos((arr) => [...arr, v]);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <button
              className="rounded-2xl px-3 py-2 border"
              onClick={() => setTodos((arr) => [...arr, "Share your link 🎉"]) }
            >Quick add</button>
          </div>
        </section>

        <footer className="text-xs opacity-60 text-center mt-4">
          Built for ChatGPT Canvas · Default export · Tailwind classes · Single-file React
        </footer>
      </div>
    </div>
  );
}


```
</details>


[⟶ Open a code testing react demo in canvas](https://chatgpt.com/canvas/shared/68bc38badd14819190331b8447918d4f)