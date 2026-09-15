import { args, failMain, git, workspace } from './lib/safe.mjs';
import { apply, planStep, workspaceKind } from './lib/examples.mjs';

const steps = ['01-instructions', '02-planning-prompt'];
const trailer = 'Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>';

function requireGitConfig(root, key) {
  try {
    if (git(root, 'config', '--get', key).trim()) return;
  } catch {
    // Replace the low-level Git error with an actionable preflight message.
  }
  throw new Error(`Git ${key} is required before this command can create its local checkpoint commit.`);
}

try {
  args(process.argv.slice(2), []);
  const root = workspace(process.cwd());
  if (workspaceKind(root) !== 'author') throw new Error('Lab 03 bootstrap must run in the author workspace.');
  if (!git(root, 'branch', '--show-current').trim()) throw new Error('Lab 03 bootstrap requires a learner branch, not detached HEAD.');
  if (git(root, 'diff', '--cached', '--name-only', '--').trim()) {
    throw new Error('Existing staged changes would be included in the checkpoint commit. Commit or unstage them first.');
  }
  requireGitConfig(root, 'user.name');
  requireGitConfig(root, 'user.email');

  const initialPlans = steps.map(step => planStep(root, step));
  const produced = new Set(initialPlans.flatMap(plan => plan.entries.map(entry => entry.destination)));
  const conflicts = initialPlans.flatMap(plan => plan.entries.filter(entry => entry.conflict));
  const unmet = initialPlans.flatMap(plan =>
    plan.prerequisites.filter(item => !item.present && !produced.has(item.path)));
  if (conflicts.length || unmet.length) {
    throw new Error('Lab 01-02 preflight failed. Use the per-step preview/stage commands to preserve and compare learner work.');
  }

  const results = [];
  for (const step of steps) results.push({ step, ...apply(planStep(root, step)) });

  const destinations = [...new Set(initialPlans.flatMap(plan => plan.entries.map(entry => entry.destination)))];
  if (!git(root, 'status', '--porcelain', '--untracked-files=all', '--', ...destinations).trim()) {
    console.log(JSON.stringify({ readyFor: '03-skill', commit: null, results, note: 'Lab 01-02 assets are already committed.' }, null, 2));
  } else {
    git(root, 'add', '--', ...destinations);
    const staged = git(root, 'diff', '--cached', '--name-only', '--').trim().split('\n').filter(Boolean);
    if (staged.some(path => !destinations.includes(path))) throw new Error('Unexpected staged path detected; refusing checkpoint commit.');
    git(root, 'commit', '--only', '-m', 'Bootstrap Labs 01-02 for Lab 03', '-m', trailer, '--', ...destinations);
    console.log(JSON.stringify({
      readyFor: '03-skill',
      commit: git(root, 'rev-parse', 'HEAD').trim(),
      results,
      note: 'Example assets only. Complete and record the Lab 00 readiness checks separately.',
    }, null, 2));
  }
} catch (error) {
  failMain(error);
}
