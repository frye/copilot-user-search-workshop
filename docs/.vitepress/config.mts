import { defineConfig } from 'vitepress';

const base = process.env.WORKSHOP_BASE ?? '/copilot-user-search-workshop/';
const source = process.env.WORKSHOP_SOURCE_URL;
const defaultRepositoryUrl = 'https://github.com/frye/copilot-user-search-workshop';
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('WORKSHOP_BASE must start/end with /.');
if (source && !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(source)) throw new Error('WORKSHOP_SOURCE_URL must be an approved GitHub repository URL.');
const repositoryUrl = source || defaultRepositoryUrl;

export default defineConfig({
  title: 'Copilot customization workshop',
  description: 'Author, test, package, install, update and use a portable API-change toolkit.',
  base,
  appearance: 'dark',
  cleanUrls: false,
  lastUpdated: false,
  head: [['meta', { name: 'theme-color', content: '#0d1117' }]],
  markdown: {
    config(md) {
      md.core.ruler.after('inline', 'repository-source-links', state => {
        for (const block of state.tokens) {
          for (const token of block.children ?? []) {
            if (token.type !== 'link_open') continue;
            const href = token.attrGet('href');
            if (href === defaultRepositoryUrl) {
              token.attrSet('href', repositoryUrl);
            } else if (href?.startsWith('../../../../tree/examples/')) {
              token.attrSet('href', source ? `${source}/${href.slice('../../../../'.length)}` : '/reference/examples.html#not-published');
            }
          }
        }
      });
    },
  },
  themeConfig: {
    siteTitle: 'Copilot workshop',
    aside: false,
    sidebarMenuLabel: 'Your route',
    nav: [{ text: 'Set up your own copy', link: '/start' }, { text: 'Clients', link: '/clients' }, { text: 'Contract', link: '/reference/contract' }],
    sidebar: [
      { text: 'Workshop', items: [{ text: 'Overview', link: '/' }, { text: 'Set up your own copy', link: '/start' }] },
      { text: 'Labs', items: [
        ['00 — Start', '00-start'], ['01 — Instructions', '01-instructions'],
        ['02 — Prompt', '02-planning-prompt'], ['03 — Skill', '03-skill'],
        ['04 — Plugin', '04-plugin'], ['05 — MCP/update', '05-mcp-and-update'],
        ['06 — Roles', '06-agent-roles'], ['07 — Capstone', '07-use-toolkit'],
        ['08 — Review/handoff', '08-review-and-handoff'], ['09 — Spec Kit', '09-spec-kit'],
      ].map(([text, slug]) => ({ text, link: `/labs/${slug}` })) },
      { text: 'Reference', items: [
        { text: 'Source repository', link: repositoryUrl },
        { text: 'Examples / recovery', link: '/reference/examples' },
        { text: 'Plugin lifecycle', link: '/reference/plugin' },
        { text: 'MCP', link: '/reference/mcp' },
        { text: 'Spec Kit vs built-in modes', link: '/reference/spec-kit-vs-built-in' },
        { text: 'Sources', link: '/reference/sources' },
        { text: 'Publication gates', link: '/reference/publication' },
      ] },
    ],
  },
});
