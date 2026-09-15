import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { args, failMain, fileState, git, hash, json, workspace } from './lib/safe.mjs';
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
      if (hash(git(root, 'show', `${lock.commit}:${file.source}`)) !== file.sha256) throw new Error(`Source hash mismatch: ${file.source}`);
    }
  }
  if (options['--exercise']) {
    const id = options['--step'];
    if (!steps.some(step => step.id === id)) throw new Error('Use --exercise --step <exact step ID from workshop/steps.json>.');
    const plan = planStep(root, id, workspaceKind(root), options['--client'] ?? 'cli');
    for (const entry of plan.entries) {
      const content = fileState(root, entry.destination);
      if (!content?.length) throw new Error(`Missing exercise asset: ${entry.destination}`);
      const text = content.toString();
      if (entry.destination.endsWith('.instructions.md')) {
        const expected = entry.destination.includes('/api.') ? 'src/api/**/*.ts' : 'tests/**/*.ts';
        if (!text.startsWith('---\n') || !text.includes(`applyTo: "${expected}"`)) throw new Error(`Missing exact lab scope: ${entry.destination}`);
      }
      if (entry.destination.endsWith('.prompt.md')) {
        const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!header || !/^name: plan-api-change\r?$/m.test(header[1])) throw new Error('Prompt needs plan-api-change name frontmatter.');
        if (!/^description: .+/m.test(header[1]) || !/approval/i.test(text)) throw new Error('Prompt needs description and approval stop.');
        for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
          if (!existsSync(resolve(root, dirname(entry.destination), match[1]))) throw new Error(`Broken prompt reference: ${match[1]}`);
        }
      }
      if (entry.destination.endsWith('.agent.md')) {
        if (!/^---\nname: .+\ndescription: .+\n/.test(text)) throw new Error('Role needs name and description frontmatter.');
        const match = text.match(/^tools: (.+)$/m);
        if (options['--client'] === 'app') {
          if (!match && !/advisory/i.test(text)) throw new Error('Unverified app role must disclose advisory permissions.');
        } else {
          if (!match) throw new Error('Role must declare tool candidates for this client.');
          const tools = JSON.parse(match[1]);
          const allowed = tool => typeof tool === 'string' && !tool.includes('*') &&
            (['read', 'search', 'edit', 'execute'].includes(tool) || /(?:^|[/_.-])get_(?:api_conventions|validation_commands)$/.test(tool));
          if (!Array.isArray(tools) || tools.some(tool => !allowed(tool))) throw new Error('Use bounded tool groups and exact discovered fixture-tool identifiers, never wildcard/unknown grants.');
          if (!entry.destination.includes('implementer') && tools.some(tool => ['edit', 'execute'].includes(tool))) throw new Error('Planner/reviewer must not declare generic edit/execute in the bounded sample route.');
        }
      }
      if (entry.destination.endsWith('vscode.mcp.json')) {
        const config = JSON.parse(text);
        const server = config.servers?.['workshop-standards'];
        if (server?.command !== 'node' || server.type !== 'stdio' || JSON.stringify(server.args) !== JSON.stringify(['${workspaceFolder}/dist/src/standards-mcp/main.js'])) throw new Error('Unexpected workspace fixture MCP launch command.');
      }
    }
    if (id === '03-skill' || id === '05-mcp-and-update' && workspaceKind(root) === 'author') validateSkill(root);
    if (id === '04-plugin') {
      const data = json(resolve(root, 'toolkit/plugin.json'));
      const validate = new Ajv2020({ strict: true }).compile(json(resolve(root, 'workshop/plugin.schema.json')));
      if (!validate(data) || data.name !== 'user-search-toolkit' || !/^\d+\.\d+\.\d+$/.test(data.version) || data.extensions) throw new Error('Invalid skill-only plugin manifest/version/schema.');
      validateSkill(root);
    }
    if (id === '05-mcp-and-update' && workspaceKind(root) === 'author') {
      const text = fileState(root, '.github/skills/api-change-workflow/SKILL.md').toString();
      if (!text.includes('get_api_conventions') || !text.includes('get_validation_commands') || !/fallback/i.test(text)) throw new Error('MCP-aware skill needs both tools and explicit fallback.');
      if (json(resolve(root, 'toolkit/plugin.json')).version === '1.0.0') throw new Error('Bump the installed procedure version for the MCP update.');
    }
    if (workspaceKind(root) === 'consumer' && existsSync(resolve(root, '.github/skills/api-change-workflow'))) throw new Error('Duplicate canonical skill in consumer. Preserve it elsewhere before using the installed package; do not register both.');
    console.log(`Static assets present for ${id}. NOT runtime proof: record actual client discovery/invocation, source/version, approval, and results using workshop/evaluation-rubric.md.`);
  } else {
    for (const path of ['docs/start.md', 'docs/reference/contract.md', 'workshop/compatibility.json', 'presenter/checkpoint-map.json']) {
      if (!existsSync(resolve(root, path))) throw new Error(`Missing required asset: ${path}`);
    }
    console.log(`Release metadata and ${steps.length} step mappings valid: ${lock.tag} ${lock.commit}. Client runtime is not inferred.`);
  }
} catch (error) { failMain(error); }
