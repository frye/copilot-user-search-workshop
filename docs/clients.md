# Client routes and evidence boundaries

- **Prepared/documented is not observed runtime support.** No Copilot client was installed or run to prepare this release.
- Static package checks and Node protocol tests are observed; real client discovery, permissions, installs, updates, hosted review, and Pages publishing remain unrehearsed.
- The VS Code UI route and local-folder input were inspected separately on **2026-09-16**; the prompt was canceled without installing. This is not package loading or invocation evidence.
- Record exact client/build, operation, source/version, and output in `.lab-evidence/`; omit personal data.
- [Sources](reference/sources.md) · [Plugin procedure](reference/plugin.md) · [MCP procedure](reference/mcp.md).

| Operation | VS Code candidate route | CLI candidate route | App candidate route |
| --- | --- | --- | --- |
| Repo instructions | Native | Native | Repository guidance; inspect inclusion |
| Path-scoped instructions | Native | Confirm build; manual context fallback | Confirm build; manual context fallback |
| Prompt file | Native prompt picker | Explicit prompt text (manual equivalent) | Explicit prompt text unless native discovery observed |
| Project skill | Native skill discovery | `.github/skills`; `/skills reload`, `/skills info` | Customize Skills; inspect actual source |
| Local skill plugin | Chat cogwheel > Plugins > Install Plugin from Source; absolute local package path | `copilot plugin install <local-directory>` | CLI bridge, not app-native; unverified |
| MCP | `.vscode/mcp.json` | Interactive `/mcp` configuration | Customize MCP; inspect actual server command |
| Roles | Native `.github/agents` | Native `.github/agents`; verify tool IDs | Agent picker; verify compatibility and permissions |
| Cloud/Mobile | Optional separate hosted handoff only | No local package/MCP transfer assumed | No Mobile authoring/install/MCP claims |

## Client steps

### VS Code

- Open consumer, then select the Copilot Chat **cogwheel** (**Open Customizations**) > **Plugins** > **Install Plugin from Source**.
- Paste the full absolute author-package path, for example `/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0`, using your actual author location. Choose the package root containing `plugin.json`, not the nested `skills/` directory.
- Install only with explicit learner approval; review any trust prompt and do not assume profile changes are workspace-only. Inspect plugin/skill source and version before invoking; reload consumer if discovery has not refreshed.
- For updates, replace only the lab plugin through the same UI with the new version's package path. [Installation, update, rollback, and advanced settings alternative](reference/plugin.md).
- Never also copy `.github/skills` into consumer or register two package versions simultaneously.
- Use current native customization/tool UI to inspect actual tool names. Sample tools are documented candidates, not a permission guarantee.

### Copilot CLI

- Install only after package inspection and explicit learner approval. CLI installation can affect a user profile; preparation does **not** execute it.
- Use `copilot plugin install "/absolute/path/to/package"` then `copilot plugin list --json`; inspect source and version.
- Use `/skills reload` then `/skills info` from consumer to inspect available procedure provenance.
- Review current `copilot plugin --help` for uninstall/update syntax rather than guessing flags across builds.

### Copilot app

- Customize views establish a way to inspect skills/MCP/plugins; marketplace support does not establish native local-directory installation.
- The CLI bridge is a candidate interoperability route only: install through CLI, reopen/reload consumer session, inspect app discovery/source/version, and invoke.
- If app does not expose the bridge package, do not duplicate the skill locally and claim installation. Continue in the supported CLI/VS Code route or label walkthrough-only.
- Use picker-supported role definitions only after inspecting tool permissions; app does not imply VS Code tool-ID parity.

## Optional cloud and Mobile

- Cloud: requires separately approved repository access, committed supported assets and real hosted execution. It cannot access attendee absolute paths, local installed plugins or local stdio servers by assumption.
- Mobile: use browser samples, review hosted evidence, or hand off a task to an approved execution client. No local terminal, package install, or MCP claim.
- Local reviewer output is **not** GitHub Copilot Code Review. Hosted review needs genuine commit-specific evidence after approval.
- If policy blocks a capability, use a labeled fallback; never bypass the policy.
