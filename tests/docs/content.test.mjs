import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { linksIn, sectionsIn } from './markdown.mjs';

const root = process.cwd();
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.name.startsWith('.') ? [] : entry.isDirectory() ? walk(resolve(dir, entry.name)) :
    entry.name.endsWith('.md') ? [resolve(dir, entry.name)] : []);
const read = path => readFileSync(resolve(root, path), 'utf8');
const sourceUrl = 'https://github.com/frye/copilot-user-search-workshop';
const guideUrl = 'https://frye.github.io/copilot-user-search-workshop/';
const pushUrl = 'https://example.invalid/no-workshop-push';
const setupFiles = ['README.md', 'docs/start.md'];
const shellBlocks = text => [...text.matchAll(/^```sh\n([\s\S]*?)^```/gm)].map(match => match[1].trim());
const commands = block => block.split('\n').map(line => line.trim())
  .filter(line => line && !line.startsWith('#')).map(line => line.replace(/\s*&&$/, ''));
const links = text => [...text.matchAll(/\[[^\]]+\]\(([^)\s]+)\)/g)].map(match => match[1]);

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

test('Labs 00-08 use one activation per workspace and retain optional comparison separately', () => {
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.scripts['lab:activate'], 'node scripts/import-example.mjs --apply');
  assert.equal(pkg.scripts['lab:example'], 'node scripts/import-example.mjs');
  const steps = JSON.parse(read('workshop/steps.json')).steps.filter(step => !step.id.startsWith('09-'));
  for (const step of steps) {
    const file = `docs/labs/${step.id}.md`;
    const text = read(file);
    const section = sectionsIn(text).find(section => section.level === 3 && section.name === 'Bring in this step');
    assert.ok(section, `${file}: missing import route`);
    const actual = section.tokens.filter(token => token.type === 'fence' && token.info === 'sh')
      .flatMap(token => commands(token.content))
      .filter(command => /^npm run lab:/.test(command));
    const selectors = step.id === '05-mcp-and-update'
      ? [' --workspace author', ' --workspace consumer --client cli']
      : step.id === '06-agent-roles' ? [' --workspace consumer --client cli'] : [''];
    assert.deepEqual(actual, selectors.map(selector => `npm run lab:activate -- --step ${step.id}${selector}`), file);
    assert.ok(!section.tokens.some(token => /--preview|--stage|--apply/.test(token.content)),
      `${file}: no mandatory mode sequence`);
    assert.ok(links(text).includes('../reference/examples.md'), `${file}: comparison/recovery route`);
  }
  const reference = read('docs/reference/examples.md');
  for (const operation of ['--preview', '--stage', '--apply']) {
    assert.ok(shellBlocks(reference).flatMap(commands).includes(`npm run lab:example -- --step 03-skill ${operation}`));
  }
  assert.match(reference, /not a required sequence/);
  assert.match(reference, /changed: 0/);
  assert.match(reference, /rerunning is not a reset/);
  assert.match(reference, /Existing consumers are not silently\s+updated/);
  assert.ok(links(reference).includes('../labs/09-spec-kit.md'));
  assert.deepEqual(walk(resolve(root, 'docs/labs')).filter(file => /npm run lab:activate/.test(readFileSync(file, 'utf8')))
    .map(file => basename(file, '.md')).sort(), steps.map(step => step.id).sort());
});

test('VS Code plugin guidance leads with source installation and the absolute package root', () => {
  const files = [
    ['docs/labs/04-plugin.md', '1.0.0'],
    ['docs/labs/05-mcp-and-update.md', '1.1.0'],
    ['docs/labs/08-review-and-handoff.md', '1.2.0'],
    ['docs/clients.md', '1.0.0'],
    ['docs/reference/plugin.md', '1.0.0'],
  ];
  for (const [file, version] of files) {
    const section = read(file).split('### VS Code\n')[1].split('\n### ')[0];
    const steps = ['cogwheel', 'Open Customizations', 'Plugins', 'Install Plugin from Source'];
    let previous = -1;
    for (const step of steps) {
      const position = section.indexOf(step);
      assert.ok(position > previous, `${file}: missing or unordered UI step ${step}`);
      previous = position;
    }
    assert.ok(section.includes(`/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-${version}`), file);
    assert.match(section, /containing `plugin\.json`/);
    assert.match(section, /not.*nested `skills\/` directory/);
    assert.match(section, /approval/);
  }
  const reference = read('docs/reference/plugin.md');
  assert.ok(reference.indexOf('Install Plugin from Source') < reference.indexOf('chat.pluginLocations'));
  assert.match(reference, /instead of\*\* the UI installation, not in addition/);
  const compatibility = JSON.parse(read('workshop/compatibility.json'));
  assert.equal(compatibility.clients.vscode.plugin, 'chat-customizations-install-plugin-from-source');
});

test('intentional-red routing stays separate from final solution checks', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.ok(!pkg.scripts.test.includes('search') && !pkg.scripts.test.includes('stub'));
  assert.ok(pkg.scripts['verify:baseline'].includes('test:stub'));
  assert.ok(pkg.scripts['verify:solution'].includes('test:search') && !pkg.scripts['verify:solution'].includes('stub'));
  assert.ok(pkg.scripts['verify:speckit-solution'].includes('verify:solution'));
  assert.ok(pkg.scripts['verify:speckit-solution'].includes('test:team-filter'));
  for (const file of [...setupFiles, 'docs/labs/00-start.md']) {
    const text = read(file);
    assert.match(text, /501/);
    assert.match(text, /Lab 07/);
    assert.match(text, /npm run test:search/);
    assert.match(text, /(?:npm run )?verify:solution/);
  }
});

test('setup clones main into a fresh author path and disables source pushes before branching', () => {
  const expected = [
    'cd /path/to/approved-workshop-parent',
    'test ! -e user-search-author',
    'test ! -L user-search-author',
    `git clone --branch main ${sourceUrl} user-search-author`,
    'cd user-search-author',
    `git remote set-url --push origin ${pushUrl}`,
    'git switch -c workshop-my-client',
  ];
  for (const file of setupFiles) {
    const blocks = shellBlocks(read(file)).filter(block => /^git clone /m.test(block));
    assert.equal(blocks.length, 1, `${file}: one canonical clone route`);
    assert.deepEqual(commands(blocks[0]), expected, `${file}: fresh main clone, cd, push guard, then branch`);
    const lines = blocks[0].split('\n');
    assert.ok(lines.slice(0, -1).every(line => line.endsWith(' &&')), `${file}: stop on clone/setup failure`);
    assert.doesNotMatch(blocks[0], /--(?:depth|shallow|single-branch|no-tags|filter|force)|git (?:reset|clean|push|checkout)/);
    const allCommands = shellBlocks(read(file)).flatMap(commands);
    assert.ok(!allCommands.some(command => /^npm run consumer:create/.test(command)), `${file}: consumer is created later`);
  }
});

test('both setup routes require exact tools and explicit dependency, preflight and baseline commands', () => {
  const expected = ['node --version', 'npm --version', 'npm ci', 'npm run preflight', 'npm run verify:baseline'];
  for (const file of setupFiles) {
    const text = read(file);
    const plain = text.replaceAll('**', '');
    assert.match(plain, /Node 24\.20\.0\s*\/\s*npm 11\.19\.0/);
    assert.match(plain, /[Ll]ocal Git/);
    assert.match(plain, /approved source-read access/);
    assert.match(plain, /package-registry access for `npm ci`/);
    assert.match(plain, /entitled supported client/);
    const block = shellBlocks(text).find(value => commands(value).includes('npm run preflight'));
    assert.ok(block, `${file}: explicit readiness block`);
    assert.deepEqual(commands(block), expected, `${file}: complete readiness sequence`);
    assert.ok(block.split('\n').slice(0, -1).every(line => line.endsWith(' &&')), `${file}: failed readiness stops`);
    assert.ok(shellBlocks(text).some(value =>
      JSON.stringify(commands(value)) === JSON.stringify(['npm run build', 'npm start'])), `${file}: build before API start`);
    assert.match(text, /127\.0\.0\.1:3000\/health/);
    assert.match(text, /(?:Stop|stop).*Ctrl\+C before switching workspaces/);
  }
});

test('setup verifies annotated local tags against unchanged reviewed locks without a network workaround', () => {
  const examples = JSON.parse(read('workshop/examples-lock.json'));
  const starter = JSON.parse(read('workshop/starter-lock.json'));
  assert.deepEqual([examples.tag, examples.commit, examples.approvedOrigin],
    ['examples-v1', 'df1328a4c1b9de89bdba5854a75f55fc42ba872d', null]);
  assert.deepEqual([starter.tag, starter.commit],
    ['starter-v2', '1afbf9be347343dc15bb390f4ac843dca44ce034']);
  const expected = [examples, starter].flatMap(({ tag, commit }) => [
    `test "$(git cat-file -t refs/tags/${tag})" = tag`,
    `test "$(git rev-parse --verify 'refs/tags/${tag}^{commit}')" = ${commit}`,
  ]).concat('npm run lab:examples:fetch');
  for (const file of setupFiles) {
    const text = read(file);
    const block = shellBlocks(text).find(value => commands(value).includes('npm run lab:examples:fetch'));
    assert.ok(block, `${file}: explicit local ref verification`);
    assert.deepEqual(commands(block), expected, `${file}: verify tag type and peeled lock commits before manifest`);
    assert.ok(block.split('\n').slice(0, -1).every(line => line.endsWith(' &&')), `${file}: mismatch must stop`);
    assert.doesNotMatch(block, /git (?:fetch|tag)|--approve-network|\beval\b|\bsource\b/);
    assert.match(text, /owner-reviewed (?:Git )?bundle/);
    assert.match(text, /fresh clone under existing\s+source-read approval/);
    assert.match(text, /approvedOrigin.*null/);
  }
});

test('local-only setup preserves author/consumer, policy, evidence and no-submission boundaries', () => {
  for (const file of setupFiles) {
    const text = read(file).replace(/^>\s?/gm, '').replace(/\s+/g, ' ');
    assert.match(text, /No fork, personal upstream, push, PR, cloud task, or submission is required/i);
    assert.match(text, /not\*\* API, PR, or cloud safety\s+enforcement/);
    assert.match(text, /(?:shared source|source is read-only)/);
    assert.match(text, /(?:parent directory|parent) without `\.github` customizations/);
    assert.match(text, /inherited customizations from ancestors/);
    assert.match(text, /(?:overwrite existing paths\/branches|overwrite,\s+or blindly reconfigure existing learner work)/);
    assert.match(text, /consumer:create/);
    assert.match(text, /\.\.\/workshop-consumer/);
    assert.match(text, /removes (?:its|consumer) origin/);
    assert.match(text, /(?:Never nest consumer inside author|siblings, never nested)/);
    assert.match(text, /(?:maintains the canonical skill\/package)/);
    assert.match(text, /No submission does \*\*not\*\* make (?:required )?lab evidence or checkpoint prerequisites optional/);
    assert.match(text, /\.lab-evidence\//);
    assert.match(text, /artifact-only/);
    assert.match(text, /approved pairing/);
  }
});

test('published links are accurate while future releases remain approval-gated', () => {
  for (const file of [...setupFiles, 'docs/reference/examples.md', 'docs/reference/publication.md', 'presenter/runbook.md']) {
    const text = read(file);
    assert.ok(links(text).includes(sourceUrl), `${file}: published source link`);
    assert.ok(links(text).includes(guideUrl), `${file}: live guide link`);
    assert.doesNotMatch(text, /there is no live guide URL|Pages is prepared but|owner\/name\/visibility.*undecided|current state is.*local only/i);
  }
  const publication = read('docs/reference/publication.md');
  for (const gate of ['workflow_dispatch', 'PAGES_APPROVED', 'github-pages', 'explicit approval input']) {
    assert.ok(publication.includes(gate), `missing future publication gate: ${gate}`);
  }
  assert.match(publication, /owner approval/);
  assert.match(publication, /tags immutable/);
  assert.match(publication, /Do not dispatch until approvals and environment protection exist/);
  assert.match(publication, /historical presenter evidence remains a record/);
  assert.match(read('README.md'), /existing public source and live guide do not approve any new release or deployment/i);
});

test('setup and local-preview source fallback retain their linked anchors and plain Markdown', () => {
  const start = read('docs/start.md');
  assert.ok(/^# Start here$/m.test(start) || /<a id="start-here"><\/a>/.test(start));
  const examples = read('docs/reference/examples.md');
  assert.match(examples, /<a id="not-published"><\/a>\s+## Source links in local previews/);
  assert.doesNotMatch(examples, /^## Not published$/m);
  assert.match(examples, /local build has no `WORKSHOP_SOURCE_URL` configured/);
  assert.ok(shellBlocks(examples).some(block => commands(block).includes(
    `WORKSHOP_BASE=/copilot-user-search-workshop/ WORKSHOP_SOURCE_URL=${sourceUrl} npm run docs:build`)));
  for (const client of ['VS Code', 'Copilot CLI', 'Copilot app']) {
    assert.ok(start.includes(`### ${client}`), `setup missing plain ${client} heading`);
  }
});

test('Lab 09 provides artifact-first Spec Kit guidance and a separate built-in workflow comparison', () => {
  const lab = readFileSync('docs/labs/09-spec-kit.md', 'utf8');
  const labCommands = shellBlocks(lab).flatMap(commands);
  for (const operation of ['--preview', '--stage', '--apply']) {
    assert.ok(labCommands.includes(`node scripts/spec-kit-reference.mjs ${operation}`));
  }
  for (const operation of ['--preview', '--apply']) {
    assert.ok(labCommands.includes(`npm run lab:09:bootstrap -- ${operation} --destination ../user-search-lab-09`));
  }
  assert.doesNotMatch(lab, /npm run lab:activate/);
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
