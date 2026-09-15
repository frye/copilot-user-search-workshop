import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { args, failMain, fileState, json, workspace } from './lib/safe.mjs';
import { release, planStep, workspaceKind } from './lib/examples.mjs';
import { validateSkill } from './lib/toolkit.mjs';

try {
  const options = args(process.argv.slice(2), ['--exercise', '--step', '--client']);
  const root = workspace(process.cwd());
  const steps = json(resolve(root, 'workshop/steps.json')).steps;
  const { manifest, lock } = release(root);
  if (JSON.stringify(steps.map(step => step.id)) !== JSON.stringify(manifest.steps.map(step => step.id))) throw new Error('Step index and release payloads disagree.');
  for (const step of manifest.steps) {
    for (const file of step.files) {
      if (!file.source.startsWith(`examples/steps/${step.id}/`) || !file.sha256 || !file.workspace) throw new Error('Incomplete per-step mapping.');
    }
  }
  if (options['--exercise']) {
    const id = options['--step'];
    if (!steps.some(step => step.id === id)) throw new Error('Use --exercise --step <exact step ID from workshop/steps.json>.');
    const plan = planStep(root, id, workspaceKind(root), options['--client'] ?? 'cli');
    for (const entry of plan.entries) {
      const content = fileState(root, entry.destination);
      if (!content?.length) throw new Error(`Missing exercise asset: ${entry.destination}`);
    }
    if (id === '03-skill' || id === '05-mcp-and-update' && workspaceKind(root) === 'author') validateSkill(root);
    if (id === '04-plugin') {
      // Manifest validation is read-only here; do not package or install as a side effect.
      const data = json(resolve(root, 'toolkit/plugin.json'));
      if (data.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json' || !/^\d+\.\d+\.\d+$/.test(data.version)) throw new Error('Invalid version/schema.');
      validateSkill(root);
    }
    console.log(`Static assets present for ${id}. NOT runtime proof: record actual client discovery/invocation, source/version, approval, and results using workshop/evaluation-rubric.md.`);
  } else {
    for (const path of ['docs/start.md', 'docs/reference/contract.md', 'workshop/compatibility.json', 'presenter/checkpoint-map.json']) {
      if (!existsSync(resolve(root, path))) throw new Error(`Missing required asset: ${path}`);
    }
    console.log(`Release metadata and ${steps.length} step mappings valid: ${lock.tag} ${lock.commit}. Client runtime is not inferred.`);
  }
} catch (error) { failMain(error); }
