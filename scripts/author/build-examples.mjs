import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { hash, json } from '../lib/safe.mjs';

// Metadata only: complete payloads live on examples, never embedded in main's helpers.
const root = process.cwd();
if (!existsSync('examples/steps/03-skill/files/SKILL.md')) throw new Error('Run only in the examples author checkout containing reviewed payloads.');
const steps = json('workshop/steps.json').steps.map(step => ({
  id: step.id, explanation: `Reviewed ${step.id} customization payload; see docs/labs/${step.id}.md. Import explicitly, never merge examples.`,
  prerequisiteSteps: step.prerequisites, requires: {}, files: [],
}));
const find = id => steps.find(step => step.id === id);
function add(id, source, destination, workspace = 'author', clients, accepts = []) {
  const path = `examples/steps/${id}/${source}`;
  find(id).files.push({ source: path, destination, workspace, ...(clients ? { clients } : {}), sha256: hash(readFileSync(path)), accepts });
}
const prior = (id, destination) => find(id).files.find(file => file.destination === destination).sha256;
const skill = '.github/skills/api-change-workflow';
const prompt = '.github/prompts/plan-api-change.prompt.md';
add('00-start', 'files/setup-checklist.md', 'workshop/artifacts/setup-checklist.md');
add('01-instructions', 'files/copilot-instructions.md', '.github/copilot-instructions.md', 'author', undefined, [hash(readFileSync('.github/copilot-instructions.md'))]);
for (const name of ['api', 'tests']) add('01-instructions', `files/${name}.instructions.md`, `.github/instructions/${name}.instructions.md`);
add('02-planning-prompt', 'files/plan-api-change.prompt.md', prompt);
find('02-planning-prompt').requires.author = ['.github/instructions/api.instructions.md', '.github/instructions/tests.instructions.md'];
for (const [file, destination] of [['SKILL.md', `${skill}/SKILL.md`], ['review-checklist.md', `${skill}/references/review-checklist.md`]]) {
  add('03-skill', `files/${file}`, destination);
}
find('03-skill').requires.author = [prompt];
for (const file of ['plugin.json', 'catalog.md']) add('04-plugin', `files/${file}`, `toolkit/${file}`);
find('04-plugin').requires.author = [`${skill}/SKILL.md`, `${skill}/references/review-checklist.md`];
for (const [file, destination, priorStep] of [
  ['SKILL.md', `${skill}/SKILL.md`, '03-skill'],
  ['review-checklist.md', `${skill}/references/review-checklist.md`, '03-skill'],
  ['plugin.json', 'toolkit/plugin.json', '04-plugin'],
  ['catalog.md', 'toolkit/catalog.md', '04-plugin'],
]) add('05-mcp-and-update', `author/${file}`, destination, 'author', undefined, [prior(priorStep, destination)]);
find('05-mcp-and-update').requires.author = [`${skill}/SKILL.md`, 'toolkit/plugin.json'];
find('05-mcp-and-update').requires.consumer = [prompt];
for (const [client, file] of [['vscode', 'vscode.mcp.json'], ['cli', 'cli-mcp.md'], ['app', 'app-mcp.md']]) {
  add('05-mcp-and-update', `consumer/${file}`, `client-configs/${file}`, 'consumer', [client]);
}
for (const client of ['vscode', 'cli', 'app']) {
  for (const role of ['planner', 'implementer', 'reviewer']) {
    add('06-agent-roles', `clients/${client}/workshop-${role}.agent.md`, `.github/agents/workshop-${role}.agent.md`, 'consumer', [client]);
  }
}
find('06-agent-roles').requires.consumer = [prompt];
add('07-use-toolkit', 'files/toolkit-checkpoint.md', 'workshop/artifacts/toolkit-checkpoint.md', 'consumer');
find('07-use-toolkit').requires.consumer = ['planner', 'implementer', 'reviewer'].map(role => `.github/agents/workshop-${role}.agent.md`);
for (const file of ['total-after-limit.mjs', 'probe.mjs', 'review-rubric.md', 'continuation-brief.md']) {
  add('08-review-and-handoff', `files/${file}`, `workshop/artifacts/review/${file}`, 'consumer');
}
find('08-review-and-handoff').requires.consumer = ['.github/agents/workshop-reviewer.agent.md'];
add('09-spec-kit', 'files/unavailable.md', 'workshop/artifacts/optional-spec-kit/unavailable.md', 'consumer');
const manifest = { version: 1, steps };
writeFileSync('examples/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
const checkpoint = { examplesTag: 'examples-v1', source: 'examples/manifest.json', checkpoints: [
  { entry: '04-plugin', authorSteps: steps.slice(0, 4).map(step => step.id), consumerSteps: [], steps: steps.slice(0, 4).map(step => step.id) },
  { entry: '07-use-toolkit', authorSteps: steps.slice(0, 6).map(step => step.id), consumerSteps: ['05-mcp-and-update', '06-agent-roles'], steps: steps.slice(0, 7).map(step => step.id), installationRequired: true },
  { entry: '08-review-and-handoff', authorSteps: steps.slice(0, 6).map(step => step.id), consumerSteps: steps.slice(5, 9).map(step => step.id), steps: steps.slice(0, 9).map(step => step.id), installationRequired: true },
] };
mkdirSync('presenter', { recursive: true });
writeFileSync('presenter/checkpoint-map.json', JSON.stringify(checkpoint, null, 2) + '\n');
writeFileSync('examples/checkpoint-map.json', JSON.stringify(checkpoint, null, 2) + '\n');
for (const step of steps) {
  const rows = step.files.map(file => `| \`${file.source}\` | ${file.workspace}${file.clients ? '/' + file.clients.join(',') : ''} | \`${file.destination}\` | \`${file.sha256}\` |`).join('\n');
  writeFileSync(resolve(root, 'examples/steps', step.id, 'README.md'), `# ${step.id} reviewed example\n\n- ${step.explanation}\n- Prerequisite steps: ${step.prerequisiteSteps.join(', ') || 'none'}.\n- Files are inert here. Use the pinned importer from a learner workspace.\n- Preview: \`npm run lab:example -- --step ${step.id} --preview\`; select consumer/client where the map requires it.\n- Stage references before manual merge if you already authored content. Never force overwrite.\n- Expected destination starter/prerequisite hashes and per-workspace requirements: [manifest](../../manifest.json).\n- Static content is not proof of client loading or usage.\n\n| Source | Workspace/client | Destination | SHA-256 |\n| --- | --- | --- | --- |\n${rows}\n`);
}
console.log(`Generated ${steps.length} reviewed step maps and ${steps.reduce((count, step) => count + step.files.length, 0)} source hashes.`);
