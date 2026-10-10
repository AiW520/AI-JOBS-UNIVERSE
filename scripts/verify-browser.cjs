const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const url = process.env.TEST_URL || 'http://127.0.0.1:4312/AI-JOBS-UNIVERSE/';
const output = path.resolve(process.env.QA_OUTPUT || 'artifacts/qa');
const results = [];
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const record = (name, value) => { assert.ok(value, name); results.push({ name, passed: true }); };
const errors = [];
const httpErrors = [];

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const browser = await chromium.launch({ executablePath: fs.existsSync(chrome) ? chrome : undefined, headless: true, args: ['--enable-unsafe-swiftshader'] });
  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    desktop.on('pageerror', (error) => errors.push(error.message));
    desktop.on('response', (response) => { if (response.url().startsWith(new URL(url).origin) && response.status() >= 400) httpErrors.push(response.url()); });
    await desktop.goto(url);
    await desktop.getByLabel('Focus career', { exact: true }).waitFor();
    await desktop.waitForTimeout(800);
    const frame = await desktop.locator('canvas').screenshot();
    const png = PNG.sync.read(frame);
    let bright = 0;
    const colors = new Set();
    for (let i = 0; i < png.data.length; i += 4) {
      if (png.data[i] + png.data[i + 1] + png.data[i + 2] > 210) bright++;
      colors.add(`${png.data[i] >> 4},${png.data[i + 1] >> 4},${png.data[i + 2] >> 4}`);
    }
    record('Canvas contains station geometry and varied pixels', bright > 1000 && colors.size > 80);
    results.push({ name: 'Canvas pixel sample', brightPixels: bright, colorBuckets: colors.size });
    await desktop.waitForTimeout(500);
    record('Continuous motion changes canvas', hash(frame) !== hash(await desktop.locator('canvas').screenshot()));
    await desktop.getByRole('button', { name: 'Pause motion', exact: true }).click();
    await desktop.waitForTimeout(250);
    const paused = await desktop.locator('canvas').screenshot();
    await desktop.waitForTimeout(400);
    record('Pause stops scene motion', hash(paused) === hash(await desktop.locator('canvas').screenshot()));
    await desktop.screenshot({ path: path.join(output, 'desktop-careers.png') });
    await desktop.getByRole('button', { name: 'Zoom in', exact: true }).click();
    record('Zoom changes the rendered view', hash(paused) !== hash(await desktop.locator('canvas').screenshot()));
    await desktop.getByLabel('Focus career', { exact: true }).selectOption('threejs-engineer');
    const selected = await desktop.locator('canvas').screenshot();
    record('Focus uses real career data', await desktop.locator('.universe-scene').getAttribute('data-selected') === 'threejs-engineer');
    await desktop.screenshot({ path: path.join(output, 'desktop-focus.png') });
    await desktop.getByRole('button', { name: 'Reset camera', exact: true }).click();
    record('Camera reset changes the focused view', hash(selected) !== hash(await desktop.locator('canvas').screenshot()));
    const bounds = await desktop.locator('canvas').boundingBox();
    let picked = false;
    // Click the station footprint through the actual canvas raycaster.
    for (const y of [0.55, 0.65, 0.75, 0.45]) {
      for (const x of [0.45, 0.55, 0.65, 0.35, 0.7]) {
        await desktop.mouse.click(bounds.x + bounds.width * x, bounds.y + bounds.height * y);
        if (await desktop.locator('.universe-scene').getAttribute('data-selected') !== 'threejs-engineer') { picked = true; break; }
      }
      if (picked) break;
    }
    record('Clicking a 3D station selects a career', picked);
    await desktop.getByRole('button', { name: '前端', exact: true }).click();
    record('Category synchronizes scene and list', await desktop.locator('.career-section [role=link]').count() === 4 && await desktop.getByLabel('Focus career', { exact: true }).locator('option').count() === 4);
    await desktop.getByLabel('Search careers or skills').fill('GLSL');
    record('Skill search filters matching careers', await desktop.locator('.career-section [role=link]').count() === 3);
    await desktop.getByLabel('Search careers or skills').fill('nothing-matches-xyz');
    record('Empty search state', await desktop.getByText('没有匹配的岗位').isVisible());
    await desktop.getByRole('button', { name: '恢复全部岗位' }).click();
    await desktop.getByLabel('Sort careers').selectOption('salary');
    record('Salary sorting selects the highest ceiling', await desktop.locator('.career-section [role=link]').first().innerText().then((text) => text.includes('$320k')));
    await desktop.getByLabel('Focus career', { exact: true }).selectOption('llm-engineer');
    await desktop.getByRole('link', { name: '查看岗位', exact: true }).click();
    await desktop.getByRole('heading', { name: 'LLM Engineer', exact: true }).waitFor();
    await desktop.reload();
    await desktop.getByRole('heading', { name: 'LLM Engineer', exact: true }).waitFor();
    record('Career detail survives static subpath refresh', desktop.url().includes('#/job/llm-engineer'));
    await desktop.goto(url);
    await desktop.locator('#rankings').scrollIntoViewIfNeeded();
    await desktop.getByRole('button', { name: 'Web3 技术', exact: true }).click();
    record('Technology rankings remain interactive', (await desktop.locator('#rankings').innerText()).includes('Solidity'));
    await desktop.locator('#skills').scrollIntoViewIfNeeded();
    await desktop.locator('#skills').getByText('Python', { exact: true }).click();
    record('Skill details remain interactive', (await desktop.locator('#skills').innerText()).includes('Core programming language for AI and data science'));
    record('Trend analysis retains five charts', await desktop.locator('#trends svg').count() === 5);
    await desktop.locator('#careers').scrollIntoViewIfNeeded();
    await desktop.getByRole('button', { name: 'Expand scene', exact: true }).click();
    record('Scene expands', await desktop.getByRole('dialog').isVisible());
    await desktop.keyboard.press('Escape');
    record('Escape closes expanded scene', await desktop.getByRole('dialog').count() === 0);

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
    mobile.on('pageerror', (error) => errors.push(error.message));
    await mobile.goto(url);
    await mobile.getByLabel('Focus career', { exact: true }).waitFor();
    record('Mobile defaults to low quality', await mobile.getByLabel('Scene quality').inputValue() === 'low');
    await mobile.waitForTimeout(400);
    await mobile.screenshot({ path: path.join(output, 'mobile-careers.png') });
    record('Mobile canvas is nonblank', PNG.sync.read(await mobile.locator('canvas').screenshot()).data.some((value, index) => index % 4 !== 3 && value > 130));
    for (const section of ['#careers', '#rankings', '#skills', '#trends']) {
      await mobile.locator(section).scrollIntoViewIfNeeded();
      record(`No mobile horizontal overflow at ${section}`, await mobile.evaluate(() => document.documentElement.scrollWidth === innerWidth));
    }
    await mobile.locator('#careers').scrollIntoViewIfNeeded();
    await mobile.getByRole('button', { name: 'Toggle navigation' }).click();
    await mobile.getByRole('link', { name: '岗位', exact: true }).last().click();
    record('Mobile navigation closes after selection', await mobile.getByRole('button', { name: 'Toggle navigation' }).getAttribute('aria-expanded') === 'false');

    const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await reduced.goto(url);
    await reduced.getByText('减少动效', { exact: true }).waitFor();
    await reduced.waitForTimeout(300);
    const reducedFrame = await reduced.locator('canvas').screenshot();
    await reduced.waitForTimeout(400);
    record('Reduced motion is static', hash(reducedFrame) === hash(await reduced.locator('canvas').screenshot()));
    await reduced.getByLabel('Focus career', { exact: true }).selectOption('llm-engineer');
    record('Reduced motion retains camera focus', hash(reducedFrame) !== hash(await reduced.locator('canvas').screenshot()));

    const fallback = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await fallback.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (kind, ...args) { if (kind === 'webgl' || kind === 'webgl2') return null; return original.call(this, kind, ...args); };
    });
    await fallback.goto(url);
    await fallback.getByText('当前设备无法启用 3D').waitFor();
    record('WebGL failure retains all careers', await fallback.locator('.career-section [role=link]').count() === 20);
    await fallback.screenshot({ path: path.join(output, 'mobile-webgl-fallback.png') });
    await fallback.getByRole('button', { name: 'List view', exact: true }).click();
    await fallback.reload();
    await fallback.locator('.career-section [role=link]').first().waitFor();
    record('List preference survives reload without canvas', await fallback.locator('canvas').count() === 0);
    await fallback.screenshot({ path: path.join(output, 'mobile-list.png') });

    const list = await browser.newPage();
    const sceneRequests = [];
    await list.addInitScript(() => localStorage.setItem('career-view', 'list'));
    list.on('request', (request) => { if (/CareerUniverseExplorer|\/three-|react-three/.test(request.url())) sceneRequests.push(request.url()); });
    await list.goto(url);
    await list.locator('.career-section [role=link]').first().waitFor();
    record('List mode does not load the 3D bundle', sceneRequests.length === 0);
    record('No browser runtime errors', errors.length === 0);
    record('No local resource failures', httpErrors.length === 0);
    fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify({ url, browser: 'Chrome headless with SwiftShader', results, errors, httpErrors }, null, 2));
    console.log(JSON.stringify({ passed: results.filter((item) => item.passed).length, output, results }, null, 2));
  } finally { await browser.close(); }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
