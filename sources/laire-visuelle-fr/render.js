// Usage: node render.js [output.pdf]   (default: out.pdf in this folder)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || path.join(__dirname, 'out.pdf');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 816, height: 1056 } });
  await p.goto('file://' + __dirname + '/doc.html', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: out, width: '816px', height: '1056px', printBackground: true, preferCSSPageSize: true });
  await b.close();
})();
