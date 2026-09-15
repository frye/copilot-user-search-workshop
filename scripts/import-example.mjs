import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { args, failMain, safePath, workspace } from './lib/safe.mjs';
import { planStep, describe, stage, apply, workspaceKind } from './lib/examples.mjs';

try {
  const options = args(process.argv.slice(2), ['--step', '--workspace', '--client', '--preview', '--stage', '--apply']);
  if (typeof options['--step'] !== 'string' || ['--preview', '--stage', '--apply'].filter(key => options[key]).length !== 1) {
    throw new Error('Use --step <id> and exactly one of --preview, --stage, --apply; optionally --workspace author|consumer --client cli|vscode|app.');
  }
  const root = workspace(process.cwd());
  const plan = planStep(root, options['--step'], options['--workspace'] ?? workspaceKind(root), options['--client'] ?? 'cli');
  console.log(JSON.stringify(describe(plan), null, 2));
  if (options['--stage']) {
    safePath(root, '.lab-references/placeholder');
    mkdirSync(resolve(root, '.lab-references'), { recursive: true });
    console.log(`Staged references: ${stage(plan)}`);
  }
  if (options['--apply']) console.log(JSON.stringify(apply(plan)));
} catch (error) { failMain(error); }
