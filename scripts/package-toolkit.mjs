import { workspace, failMain } from './lib/safe.mjs';
import { workspaceKind } from './lib/examples.mjs';
import { packageToolkit } from './lib/toolkit.mjs';
try {
  const root = workspace(process.cwd());
  if (workspaceKind(root) !== 'author') throw new Error('Package only in the author workspace; consumer must have no local canonical skill.');
  if (process.argv.length !== 2) throw new Error('No output/source overrides: inspect the fixed package allowlist.');
  console.log(JSON.stringify(packageToolkit(root), null, 2));
} catch (error) { failMain(error); }
