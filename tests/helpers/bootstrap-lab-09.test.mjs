import { test } from 'node:test';
import assert from 'node:assert/strict';
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { git, json, run } from '../../scripts/lib/safe.mjs';

const repository = process.cwd();
const script = resolve(repository, 'scripts/bootstrap-lab-09.mjs');
const trailer = 'Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>';
const read = (root, path) => readFileSync(resolve(root, path), 'utf8');

function write(root, path, data) {
  mkdirSync(dirname(resolve(root, path)), { recursive: true });
  writeFileSync(resolve(root, path), data);
}

function fixture(t) {
  mkdirSync(resolve(repository, '.lab-scratch'), { recursive: true });
  const parent = mkdtempSync(resolve(repository, '.lab-scratch/lab09 bootstrap-'));
  t.after(() => rmSync(parent, { recursive: true, force: true }));
  const root = resolve(parent, 'author workspace');
  const source = git(repository, 'rev-parse', 'refs/remotes/origin/main').trim();
  git(repository, 'clone', '-q', '--no-local', '--no-checkout', '--', repository, root);
  // A local clone does not carry commits reachable only through the source's remote-tracking refs.
  git(root, 'fetch', '-q', '--no-tags', 'origin', source);
  if (git(root, 'branch', '--list', 'main').trim()) {
    git(root, 'switch', 'main');
    git(root, 'merge', '--ff-only', source);
  } else {
    git(root, 'switch', '--detach', source);
    git(root, 'switch', '-c', 'main');
  }
  git(root, 'config', 'user.name', 'Workshop learner');
  git(root, 'config', 'user.email', 'learner@example.invalid');
  for (const path of [
    'README.md',
    'docs/labs/09-spec-kit.md',
    'package.json',
    'scripts/bootstrap-lab-09.mjs',
    'scripts/make-consumer.mjs',
  ]) write(root, path, read(repository, path));
  if (git(root, 'status', '--porcelain=v1', '--untracked-files=all').trim()) {
    commit(root, 'Integrate Lab 09 bootstrap source');
  }
  git(root, 'switch', '-c', 'participant-work');
  git(root, 'remote', 'remove', 'origin');
  return { parent, root };
}

function invoke(root, mode, destination, backup = 'workshop/test-backup', options = {}) {
  const argv = [script, `--${mode}`, '--destination', destination];
  if (backup) argv.push('--backup-branch', backup);
  return run(process.execPath, argv, root, options);
}

function commit(root, message) {
  git(root, 'add', '-A');
  git(root, 'commit', '-q', '-m', message);
}

test('preview reports preservation plan without changing either workspace', t => {
  const { root } = fixture(t);
  appendFileSync(resolve(root, 'README.md'), '\nunstaged\n');
  write(root, 'staged.txt', 'staged\n');
  git(root, 'add', 'staged.txt');
  rmSync(resolve(root, 'docs/index.md'));
  write(root, 'untracked.txt', 'untracked\n');
  const before = git(root, 'status', '--porcelain=v1', '--untracked-files=all');

  const result = JSON.parse(invoke(root, 'preview', '../lab09 preview'));

  assert.equal(result.mode, 'preview');
  assert.equal(result.original.branch, 'participant-work');
  assert.equal(result.backup.branch, 'workshop/test-backup');
  assert.equal(result.targetBranch, 'workshop/lab-09-ready');
  assert.equal(git(root, 'status', '--porcelain=v1', '--untracked-files=all'), before);
  assert.equal(git(root, 'branch', '--show-current').trim(), 'participant-work');
  assert.equal(existsSync(resolve(root, '../lab09 preview')), false);
  assert.throws(() => git(root, 'rev-parse', '--verify', 'refs/heads/workshop/test-backup'), /failed/);
});

test('dirty work is committed on a local backup and a clean Lab 09 consumer is created', t => {
  const { root } = fixture(t);
  appendFileSync(resolve(root, 'README.md'), '\nunstaged\n');
  write(root, 'staged.txt', 'staged\n');
  git(root, 'add', 'staged.txt');
  rmSync(resolve(root, 'docs/index.md'));
  write(root, 'untracked.txt', 'untracked\n');
  const original = git(root, 'rev-parse', 'HEAD').trim();

  const result = JSON.parse(invoke(root, 'apply', '../lab09 ready'));
  const consumer = result.destination;
  const releases = json(resolve(root, 'presenter/evidence/releases.json'));

  assert.equal(result.readyFor, '09-spec-kit');
  assert.equal(result.original.commit, original);
  assert.equal(result.backup.branch, 'workshop/test-backup');
  assert.equal(result.backup.commit, git(root, 'rev-parse', 'refs/heads/workshop/test-backup').trim());
  assert.equal(git(root, 'branch', '--show-current').trim(), 'participant-work');
  assert.equal(git(root, 'status', '--porcelain=v1', '--untracked-files=all').trim(), '');
  assert.deepEqual(
    git(root, 'diff', '--name-status', original, result.backup.commit).trim().split('\n').sort(),
    ['A\tstaged.txt', 'A\tuntracked.txt', 'D\tdocs/index.md', 'M\tREADME.md'].sort(),
  );
  assert.match(git(root, 'log', '-1', '--format=%B', result.backup.commit), new RegExp(trailer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  assert.equal(git(consumer, 'branch', '--show-current').trim(), 'workshop/lab-09-ready');
  assert.equal(git(consumer, 'remote').trim(), '');
  assert.equal(json(resolve(consumer, '.git/workshop-context.json')).kind, 'consumer');
  assert.equal(read(consumer, 'src/api/search.ts'), git(root, 'show', `${releases.solution.commit}:src/api/search.ts`));
  assert.equal(read(consumer, 'tests/search/search.test.ts'), git(root, 'show', `${releases.solution.commit}:tests/search/search.test.ts`));
  assert.ok(existsSync(resolve(consumer, 'scripts/spec-kit-reference.mjs')));
  assert.ok(existsSync(resolve(consumer, 'scripts/validate-assets.mjs')));
  assert.ok(existsSync(resolve(consumer, 'scripts/bootstrap-lab-03.mjs')));
  assert.ok(existsSync(resolve(consumer, 'scripts/bootstrap-lab-09.mjs')));
  assert.ok(existsSync(resolve(consumer, 'tests/helpers/workflows.test.mjs')));
  assert.ok(existsSync(resolve(consumer, 'tests/team-filter/team-filter.test.ts')));
  assert.ok(existsSync(resolve(consumer, 'workshop/spec-kit-reference/001-team-filter/spec.md')));
  assert.ok(existsSync(resolve(consumer, 'docs/labs/09-spec-kit.md')));
  assert.match(read(consumer, 'scripts/validate-assets.mjs'), /Missing Spec Kit reference artifact/);
  assert.ok(!existsSync(resolve(consumer, '.github/skills')));
  assert.equal(git(consumer, 'status', '--porcelain=v1', '--untracked-files=all').trim(), '');
});

test('clean workspace creates no backup and committed participant changes do not contaminate consumer', t => {
  const { root } = fixture(t);
  appendFileSync(resolve(root, '.github/copilot-instructions.md'), '\nparticipant-only\n');
  commit(root, 'Participant customization');
  const participant = read(root, '.github/copilot-instructions.md');
  const main = git(root, 'show', 'main:.github/copilot-instructions.md');

  const result = JSON.parse(invoke(root, 'apply', '../lab09 clean', null));

  assert.equal(result.backup, null);
  assert.notEqual(participant, main);
  assert.equal(read(result.destination, '.github/copilot-instructions.md'), main);
  assert.equal(git(root, 'branch', '--show-current').trim(), 'participant-work');
  assert.equal(git(root, 'status', '--porcelain=v1', '--untracked-files=all').trim(), '');
});

test('invalid preconditions fail before mutation', async t => {
  await t.test('existing destination', t => {
    const { root } = fixture(t);
    mkdirSync(resolve(root, '../existing'));
    assert.throws(() => invoke(root, 'apply', '../existing'), /already exists/);
    assert.equal(git(root, 'branch', '--show-current').trim(), 'participant-work');
  });

  await t.test('unsafe destination', t => {
    const { root } = fixture(t);
    assert.throws(() => invoke(root, 'apply', './nested'), /immediate sibling/);
  });

  await t.test('detached head', t => {
    const { root } = fixture(t);
    git(root, 'switch', '--detach');
    assert.throws(() => invoke(root, 'apply', '../detached'), /named branch/);
  });

  await t.test('git operation in progress', t => {
    const { root } = fixture(t);
    writeFileSync(resolve(root, git(root, 'rev-parse', '--git-path', 'MERGE_HEAD').trim()), '0'.repeat(40));
    assert.throws(() => invoke(root, 'apply', '../merge'), /MERGE_HEAD/);
  });

  await t.test('missing identity', t => {
    const { root, parent } = fixture(t);
    git(root, 'config', '--unset-all', 'user.name');
    git(root, 'config', '--unset-all', 'user.email');
    const home = resolve(parent, 'empty-home');
    mkdirSync(home);
    assert.throws(
      () => invoke(root, 'apply', '../identity', 'workshop/test-backup', { env: { ...process.env, HOME: home, XDG_CONFIG_HOME: home } }),
      /user.name/,
    );
  });

  await t.test('missing main', t => {
    const { root } = fixture(t);
    git(root, 'branch', '-D', 'main');
    assert.throws(() => invoke(root, 'apply', '../missing-main'), /No local main ref/);
  });

  await t.test('moved solution tag', t => {
    const { root } = fixture(t);
    git(root, 'tag', '-f', 'solution-v2', 'HEAD');
    assert.throws(() => invoke(root, 'apply', '../moved-solution'), /moved or does not match/);
  });
});

test('failure after preservation restores the author branch and keeps the backup commit', t => {
  const { root } = fixture(t);
  write(root, 'local-work.txt', 'keep me\n');
  const lock = json(resolve(root, 'workshop/starter-lock.json'));
  git(root, 'tag', '-f', lock.tag, 'HEAD');

  assert.throws(() => invoke(root, 'apply', '../late-failure'), /Starter ref changed/);
  assert.equal(git(root, 'branch', '--show-current').trim(), 'participant-work');
  assert.equal(git(root, 'status', '--porcelain=v1', '--untracked-files=all').trim(), '');
  const backup = git(root, 'rev-parse', 'refs/heads/workshop/test-backup').trim();
  assert.equal(git(root, 'show', `${backup}:local-work.txt`), 'keep me\n');
});
