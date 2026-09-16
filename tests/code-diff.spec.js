const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const root = path.resolve(__dirname, '../_site');
let server, baseURL;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let file = path.resolve(root, '.' + decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root + path.sep)) { res.writeHead(404).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    const mime = { '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };
    res.setHeader('Content-Type', mime[path.extname(file)] || 'text/html');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  baseURL = `http://127.0.0.1:${server.address().port}`;
});
test.afterAll(async () => { await new Promise(resolve => server.close(resolve)); });

async function openLesson(page) {
  await page.route('**/*', route => route.request().url().startsWith(baseURL) ? route.continue() : route.abort());
  await page.goto(`${baseURL}/android/projectSteps/019a.BindingInsteadOfFindByID/`);
}

for (const theme of ['light', 'dark']) {
  test(`aligned word diffs and clean copying in ${theme} theme`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1600, height: 1050 });
    await openLesson(page);
    await page.evaluate(theme => document.body.classList.toggle('light-theme', theme === 'light'), theme);
    const comparisons = page.locator('.code-diff');
    await expect(comparisons).toHaveCount(5);
    for (const comparison of await comparisons.all()) {
      const panels = comparison.locator('.code-diff-panel');
      await expect(panels.nth(0).locator('h4')).toHaveText('לפני');
      await expect(panels.nth(1).locator('h4')).toHaveText('אחרי');
      const a = await panels.nth(0).boundingBox(), b = await panels.nth(1).boundingBox();
      expect(a.x).toBeLessThan(b.x);
      expect(a.y).toBe(b.y);
      await expect(comparison.locator('del')).toHaveCount(0);
      const edits = await comparison.locator('ins').allTextContents();
      expect(edits.length).toBeGreaterThan(0);
      expect(edits.every(text => text === 'binding.')).toBe(true);
      const texts = await panels.locator('code').allTextContents();
      expect(texts[1].replaceAll('binding.', '')).toBe(texts[0]);
      const positions = await panels.evaluateAll(elements => elements.map(panel =>
        [...panel.querySelectorAll('.code-diff-line')].map(line => line.getBoundingClientRect().y)));
      expect(positions[0]).toEqual(positions[1]);
      const copy = await panels.nth(1).locator('code').evaluate(code => {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges(); selection.addRange(range);
        const result = selection.toString(); selection.removeAllRanges(); return result;
      });
      expect(copy).toBe(texts[1]);
    }
    await comparisons.first().screenshot({ path: testInfo.outputPath(`login-diff-${theme}.png`) });
    // The generic narrow-screen rule must never stack a comparison.
    await page.setViewportSize({ width: 700, height: 900 });
    const boxes = await comparisons.first().locator('.code-diff-panel').evaluateAll(panels =>
      panels.map(panel => ({ x: panel.getBoundingClientRect().x, y: panel.getBoundingClientRect().y })));
    expect(boxes[0].x).toBeLessThan(boxes[1].x);
    expect(boxes[0].y).toBe(boxes[1].y);
  });
}

test('static comparison works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();
  await openLesson(page);
  await expect(page.locator('.code-diff').first()).toBeVisible();
  await expect(page.locator('.code-diff').first().locator('ins')).toHaveCount(6);
  await context.close();
});
