import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { artifactsIn, linksIn } from './markdown.mjs';
import { git, safePath } from '../../scripts/lib/safe.mjs';
import { packageToolkit, validateSkill, verifyPackage } from '../../scripts/lib/toolkit.mjs';

const root = process.cwd();
const skill = '.github/skills/api-change-workflow';
const review = 'workshop/artifacts/review';
const read = path => readFileSync(resolve(root, path), 'utf8');
const steps = JSON.parse(read('workshop/steps.json')).steps.map(step => step.id);
const labs = new Map(steps.map(step => {
  const text = read(`docs/labs/${step}.md`);
  return [step, { text, blocks: artifactsIn(text) }];
}));
const expected = [
  ['workshop/artifacts/setup-checklist.md'],
  ['.github/copilot-instructions.md', '.github/instructions/api.instructions.md', '.github/instructions/tests.instructions.md'],
  ['.github/prompts/plan-api-change.prompt.md'],
  [`${skill}/SKILL.md`, `${skill}/references/review-checklist.md`],
  ['toolkit/plugin.json', 'toolkit/catalog.md'],
  [`${skill}/SKILL.md`, `${skill}/references/review-checklist.md`, 'toolkit/plugin.json', 'toolkit/catalog.md',
    'client-configs/vscode.mcp.json', 'client-configs/cli-mcp.md', 'client-configs/app-mcp.md'],
  ['.github/agents/workshop-planner.agent.md', '.github/agents/workshop-implementer.agent.md', '.github/agents/workshop-reviewer.agent.md'],
  ['workshop/artifacts/toolkit-checkpoint.md'],
  [`${review}/total-after-limit.mjs`, `${review}/probe.mjs`, `${review}/review-rubric.md`, `${review}/continuation-brief.md`,
    `${skill}/references/review-checklist.md`, 'toolkit/plugin.json', 'toolkit/catalog.md'],
  ['workshop/artifacts/spec-kit-checkpoint.md'],
];

function initialBlocks(step) {
  return labs.get(step).blocks.filter(block =>
    !block.qualifiers.some(qualifier => qualifier.startsWith('revision')));
}

function writeFixtureFile(directory, path, content) {
  const destination = safePath(directory, path);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, content);
}

function fixture(t) {
  mkdirSync('.lab-scratch', { recursive: true });
  const directory = mkdtempSync(resolve('.lab-scratch/docs-artifacts-'));
  t.after(() => rmSync(directory, { recursive: true }));
  return directory;
}

function applyBlocks(directory, step, paths) {
  for (const block of initialBlocks(step).filter(block => paths.includes(block.path))) {
    const target = safePath(directory, block.path);
    const content = block.action === 'append' && existsSync(target)
      ? readFileSync(target, 'utf8').trimEnd() + '\n\n' + block.content
      : block.content;
    writeFixtureFile(directory, block.path, content);
  }
}

test('every lab supplies complete named artifacts and an unfilled evidence template', () => {
  for (const [index, step] of steps.entries()) {
    const { text, blocks } = labs.get(step);
    assert.equal(blocks.length, [...text.matchAll(/^\*\*File:\*\*/gm)].length,
      `${step}: each file label must precede a complete parseable artifact fence`);
    const paths = new Set(blocks.map(block => block.path));
    for (const path of [...expected[index], `.lab-evidence/${step}.md`]) {
      assert.ok(paths.has(path), `${step}: missing copyable ${path}`);
      assert.ok(text.includes(`\`${path}\``), `${step}: filename must be explicit`);
    }
    for (const block of blocks) {
      assert.ok(['create', 'append', 'merge', 'replace'].includes(block.action),
        `${step}: unsupported copy operation ${block.action}`);
      assert.ok(block.qualifiers.some(value => /author|consumer/.test(value)), `${step}: missing workspace for ${block.path}`);
      assert.ok(block.content.trim().length > 0, `${step}: empty ${block.path}`);
      assert.doesNotMatch(block.content, /\bTODO\b/, `${step}: required artifact content cannot be a TODO`);
      assert.ok(!isAbsolute(block.path) && !block.path.includes('\\') && !block.path.includes(':') &&
        !block.path.split('/').some(part => ['', '.', '..', '.git'].includes(part)), `${step}: unsafe file destination`);
      assert.ok(!block.path.startsWith('src/'), `${step}: API implementation answers must remain separate`);
      if (block.path.startsWith('.lab-evidence/')) {
        assert.match(block.content, /not (?:run|observed|recorded)|pending/i, `${step}: evidence must start unobserved`);
      }
    }
  }
});

test('literal Markdown links resolve from copied artifact destinations, not the guide page', () => {
  const destinations = new Set([...labs.values()].flatMap(lab => lab.blocks.map(block => block.path)));
  for (const [step, { blocks }] of labs) {
    for (const block of blocks.filter(block => block.path.endsWith('.md'))) {
      for (const href of linksIn(block.content)) {
        if (/^(?:https?:|#|mailto:)/.test(href)) continue;
        const destination = resolve(root, dirname(block.path), href.split('#')[0]);
        const path = relative(root, destination).split('\\').join('/');
        assert.ok(existsSync(destination) || destinations.has(path),
          `${step}: ${block.path} has a broken copied link ${href}`);
      }
    }
  }
});

test('Lab 01 retains starter safety and has exact separate API and test scopes', t => {
  const directory = fixture(t);
  const starter = read('.github/copilot-instructions.md');
  writeFixtureFile(directory, '.github/copilot-instructions.md', starter);
  applyBlocks(directory, '01-instructions', expected[1]);
  const instructions = readFileSync(resolve(directory, '.github/copilot-instructions.md'), 'utf8');
  for (const line of starter.split('\n').filter(line => line.startsWith('- '))) {
    assert.ok(instructions.includes(line), `Copy route lost starter safety: ${line}`);
  }
  for (const [file, scope] of [['api', 'src/api/**/*.ts'], ['tests', 'tests/**/*.ts']]) {
    const text = readFileSync(resolve(directory, `.github/instructions/${file}.instructions.md`), 'utf8');
    assert.ok(text.startsWith(`---\napplyTo: "${scope}"\n---\n`), `${file}: invalid copied frontmatter`);
  }
  assert.match(instructions, /approval/i);
  assert.match(instructions, /npm run verify:baseline/);
  assert.match(instructions, /npm run verify:solution/);
});

test('planning prompt and skill retain named metadata, valid references and approval boundaries', () => {
  const prompt = initialBlocks('02-planning-prompt').find(block => block.path.endsWith('.prompt.md')).content;
  assert.match(prompt, /^---\nname: plan-api-change\ndescription: .+\n---\n/);
  assert.match(prompt, /approval/i);
  for (const step of ['03-skill', '05-mcp-and-update']) {
    const text = initialBlocks(step).find(block => block.path === `${skill}/SKILL.md`).content;
    assert.match(text, /^---\nname: api-change-workflow\ndescription: .+\n---\n/);
    assert.match(text, /references\/review-checklist\.md/);
    assert.match(text, /approval/i);
    assert.match(text, /evidence/i);
  }
  const updated = initialBlocks('05-mcp-and-update').find(block => block.path === `${skill}/SKILL.md`).content;
  for (const name of ['get_api_conventions', 'get_validation_commands']) assert.ok(updated.includes(name));
  assert.match(updated, /fallback/i);
});

test('copyable author artifacts build immutable 1.0.0, 1.1.0 and 1.2.0 packages', t => {
  const directory = fixture(t);
  writeFixtureFile(directory, 'workshop/plugin.schema.json', read('workshop/plugin.schema.json'));
  git(directory, 'init', '-q');
  git(directory, '-c', 'user.name=Workshop documentation fixture', '-c', 'user.email=fixture@example.invalid',
    '-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '--allow-empty', '-q',
    '-m', 'Initialize documentation test fixture',
    '-m', 'Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>');
  const sources = [`${skill}/SKILL.md`, `${skill}/references/review-checklist.md`, 'toolkit/plugin.json', 'toolkit/catalog.md'];
  applyBlocks(directory, '03-skill', sources);
  for (const [step, version] of [['04-plugin', '1.0.0'], ['05-mcp-and-update', '1.1.0'], ['08-review-and-handoff', '1.2.0']]) {
    applyBlocks(directory, step, sources);
    assert.equal(validateSkill(directory).length, 2);
    const result = packageToolkit(directory);
    assert.equal(result.version, version, `${step}: copied version`);
    assert.equal(verifyPackage(resolve(directory, result.output)).version, version);
    assert.equal(packageToolkit(directory).unchanged, true);
    assert.ok(readFileSync(resolve(directory, 'toolkit/catalog.md'), 'utf8').includes(version));
  }
  for (const version of ['1.0.0', '1.1.0', '1.2.0']) {
    assert.equal(verifyPackage(resolve(directory, `toolkit/dist/user-search-toolkit-${version}`)).version, version);
  }
});

test('copyable MCP JSON is workspace-scoped and roles use bounded client-specific permissions', () => {
  const blocks = initialBlocks('05-mcp-and-update');
  const config = JSON.parse(blocks.find(block => block.path === 'client-configs/vscode.mcp.json').content);
  assert.deepEqual(config, {
    servers: {
      'workshop-standards': {
        type: 'stdio', command: 'node', args: ['${workspaceFolder}/dist/src/standards-mcp/main.js'],
      },
    },
  });
  for (const path of ['client-configs/cli-mcp.md', 'client-configs/app-mcp.md']) {
    const recipe = blocks.find(block => block.path === path).content;
    assert.match(recipe, /node/);
    assert.match(recipe, /dist\/src\/standards-mcp\/main\.js/);
    assert.match(recipe, /absolute/i);
  }
  for (const path of expected[6]) {
    const variants = initialBlocks('06-agent-roles').filter(block => block.path === path);
    assert.ok(variants.length >= 2, `${path}: need bounded and advisory app variants`);
    for (const block of variants) {
      assert.match(block.content, /^---\nname: workshop-(?:planner|implementer|reviewer)\ndescription: .+\n/);
      const line = block.content.match(/^tools: (.+)$/m);
      if (!line) {
        assert.ok(block.qualifiers.some(value => value.includes('app')), `${path}: only advisory app variant omits tools`);
        assert.match(block.content, /advisory/i);
        continue;
      }
      const tools = JSON.parse(line[1]);
      assert.ok(Array.isArray(tools) && tools.length > 0);
      for (const tool of tools) {
        assert.ok(typeof tool === 'string' && !tool.includes('*') &&
          (['read', 'search', 'edit', 'execute'].includes(tool) ||
            /(?:^|[/_.-])get_(?:api_conventions|validation_commands)$/.test(tool)), `${path}: unsafe/unrecognized ${tool}`);
      }
      if (!path.includes('implementer')) {
        assert.ok(!tools.some(tool => ['edit', 'execute'].includes(tool)), `${path}: planner/reviewer cannot write`);
      }
    }
  }
});

test('copyable review probe detects the deliberate defect without providing API implementation', async t => {
  const directory = fixture(t);
  applyBlocks(directory, '08-review-and-handoff', [`${review}/total-after-limit.mjs`, `${review}/probe.mjs`]);
  const { faultyWindow } = await import(pathToFileURL(resolve(directory, `${review}/total-after-limit.mjs`)));
  const matches = [{ id: 'u-001' }, { id: 'u-002' }, { id: 'u-003' }];
  assert.deepEqual(faultyWindow(matches, 1), { items: [matches[0]], total: 1 });
  const result = spawnSync(process.execPath, [resolve(directory, `${review}/probe.mjs`)], {
    cwd: directory, encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /defect/i);
  assert.match(result.stdout, /not API acceptance/i);
  writeFixtureFile(directory, `${review}/total-after-limit.mjs`,
    'export function faultyWindow(matches, limit) { return { items: matches.slice(0, limit), total: matches.length }; }\n');
  const corrected = spawnSync(process.execPath, [resolve(directory, `${review}/probe.mjs`)], {
    cwd: directory, encoding: 'utf8',
  });
  assert.equal(corrected.status, 1, 'The deliberate-defect probe must reject the corrected total');
});

test('Lab 09 maps every bundled file and separates learner evidence from preparation provenance', () => {
  const source = 'workshop/spec-kit-reference';
  const destination = 'workshop/artifacts/spec-kit-reference';
  const walk = directory => readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? walk(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);
  const files = walk(source);
  assert.equal(files.length, 14);
  const text = labs.get('09-spec-kit').text;
  for (const file of files) {
    assert.ok(text.includes(`\`${file}\``), `Lab 09 source map missing ${file}`);
    const target = file.replace(source, destination);
    assert.ok(text.includes(`\`${target}\``), `Lab 09 destination map missing ${target}`);
  }
  assert.match(text, /workshop\/artifacts\/spec-kit-checkpoint\.md/);
  assert.match(text, /tests\/team-filter\/team-filter\.test\.ts/);
  assert.match(text, /already (?:exist|present|ship|include)|shipped/i);
  assert.ok(/separate artifact-guided (?:Lab 09 )?session/i.test(text),
    'Lab 09 must not silently reuse the Lab 06 implementer scope');
  assert.ok(/inspect\/run only/i.test(text), 'Existing team-filter tests are not blanket edit scope');
});
