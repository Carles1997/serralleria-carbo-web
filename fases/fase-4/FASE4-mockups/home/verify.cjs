const { chromium } = require('C:/Users/CarlesPC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const errors = [];
  const results = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => errors.push(error.message));
  const file = pathToFileURL(path.join(__dirname, 'index.html')).href;
  await page.goto(file);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode().catch(() => {}); })));

  for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 768, 900], ['mobile', 390, 844], ['small-mobile', 320, 700]]) {
    await page.setViewportSize({ width, height });
    const result = await page.evaluate(() => ({
      viewport: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      pathColumns: getComputedStyle(document.querySelector('.paths-grid')).gridTemplateColumns,
      fontLoaded: document.fonts.check('700 32px "Source Sans 3"'),
      imagesLoaded: [...document.querySelectorAll('.path img')].every(img => img.complete && img.naturalWidth > 0),
      visiblePaths: [...document.querySelectorAll('.path')].every(el => el.getBoundingClientRect().height > 0),
      industrialTitleFits: (() => { const el = document.querySelector('.industrial-tile-content strong'); const card = el.closest('.industrial-tile'); const range = document.createRange(); range.selectNodeContents(el); return [...range.getClientRects()].every(rect => rect.right <= card.getBoundingClientRect().right - 8); })(),
      overflowing: [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > innerWidth + 1).map(el => ({tag: el.tagName, className: typeof el.className === 'string' ? el.className : '', right: Math.round(el.getBoundingClientRect().right)})).slice(0, 8),
    }));
    results.push({ name, ...result, noHorizontalOverflow: result.scrollWidth <= width });
    await page.screenshot({ path: path.join(__dirname, `preview-${name}.png`), fullPage: true });
    if (name === 'desktop' || name === 'mobile') await page.screenshot({ path: path.join(__dirname, `preview-${name}-fold.png`) });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  const firstImage = page.locator('.path-particulars img');
  const before = await firstImage.evaluate(el => getComputedStyle(el).filter);
  await page.locator('.path-particulars').hover();
  await page.waitForTimeout(550);
  const afterHover = await firstImage.evaluate(el => getComputedStyle(el).filter);
  await page.locator('.path-particulars').focus();
  await page.waitForTimeout(550);
  const afterFocus = await firstImage.evaluate(el => getComputedStyle(el).filter);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reducedMotion = await firstImage.evaluate(el => getComputedStyle(el).transitionDuration);

  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.locator('.menu-toggle');
  await menuButton.click();
  const menuOpened = await menuButton.getAttribute('aria-expanded') === 'true' && await page.locator('#mobile-nav').isVisible();
  await page.keyboard.press('Escape');
  const menuClosed = await menuButton.getAttribute('aria-expanded') === 'false' && !await page.locator('#mobile-nav').isVisible();

  const projectNavigatorVisible = await page.locator('.project-navigator').isVisible();
  await page.locator('.project-next').click();
  const projectAdvanced = await page.locator('.project-slide').nth(1).isVisible()
    && await page.locator('[data-project="1"]').getAttribute('aria-pressed') === 'true';
  const touchPage = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await touchPage.goto(file);
  await touchPage.locator('.mobile-path-nav a').last().tap();
  const touchShortcut = new URL(touchPage.url()).hash === '#capacitats';
  await touchPage.locator('.path-industrial').tap();
  const touchPath = new URL(touchPage.url()).hash === '#capacitats';
  await touchPage.close();

  console.log(JSON.stringify({ results, before, afterHover, afterFocus, reducedMotion, menuOpened, menuClosed, touchShortcut, touchPath, projectNavigatorVisible, projectAdvanced, errors }, null, 2));
  await browser.close();
  if (results.some(item => !item.noHorizontalOverflow || !item.fontLoaded || !item.imagesLoaded || !item.visiblePaths || !item.industrialTitleFits) || !menuOpened || !menuClosed || !touchShortcut || !touchPath || !projectNavigatorVisible || !projectAdvanced || errors.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
