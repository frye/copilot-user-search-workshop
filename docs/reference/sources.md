# Sources and rehearsal status

- Retrieved/reviewed for this workshop on **2026-09-15 UTC**. Documentation describes candidate support; it does not prove installed-client behavior.
- [CLI skills](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/customize-copilot/add-skills): project layout, discovery, reload and inspection.
- [CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference): root Agent Plugins 1.0 manifest, local-path installation, list JSON source/version, named uninstall/update/disable.
- [VS Code agent plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins): portable package, `chat.pluginLocations`, installation trust.
- [App customizations](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/github-copilot-app/customize-github-copilot-app): Customize views, skills/MCP/agents, marketplace install; **not evidence of native local-directory install**.
- [Agent skills concept](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/about-agent-skills): supported surfaces, not permission/installation parity.
- [Agent Plugins 1.0 schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json): `workshop/plugin.schema.json` preserves validation constraints; descriptions omitted, no added manifest properties.
- [VitePress deployment guide](https://vitepress.dev/guide/deploy): static build, base subpath, GitHub Pages workflow.
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk): pinned **1.30.0** plus **zod 4.5.4**, real stdio server/client tests.

## Observed versus prepared

- Observed locally: exact Node/npm toolchain, strict build, native HTTP assertions, real SDK MCP protocol, importer/package/consumer filesystem tests, docs production build, targeted browser tabs.
- Prepared, not observed: VS Code/CLI/app discovery and permissions; all real plugin installation/update/invocation; app bridge behavior.
- Not performed: cloud tasks, hosted Copilot Code Review, Mobile execution, publishing, Pages deployment, global configuration changes.
- Optional Spec-Kit unavailable: no generation/version artifact exists. Do not claim it shipped.
- Exact executed results and revisions are in presenter evidence; do not copy them as learner results.
