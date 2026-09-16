import { test, expect } from '@playwright/test';

function contrast(foreground, background) {
  const luminance = color => {
    const channels = color.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map(value => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('the hero opens setup at the repository subpath and preserves appearance choices', async ({ page }) => {
  await page.goto('index.html');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(13, 17, 23)');
  await expect(page.locator('.workshop-hero')).toHaveCSS('background-color', 'rgb(1, 4, 9)');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await page.getByRole('navigation', { name: 'Workshop shortcuts' })
    .getByRole('link', { name: 'Set up your own copy', exact: true }).click();
  await expect(page).toHaveURL(/\/copilot-user-search-workshop\/start\.html$/);
  await expect(page.locator('.vp-doc pre').filter({ hasText: 'git clone' })).toContainText('https://example.invalid/no-workshop-push');
  await page.getByRole('switch', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await expect(page.locator('.workshop-title a')).toHaveCSS('color', 'rgb(31, 35, 40)');
});

for (const width of [1440, 960, 768, 390, 320]) {
  test(`guide pages and route navigation fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const failures = [];
    page.on('response', response => {
      if (response.status() >= 400) failures.push(response.url());
    });
    for (const route of ['index.html', 'start.html', 'labs/04-plugin.html', 'reference/plugin.html']) {
      await page.goto(route);
      await expect(page.locator('.workshop-title')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (width < 960) {
        const menu = page.getByRole('button', { name: 'Your route', exact: true });
        await menu.click();
        await expect(menu).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('.VPSidebar').getByRole('link', { name: 'Set up your own copy', exact: true })).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(menu).toHaveAttribute('aria-expanded', 'false');
      } else {
        await expect(page.locator('.VPSidebar')).toBeVisible();
      }
    }
    expect(failures).toEqual([]);
  });
}

test('tabs have accessible target sizes, contrast, focus and high-contrast selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('labs/04-plugin.html?client=cli');
  const tabs = page.getByRole('tab');
  for (const tab of await tabs.all()) {
    const bounds = await tab.boundingBox();
    expect(bounds.height).toBeGreaterThanOrEqual(44);
    expect(bounds.width).toBeGreaterThanOrEqual(44);
  }
  const selected = page.getByRole('tab', { name: 'Copilot CLI', exact: true });
  const colors = await selected.evaluate(element => {
    const style = getComputedStyle(element);
    return [style.color, style.backgroundColor];
  });
  expect(contrast(...colors)).toBeGreaterThanOrEqual(4.5);
  await selected.focus();
  await expect(selected).toHaveCSS('outline-width', '3px');
  await expect(selected).toHaveCSS('outline-style', 'solid');
  await expect(selected).not.toHaveCSS('box-shadow', 'none');
  await page.emulateMedia({ forcedColors: 'active' });
  await expect(selected).toHaveCSS('border-top-width', '3px');
  await expect(selected).toHaveCSS('text-decoration-line', 'underline');
});

test('sticky navigation does not cover the lab and keyboard users can skip the hero', async ({ page }) => {
  await page.goto('labs/04-plugin.html');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to guide', exact: true });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#VPContent$/);
  await page.getByRole('tablist').scrollIntoViewIfNeeded();
  const sidebar = await page.locator('.VPSidebar').boundingBox();
  const navigation = await page.locator('.VPNav').boundingBox();
  expect(sidebar.y).toBeGreaterThanOrEqual(navigation.y + navigation.height);
  const content = await page.locator('.VPContent').boundingBox();
  expect(content.x).toBeGreaterThanOrEqual(sidebar.x + sidebar.width);
  const article = await page.locator('.vp-doc').boundingBox();
  expect(article.x - content.x).toBeLessThanOrEqual(40);
  await expect(page.locator('.VPNav')).toHaveCSS('background-color', 'rgb(13, 17, 23)');
});

test('setup and the complete lab route remain readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(new URL('start.html', baseURL).href);
    await expect(page.locator('.workshop-notice')).toContainText('All client instructions are visible');
    await expect(page.locator('.vp-doc pre').filter({ hasText: 'git clone' })).toContainText('https://example.invalid/no-workshop-push');
    for (const name of ['VS Code', 'Copilot CLI', 'Copilot app']) {
      await expect(page.locator('.vp-doc').getByRole('heading', { name: new RegExp(`^${name}`) })).toBeVisible();
    }
    await page.getByRole('link', { name: 'Browse every lab', exact: true }).click();
    await expect(page).toHaveURL(/\/copilot-user-search-workshop\/#progressive-route$/);
    await expect(page.locator('.vp-doc').getByRole('link', { name: /00.*Start/ })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  } finally {
    await context.close();
  }
});

test('print exposes every client and keeps code and tables readable', async ({ page }) => {
  await page.goto('labs/04-plugin.html?client=cli');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.VPNav')).toBeHidden();
  await expect(page.locator('.VPSidebar')).toBeHidden();
  await expect(page.getByRole('tablist')).toBeHidden();
  for (const client of ['vscode', 'cli', 'app']) {
    await expect(page.locator(`#client-panel-${client}`)).toBeVisible();
  }
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.vp-doc pre code').first()).toHaveCSS('white-space', 'pre-wrap');
  await expect(page.locator('.vp-doc pre code span').first()).toHaveCSS('color', 'rgb(0, 0, 0)');
  await page.goto('index.html');
  await expect(page.locator('.vp-doc table').first()).toHaveCSS('table-layout', 'fixed');
});
