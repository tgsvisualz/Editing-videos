// Usage: node render.js [output.pdf]   (default: ../../Zen_Ta_Vie_Document_Strategique_v2_FR.pdf)
const path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const out = process.argv[2] || path.join(__dirname, '..', '..', 'Zen_Ta_Vie_Document_Strategique_v2_FR.pdf');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 816, height: 1056 } });
  await p.goto('file://' + path.join(__dirname, 'doc.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: out, width: '816px', height: '1056px', printBackground: true, preferCSSPageSize: true });
  await b.close();
  console.log('wrote', out);
})();
