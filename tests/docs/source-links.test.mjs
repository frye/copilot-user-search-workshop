import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress';

const repository = 'https://github.com/frye/copilot-user-search-workshop';
const pages = ['docs/index.md', 'docs/start.md', 'docs/reference/sources.md'];
const examplePath = 'tree/examples/examples/steps/03-skill';
let configId = 0;

async function loadConfig(source, base = '/copilot-user-search-workshop/') {
  const previous = {
    WORKSHOP_SOURCE_URL: process.env.WORKSHOP_SOURCE_URL,
    WORKSHOP_BASE: process.env.WORKSHOP_BASE,
  };
  if (source === undefined) delete process.env.WORKSHOP_SOURCE_URL;
  else process.env.WORKSHOP_SOURCE_URL = source;
  process.env.WORKSHOP_BASE = base;
  try {
    const url = new URL('../../docs/.vitepress/config.mts', import.meta.url);
    url.searchParams.set('test', String(configId++));
    return (await import(url.href)).default;
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function assertRepositoryLinks(config, expected) {
  const reference = config.themeConfig.sidebar.find(group => group.text === 'Reference');
  assert.deepEqual(reference.items.filter(item => item.text === 'Source repository'), [
    { text: 'Source repository', link: expected },
  ]);
  const md = await createMarkdownRenderer(resolve('docs'), config.markdown, config.base);
  for (const page of pages) {
    const html = md.render(readFileSync(page, 'utf8'));
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>Source repository<\/a>/g)];
    assert.deepEqual(links.map(match => match[1]), [expected], page);
  }
  return md;
}

afterEach(() => disposeMdItInstance());

test('plain Markdown exposes the source repository before the first section on each entry page', () => {
  for (const page of pages) {
    const introduction = readFileSync(page, 'utf8').split('\n## ')[0];
    assert.ok(introduction.includes(`[Source repository](${repository})`), page);
  }
});

test('default quick links use the repository without enabling hosted examples', async () => {
  const config = await loadConfig();
  const md = await assertRepositoryLinks(config, repository);
  assert.ok(md.render(`[Example](../../../../${examplePath})`).includes(
    'href="/copilot-user-search-workshop/reference/examples.html#not-published"',
  ));
});

test('source override updates page and Reference links without changing unrelated destinations', async () => {
  const source = 'https://github.com/example/approved-workshop';
  const config = await loadConfig(source, '/custom-workshop/');
  const md = await assertRepositoryLinks(config, source);
  assert.ok(md.render(`[Example](../../../../${examplePath})`).includes(`href="${source}/${examplePath}"`));
  for (const href of ['https://docs.github.com/en/copilot', `${repository}/blob/main/README.md`, `${repository}#readme`]) {
    assert.ok(md.render(`[Unrelated](${href})`).includes(`href="${href}"`));
  }
  assert.ok(md.render('[Contract](/reference/contract.md)').includes('href="/custom-workshop/reference/contract.html"'));
});

test('empty source override retains default quick links and the custom-base example fallback', async () => {
  const config = await loadConfig('', '/custom-workshop/');
  const md = await assertRepositoryLinks(config, repository);
  assert.ok(md.render(`[Example](../../../../${examplePath})`).includes(
    'href="/custom-workshop/reference/examples.html#not-published"',
  ));
});

test('invalid source overrides fail explicitly rather than falling back to the repository', async () => {
  for (const source of [
    'http://github.com/example/workshop',
    'https://example.com/workshop',
    'https://github.com/example/workshop/tree/main',
    'https://github.com/example/workshop/',
  ]) {
    await assert.rejects(loadConfig(source), /WORKSHOP_SOURCE_URL must be an approved GitHub repository URL/);
  }
});
