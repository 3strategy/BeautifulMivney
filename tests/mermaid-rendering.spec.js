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

async function clippedForeignObjectLabels(locator) {
  return locator.locator('foreignObject').evaluateAll((foreignObjects) =>
    foreignObjects
      .map((foreignObject, index) => {
        const content = foreignObject.firstElementChild;
        const label = foreignObject.querySelector('.nodeLabel') || content;
        if (!content || !label) return null;

        const foreignRect = foreignObject.getBoundingClientRect();
        const labelRect = label.getBoundingClientRect();
        const scrollOverflow =
          content.scrollWidth > content.clientWidth + 1 ||
          content.scrollHeight > content.clientHeight + 1;
        const boundsOverflow =
          labelRect.left < foreignRect.left - 1 ||
          labelRect.right > foreignRect.right + 1 ||
          labelRect.top < foreignRect.top - 1 ||
          labelRect.bottom > foreignRect.bottom + 1;

        if (!scrollOverflow && !boundsOverflow) return null;

        return {
          index,
          text: (label.textContent || '').replace(/\s+/g, ' ').trim(),
          foreignWidth: Math.round(foreignRect.width),
          foreignHeight: Math.round(foreignRect.height),
          labelWidth: Math.round(labelRect.width),
          labelHeight: Math.round(labelRect.height),
        };
      })
      .filter(Boolean)
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

  test('does not clip workshop flowchart labels', async ({ page }) => {
    await page.goto(`${baseUrl}/agentic/04-apps-script-clasp-sheets/`);

    const firstFlowchart = page.locator('.mermaid svg').first();
    await expect(firstFlowchart).toContainText('Google Sheet', { timeout: 20000 });

    expect(await clippedForeignObjectLabels(firstFlowchart)).toEqual([]);
  });

  test('does not clip polymorphism decision flowchart labels', async ({ page }) => {
    await page.goto(`${baseUrl}/oop/02Polymorphism2Bag25/`);

    const decisionFlowchart = page.locator('.mermaid svg').filter({ hasText: 'האם שם הפעולה' }).first();
    await expect(decisionFlowchart).toContainText('Overloading Resolution', { timeout: 20000 });

    expect(await clippedForeignObjectLabels(decisionFlowchart)).toEqual([]);
  });

  test('keeps inheritance class diagrams compact', async ({ page }) => {
    await page.goto(`${baseUrl}/oop/01inheritc/`);

    const classDiagram = page.locator('.mermaid svg').first();
    await expect(classDiagram).toContainText('Vehicle', { timeout: 20000 });

    const fontSizes = await renderedFontSizes(classDiagram, 'text, tspan, .nodeLabel, .nodeLabel *');

    expect(fontSizes.length).toBeGreaterThan(0);
    expect(Math.max(...fontSizes)).toBeLessThanOrEqual(20);
  });

  test('defaults state diagrams to LTR on Hebrew pages', async ({ page }) => {
    await page.goto(`${baseUrl}/modelim/matala5/matala5/`);

    const stateDiagram = page.locator('.mermaid.mermaid-ltr svg.statediagram').first();
    await expect(stateDiagram).toContainText('q0', { timeout: 20000 });
  });
});
