import { readFileSync, writeFileSync } from 'node:fs';
const steps = JSON.parse(readFileSync('workshop/steps.json', 'utf8')).steps;
const native = 'documented-native-candidate-not-rehearsed';
const routes = {
  '00-start': [native, 'terminal-equivalent-not-client-rehearsed', native],
  '01-instructions': [native, 'repository-native-scoped-manual-fallback', 'repository-guidance-scoped-manual-fallback'],
  '02-planning-prompt': [native, 'manual-equivalent', 'manual-unless-native-discovery-observed'],
  '03-skill': [native, native, native],
  '04-plugin': [native, native, 'CLI-bridge-walkthrough-until-observed'],
  '05-mcp-and-update': [native, native, 'MCP-native-candidate-plugin-bridge-unverified'],
  '06-agent-roles': ['candidate-inspect-tool-grants', 'candidate-inspect-tool-grants', 'advisory-manual-until-permissions-observed'],
  '07-use-toolkit': [native, native, 'conditional-on-observed-bridge-otherwise-walkthrough'],
  '08-review-and-handoff': [native, native, 'advisory-local-review-bridge-conditional'],
  '09-spec-kit': ['unavailable-not-generated', 'unavailable-not-generated', 'unavailable-not-generated'],
};
const matrix = steps.flatMap(step => ['vscode', 'cli', 'app'].map((client, index) => ({
  step: step.id, client, mode: routes[step.id][index],
  observedRuntime: false, rehearsedBuild: null,
  source: 'docs/reference/sources.md', procedure: `docs/labs/${step.id}.md`,
  evidenceRequired: 'workshop/evaluation-rubric.md',
})));
writeFileSync('workshop/client-matrix.json', JSON.stringify({ schema: 1, generatedFrom: 'workshop/steps.json + scripts/author/client-matrix.mjs', matrix }, null, 2) + '\n');
