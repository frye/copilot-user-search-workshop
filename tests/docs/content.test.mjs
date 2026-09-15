import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const root = process.cwd();
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.name.startsWith('.') ? [] : entry.isDirectory() ? walk(resolve(dir, entry.name)) :
    entry.name.endsWith('.md') ? [resolve(dir, entry.name)] : []);

test('canonical Markdown has real local links, complete lab routes and plain client headings', () => {
  const files = walk(resolve(root, 'docs'));
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!/<(?:ClientTabs|script|template)|::: tabs/.test(text), `Vue-only instructions in ${file}`);
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g)) {
      const href = match[1];
      if (/^(?:https?:|#|mailto:)/.test(href) || href.startsWith('../../../../tree/examples/')) continue;
      const target = resolve(dirname(file), href.split('#')[0]);
      assert.ok(existsSync(target), `${file}: missing ${href}`);
    }
    if (file.includes('/labs/')) {
      for (const heading of ['Goal and starting workspace', 'Build it yourself', 'Inspect the example', 'Bring in this step', 'If you already changed these files', 'Verify the result', 'Client steps']) {
        assert.ok(text.includes(`## ${heading}`), `${file}: missing ${heading}`);
      }
      for (const client of ['VS Code', 'Copilot CLI', 'Copilot app']) assert.ok(text.includes(`### ${client}`));
      for (const operation of ['--preview', '--stage', '--apply']) assert.ok(text.includes(operation));
    }
  }
});

test('toolchain, intentional-red routing and no active complete starter assets are explicit', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.ok(!pkg.scripts.test.includes('search') && !pkg.scripts.test.includes('stub'));
  assert.ok(pkg.scripts['verify:baseline'].includes('test:stub'));
  assert.ok(pkg.scripts['verify:solution'].includes('test:search') && !pkg.scripts['verify:solution'].includes('stub'));
  assert.match(readFileSync('README.md', 'utf8'), /not published/);
});
