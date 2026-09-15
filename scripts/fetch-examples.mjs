import { resolve } from 'node:path';
import { args, failMain, git, json, workspace } from './lib/safe.mjs';
import { release } from './lib/examples.mjs';

try {
  const root = workspace(process.cwd());
  const options = args(process.argv.slice(2), ['--remote', '--approve-network']);
  const lock = json(resolve(root, 'workshop/examples-lock.json'));
  const exists = git(root, 'tag', '--list', lock.tag).trim();
  if (!exists) {
    if (options['--remote'] !== 'origin' || options['--approve-network'] !== true || !lock.approvedOrigin) {
      throw new Error(`Local tag ${lock.tag} missing. Offline: obtain an owner-reviewed Git bundle containing release refs. Future remote: owner must set approvedOrigin in the lock; then --remote origin --approve-network. No network attempted.`);
    }
    if (git(root, 'remote', 'get-url', 'origin').trim() !== lock.approvedOrigin) throw new Error('Origin is not the reviewed source.');
    git(root, 'fetch', '--no-tags', 'origin', `refs/tags/${lock.tag}:refs/tags/${lock.tag}`);
  }
  const { lock: checked } = release(root);
  console.log(`Verified local ${checked.tag} ${checked.commit}. No branch switch, merge, installation or execution.`);
} catch (error) { failMain(error); }
