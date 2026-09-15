import { existsSync, mkdirSync, writeFileSync, realpathSync, lstatSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';
import { args, failMain, fileState, git, hash, json, safePath, workspace } from './lib/safe.mjs';
import { fileURLToPath } from 'node:url';
import { workspaceKind, release } from './lib/examples.mjs';

export function makeConsumer(root, target, starter = 'starter-v1') {
  if (workspaceKind(root) !== 'author') throw new Error('Run consumer:create in the author workspace.');
  release(root);
  const dest = resolve(root, target);
  if (dirname(dest) !== dirname(root) || dest === root || !/^[-a-zA-Z0-9 _]+$/.test(basename(dest))) throw new Error('Consumer must be a new, named immediate sibling of the author workspace.');
  if (realpathSync(dirname(dest)) !== dirname(root)) throw new Error('Consumer parent must not be a symlink.');
  try { lstatSync(dest); throw new Error('Consumer destination already exists; select a fresh name.'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (existsSync(resolve(dirname(root), '.github'))) throw new Error('Parent .github customizations may be inherited. Choose an isolated parent without them.');
  const pinned = json(resolve(root, 'workshop/starter-lock.json'));
  const sha = git(root, 'rev-parse', '--verify', `refs/tags/${starter}^{commit}`).trim();
  if (sha !== pinned.commit || starter !== pinned.tag) throw new Error('Starter ref changed or is not the reviewed consumer base.');
  const guidance = ['.github/copilot-instructions.md', '.github/instructions/api.instructions.md', '.github/instructions/tests.instructions.md', '.github/prompts/plan-api-change.prompt.md'];
  const copies = guidance.map(path => ({ path, data: fileState(root, path) })).filter(item => item.data !== null);
  const tree = git(root, 'ls-tree', '-r', '--name-only', sha).trim().split('\n');
  if (tree.some(path => path.startsWith('.github/skills/') || path.startsWith('.github/agents/'))) throw new Error('Starter has active completed customizations.');
  git(root, 'clone', '--no-local', '--no-hardlinks', '--no-checkout', '--', root, dest);
  try {
    git(dest, 'switch', '--detach', sha);
    git(dest, 'switch', '-c', 'workshop-consumer');
    git(dest, 'remote', 'remove', 'origin');
    for (const { path, data } of copies) {
      const absolute = safePath(dest, path);
      mkdirSync(dirname(absolute), { recursive: true });
      writeFileSync(absolute, data);
    }
    // Carry only release metadata from this approved author release, never learner skill/config.
    for (const path of ['workshop/examples-lock.json', 'workshop/starter-lock.json']) {
      writeFileSync(safePath(dest, path), fileState(root, path));
    }
    writeFileSync(resolve(dest, '.git/workshop-context.json'), JSON.stringify({
      kind: 'consumer', starter: sha, author: root,
      copied: copies.map(({ path, data }) => ({ path, sha256: hash(data) })),
    }, null, 2) + '\n', { flag: 'wx' });
    if (existsSync(resolve(dest, '.github/skills'))) throw new Error('Duplicate local skill detected.');
    return { destination: dest, starter: sha, copied: copies.map(item => item.path), localSkillAbsent: true, installed: false };
  } catch (error) {
    throw new Error(`Consumer creation incomplete at ${dest}. No installation occurred. Inspect this new directory before removing/retrying. ${error.message}`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = args(process.argv.slice(2), ['--destination']);
    if (typeof options['--destination'] !== 'string') throw new Error('Use --destination ../workshop-consumer (a new sibling).');
    console.log(JSON.stringify(makeConsumer(workspace(process.cwd()), options['--destination']), null, 2));
  } catch (error) { failMain(error); }
}
