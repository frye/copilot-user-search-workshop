import { existsSync, mkdirSync, writeFileSync, unlinkSync, rmdirSync, lstatSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { git, hash, json, safePath, fileState } from './safe.mjs';

export function release(root) {
  const lock = json(resolve(root, 'workshop/examples-lock.json'));
  if (!/^examples-v[0-9][a-zA-Z0-9.-]*$/.test(lock.tag) || !/^[a-f0-9]{40}$/.test(lock.commit)) {
    throw new Error('Release metadata is not pinned. Use an approved release, not an author bootstrap.');
  }
  let actual;
  try { actual = git(root, 'rev-parse', '--verify', `refs/tags/${lock.tag}^{commit}`).trim(); }
  catch { throw new Error(`Missing ${lock.tag}. Run lab:examples:fetch; no origin is needed when the tag already exists locally.`); }
  if (actual !== lock.commit) throw new Error('Stale or moved examples tag; refusing mismatched source.');
  const raw = git(root, 'show', `${actual}:examples/manifest.json`);
  if (hash(raw) !== lock.manifestSha256) throw new Error('Unexpected manifest hash.');
  const manifest = JSON.parse(raw);
  if (manifest.version !== 1 || !Array.isArray(manifest.steps)) throw new Error('Invalid step manifest.');
  return { lock, manifest };
}

export function workspaceKind(root) {
  const marker = git(root, 'rev-parse', '--git-path', 'workshop-context.json').trim();
  return existsSync(resolve(root, marker)) ? json(resolve(root, marker)).kind : 'author';
}

function receiptsPath(root) {
  const path = resolve(root, git(root, 'rev-parse', '--git-path', 'workshop-imports.json').trim());
  try {
    if (lstatSync(path).isSymbolicLink() || lstatSync(path).nlink > 1) throw new Error('Import receipt links are not allowed.');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  return path;
}

export function planStep(root, stepId, kind = workspaceKind(root), client = 'cli') {
  if (!['author', 'consumer'].includes(kind) || !['cli', 'vscode', 'app'].includes(client)) throw new Error('Use author/consumer and cli/vscode/app.');
  if (kind !== workspaceKind(root)) throw new Error(`This is a ${workspaceKind(root)} workspace. Change directories to the named workspace.`);
  const { lock, manifest } = release(root);
  const step = manifest.steps.find(item => item.id === stepId);
  if (!step) throw new Error(`Unknown step: ${stepId}`);
  const receiptFile = receiptsPath(root);
  const receipts = existsSync(receiptFile) ? json(receiptFile) : {};
  const files = step.files.filter(item => item.workspace === kind && (!item.clients || item.clients.includes(client)));
  if (!files.length) throw new Error(`No ${kind}/${client} payload for ${stepId}. See the step's workspace mapping.`);
  const entries = [];
  const seen = new Set();
  for (const file of files) {
    if (!file.source.startsWith(`examples/steps/${stepId}/`) || !/^[a-f0-9]{64}$/.test(file.sha256) ||
        !Array.isArray(file.accepts) || file.accepts.some(value => !/^[a-f0-9]{64}$/.test(value))) {
      throw new Error('Invalid reviewed source mapping.');
    }
    safePath(root, file.source);
    if (!/^(?:\.github\/(?:copilot-instructions\.md|instructions\/|prompts\/|skills\/|agents\/)|client-configs\/|toolkit\/(?:plugin\.json|catalog\.md)|workshop\/artifacts\/)/.test(file.destination)) {
      throw new Error(`Destination outside customization allowlist: ${file.destination}`);
    }
    if (seen.has(file.destination)) throw new Error('Duplicate destination in step.');
    seen.add(file.destination);
    const mode = git(root, 'ls-tree', lock.commit, '--', file.source).split(' ')[0];
    if (mode !== '100644') throw new Error('Source must be a regular non-executable file.');
    const payload = Buffer.from(git(root, 'show', `${lock.commit}:${file.source}`));
    if (hash(payload) !== file.sha256) throw new Error(`Unexpected source hash: ${file.source}`);
    let before = null;
    let conflict = null;
    let state = 'missing';
    try {
      before = fileState(root, file.destination);
      const tracked = git(root, 'ls-files', '--', file.destination).trim().length > 0;
      const dirty = git(root, 'status', '--porcelain', '--untracked-files=all', '--', file.destination).trim();
      if (before === null) {
        if (tracked || dirty) conflict = 'Tracked deletion or unexpected Git state';
      } else if (hash(before) === file.sha256 && (!dirty && tracked || receipts[file.destination] === file.sha256)) {
        state = 'already matching';
      } else if (!tracked) {
        conflict = 'Untracked/ignored collision, including matching files not imported by this helper';
      } else if (dirty) {
        conflict = 'Staged or unstaged learner edits';
      } else if (!file.accepts.includes(hash(before))) {
        conflict = 'Committed learner content or unexpected destination hash';
      } else {
        state = 'known prerequisite';
      }
    } catch (error) { conflict = error.message; }
    entries.push({ ...file, payload, before, state, conflict });
  }
  const prerequisites = (step.requires?.[kind] ?? []).map(path => {
    try { return { path, present: fileState(root, path) !== null }; }
    catch (error) { return { path, present: false, error: error.message }; }
  });
  return { root, step, lock, kind, client, entries, prerequisites, receipts, receiptFile };
}

export function describe(plan) {
  return {
    source: { tag: plan.lock.tag, commit: plan.lock.commit },
    step: plan.step.id, workspace: plan.kind, client: plan.client,
    prerequisites: plan.prerequisites,
    prerequisiteSteps: plan.step.prerequisiteSteps,
    files: plan.entries.map(({ destination, source, sha256, state, conflict }) => ({ destination, source, sha256, state, conflict })),
    note: 'Presence is not proof that authored equivalents satisfy prerequisites or that a client loaded an asset.',
  };
}

export function stage(plan) {
  const base = `.lab-references/${plan.step.id}-${plan.kind}-${plan.client}`;
  const directory = resolve(plan.root, base);
  // Check every parent, including a dangling symlink, before creating an exclusive directory.
  safePath(plan.root, `${base}/reference.json`);
  mkdirSync(directory);
  try {
    for (const entry of plan.entries) {
      const target = safePath(directory, entry.destination);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, entry.payload, { flag: 'wx' });
    }
    writeFileSync(resolve(directory, 'reference.json'), JSON.stringify(describe(plan), null, 2) + '\n', { flag: 'wx' });
  } catch (error) {
    throw new Error(`Stage incomplete at ${base}; inspect it, do not apply it blindly. ${error.message}`);
  }
  return base;
}

export function apply(plan, hooks = {}) {
  if (plan.prerequisites.some(item => !item.present) || plan.entries.some(item => item.conflict)) {
    throw new Error('Whole-step preflight failed: resolve every prerequisite/conflict using preview/stage. No files written.');
  }
  const changes = plan.entries.filter(item => item.state !== 'already matching');
  const createdDirs = [];
  const written = [];
  const same = (a, b) => a === null ? b === null : b !== null && hash(a) === hash(b);
  const recheck = () => {
    const current = planStep(plan.root, plan.step.id, plan.kind, plan.client);
    if (current.entries.some((item, i) => item.conflict || !same(plan.entries[i].before, item.before))) {
      throw new Error('Destination changed since preview/preflight. Nothing further will be written.');
    }
  };
  recheck();
  try {
    hooks.beforeWrite?.();
    recheck();
    for (const entry of changes) {
      const target = safePath(plan.root, entry.destination);
      if (!same(entry.before, fileState(plan.root, entry.destination))) throw new Error('Concurrent edit detected.');
      const missing = [];
      let parent = dirname(target);
      while (!existsSync(parent)) { missing.push(parent); parent = dirname(parent); }
      for (const dir of missing.reverse()) { mkdirSync(dir); createdDirs.push(dir); }
      written.push(entry);
      writeFileSync(target, entry.payload, { flag: entry.before === null ? 'wx' : 'w' });
      hooks.afterWrite?.(written.length);
    }
    const receipts = { ...plan.receipts };
    for (const entry of plan.entries) receipts[entry.destination] = entry.sha256;
    writeFileSync(plan.receiptFile, JSON.stringify(receipts, null, 2) + '\n');
  } catch (error) {
    const failures = [];
    for (const entry of written.reverse()) {
      try {
        const current = fileState(plan.root, entry.destination);
        if (current === null || hash(current) !== entry.sha256) throw new Error('Concurrent change: preserved for manual recovery');
        if (entry.before === null) unlinkSync(safePath(plan.root, entry.destination));
        else writeFileSync(safePath(plan.root, entry.destination), entry.before);
      } catch (rollbackError) { failures.push(`${entry.destination}: ${rollbackError.message}`); }
    }
    for (const dir of createdDirs.reverse()) {
      try { rmdirSync(dir); } catch { /* Preserve concurrent content. */ }
    }
    throw new Error(`${error.message}; ${failures.length ? `ROLLBACK INCOMPLETE: ${failures.join('; ')}` : 'all written payloads rolled back'}`);
  }
  return { changed: changes.length, unchanged: plan.entries.length - changes.length };
}
