const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const siteRoot = path.join(__dirname, '..', '_site');

function contentType(filePath) {
  const ext = path.extname(filePath);
  if (ext === '.css') return 'text/css';
  if (ext === '.js') return 'application/javascript';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  return 'text/html';
}

function resolveSitePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split('?')[0]);
  const cleanPath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  const requestedPath = path.join(siteRoot, cleanPath);
  if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isDirectory()) {
    return path.join(requestedPath, 'index.html');
  }
  if (fs.existsSync(requestedPath)) return requestedPath;
  return path.join(siteRoot, `${cleanPath}.html`);
}

async function renderedFontSizes(locator, selector) {
  return locator.locator(selector).evaluateAll((elements) =>
    elements
      .map((element) => Number.parseFloat(window.getComputedStyle(element).fontSize))
      .filter(Number.isFinite)
  );
}

test.describe('Mermaid rendering typography', () => {
  let server;
  let baseUrl;

  test.beforeAll(async () => {
    server = http.createServer((req, res) => {
      const filePath = resolveSitePath(req.url || '/');
      if (!filePath.startsWith(siteRoot) || !fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType(filePath) });
      fs.createReadStream(filePath).pipe(res);
    });

    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  test.afterAll(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  test('keeps the current year-opening gantt compact', async ({ page }) => {
    await page.goto(`${baseUrl}/mivney/0minhalot/0YearOpening/`);

    const currentYearGantt = page.locator('.mermaid svg').nth(1);
    await expect(currentYearGantt).toContainText('2027', { timeout: 20000 });

    const fontSizes = await renderedFontSizes(currentYearGantt, 'text, tspan, .nodeLabel, .nodeLabel *');

    expect(fontSizes.length).toBeGreaterThan(0);
    expect(Math.max(...fontSizes)).toBeLessThanOrEqual(20);
  });

  test('keeps workshop flowchart labels large', async ({ page }) => {
    await page.goto(`${baseUrl}/agentic/04-apps-script-clasp-sheets/`);

    const firstFlowchart = page.locator('.mermaid svg').first();
    await expect(firstFlowchart).toContainText('Google Sheet', { timeout: 20000 });

    const labelSizes = await renderedFontSizes(firstFlowchart, '.nodeLabel');

    expect(labelSizes.length).toBeGreaterThan(0);
    expect(Math.max(...labelSizes)).toBeGreaterThanOrEqual(30);
  });

  test('keeps polymorphism class diagrams compact', async ({ page }) => {
    await page.goto(`${baseUrl}/oop/02Polymorphism/`);

    const classDiagram = page.locator('.mermaid svg').first();
    await expect(classDiagram).toContainText('Shape', { timeout: 20000 });

    const fontSizes = await renderedFontSizes(classDiagram, 'text, tspan, .nodeLabel, .nodeLabel *');

    expect(fontSizes.length).toBeGreaterThan(0);
    expect(Math.max(...fontSizes)).toBeLessThanOrEqual(20);
  });
});
