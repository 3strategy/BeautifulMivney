import { compile } from '@mdx-js/mdx';
import { build } from 'esbuild';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'mdx');
const pageDir = path.join(root, 'mdx-pages');
const assetDir = path.join(root, 'assets', 'generated', 'mdx');

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  }));
  return nested.flat().filter((file) => file.endsWith('.mdx'));
}

function splitFrontMatter(source, filename) {
  const match = source.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
  if (!match) {
    throw new Error(`${filename} needs Jekyll front matter.`);
  }
  return { frontMatter: match[1], mdx: match[2] };
}

async function buildPage(sourceFile) {
  const relative = path.relative(sourceDir, sourceFile);
  const stem = relative.replace(/\.mdx$/, '');
  const mountId = `mdx-${stem.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
  const source = await readFile(sourceFile, 'utf8');
  const { frontMatter, mdx } = splitFrontMatter(source, relative);
  const compiled = String(await compile(mdx, { jsx: true }));
  const clientEntry = `${compiled}\n\nimport React from 'react';\nimport { createRoot } from 'react-dom/client';\n\nconst mount = document.getElementById(${JSON.stringify(mountId)});\nif (mount) createRoot(mount).render(React.createElement(MDXContent));\n`;
  const scriptRelative = `${stem}.js`;
  const scriptPath = path.join(assetDir, scriptRelative);
  const pagePath = path.join(pageDir, `${stem}.html`);

  await mkdir(path.dirname(scriptPath), { recursive: true });
  await mkdir(path.dirname(pagePath), { recursive: true });
  await build({
    stdin: {
      contents: clientEntry,
      resolveDir: path.dirname(sourceFile),
      sourcefile: relative,
      loader: 'jsx'
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: ['es2020'],
    outfile: scriptPath,
    minify: true
  });

  const assetUrl = `/assets/generated/mdx/${scriptRelative}`;
  const page = `${frontMatter}<div id="${mountId}" class="mdx-root">\n  <noscript>This MDX example needs JavaScript enabled.</noscript>\n</div>\n<script type="module" src="{{ '${assetUrl}' | relative_url }}"></script>\n`;
  await writeFile(pagePath, page);
  console.log(`Built MDX: ${relative}`);
}

await rm(pageDir, { recursive: true, force: true });
await rm(assetDir, { recursive: true, force: true });
await mkdir(pageDir, { recursive: true });
await mkdir(assetDir, { recursive: true });

const sources = await filesUnder(sourceDir);
await Promise.all(sources.map(buildPage));
