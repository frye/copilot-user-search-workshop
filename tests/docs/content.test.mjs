import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { linksIn, sectionsIn } from './markdown.mjs';

const root = process.cwd();
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.name.startsWith('.') ? [] : entry.isDirectory() ? walk(resolve(dir, entry.name)) :
    entry.name.endsWith('.md') ? [resolve(dir, entry.name)] : []);

test('canonical Markdown has real local links, complete lab routes and plain client headings', () => {
  const files = walk(resolve(root, 'docs'));
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    assert.ok(!/<(?:ClientTabs|script|template)|::: tabs/.test(text), `Vue-only instructions in ${file}`);
    for (const href of linksIn(text)) {
      if (/^(?:https?:|#|mailto:)/.test(href) || href.startsWith('../../../../tree/examples/')) continue;
      const target = resolve(dirname(file), href.split('#')[0]);
      assert.ok(existsSync(target), `${file}: missing ${href}`);
    }
    if (file.includes('/labs/')) {
      const sections = sectionsIn(text);
      const top = sections.filter(section => section.level === 2);
      for (const heading of ['Goal and starting workspace', 'Choose your route', 'Continue with this lab', 'Try it', 'Verify the result', 'Client steps']) {
        assert.equal(top.filter(section => section.name === heading).length, 1, `${file}: missing/duplicate ${heading}`);
      }
      for (const operation of ['--preview', '--stage', '--apply']) assert.ok(text.includes(operation));
      assert.deepEqual(top.slice(0, 2).map(section => section.name),
        ['Goal and starting workspace', 'Choose your route'], `${file}: put the route choice near the top`);
      assert.ok(!top[0].tokens.some(token => token.type === 'table_open'),
        `${file}: long inventories belong after the route selector`);
      const route = top.find(section => section.name === 'Choose your route');
      const children = section => sections.filter(child =>
        child.level === 3 && child.start > section.start && child.start < section.end);
      assert.deepEqual(children(route).map(section => section.name),
        ['Build it yourself', 'Copy-and-paste', 'Bring in this step'], `${file}: exactly three alternate routes required`);
      assert.equal(top.find(section => section.name === 'Continue with this lab').start, route.end,
        `${file}: shared continuation must immediately follow the route group`);
      for (const name of ['Client steps', 'Try it', 'Verify the result']) {
        assert.ok(top.find(section => section.name === name).start >= route.end,
          `${file}: ${name} must be shared, not part of an authoring route`);
      }
      for (const section of children(route)) {
        assert.ok(section.tokens.some(token => (token.children ?? []).some(child =>
          child.type === 'link_open' && child.attrGet('href') === '#continue-with-this-lab')),
        `${file}: ${section.name} must lead to the shared continuation`);
      }
      const labels = route.tokens.filter(token => token.type === 'inline' && token.content.startsWith('**File:**'));
      assert.ok(!labels.some(token => token.content.includes('`.lab-evidence/')),
        `${file}: evidence templates must be available to every route`);
      assert.ok(!labels.some(token => /;\s*revision/.test(token.content)),
        `${file}: later revision exercises must be shared`);
      if (file.endsWith('/08-review-and-handoff.md')) {
        assert.ok(!labels.some(token => /`(?:toolkit\/|\.github\/skills\/)/.test(token.content)),
          'Lab 08 must review the defect before applying its shared 1.2.0 improvement');
      }
      const sharedCommands = /^npm (?:ci|test|run (?:build|preflight|verify:baseline|verify:solution|verify:speckit-solution|test:search|test:team-filter|toolkit:build|consumer:create))(?:\s|$)/m;
      assert.ok(!route.tokens.some(token => token.type === 'fence' && token.info === 'sh' && sharedCommands.test(token.content)),
        `${file}: run/build/verify commands belong below the alternative preparation routes`);
      for (const name of ['Inspect the example', 'If you already changed these files']) {
        assert.ok(sections.some(section => section.name === name), `${file}: missing ${name}`);
      }
      const clients = top.find(section => section.name === 'Client steps');
      assert.deepEqual(children(clients).map(section => section.name),
        ['VS Code', 'Copilot CLI', 'Copilot app'], `${file}: client tabs require exactly three headings`);
      const clientTokens = clients.tokens;
      assert.ok(clientTokens.filter(token => token.type === 'ordered_list_open').length >= 3,
        `${file}: each client needs numbered actions`);
    }
  }
});

test('toolchain, intentional-red routing and no active complete starter assets are explicit', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.ok(!pkg.scripts.test.includes('search') && !pkg.scripts.test.includes('stub'));
  assert.ok(pkg.scripts['verify:baseline'].includes('test:stub'));
  assert.ok(pkg.scripts['verify:solution'].includes('test:search') && !pkg.scripts['verify:solution'].includes('stub'));
  assert.ok(pkg.scripts['verify:speckit-solution'].includes('verify:solution'));
  assert.ok(pkg.scripts['verify:speckit-solution'].includes('test:team-filter'));
  assert.match(readFileSync('README.md', 'utf8'), /not published/);
});

test('Lab 09 provides artifact-first Spec Kit guidance and a separate built-in workflow comparison', () => {
  const lab = readFileSync('docs/labs/09-spec-kit.md', 'utf8');
  assert.doesNotMatch(lab, /unavailable in this release/i);
  assert.match(lab, /requires no Spec Kit installation/i);
  assert.match(lab, /uv tool install specify-cli/);
  assert.match(lab, /specify init --here --force --non-interactive --integration copilot --script sh/);
  for (const command of ['speckit-constitution', 'speckit-specify', 'speckit-clarify', 'speckit-plan', 'speckit-checklist', 'speckit-tasks', 'speckit-analyze', 'speckit-implement', 'speckit-converge']) {
    assert.match(lab, new RegExp(command));
  }
  assert.match(lab, /spec-kit-vs-built-in/);
  assert.ok(existsSync('workshop/spec-kit-reference/001-team-filter/provenance.json'));
});
