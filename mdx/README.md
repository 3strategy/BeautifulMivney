# MDX pages

## bottom line first

### The demo.mdx becomes available as mdx-demo on prod and on the local server without any user interaction

## the process

`*.mdx` files in this directory are compiled by `npm run build:mdx` into:

- `mdx-pages/`, which Jekyll renders as normal pages;
- `assets/generated/mdx/`, the browser bundle containing React and the compiled MDX component.


## mostly not needed

Run `npm install` once, then use `npm run build` for a production build or `npm run serve` for local development. The GitHub Pages workflow runs `npm ci` and `npm run build:mdx` before Jekyll, so published pages are compiled from the tracked `.mdx` source rather than local generated output.

Keep Jekyll front matter at the start of every `.mdx` file. MDX supports Markdown plus React JSX, JavaScript expressions, and imports. The `mdx/` directory is excluded from Jekyll deliberately: this prevents Liquid from interpreting JSX object syntax such as `style={{ color: 'red' }}`. The compiled page runs client-side, so use MDX only where a page needs a genuinely interactive React component.
