/* Read-only browser QA for the built course; writes screenshots outside the repo.
 * PLAYWRIGHT_MODULE may specify an installed Playwright module's absolute path.
 * COURSE_URL defaults to the local Jekyll server; QA_OUTPUT selects screenshots.
 */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const base = process.env.COURSE_URL || 'http://127.0.0.1:4001';
const output = process.env.QA_OUTPUT;
const lessons = fs.readdirSync(root).filter(x => /^\d\d-.*\.md$/.test(x));
const targets = ['index.md', ...lessons];
const findings = [];

(async () => {
  if (output) fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const queue = targets.flatMap(file => [1440, 390].map(width => ({file, width})));
    await Promise.all(Array.from({length: 4}, async () => {
      const context = await browser.newContext();
      while (queue.length) {
        const {file, width} = queue.shift();
        const page = await context.newPage({viewport: {width, height: 1000}});
        await page.setViewportSize({width, height: 1000});
        const issues = [];
        page.on('pageerror', error => issues.push(error.message));
        const suffix = file === 'index.md' ? '' : file.replace(/\.md$/, '');
        const response = await page.goto(`${base}/modelim/${suffix}`, {waitUntil:'networkidle'});
        if (!response.ok()) throw new Error(`${file}: HTTP ${response.status()}`);
        await page.waitForFunction(() => window.MathJax?.Hub?.Queue);
        await page.evaluate(() => new Promise(resolve => MathJax.Hub.Queue(resolve)));
        const expected = (fs.readFileSync(path.join(root,file),'utf8').match(/```mermaid/g)||[]).length;
        if (expected) await page.waitForFunction(n => document.querySelectorAll('main .mermaid svg').length === n, expected);
        const beforeOpen = await page.locator('main details').evaluateAll(es => es.every(e => !e.open));
        if (!beforeOpen) issues.push('Solutions unexpectedly open by default');
        if (file !== 'index.md') {
          const summary = page.locator('main details summary').first();
          await summary.click();
          if (!await page.locator('main details').first().getAttribute('open').then(v => v !== null)) {
            issues.push('Solution did not open on click');
          }
        }
        // Typeset opened detail content too, to inspect its geometry.
        await page.locator('main details').evaluateAll(es => es.forEach(e => {e.open = true;}));
        await page.evaluate(() => new Promise(resolve => MathJax.Hub.Queue(['Typeset',MathJax.Hub],resolve)));
        const result = await page.evaluate(() => {
          const main = document.querySelector('main');
          const walker = document.createTreeWalker(main,NodeFilter.SHOW_TEXT);
          const rawMath=[];
          while(walker.nextNode()) {
            const node=walker.currentNode, parent=node.parentElement;
            if(parent.closest('script,style,code,pre,.MathJax,.MathJax_Display,.MathJax_Preview,.MJX_Assistive_MathML,svg')) continue;
            if(node.textContent.includes('$')) rawMath.push(node.textContent.slice(0,160));
          }
          const svg=[...main.querySelectorAll('.mermaid svg')].map(e=>({
            viewBox:e.getAttribute('viewBox'), width:e.getBoundingClientRect().width,
            height:e.getBoundingClientRect().height,
            labelScale:e.getBoundingClientRect().width/e.viewBox.baseVal.width
          }));
          return {
            openingNote:main.querySelector('p')?.classList.contains('box-note'),
            notes:main.querySelectorAll('.box-note').length,
            successes:main.querySelectorAll('.box-success').length,
            warnings:main.querySelectorAll('.box-warning').length,
            math:main.querySelectorAll('script[type^="math/tex"]').length,
            mathErrors:[...main.querySelectorAll('.MathJax_Error,.merror')].map(e=>e.textContent),
            diagramErrors:[...main.querySelectorAll('.error-icon,.error-text')].map(e=>e.textContent),
            rawMath, svg,
            pageOverflow:document.documentElement.scrollWidth > innerWidth+2,
            links:[...main.querySelectorAll('a[href]')].map(e=>e.getAttribute('href')).filter(h=>h.startsWith('/modelim')),
            tableDirections:[...main.querySelectorAll('td[style*="text-align: left"]')].every(e=>getComputedStyle(e).direction==='ltr')
          };
        });
        if (!result.openingNote || !result.successes || !result.warnings) issues.push('Missing teaching callouts');
        if (result.mathErrors.length || result.rawMath.length || result.diagramErrors.length) issues.push('Math or diagram rendering error');
        if (result.pageOverflow) issues.push('Page-level horizontal overflow');
        if (!result.tableDirections) issues.push('Symbolic table cell is not LTR');
        if (result.svg.some(e=>e.labelScale<0.75)) issues.push('Diagram labels too small');
        if (width === 1440) for (const link of new Set(result.links)) {
          const linked = await context.request.get(base+link);
          if (!linked.ok()) issues.push(`Broken link: ${link} (${linked.status()})`);
        }
        if (output && /^(index|01-|10-|11-|13-|14-)/.test(file)) {
          await page.locator('main details').evaluateAll(es=>es.forEach(e=>{e.open=false;}));
          await page.evaluate(()=>scrollTo(0,0));
          await page.screenshot({path:path.join(output,`${file}-${width}-top.png`)});
          if(expected) await page.locator('.modelim-diagram').first().screenshot({path:path.join(output,`${file}-${width}-diagram.png`)});
        }
        findings.push({file,width,issues,...result});
        console.log(JSON.stringify({file,width,issues,math:result.math,diagrams:result.svg.length}));
        await page.close();
      }
      await context.close();
    }));
    if(output) fs.writeFileSync(path.join(output,'render-results.json'),JSON.stringify(findings,null,2));
    const failed=findings.filter(x=>x.issues.length);
    console.log(`Checked ${findings.length} page/viewport combinations; ${failed.length} with issues`);
    if(failed.length) process.exitCode=1;
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
