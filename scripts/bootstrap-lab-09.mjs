import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { args, failMain, git, safePath, workspace } from './lib/safe.mjs';
import { workspaceKind } from './lib/examples.mjs';
import { consumerDestination, makeConsumer } from './make-consumer.mjs';

const trailer = 'Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>';
const targetBranch = 'workshop/lab-09-ready';
const requiredMainPaths = [
  'package.json',
  'docs/labs/09-spec-kit.md',
  'docs/reference/spec-kit-vs-built-in.md',
  'presenter/evidence/releases.json',
  'scripts/bootstrap-lab-09.mjs',
  'scripts/spec-kit-reference.mjs',
  'scripts/validate-assets.mjs',
  'tests/search/search.test.ts',
  'tests/team-filter/team-filter.test.ts',
  'workshop/spec-kit-reference/README.md',
  'workshop/steps.json',
];

function refExists(root, ref) {
  try {
    git(root, 'rev-parse', '--verify', '--quiet', ref);
    return true;
  } catch {
    return false;
  }
}

function requireGitIdentity(root) {
  const read = key => {
    try {
      const value = git(root, 'config', '--get', key).trim();
      if (value) return value;
    } catch {
      // Replace the low-level Git failure below.
    }
    throw new Error(`Git ${key} is required before this command can create local preservation commits.`);
  };
  return { name: read('user.name'), email: read('user.email') };
}

function requireNoGitOperation(root) {
  for (const marker of ['MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'BISECT_LOG', 'rebase-merge', 'rebase-apply']) {
    const path = git(root, 'rev-parse', '--git-path', marker).trim();
    if (existsSync(resolve(root, path))) throw new Error(`Git operation in progress (${marker}). Complete or abort it before bootstrapping Lab 09.`);
  }
}

function refHasPath(root, ref, path) {
  try {
    git(root, 'cat-file', '-e', `${ref}:${path}`);
    return true;
  } catch {
    return false;
  }
}

function mainSource(root) {
  for (const ref of ['refs/heads/main', 'refs/remotes/origin/main']) {
    if (!refExists(root, ref)) continue;
    const missing = requiredMainPaths.filter(path => !refHasPath(root, ref, path));
    if (!missing.length) return { ref, commit: git(root, 'rev-parse', `${ref}^{commit}`).trim() };
  }
  throw new Error('No local main ref contains the current Lab 09 support. Fetch or update main, then retry; this command never moves main automatically.');
}

function solutionSource(root, main) {
  const releases = JSON.parse(git(root, 'show', `${main.commit}:presenter/evidence/releases.json`));
  const solution = releases.solution;
  if (!solution || !/^solution-v[0-9][a-zA-Z0-9.-]*$/.test(solution.tag) || !/^[a-f0-9]{40}$/.test(solution.commit)) {
    throw new Error('Reviewed solution release metadata is missing or invalid.');
  }
  const ref = `refs/tags/${solution.tag}`;
  if (!refExists(root, ref)) throw new Error(`Missing ${solution.tag}. Obtain the reviewed local release refs before bootstrapping Lab 09.`);
  const actual = git(root, 'rev-parse', `${ref}^{commit}`).trim();
  if (actual !== solution.commit) throw new Error(`${solution.tag} moved or does not match presenter/evidence/releases.json.`);
  for (const path of ['src/api/search.ts', 'tests/search/search.test.ts']) {
    if (!refHasPath(root, actual, path)) throw new Error(`Reviewed solution is missing ${path}.`);
  }
  return { tag: solution.tag, commit: actual };
}

function defaultBackupBranch(now) {
  return `workshop/local-backup-before-lab-09-${now.toISOString().replace(/\D/g, '').slice(0, 14)}`;
}

function validateBranch(root, branch) {
  git(root, 'check-ref-format', '--branch', branch);
  if (refExists(root, `refs/heads/${branch}`)) throw new Error(`Local branch already exists: ${branch}`);
  return branch;
}

function statusEntries(root) {
  return git(root, 'status', '--porcelain=v1', '--untracked-files=all').trim().split('\n').filter(Boolean);
}

function commit(root, identity, subject) {
  git(
    root,
    '-c', `user.name=${identity.name}`,
    '-c', `user.email=${identity.email}`,
    'commit', '-m', subject, '-m', trailer,
  );
  return git(root, 'rev-parse', 'HEAD').trim();
}

export function planLab09Bootstrap(root, options, now = new Date()) {
  if (workspaceKind(root) !== 'author') throw new Error('Lab 09 bootstrap must run in the author workspace.');
  const branch = git(root, 'branch', '--show-current').trim();
  if (!branch) throw new Error('Lab 09 bootstrap requires a named branch, not detached HEAD.');
  requireNoGitOperation(root);
  const identity = requireGitIdentity(root);
  if (typeof options.destination !== 'string') throw new Error('Use --destination ../user-search-lab-09 (a new sibling).');
  const destination = consumerDestination(root, options.destination);
  const dirty = statusEntries(root);
  const backupBranch = dirty.length
    ? validateBranch(root, options.backupBranch ?? defaultBackupBranch(now))
    : null;
  const main = mainSource(root);
  const solution = solutionSource(root, main);
  return {
    original: { branch, commit: git(root, 'rev-parse', 'HEAD').trim() },
    dirty,
    backup: backupBranch ? { branch: backupBranch } : null,
    destination,
    main,
    solution,
    targetBranch,
    identity,
  };
}

export function applyLab09Bootstrap(root, options, now = new Date()) {
  const plan = planLab09Bootstrap(root, options, now);
  let backupCommit = null;
  let authorRestored = false;

  if (plan.backup) {
    git(root, 'switch', '-c', plan.backup.branch);
    try {
      git(root, 'add', '-A');
      backupCommit = commit(root, plan.identity, 'Preserve local lab work before Lab 09 bootstrap');
    } catch (error) {
      throw new Error(`Could not commit the local snapshot. Your work remains on ${plan.backup.branch}; inspect it before retrying. ${error.message}`);
    }
    git(root, 'switch', plan.original.branch);
  }

  try {
    if (statusEntries(root).length) throw new Error('Original branch did not return to a clean state after preservation.');
    git(root, 'switch', '--detach', plan.main.commit);
    const consumer = makeConsumer(root, options.destination);
    const destination = consumer.destination;
    git(destination, 'switch', '-c', targetBranch);

    for (const path of ['src/api/search.ts', 'tests/search/search.test.ts']) {
      writeFileSync(safePath(destination, path), git(root, 'show', `${plan.solution.commit}:${path}`));
    }

    git(destination, 'add', '-A');
    const consumerCommit = commit(destination, plan.identity, 'Bootstrap reviewed Lab 07 solution for Lab 09');
    if (statusEntries(destination).length) throw new Error('Generated Lab 09 consumer is not clean after its baseline commit.');

    return {
      readyFor: '09-spec-kit',
      original: plan.original,
      backup: plan.backup ? { branch: plan.backup.branch, commit: backupCommit } : null,
      destination,
      consumer: { branch: targetBranch, commit: consumerCommit, remote: null },
      main: plan.main,
      solution: plan.solution,
      next: [
        `cd ${destination}`,
        'npm ci',
        'npm run verify:solution',
        'node scripts/spec-kit-reference.mjs --preview',
      ],
      note: 'The local snapshot includes every non-ignored file listed by preview. No package installation, remote, push, or Spec Kit execution was performed.',
    };
  } finally {
    try {
      git(root, 'switch', plan.original.branch);
      authorRestored = true;
    } catch (error) {
      if (!authorRestored) {
        throw new Error(`Lab 09 bootstrap could not restore author branch ${plan.original.branch}. The local backup and generated consumer are preserved. ${error.message}`);
      }
    }
  }
}

function parseOptions(argv) {
  const parsed = args(argv, ['--preview', '--apply', '--destination', '--backup-branch']);
  const selected = ['--preview', '--apply'].filter(option => parsed[option]);
  if (selected.length !== 1) throw new Error('Choose exactly one of --preview or --apply.');
  if (typeof parsed['--destination'] !== 'string') throw new Error('Use --destination ../user-search-lab-09 (a new sibling).');
  if (parsed['--backup-branch'] !== undefined && typeof parsed['--backup-branch'] !== 'string') {
    throw new Error('--backup-branch requires a local branch name.');
  }
  return {
    mode: selected[0].slice(2),
    destination: parsed['--destination'],
    backupBranch: parsed['--backup-branch'],
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = parseOptions(process.argv.slice(2));
    const root = workspace(process.cwd());
    const result = options.mode === 'preview'
      ? { mode: 'preview', ...planLab09Bootstrap(root, options), identity: undefined }
      : applyLab09Bootstrap(root, options);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    failMain(error);
  }
}
