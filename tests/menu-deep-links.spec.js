const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

// Run this identical suite against each sibling's own built navigation.
const site = path.join(__dirname, '..', '_site');
let server, base, defaultMenu, alternateMenu;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let file = path.join(site, decodeURIComponent(req.url.split('?')[0]));
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && !path.extname(file)) file += '.html';
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', file.endsWith('.js') ? 'application/javascript' :
      file.endsWith('.css') ? 'text/css' : 'text/html');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
  const html = fs.readFileSync(path.join(site, 'index.html'), 'utf8');
  defaultMenu = html.match(/data-default-menu-set="([^"]+)"/)[1];
  alternateMenu = defaultMenu === 'data-structures' ? 'agentic' : 'taba';
});
test.afterAll(async () => { await new Promise(resolve => server.close(resolve)); });
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => route.request().url().startsWith(base)
    ? route.continue() : route.abort());
});

async function expectMenu(page, menu) {
  await expect(page.locator('a.active[href^="javascript:setMenuSet("]'))
    .toHaveAttribute('href', `javascript:setMenuSet('${menu}');`);
  await expect(page.locator('a.active[href^="javascript:setMenuSet("]'))
    .toHaveAttribute('aria-current', 'true');
  expect(new URL(page.url()).searchParams.get('menu')).toBe(menu);
  const items = await page.locator('[data-menu-sets]').evaluateAll(items => items.map(item => ({
    menus: item.dataset.menuSets.split(/\s+/), hidden: item.hidden
  })));
  for (const item of items) expect(item.hidden).toBe(!item.menus.includes(menu));
}

async function saveMenu(context, menu) {
  await context.addCookies([{ name: 'menu-set', value: menu, url: base }]);
}

test('a fresh recipient opens the course with its selected menu', async ({ page, context }) => {
  const lesson = alternateMenu === 'agentic' ? '/agentic/00-opener' : '/';
  await page.goto(`${base}${lesson}?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  expect((await context.cookies()).find(cookie => cookie.name === 'menu-set').value).toBe(alternateMenu);
});

test('explicit menu overrides a previously saved preference', async ({ page, context }) => {
  await saveMenu(context, defaultMenu);
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  await page.reload();
  await expectMenu(page, alternateMenu);
});

test('menu follows an ordinary internal link and the destination stays shareable', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  const link = page.locator(`[data-menu-sets~="${alternateMenu}"] a[href^="/"]`).first();
  const target = await link.getAttribute('href');
  await Promise.all([
    page.waitForURL(url => url.pathname === new URL(target, base).pathname),
    link.evaluate(element => element.click())
  ]);
  await page.waitForLoadState('load');
  await expectMenu(page, alternateMenu);
});

test('manual menu selection changes a stale deep link without reloading', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}&exercise=2#question`);
  await expectMenu(page, alternateMenu);
  await page.evaluate(() => { window.menuTestMarker = true; });
  await page.locator(`a[href="javascript:setMenuSet('${defaultMenu}');"]`)
    .evaluate(element => element.click());
  await expectMenu(page, defaultMenu);
  expect(await page.evaluate(() => window.menuTestMarker)).toBe(true);
  const url = new URL(page.url());
  expect(url.searchParams.get('exercise')).toBe('2');
  expect(url.hash).toBe('#question');
  await page.reload();
  await expectMenu(page, defaultMenu);
});

test('invalid and empty URL values preserve the saved preference', async ({ page, context }) => {
  await saveMenu(context, alternateMenu);
  for (const value of ['unknown', '', '%3Cscript%3E', 'AGENTIC']) {
    await page.goto(`${base}/?menu=${value}`);
    await expectMenu(page, alternateMenu);
  }
});

test('missing or invalid preferences fall back to the site default', async ({ page, context }) => {
  await page.goto(base);
  await expectMenu(page, defaultMenu);
  await saveMenu(context, 'obsolete');
  await page.goto(`${base}/?menu=unknown`);
  await expectMenu(page, defaultMenu);
});

test('same-document back and forward restore the menu carried by the URL', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  await expectMenu(page, alternateMenu);
  await page.evaluate(menu => {
    history.pushState({ lesson: 2 }, '', `?menu=${menu}#next`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, defaultMenu);
  await expectMenu(page, defaultMenu);
  await page.goBack();
  await expectMenu(page, alternateMenu);
  await page.goForward();
  await expectMenu(page, defaultMenu);
});

test('URL synchronization preserves history state and all other URL parts', async ({ page, context }) => {
  await saveMenu(context, alternateMenu);
  await page.addInitScript(() => history.replaceState({ lesson: 7 }, '', location.href));
  await page.goto(`${base}/?exercise=2&lang=he#question`);
  await expectMenu(page, alternateMenu);
  const url = new URL(page.url());
  expect(url.searchParams.get('exercise')).toBe('2');
  expect(url.searchParams.get('lang')).toBe('he');
  expect(url.hash).toBe('#question');
  expect(await page.evaluate(() => history.state)).toEqual({ lesson: 7 });
});

test('configured empty menus remain selectable on sites that support them', async ({ page }) => {
  await page.goto(`${base}/?menu=${alternateMenu}`);
  const supportsEmptyMenus = await page.locator('.navbar').getAttribute('data-menu-set-ids');
  test.skip(!supportsEmptyMenus, 'This site discovers menu IDs from populated items.');
  await page.evaluate(menu => {
    document.querySelectorAll('[data-menu-sets]').forEach(item => {
      item.dataset.menuSets = item.dataset.menuSets.split(/\s+/).filter(id => id !== menu).join(' ');
    });
    setMenuSet(menu);
  }, alternateMenu);
  await expectMenu(page, alternateMenu);
});

test('opening the Android topic map search result switches an existing menu', async ({ page, context }) => {
  const corpus = JSON.parse(fs.readFileSync(path.join(site, 'assets/data/searchcorpus.json'), 'utf8'));
  const result = corpus.find(item => item.title === 'מפת נושאים באנדרואיד');
  await saveMenu(context, 'agentic');
  // Follow the exact generated result URL, as the search widget does.
  await page.goto(base + result.url);
  await expectMenu(page, 'android');
  await expect(page.locator('h1').first()).toContainText('מפת נושאים באנדרואיד');
});

function taggedPage() {
  return defaultMenu === 'data-structures'
    ? { path: '/android/topics-index/', menu: 'android' }
    : { path: '/taba/00-student-roadmap/', menu: 'taba' };
}

test('a bare direct URL selects the page tag over a saved menu', async ({ page, context }) => {
  const tagged = taggedPage();
  await saveMenu(context, defaultMenu);
  await page.goto(`${base}${tagged.path}?exercise=3#question`);
  await expectMenu(page, tagged.menu);
  expect((await context.cookies()).find(cookie => cookie.name === 'menu-set').value).toBe(tagged.menu);
  const url = new URL(page.url());
  expect(url.searchParams.get('exercise')).toBe('3');
  expect(url.hash).toBe('#question');
});

test('an unchanged navbar link selects the destination page menu', async ({ page }) => {
  const tagged = taggedPage();
  await page.goto(base);
  await expectMenu(page, defaultMenu);
  const link = page.locator(`.navbar a[href^="${tagged.path.replace(/\/$/, '')}"]`).first();
  const href = await link.getAttribute('href');
  expect(href).not.toContain('?');
  await Promise.all([
    page.waitForURL(url => url.pathname.replace(/\/$/, '') === tagged.path.replace(/\/$/, '')),
    link.evaluate(element => element.click())
  ]);
  await page.waitForLoadState('load');
  await expectMenu(page, tagged.menu);
});

test('a page tag overrides a conflicting URL but permits a manual change until reload', async ({ page }) => {
  const tagged = taggedPage();
  await page.goto(`${base}${tagged.path}?menu=${defaultMenu}`);
  await expectMenu(page, tagged.menu);
  await page.locator(`a[href="javascript:setMenuSet('${defaultMenu}');"]`)
    .evaluate(element => element.click());
  await expectMenu(page, defaultMenu);
  await page.reload();
  await expectMenu(page, tagged.menu);
});

test('search results include the page tag in their URLs', async ({ page }) => {
  const tagged = taggedPage();
  const corpus = JSON.parse(fs.readFileSync(path.join(site, 'assets/data/searchcorpus.json'), 'utf8'));
  const result = corpus.find(item => item.url === `${tagged.path}?menu=${tagged.menu}`);
  expect(result).toBeTruthy();
  await page.goto(base + result.url);
  await expectMenu(page, tagged.menu);
});

test('an invalid page tag falls back to a valid incoming URL', async ({ page }) => {
  const tagged = taggedPage();
  await page.route(`${base}${tagged.path}?menu=${defaultMenu}`, async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/data-page-menu-set="[^"]*"/, 'data-page-menu-set="unknown"');
    await route.fulfill({ response, body });
  });
  await page.goto(`${base}${tagged.path}?menu=${defaultMenu}`);
  await expectMenu(page, defaultMenu);
});
