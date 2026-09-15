import { test, expect } from '@playwright/test';

test('real tabs select, persist, link directly, navigate by keyboard and print all', async ({ page }) => {
  await page.goto('labs/04-plugin.html?client=cli');
  const cli = page.getByRole('tab', { name: 'Copilot CLI', exact: true });
  await expect(cli).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#client-panel-vscode')).toBeHidden();
  await cli.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Copilot app', exact: true })).toBeFocused();
  await expect(page).toHaveURL(/client=app/);
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'VS Code', exact: true })).toBeFocused();
  await page.keyboard.press('End');
  await page.goto('labs/05-mcp-and-update.html');
  await expect(page.getByRole('tab', { name: 'Copilot app', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('tab', { name: 'Copilot CLI', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.emulateMedia({ media: 'print' });
  for (const key of ['cli', 'app', 'vscode']) await expect(page.locator(`#client-panel-${key}`)).toBeVisible();
});

test('no JavaScript exposes every client instruction, and assets work at repository subpath', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const failed = [];
  page.on('response', response => { if (response.status() >= 400) failed.push(response.url()); });
  await page.goto('http://127.0.0.1:4173/copilot-user-search-workshop/labs/04-plugin.html');
  for (const name of ['VS Code', 'Copilot CLI', 'Copilot app']) {
    await expect(page.locator('.vp-doc').getByRole('heading', { name, exact: true })).toBeVisible();
  }
  expect(failed).toEqual([]);
  await context.close();
});

test('SPA navigation enhances the next lab once and links with client anchors work', async ({ page }) => {
  await page.goto('labs/03-skill.html#copilot-cli');
  await expect(page.getByRole('tab', { name: 'Copilot CLI', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.locator('.vp-doc').getByRole('link', { name: '04 — Plugin', exact: true }).click();
  await expect(page.getByRole('tablist')).toHaveCount(1);
  await expect(page.getByRole('tab', { name: 'Copilot CLI', exact: true })).toHaveAttribute('aria-selected', 'true');
});
