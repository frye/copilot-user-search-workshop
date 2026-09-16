# Sources and rehearsal status

Get the workshop code and lab assets from the [Source repository](https://github.com/frye/copilot-user-search-workshop).

- Retrieved/reviewed for this workshop on **2026-09-15 UTC**. Documentation describes candidate support; it does not prove installed-client behavior.
- [CLI skills](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/customize-copilot/add-skills): project layout, discovery, reload and inspection.
- [CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference): root Agent Plugins 1.0 manifest, local-path installation, list JSON source/version, named uninstall/update/disable.
- [VS Code agent plugins](https://code.visualstudio.com/docs/agent-customization/agent-plugins): Chat cogwheel/Agent Customizations, Plugins, Install Plugin from Source, portable package, advanced `chat.pluginLocations` registration, installation trust. Rechecked on **2026-09-16**; the page describes Git URLs for source installation, while the installed UI also explicitly accepts local folder paths.
- [App customizations](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/github-copilot-app/customize-github-copilot-app): Customize views, skills/MCP/agents, marketplace install; **not evidence of native local-directory install**.
- [Agent skills concept](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/about-agent-skills): supported surfaces, not permission/installation parity.
- [Agent Plugins 1.0 schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json): `workshop/plugin.schema.json` preserves validation constraints; descriptions omitted, no added manifest properties.
- [VitePress deployment guide](https://vitepress.dev/guide/deploy): static build, base subpath, GitHub Pages workflow.
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk): pinned **1.30.0** plus **zod 4.5.4**, real stdio server/client tests.
- [Spec Kit quickstart](https://github.com/github/spec-kit/blob/main/docs/quickstart.md): current
  specify/clarify/plan/checklist/tasks/analyze/implement/converge workflow and invocation variants.
- [Spec Kit installation](https://github.com/github/spec-kit/blob/main/docs/installation.md): latest
  published `specify-cli`, Python/uv prerequisites, version check, and upgrade commands.
- [Adopting Spec Kit in an existing project](https://github.com/github/spec-kit/blob/main/docs/guides/existing-projects.md):
  in-place initialization, generated-file review, bounded first change, and artifact lifecycle.
- [Spec Kit integrations](https://github.com/github/spec-kit/blob/main/docs/reference/integrations.md):
  Copilot skills layout and integration behavior.

## Observed versus prepared

- Observed locally: exact Node/npm toolchain, strict build, native HTTP assertions, real SDK MCP protocol, importer/package/consumer filesystem tests, docs production build, targeted browser tabs.
- Separately inspected on **2026-09-16**: VS Code Chat **Open Customizations** > **Plugins** > **Install Plugin from Source**. The prompt explicitly accepts `owner/repo`, a Git URL, or a local folder path. Canceled without submitting a path or installing; this confirms navigation/input support only, not a versioned client installation rehearsal.
- Prepared, not observed: VS Code/CLI/app discovery and permissions; all real plugin installation/update/invocation; app bridge behavior.
- Not performed: cloud tasks, hosted Copilot Code Review, Mobile execution, publishing, Pages deployment, global configuration changes.
- Spec Kit reference generation observed locally in ignored scratch with `specify-cli` **1.0.6** and
  the Copilot/sh integration. The tracked packet records provenance; no client invocation or learner
  execution is inferred.
- Exact executed results and revisions are in presenter evidence; do not copy them as learner results.
