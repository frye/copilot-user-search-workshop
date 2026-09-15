import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { git, run, workspace, failMain } from './lib/safe.mjs';
import { workspaceKind } from './lib/examples.mjs';
try {
  const root = workspace(process.cwd());
  const npm = run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['--version'], root).trim();
  const result = {
    node: process.version, npm, expected: { node: 'v24.20.0', npm: '11.19.0' },
    toolchainMatches: process.version === 'v24.20.0' && npm === '11.19.0',
    workspace: workspaceKind(root), ref: git(root, 'rev-parse', 'HEAD').trim(),
    branch: git(root, 'branch', '--show-current').trim(),
    localSkillPresent: existsSync(resolve(root, '.github/skills/api-change-workflow/SKILL.md')),
    observedClients: [],
    manualChecks: [
      'Record actual VS Code/CLI/app build and managed-policy restrictions.',
      'Inspect skill/plugin names for user/global conflicts; do not disable unrelated customizations.',
      'Confirm active workspace, discoverability, invocation and source/version in the real client.',
      'Inspect tool permission IDs in this build. Static validation does not prove runtime loading.',
      'Consumer must have no local shared skill or duplicate package registration.',
    ],
  };
  console.log(JSON.stringify(result, null, 2));
  if (!result.toolchainMatches) process.exitCode = 1;
} catch (error) { failMain(error); }
