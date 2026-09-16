import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, readFileSync, writeFileSync, existsSync, symlinkSync, appendFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { apply, planStep, stage, release } from '../../scripts/lib/examples.mjs';
import { packageToolkit, verifyPackage } from '../../scripts/lib/toolkit.mjs';
import { makeConsumer } from '../../scripts/make-consumer.mjs';
import { git, hash, json, run, safePath } from '../../scripts/lib/safe.mjs';

const repository = process.cwd();
const trailer = 'Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>';
const read = (root, path) => readFileSync(resolve(root, path), 'utf8');
function write(root, path, data) {
  mkdirSync(dirname(resolve(root, path)), { recursive: true });
  writeFileSync(resolve(root, path), data);
}
function copyTree(sourceRoot, targetRoot, directory) {
  for (const entry of readdirSync(resolve(sourceRoot, directory), { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) copyTree(sourceRoot, targetRoot, path);
    else write(targetRoot, path, read(sourceRoot, path));
  }
}
function commit(root, message = 'Checkpoint reviewed example assets') {
  git(root, 'add', '.');
  git(root, '-c', 'user.name=Workshop test fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-q', '-m', message, '-m', trailer);
}
function fixture(t) {
  mkdirSync('.lab-scratch', { recursive: true });
  const parent = mkdtempSync(resolve('.lab-scratch/helpers with spaces-'));
  t.after(() => rmSync(parent, { recursive: true }));
  const root = resolve(parent, 'author workspace');
  git(repository, 'clone', '-q', '--no-local', '--no-checkout', '--', repository, root);
  git(root, 'switch', '--detach', json(resolve(repository, 'workshop/starter-lock.json')).commit);
  git(root, 'switch', '-c', 'helper-author');
  git(root, 'remote', 'remove', 'origin');
  for (const path of [
    'package.json',
    'scripts/bootstrap-lab-03.mjs',
    'scripts/bootstrap-lab-09.mjs',
    'scripts/make-consumer.mjs',
    'scripts/spec-kit-reference.mjs',
    'tests/team-filter/team-filter.test.ts',
    'workshop/examples-lock.json',
    'workshop/starter-lock.json',
  ]) write(root, path, read(repository, path));
  copyTree(repository, root, 'workshop/spec-kit-reference');
  return root;
}
function importStep(root, id, client = 'cli') {
  const plan = planStep(root, id, undefined, client);
  const result = apply(plan);
  commit(root, `Adopt reviewed ${id} fixture`);
  return result;
}
function authorReady(root) {
  for (const id of ['01-instructions', '02-planning-prompt', '03-skill', '04-plugin']) importStep(root, id);
}
function activate(root, id, ...options) {
  const output = run('npm', ['run', '--silent', 'lab:activate', '--', '--step', id, ...options], root);
  return JSON.parse(output.trim().split('\n').at(-1));
}

test('activation imports a step once, preserves optional references and repeats before and after commit', t => {
  const root = fixture(t);
  importStep(root, '01-instructions');
  importStep(root, '02-planning-prompt');
  const plan = planStep(root, '03-skill');
  const head = git(root, 'rev-parse', 'HEAD');
  const search = read(root, 'src/api/search.ts');
  write(root, 'learner-notes.txt', 'preserve learner work\n');
  const before = git(root, 'status', '--porcelain');
  run('npm', ['run', '--silent', 'lab:example', '--', '--step', '03-skill', '--preview'], root);
  assert.equal(git(root, 'status', '--porcelain'), before);

  assert.deepEqual(activate(root, '03-skill'), { changed: plan.entries.length, unchanged: 0 });
  assert.equal(git(root, 'rev-parse', 'HEAD'), head);
  assert.equal(git(root, 'diff', '--cached'), '');
  assert.ok(!existsSync(resolve(root, '.lab-references')));
  const imported = git(root, 'status', '--porcelain');
  const unchanged = { changed: 0, unchanged: plan.entries.length };
  assert.deepEqual(activate(root, '03-skill'), unchanged);
  assert.equal(git(root, 'status', '--porcelain'), imported);
  for (const entry of plan.entries) assert.equal(hash(read(root, entry.destination)), entry.sha256);

  run('npm', ['run', '--silent', 'lab:example', '--', '--step', '03-skill', '--stage'], root);
  const referencePath = '.lab-references/03-skill-author-cli/reference.json';
  const reference = read(root, referencePath);
  assert.deepEqual(activate(root, '03-skill'), unchanged);
  assert.equal(read(root, referencePath), reference);
  assert.equal(git(root, 'rev-parse', 'HEAD'), head);
  assert.equal(read(root, 'learner-notes.txt'), 'preserve learner work\n');
  assert.equal(read(root, 'src/api/search.ts'), search);
  assert.match(search, /NOT_IMPLEMENTED/);
  assert.ok(!existsSync(resolve(root, 'toolkit/plugin.json')));

  commit(root);
  const committed = git(root, 'rev-parse', 'HEAD');
  assert.deepEqual(activate(root, '03-skill'), unchanged);
  assert.equal(git(root, 'rev-parse', 'HEAD'), committed);
  assert.equal(git(root, 'status', '--porcelain'), '');
  for (const entry of plan.entries) assert.equal(hash(read(root, entry.destination)), entry.sha256);
});

test('activation refuses learner edits, collisions and missing prerequisites without partial writes', async t => {
  for (const mode of ['edited import', 'committed edit', 'untracked collision', 'missing prerequisite']) {
    await t.test(mode, t => {
      const root = fixture(t);
      const destination = '.github/instructions/api.instructions.md';
      if (mode === 'edited import' || mode === 'committed edit') activate(root, '01-instructions');
      if (mode !== 'missing prerequisite') write(root, destination, 'learner-owned\n');
      if (mode === 'committed edit') commit(root, 'Preserve edited imported instructions');
      const before = git(root, 'status', '--porcelain');
      const head = git(root, 'rev-parse', 'HEAD');
      assert.throws(() => activate(root, mode === 'missing prerequisite' ? '03-skill' : '01-instructions'), /preflight failed/);
      assert.equal(git(root, 'status', '--porcelain'), before);
      assert.equal(git(root, 'rev-parse', 'HEAD'), head);
      assert.ok(!existsSync(resolve(root, '.github/skills')));
      assert.ok(!existsSync(resolve(root, '.lab-references')));
      if (mode !== 'missing prerequisite') assert.equal(read(root, destination), 'learner-owned\n');
      if (mode === 'untracked collision' || mode === 'missing prerequisite') {
        assert.ok(!existsSync(resolve(root, '.github/instructions/tests.instructions.md')));
      }
    });
  }
});

test('activation forwards workspace and client selectors in new consumers without changing Lab 09 commands', async t => {
  for (const client of ['cli', 'vscode', 'app']) {
    await t.test(client, t => {
      const root = fixture(t);
      authorReady(root);
      const consumer = makeConsumer(root, `../activation consumer-${client}`).destination;
      const scripts = json(resolve(consumer, 'package.json')).scripts;
      assert.equal(scripts['lab:activate'], 'node scripts/import-example.mjs --apply');
      assert.equal(scripts['lab:09:bootstrap'], 'node scripts/bootstrap-lab-09.mjs');
      assert.equal(read(consumer, 'scripts/spec-kit-reference.mjs'), read(repository, 'scripts/spec-kit-reference.mjs'));
      assert.equal(read(consumer, 'scripts/bootstrap-lab-09.mjs'), read(repository, 'scripts/bootstrap-lab-09.mjs'));
      const before = git(consumer, 'status', '--porcelain');
      assert.throws(() => activate(consumer, '05-mcp-and-update', '--workspace', 'author', '--client', client), /consumer workspace/);
      assert.equal(git(consumer, 'status', '--porcelain'), before);
      assert.deepEqual(activate(consumer, '05-mcp-and-update', '--workspace', 'consumer', '--client', client), { changed: 1, unchanged: 0 });
      assert.deepEqual(activate(consumer, '05-mcp-and-update', '--workspace', 'consumer', '--client', client), { changed: 0, unchanged: 1 });
      assert.deepEqual(activate(consumer, '06-agent-roles', '--workspace', 'consumer', '--client', client), { changed: 3, unchanged: 0 });
      assert.deepEqual(activate(consumer, '06-agent-roles', '--client', client), { changed: 0, unchanged: 3 });
      for (const id of ['05-mcp-and-update', '06-agent-roles']) {
        for (const entry of planStep(consumer, id, 'consumer', client).entries) {
          assert.equal(hash(read(consumer, entry.destination)), entry.sha256);
        }
      }
      assert.ok(!existsSync(resolve(consumer, '.github/skills')));
      assert.ok(!existsSync(resolve(consumer, '.lab-references')));
      assert.ok(!existsSync(resolve(consumer, 'workshop/artifacts/review')));
      assert.equal(git(consumer, 'remote').trim(), '');
      assert.match(read(consumer, 'src/api/search.ts'), /NOT_IMPLEMENTED/);
    });
  }
});

test('offline source pin, preview, inert stage, safe apply and exact repeat', t => {
  const root = fixture(t);
  assert.equal(git(root, 'remote').trim(), '');
  assert.match(run(process.execPath, [resolve(repository, 'scripts/fetch-examples.mjs')], root), /Verified local/);
  const before = git(root, 'status', '--porcelain');
  const plan = planStep(root, '01-instructions');
  assert.equal(git(root, 'status', '--porcelain'), before);
  mkdirSync(resolve(root, '.lab-references'));
  const staged = stage(plan);
  assert.ok(existsSync(resolve(root, staged, '.github/instructions/api.instructions.md')));
  assert.ok(!existsSync(resolve(root, '.github/instructions')));
  assert.throws(() => stage(plan), /exist/);
  assert.equal(apply(plan).changed, 3);
  assert.deepEqual(apply(planStep(root, '01-instructions')), { changed: 0, unchanged: 3 });
  assert.ok(!existsSync(resolve(root, '.github/skills')));
  assert.match(read(root, 'src/api/search.ts'), /NOT_IMPLEMENTED/);
});

test('untracked collision, staged/unstaged edits and committed alternatives reject whole step', async t => {
  for (const mode of ['untracked', 'unstaged', 'staged', 'committed', 'deleted']) {
    await t.test(mode, t => {
      const root = fixture(t);
      if (mode === 'untracked') write(root, '.github/instructions/api.instructions.md', 'learner-owned\n');
      else if (mode === 'deleted') rmSync(resolve(root, '.github/copilot-instructions.md'));
      else {
        appendFileSync(resolve(root, '.github/copilot-instructions.md'), '\nlearner-owned\n');
        if (mode === 'staged') git(root, 'add', '.github/copilot-instructions.md');
        if (mode === 'committed') commit(root, 'Preserve learner-authored alternative');
      }
      const before = git(root, 'status', '--porcelain');
      const plan = planStep(root, '01-instructions');
      assert.ok(plan.entries.some(entry => entry.conflict));
      assert.throws(() => apply(plan), /preflight failed/);
      assert.equal(git(root, 'status', '--porcelain'), before);
      assert.ok(!existsSync(resolve(root, '.github/instructions/tests.instructions.md')));
    });
  }
});

test('untracked matching source is still a collision without an import receipt', t => {
  const root = fixture(t);
  const entry = planStep(root, '01-instructions').entries.find(file => file.destination.includes('api.instructions'));
  write(root, entry.destination, entry.payload);
  assert.throws(() => apply(planStep(root, '01-instructions')), /preflight failed/);
});

test('symlink files, symlink ancestors, dangling links and traversal fail closed', async t => {
  for (const mode of ['file', 'parent', 'dangling']) {
    await t.test(mode, t => {
      const root = fixture(t);
      const other = resolve(dirname(root), 'outside');
      mkdirSync(other);
      writeFileSync(resolve(other, 'untouched.md'), 'outside');
      if (mode === 'file') {
        rmSync(resolve(root, '.github/copilot-instructions.md'));
        symlinkSync(resolve(other, 'untouched.md'), resolve(root, '.github/copilot-instructions.md'));
      } else symlinkSync(mode === 'parent' ? other : resolve(other, 'missing'), resolve(root, '.github/instructions'));
      assert.throws(() => apply(planStep(root, '01-instructions')), /preflight failed/);
      assert.equal(readFileSync(resolve(other, 'untouched.md'), 'utf8'), 'outside');
    });
  }
  for (const path of ['../escape', '/absolute', 'C:\\path', '.git/config', 'workshop/../../escape']) {
    assert.throws(() => safePath(repository, path), /Unsafe/);
  }
});

test('source pin, manifest checksum, missing tag, unknown steps and prerequisites are enforced', t => {
  const root = fixture(t);
  assert.throws(() => planStep(root, 'search-solution'), /Unknown step/);
  assert.throws(() => planStep(root, '06-agent-roles', 'consumer'), /author workspace/);
  assert.throws(() => apply(planStep(root, '03-skill')), /preflight failed/);
  const lock = json(resolve(root, 'workshop/examples-lock.json'));
  write(root, 'workshop/examples-lock.json', JSON.stringify({ ...lock, commit: '0'.repeat(40) }));
  assert.throws(() => release(root), /Stale or moved/);
  write(root, 'workshop/examples-lock.json', JSON.stringify({ ...lock, manifestSha256: '0'.repeat(64) }));
  assert.throws(() => release(root), /manifest hash/);
  write(root, 'workshop/examples-lock.json', JSON.stringify({ ...lock, tag: 'examples-v999-missing' }));
  assert.throws(() => release(root), /Missing/);
  assert.throws(() => run(process.execPath, [resolve(repository, 'scripts/fetch-examples.mjs')], root), /No network attempted/);
});

test('Lab 03 bootstrap imports Labs 01-02 and commits only their reviewed assets', t => {
  const root = fixture(t);
  git(root, 'config', 'user.name', 'Workshop learner');
  git(root, 'config', 'user.email', 'learner@example.invalid');
  write(root, 'learner-notes.txt', 'preserve me\n');
  const before = git(root, 'rev-parse', 'HEAD').trim();

  const output = run(process.execPath, [resolve(repository, 'scripts/bootstrap-lab-03.mjs')], root);
  const result = JSON.parse(output);
  assert.equal(result.readyFor, '03-skill');
  assert.equal(result.commit, git(root, 'rev-parse', 'HEAD').trim());
  assert.equal(git(root, 'rev-list', '--count', `${before}..HEAD`).trim(), '1');
  assert.deepEqual(
    git(root, 'diff', '--name-only', before, 'HEAD').trim().split('\n').sort(),
    [
      '.github/copilot-instructions.md',
      '.github/instructions/api.instructions.md',
      '.github/instructions/tests.instructions.md',
      '.github/prompts/plan-api-change.prompt.md',
    ],
  );
  assert.match(git(root, 'log', '-1', '--format=%B'), new RegExp(trailer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal(read(root, 'learner-notes.txt'), 'preserve me\n');
  assert.equal(git(root, 'status', '--porcelain', '--', 'learner-notes.txt').trim(), '?? learner-notes.txt');
  assert.ok(!existsSync(resolve(root, '.github/skills')));
  assert.match(read(root, 'src/api/search.ts'), /NOT_IMPLEMENTED/);

  const committed = git(root, 'rev-parse', 'HEAD').trim();
  const repeated = JSON.parse(run(process.execPath, [resolve(repository, 'scripts/bootstrap-lab-03.mjs')], root));
  assert.equal(repeated.commit, null);
  assert.equal(git(root, 'rev-parse', 'HEAD').trim(), committed);
});

test('Lab 03 bootstrap rejects staged work and destination conflicts before writing', async t => {
  await t.test('staged learner work', t => {
    const root = fixture(t);
    git(root, 'config', 'user.name', 'Workshop learner');
    git(root, 'config', 'user.email', 'learner@example.invalid');
    write(root, 'learner-notes.txt', 'staged learner work\n');
    git(root, 'add', 'learner-notes.txt');
    const before = git(root, 'rev-parse', 'HEAD').trim();

    assert.throws(
      () => run(process.execPath, [resolve(repository, 'scripts/bootstrap-lab-03.mjs')], root),
      /Existing staged changes/,
    );
    assert.equal(git(root, 'rev-parse', 'HEAD').trim(), before);
    assert.ok(!existsSync(resolve(root, '.github/instructions')));
    assert.ok(!existsSync(resolve(root, '.github/prompts')));
  });

  await t.test('learner-owned destination', t => {
    const root = fixture(t);
    git(root, 'config', 'user.name', 'Workshop learner');
    git(root, 'config', 'user.email', 'learner@example.invalid');
    write(root, '.github/instructions/api.instructions.md', 'learner-owned\n');
    const before = git(root, 'rev-parse', 'HEAD').trim();

    assert.throws(
      () => run(process.execPath, [resolve(repository, 'scripts/bootstrap-lab-03.mjs')], root),
      /preflight failed/,
    );
    assert.equal(git(root, 'rev-parse', 'HEAD').trim(), before);
    assert.equal(read(root, '.github/instructions/api.instructions.md'), 'learner-owned\n');
    assert.ok(!existsSync(resolve(root, '.github/instructions/tests.instructions.md')));
    assert.ok(!existsSync(resolve(root, '.github/prompts')));
  });
});

test('recheck catches a concurrent edit; injected I/O failure rolls back all earlier writes', t => {
  const root = fixture(t);
  const original = read(root, '.github/copilot-instructions.md');
  const plan = planStep(root, '01-instructions');
  assert.throws(() => apply(plan, { afterWrite(count) { if (count === 2) throw new Error('Injected I/O failure'); } }), /all written payloads rolled back/);
  assert.equal(read(root, '.github/copilot-instructions.md'), original);
  assert.ok(!existsSync(resolve(root, '.github/instructions')));
  assert.throws(() => apply(planStep(root, '01-instructions'), {
    beforeWrite() { appendFileSync(resolve(root, '.github/copilot-instructions.md'), '\nconcurrent learner edit'); },
  }), /changed since preview/);
  assert.match(read(root, '.github/copilot-instructions.md'), /concurrent learner edit/);
  assert.ok(!existsSync(resolve(root, '.github/instructions')));
});

test('all source payload hashes, client groups and generated dependency maps agree', t => {
  const { manifest, lock } = release(repository);
  for (const step of manifest.steps) {
    assert.ok(step.explanation && Array.isArray(step.prerequisiteSteps));
    assert.ok(step.files.length > 0);
    for (const file of step.files) {
      const raw = git(repository, 'show', `${lock.commit}:${file.source}`);
      assert.equal(hash(raw), file.sha256, file.source);
      assert.ok(!file.destination.startsWith('src/'));
      assert.ok(!file.source.includes('/solutions/'));
    }
  }
  const map = json(resolve(repository, 'presenter/checkpoint-map.json'));
  assert.equal(map.examplesTag, lock.tag);
  assert.deepEqual(map.checkpoints.at(-1).steps, manifest.steps.map(step => step.id));
  assert.equal(map.checkpoints.at(-1).specKitInstallationRequired, false);
});

test('canonical packaging has schema, exact provenance, immutable versions and no hidden executable', t => {
  const root = fixture(t);
  authorReady(root);
  const first = packageToolkit(root);
  assert.equal(first.version, '1.0.0');
  assert.equal(first.sourceDirty, false);
  assert.equal(verifyPackage(resolve(root, first.output)).sourceChecksum, first.sourceChecksum);
  assert.equal(packageToolkit(root).unchanged, true);
  appendFileSync(resolve(root, '.github/skills/api-change-workflow/references/review-checklist.md'), '\n- Learner improvement.\n');
  assert.throws(() => packageToolkit(root), /Version already built/);
  rmSync(resolve(root, '.github/skills/api-change-workflow/references/review-checklist.md'));
  assert.throws(() => packageToolkit(root), /allowlist/);
});

test('package rejects invalid manifest, missing references, extra files, links and output tampering', t => {
  const root = fixture(t);
  authorReady(root);
  const manifest = json(resolve(root, 'toolkit/plugin.json'));
  write(root, 'toolkit/plugin.json', JSON.stringify({ ...manifest, hooks: {} }));
  assert.throws(() => packageToolkit(root), /schema/);
  write(root, 'toolkit/plugin.json', JSON.stringify(manifest));
  write(root, '.github/skills/api-change-workflow/run.sh', 'echo nope');
  assert.throws(() => packageToolkit(root), /allowlist/);
  rmSync(resolve(root, '.github/skills/api-change-workflow/run.sh'));
  const packaged = packageToolkit(root);
  appendFileSync(resolve(root, packaged.output, 'skills/api-change-workflow/SKILL.md'), '\ntampered');
  assert.throws(() => packageToolkit(root), /checksum mismatch/);
});

test('clean sibling consumer preserves guidance, excludes skill/config/secrets, supports all client steps and update', t => {
  const root = fixture(t);
  authorReady(root);
  appendFileSync(resolve(root, '.github/copilot-instructions.md'), '\n- Learner personal rule retained.\n');
  write(root, '.env', 'SYNTHETIC_TEST_ONLY=never-copy\n');
  write(root, 'client-configs/private.json', '{"synthetic":true}');
  const v1 = packageToolkit(root);
  assert.equal(git(root, 'branch', '--show-current').trim(), 'helper-author');
  assert.throws(() => makeConsumer(root, './nested-consumer'), /sibling/);
  assert.throws(() => makeConsumer(root, '.'), /sibling/);
  const result = makeConsumer(root, '../consumer workspace');
  const consumer = result.destination;
  assert.equal(result.installed, false);
  assert.ok(result.localSkillAbsent);
  assert.ok(!existsSync(resolve(consumer, '.github/skills')));
  assert.ok(!existsSync(resolve(consumer, '.env')));
  assert.ok(!existsSync(resolve(consumer, 'toolkit/dist')));
  assert.ok(!existsSync(resolve(consumer, 'client-configs/private.json')));
  assert.ok(existsSync(resolve(consumer, 'workshop/spec-kit-reference/001-team-filter/spec.md')));
  assert.ok(existsSync(resolve(consumer, 'tests/team-filter/team-filter.test.ts')));
  assert.ok(existsSync(resolve(consumer, 'scripts/spec-kit-reference.mjs')));
  assert.equal(read(consumer, '.github/copilot-instructions.md'), read(root, '.github/copilot-instructions.md'));
  assert.equal(read(consumer, '.github/prompts/plan-api-change.prompt.md'), read(root, '.github/prompts/plan-api-change.prompt.md'));
  assert.equal(git(consumer, 'remote').trim(), '');
  assert.match(read(consumer, 'src/api/search.ts'), /NOT_IMPLEMENTED/);
  assert.throws(() => makeConsumer(root, '../consumer workspace'), /already exists/);
  importStep(root, '05-mcp-and-update');
  const v2 = packageToolkit(root);
  assert.equal(v2.version, '1.1.0');
  assert.notEqual(v2.sourceChecksum, v1.sourceChecksum);
  assert.ok(existsSync(resolve(root, v1.output)));
  for (const client of ['cli', 'vscode', 'app']) {
    const plan = planStep(consumer, '05-mcp-and-update', 'consumer', client);
    assert.equal(plan.entries.length, 1);
    apply(plan);
  }
  commit(consumer);
  importStep(consumer, '06-agent-roles', 'cli');
  for (const client of ['vscode', 'app']) {
    const plan = planStep(consumer, '06-agent-roles', 'consumer', client);
    assert.equal(plan.entries.length, 3);
    // Different-client roles cannot overwrite existing reviewed roles.
    assert.ok(plan.entries.some(entry => entry.conflict));
  }
  importStep(consumer, '07-use-toolkit');
  importStep(consumer, '08-review-and-handoff');
  importStep(consumer, '09-spec-kit');
  assert.match(run(process.execPath, ['scripts/spec-kit-reference.mjs', '--preview'], consumer), /learner ran Spec Kit/);
  assert.match(run(process.execPath, ['scripts/spec-kit-reference.mjs', '--stage'], consumer), /Staged/);
  assert.ok(existsSync(resolve(consumer, '.lab-references/09-spec-kit-reference/001-team-filter/spec.md')));
  assert.match(run(process.execPath, ['scripts/spec-kit-reference.mjs', '--apply'], consumer), /Applied/);
  assert.ok(existsSync(resolve(consumer, 'workshop/artifacts/spec-kit-reference/001-team-filter/tasks.md')));
  assert.throws(() => run(process.execPath, ['scripts/spec-kit-reference.mjs', '--apply'], consumer), /collision/);
  assert.match(run(process.execPath, ['workshop/artifacts/review/probe.mjs'], consumer), /DELIBERATE DEFECT DETECTED/);
  assert.ok(!existsSync(resolve(consumer, '.github/skills')));
  assert.match(read(consumer, 'src/api/search.ts'), /NOT_IMPLEMENTED/);
  assert.throws(() => makeConsumer(consumer, '../another'), /author workspace/);
});

test('each client role payload applies in a fresh consumer without later-step or search activation', async t => {
  for (const client of ['vscode', 'app']) {
    await t.test(client, t => {
      const root = fixture(t);
      authorReady(root);
      const consumer = makeConsumer(root, `../consumer-${client}`).destination;
      importStep(consumer, '05-mcp-and-update', client);
      importStep(consumer, '06-agent-roles', client);
      assert.ok(existsSync(resolve(consumer, '.github/agents/workshop-reviewer.agent.md')));
      assert.ok(!existsSync(resolve(consumer, '.github/skills')));
      assert.ok(!existsSync(resolve(consumer, 'workshop/artifacts/review')));
      assert.match(read(consumer, 'src/api/search.ts'), /NOT_IMPLEMENTED/);
      if (client === 'vscode') {
        assert.deepEqual(json(resolve(consumer, 'client-configs/vscode.mcp.json')).servers['workshop-standards'].args, ['${workspaceFolder}/dist/src/standards-mcp/main.js']);
      } else assert.match(read(consumer, '.github/agents/workshop-reviewer.agent.md'), /advisory-only/);
    });
  }
});

test('exercise validation accepts complete authored routes and rejects invalid scopes, unsafe roles and duplicate consumer skill', t => {
  const root = fixture(t);
  const validate = (cwd, id, client = 'cli') => run(process.execPath, [
    resolve(repository, 'scripts/validate-assets.mjs'), '--exercise', '--step', id, '--client', client,
  ], cwd);
  for (const id of ['00-start', '01-instructions', '02-planning-prompt', '03-skill', '04-plugin']) {
    importStep(root, id);
    assert.match(validate(root, id), /NOT runtime proof/);
  }
  write(root, '.github/instructions/api.instructions.md', '---\napplyTo: "**/*"\n---\nToo broad\n');
  assert.throws(() => validate(root, '01-instructions'), /exact lab scope/);
  const consumer = makeConsumer(root, '../validated consumer').destination;
  importStep(root, '05-mcp-and-update');
  assert.match(validate(root, '05-mcp-and-update'), /NOT runtime proof/);
  for (const id of ['05-mcp-and-update', '06-agent-roles', '07-use-toolkit', '08-review-and-handoff']) {
    importStep(consumer, id);
    assert.match(validate(consumer, id), /NOT runtime proof/);
  }
  run(process.execPath, ['scripts/spec-kit-reference.mjs', '--apply'], consumer);
  assert.match(validate(consumer, '09-spec-kit'), /NOT runtime proof/);
  const reviewer = '.github/agents/workshop-reviewer.agent.md';
  const boundedReviewer = read(consumer, reviewer);
  write(consumer, reviewer, boundedReviewer.replace('["read", "search"]', '["read", "search", "fixture/get_api_conventions", "fixture/get_validation_commands"]'));
  assert.match(validate(consumer, '06-agent-roles'), /NOT runtime proof/);
  write(consumer, reviewer, boundedReviewer.replace('["read", "search"]', '["read", "fixture/*"]'));
  assert.throws(() => validate(consumer, '06-agent-roles'), /wildcard/);
  write(consumer, reviewer, boundedReviewer);
  write(consumer, reviewer, read(consumer, reviewer).replace('["read", "search"]', '["read", "execute"]'));
  assert.throws(() => validate(consumer, '06-agent-roles'), /must not declare generic/);
  write(consumer, '.github/skills/api-change-workflow/SKILL.md', 'Duplicate local skill');
  assert.throws(() => validate(consumer, '07-use-toolkit'), /Duplicate canonical skill/);
});
