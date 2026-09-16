import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const labIds = JSON.parse(readFileSync(new URL('../../workshop/steps.json', import.meta.url), 'utf8')).steps.map(step => step.id);
const routeKeys = ['build', 'copy', 'import'];

async function expectRoute(page, key) {
  await expect(page.getByRole('tablist', { name: 'Authoring route', exact: true })).toHaveCount(1);
  for (const candidate of routeKeys) {
    await expect(page.locator(`#route-tab-${candidate}`)).toHaveAttribute('aria-selected', String(candidate === key));
    if (candidate === key) await expect(page.locator(`#route-panel-${candidate}`)).toBeVisible();
    else await expect(page.locator(`#route-panel-${candidate}`)).toBeHidden();
  }
}

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
  for (const key of routeKeys) await expect(page.locator(`#route-panel-${key}`)).toBeVisible();
});

test('no JavaScript exposes every client instruction, and assets work at repository subpath', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const failed = [];
  page.on('response', response => { if (response.status() >= 400) failed.push(response.url()); });
  await page.goto('http://127.0.0.1:4173/copilot-user-search-workshop/labs/04-plugin.html');
  for (const name of ['VS Code', 'Copilot CLI', 'Copilot app']) {
    await expect(page.locator('.vp-doc').getByRole('heading', { name: new RegExp(`^${name}`) })).toBeVisible();
  }
  expect(failed).toEqual([]);
  await context.close();
});

test('SPA navigation enhances the next lab once and links with client anchors work', async ({ page }) => {
  await page.goto('labs/03-skill.html#copilot-cli');
  await expect(page.getByRole('tab', { name: 'Copilot CLI', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.locator('.vp-doc').getByRole('link', { name: '04 — Plugin', exact: true }).click();
  await expect(page.getByRole('tablist')).toHaveCount(2);
  await expect(page.getByRole('tab', { name: 'Copilot CLI', exact: true })).toHaveAttribute('aria-selected', 'true');
});

test('changing an anchor-selected client yields a reloadable direct link', async ({ page }) => {
  await page.goto('labs/04-plugin.html#copilot-cli');
  await page.getByRole('tab', { name: 'Copilot app', exact: true }).click();
  await expect(page).toHaveURL(/client=app#copilot-app$/);
  await page.reload();
  await expect(page.getByRole('tab', { name: 'Copilot app', exact: true })).toHaveAttribute('aria-selected', 'true');
});

test('Lab 01 exposes exact filenames and copies a complete scoped instruction file', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('labs/01-instructions.html');
  await page.getByRole('tab', { name: 'Copy & Paste', exact: true }).click();
  const copy = page.locator('#route-panel-copy');
  for (const path of [
    '.github/copilot-instructions.md',
    '.github/instructions/api.instructions.md',
    '.github/instructions/tests.instructions.md',
  ]) {
    await expect(copy.getByText(path, { exact: true }).first()).toBeVisible();
  }
  const api = copy.locator('pre').filter({ hasText: 'applyTo: "src/api/**/*.ts"' }).first();
  await expect(api).toBeVisible();
  const content = await api.textContent();
  expect(content).toMatch(/^---\napplyTo: "src\/api\/\*\*\/\*\.ts"\n---/);
  expect(content).toMatch(/approval/i);
  await api.locator('..').getByRole('button', { name: 'Copy Code' }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(content);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('copyable artifacts and prompts remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto('http://127.0.0.1:4173/copilot-user-search-workshop/labs/01-instructions.html');
    const guide = page.locator('.vp-doc');
    for (const name of ['Build it yourself', 'Copy-and-paste', 'Bring in this step']) {
      await expect(guide.getByRole('heading', { name: new RegExp(`^${name}`) })).toBeVisible();
    }
    await expect(guide.getByRole('heading', { name: /^Copy-and-paste/ })).toBeVisible();
    await expect(guide.getByRole('heading', { name: /^Try it/ })).toBeVisible();
    await expect(guide.locator('pre').filter({ hasText: 'applyTo: "src/api/**/*.ts"' }).first()).toBeVisible();
    await expect(guide.locator('pre').filter({ hasText: 'applyTo: "tests/**/*.ts"' }).first()).toBeVisible();
    for (const client of ['VS Code', 'Copilot CLI', 'Copilot app']) {
      await expect(guide.getByRole('heading', { name: new RegExp(`^${client}`) })).toBeVisible();
    }
    await page.goto('http://127.0.0.1:4173/copilot-user-search-workshop/labs/05-mcp-and-update.html');
    await expect(page.locator('.vp-doc pre').filter({ hasText: '"workshop-standards"' }).first()).toBeVisible();
  } finally {
    await context.close();
  }
});

test('first visit defaults to import and keeps the selector before long inventories', async ({ page }) => {
  await page.goto('labs/01-instructions.html');
  await expectRoute(page, 'import');
  await expect(page.locator('#client-tab-vscode')).toHaveAttribute('aria-selected', 'true');
  expect(await page.evaluate(() => localStorage.getItem('workshop-route'))).toBe('import');
  expect(await page.locator('.vp-doc').evaluate(root => {
    const headings = [...root.querySelectorAll('h2')];
    return headings.slice(0, 2).map(node => node.id);
  })).toEqual(['goal-and-starting-workspace', 'choose-your-route']);
});

test('route and client choices persist independently across lab links, sidebar, previous and reload', async ({ page }) => {
  await page.goto('labs/01-instructions.html');
  await page.locator('#route-tab-copy').click();
  await page.locator('#client-tab-cli').click();
  await page.locator('.vp-doc').getByRole('link', { name: '02 — Prompt', exact: true }).click();
  await expect(page).toHaveURL(/02-planning-prompt\.html/);
  await expectRoute(page, 'copy');
  await expect(page.locator('#client-tab-cli')).toHaveAttribute('aria-selected', 'true');
  await page.locator('.VPSidebar').getByRole('link', { name: '03 — Skill', exact: true }).click();
  await expect(page).toHaveURL(/03-skill\.html/);
  await page.reload();
  await expectRoute(page, 'copy');
  await expect(page.locator('#client-tab-cli')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tablist')).toHaveCount(2);
  await page.goto('labs/04-plugin.html');
  await expectRoute(page, 'copy');
  await page.locator('.pager-link.prev').click();
  await expect(page).toHaveURL(/03-skill\.html/);
  await expectRoute(page, 'copy');
  await page.locator('#client-tab-app').click();
  await expectRoute(page, 'copy');
  await page.locator('#route-tab-build').click();
  await expect(page.locator('#client-tab-app')).toHaveAttribute('aria-selected', 'true');
});

test('route deep links override saved choices and preserve independent URL parameters and anchors', async ({ page }) => {
  await page.goto('labs/01-instructions.html?route=build&client=app&example=kept#copy-and-paste');
  await expectRoute(page, 'copy');
  await expect(page.locator('#client-tab-app')).toHaveAttribute('aria-selected', 'true');
  expect(new URL(page.url()).searchParams.get('route')).toBe('copy');
  await page.locator('#route-tab-build').click();
  expect(new URL(page.url()).hash).toBe('#build-it-yourself');
  expect(new URL(page.url()).searchParams.get('example')).toBe('kept');
  await page.locator('#client-tab-cli').click();
  expect(new URL(page.url()).hash).toBe('#build-it-yourself');
  await page.reload();
  await expectRoute(page, 'build');
  await expect(page.locator('#client-tab-cli')).toHaveAttribute('aria-selected', 'true');
  await page.goto('labs/02-planning-prompt.html?route=import&client=cli#verify-the-result');
  await page.locator('#route-tab-copy').click();
  expect(new URL(page.url()).hash).toBe('#verify-the-result');
  expect(new URL(page.url()).searchParams.get('client')).toBe('cli');
});

test('same-page links reveal hidden descendants and history restores explicit route choices', async ({ page }) => {
  await page.goto('labs/06-agent-roles.html?route=build&client=app');
  const headingId = await page.locator('#route-panel-copy h4[id]').first().getAttribute('id');
  expect(headingId).toBeTruthy();
  await page.locator('.vp-doc').evaluate((root, id) => {
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = 'Open a copy-route reference';
    root.prepend(link);
  }, headingId);
  await page.getByRole('link', { name: 'Open a copy-route reference', exact: true }).click();
  await expectRoute(page, 'copy');
  await expect(page.locator(`#${headingId}`)).toBeInViewport();
  expect(new URL(page.url()).searchParams.get('route')).toBe('copy');
  await page.locator('#route-panel-copy a[href="#continue-with-this-lab"]').last().click();
  await expectRoute(page, 'copy');
  await page.goBack();
  await expectRoute(page, 'copy');
  await page.goBack();
  await expectRoute(page, 'build');
  await page.goForward();
  await expectRoute(page, 'copy');
  await expect(page.locator('#client-tab-app')).toHaveAttribute('aria-selected', 'true');
});

test('every lab keeps common activities and evidence visible for all three preparation choices', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const id of labIds) {
    await page.goto(`labs/${id}.html`);
    for (const key of routeKeys) {
      await page.locator(`#route-tab-${key}`).click();
      await expectRoute(page, key);
      await expect(page.getByRole('tablist')).toHaveCount(2);
      for (const heading of ['continue-with-this-lab', 'client-steps', 'try-it', 'verify-the-result']) {
        const element = page.locator(`.vp-doc #${heading}`);
        await expect(element).toBeVisible();
        expect(await element.evaluate(node => node.closest('[data-route-tabs]') === null)).toBe(true);
      }
      const evidence = page.locator('.vp-doc p').filter({ hasText: 'File:' }).filter({ hasText: `.lab-evidence/${id}.md` }).first();
      await expect(evidence).toBeVisible();
      expect(await evidence.evaluate(node => node.closest('[data-route-tabs]') === null)).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test('route tabs support keyboard focus, wrapping and narrow screens without changing client choice', async ({ page }) => {
  await page.goto('labs/01-instructions.html?client=cli');
  await page.locator('#route-tab-import').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#route-tab-build')).toBeFocused();
  await expectRoute(page, 'build');
  await page.keyboard.press('ArrowRight');
  await expectRoute(page, 'copy');
  await page.keyboard.press('End');
  await expectRoute(page, 'import');
  await page.keyboard.press('Home');
  await expectRoute(page, 'build');
  await page.keyboard.press('ArrowLeft');
  await expectRoute(page, 'import');
  await expect(page.locator('#client-tab-cli')).toHaveAttribute('aria-selected', 'true');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const key of routeKeys) await expect(page.locator(`#route-tab-${key}`)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('invalid URL or saved preferences use a valid saved route or the import default', async ({ page }) => {
  await page.goto('labs/01-instructions.html');
  await page.locator('#route-tab-build').click();
  await page.goto('labs/02-planning-prompt.html?route=invalid');
  await expectRoute(page, 'build');
  await page.evaluate(() => {
    localStorage.setItem('workshop-route', 'unknown');
    localStorage.setItem('workshop-client', 'unknown');
  });
  await page.goto('labs/03-skill.html?route=invalid&client=invalid#invalid%fragment');
  await expectRoute(page, 'import');
  await expect(page.locator('#client-tab-vscode')).toHaveAttribute('aria-selected', 'true');
});

test('storage denial is disclosed without breaking route choice or SPA navigation', async ({ page, context }) => {
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() { throw new DOMException('Storage disabled for this test', 'SecurityError'); },
    });
  });
  await page.goto('labs/01-instructions.html');
  await expectRoute(page, 'import');
  await expect(page.locator('[data-route-tabs] [role="status"]')).toContainText('cannot be saved');
  await page.locator('#route-tab-copy').click();
  await page.reload();
  await expectRoute(page, 'copy');
  await page.locator('.vp-doc').getByRole('link', { name: '02 — Prompt', exact: true }).click();
  await expectRoute(page, 'copy');
  await expect(page.locator('[data-route-tabs] [role="status"]')).toBeVisible();
});

test('the tab engine preserves introductions and can re-enhance the same content safely', async ({ page }) => {
  const source = readFileSync(new URL('../../docs/.vitepress/theme/tabs.mjs', import.meta.url), 'utf8');
  await page.route('**/tab-engine.mjs', route => route.fulfill({ contentType: 'text/javascript', body: source }));
  await page.route('**/tab-fixture.html*', route => route.fulfill({
    contentType: 'text/html',
    body: `<!doctype html><div class="vp-doc">
      <h2 id="choose-your-route">Choose your route</h2><p id="route-intro">Choose one route.</p>
      <h3 id="build-it-yourself">Build it yourself</h3><p>Author the files.</p>
      <h3 id="copy-and-paste">Copy-and-paste</h3><h4 id="copy-reference">Copy reference</h4>
      <h3 id="bring-in-this-step">Bring in this step</h3><p>Review the import.</p>
      <h2 id="continue-with-this-lab">Continue with this lab</h2>
      <a href="#copy-reference">Open the copy reference</a>
      <h2 id="client-steps">Client steps</h2><p id="client-intro">Choose your client.</p>
      <h3 id="vs-code">VS Code</h3><p>VS Code steps</p>
      <h3 id="copilot-cli">Copilot CLI</h3><p>CLI steps</p>
      <h3 id="copilot-app">Copilot app</h3><p>App steps</p>
      <h2 id="verify-the-result">Verify the result</h2><p>Shared verification.</p>
      </div><script type="module">
      import { enhanceTabs } from './tab-engine.mjs';
      let cleanup;
      window.refreshTabGroups = () => {
        cleanup?.();
        cleanup = enhanceTabs(document, window);
      };
      window.refreshTabGroups();
      </script>`,
  }));
  await page.goto('tab-fixture.html?client=cli');
  await expectRoute(page, 'import');
  await page.locator('#route-tab-copy').click();
  await page.evaluate(() => {
    for (let index = 0; index < 3; index++) window.refreshTabGroups();
  });
  await expectRoute(page, 'copy');
  await expect(page.getByRole('tablist')).toHaveCount(2);
  for (const id of ['route-intro', 'client-intro']) {
    expect(await page.locator(`#${id}`).evaluate(node => node.closest('[role="tabpanel"]'))).toBe(null);
  }
  await page.locator('#route-tab-build').click();
  await page.getByRole('link', { name: 'Open the copy reference', exact: true }).click();
  await expectRoute(page, 'copy');
  await expect(page.locator('#copy-reference')).toBeVisible();
  await expect(page.locator('#client-tab-cli')).toHaveAttribute('aria-selected', 'true');
});
