const { chromium } = require('C:/Users/CarlesPC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const file = pathToFileURL(path.join(__dirname, 'index.html')).href;
  await page.goto(file);
  await page.evaluate(() => document.fonts.ready);
  const fontLoaded = await page.evaluate(() => document.fonts.check('700 24px "Source Sans 3"'));
  await page.screenshot({ path: path.join(__dirname, 'preview-desktop.png'), fullPage: true });
  const results = [];
  for (const [name,width,height] of [['desktop',1440,900],['tablet',768,900],['mobile',390,844],['small-mobile',320,700]]) {
    await page.setViewportSize({ width, height });
    await page.locator(`button[data-device="${width <= 390 ? 'mobile' : width <= 768 ? 'tablet' : 'desktop'}"]`).click();
    const dimensions = await page.evaluate(() => ({ documentWidth:document.documentElement.scrollWidth, viewportWidth:innerWidth, heroColumns:getComputedStyle(document.querySelector('.hero-grid')).gridTemplateColumns }));
    results.push({ name, ...dimensions, noHorizontalOverflow: dimensions.documentWidth <= width });
    if (name === 'tablet') await page.screenshot({ path: path.join(__dirname, 'preview-tablet.png'), fullPage: true });
    if (name === 'mobile') await page.screenshot({ path: path.join(__dirname, 'preview-mobile.png'), fullPage: true });
    if (name === 'small-mobile') await page.screenshot({ path: path.join(__dirname, 'preview-small-mobile.png'), fullPage: true });
  }
  await page.setViewportSize({ width:1440, height:900 });
  await page.locator('button[data-device="desktop"]').click();
  const first = page.locator('.hero-path').first();
  const image = first.locator('img');
  const before = await image.evaluate(el => getComputedStyle(el).filter);
  await first.hover();
  await page.waitForTimeout(260);
  const afterHover = await image.evaluate(el => getComputedStyle(el).filter);
  await page.mouse.move(0,0);
  await page.locator('.hero-intro').click();
  for (let i=0;i<20;i++) {
    await page.keyboard.press('Tab');
    if (await first.evaluate(el => document.activeElement === el)) break;
  }
  await page.waitForTimeout(260);
  const afterFocus = await image.evaluate(el => getComputedStyle(el).filter);
  const keyboardFocus = await first.evaluate(el => document.activeElement === el && el.matches(':focus-visible'));
  await page.keyboard.press('Enter');
  const keyboardDestination = new URL(page.url()).hash;
  const touchPage = await browser.newPage({ viewport:{width:390,height:844}, hasTouch:true, isMobile:true });
  await touchPage.goto(file);
  await touchPage.locator('.hero-path.industrial').tap();
  const touchDestination = new URL(touchPage.url()).hash;
  await touchPage.close();
  await page.locator('[data-select="b"]').click();
  await page.locator('.brand-grid').screenshot({ path:path.join(__dirname,'brands-b.png') });
  await page.locator('[data-select="c"]').click();
  await page.locator('.brand-grid').screenshot({ path:path.join(__dirname,'brands-c.png') });
  await page.locator('[data-select="a"]').click();
  await page.locator('.brand-grid').screenshot({ path:path.join(__dirname,'brands-a.png') });
  await page.emulateMedia({ reducedMotion:'reduce' });
  const transition = await image.evaluate(el => getComputedStyle(el).transitionDuration);
  const links = await page.locator('.hero-path').evaluateAll(items => items.map(el => ({ href:el.getAttribute('href'), name:el.getAttribute('aria-label'), height:Math.round(el.getBoundingClientRect().height) })));
  console.log(JSON.stringify({ fontLoaded, results, before, afterHover, afterFocus, keyboardFocus, keyboardDestination, touchDestination, reducedMotionTransition:transition, links },null,2));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode=1; });
