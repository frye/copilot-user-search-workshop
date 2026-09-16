# Client routes and evidence boundaries

- **Prepared/documented is not observed runtime support.** No Copilot client was installed or run to prepare this release.
- Static package checks and Node protocol tests are observed; real client discovery, permissions, installs, updates, hosted review, and Pages publishing remain unrehearsed.
- Record exact client/build, operation, source/version, and output in `.lab-evidence/`; omit personal data.
- [Sources](reference/sources.md) · [Plugin procedure](reference/plugin.md) · [MCP procedure](reference/mcp.md).

| Operation | VS Code candidate route | CLI candidate route | App candidate route |
| --- | --- | --- | --- |
| Repo instructions | Native | Native | Repository guidance; inspect inclusion |
| Path-scoped instructions | Native | Confirm build; manual context fallback | Confirm build; manual context fallback |
| Prompt file | Native prompt picker | Explicit prompt text (manual equivalent) | Explicit prompt text unless native discovery observed |
| Project skill | Native skill discovery | `.github/skills`; `/skills reload`, `/skills info` | Customize Skills; inspect actual source |
| Local skill plugin | `chat.pluginLocations` workspace setting | `copilot plugin install <local-directory>` | CLI bridge, not app-native; unverified |
| MCP | `.vscode/mcp.json` | Interactive `/mcp` configuration | Customize MCP; inspect actual server command |
| Roles | Native `.github/agents` | Native `.github/agents`; verify tool IDs | Agent picker; verify compatibility and permissions |
| Cloud/Mobile | Optional separate hosted handoff only | No local package/MCP transfer assumed | No Mobile authoring/install/MCP claims |

## What to inspect in every client

1. Open the workspace named by the lab and confirm the actual root/ref before creating files.
   Use the lab's full filenames; never put a project artifact in a personal customization folder.
2. After saving, inspect the appropriate instructions, prompts, skills, or agents view. Record
   the exact source file or installed package directory. Use only controls present in your build;
   the guide does not assume undocumented menu labels or identical tool IDs across clients.
3. Run the lab's copyable request. Inspect its included-context/source indicators and tool-call
   records, not just whether the prose mentions the right rule. A statement such as "I loaded
   the skill" without source/invocation evidence is not proof of native loading.
4. After a rule revision, refresh the relevant customization or start a fresh bounded session,
   repeat the request, and compare the named output. `/skills reload` refreshes skills, not
   instructions, prompts, or plugin installation by itself.
5. If native inclusion is unsupported or cannot be observed, explicitly attach/read the exact
   file named in the lab. Record **manual context equivalent** for instructions/prompts or
   **manual walkthrough** for a skill. A denied capability is not permission to bypass policy.

Use the `.lab-evidence/<lab-id>.md` template from the lab. For each operation record one of
**observed native**, **manual equivalent/walkthrough**, **blocked**, or **not observed**, together
with the source and actual result. For plugins, a manual file read is package inspection, not
installation. For MCP, local JSON inspection is a file fallback, not a client tool call. For
roles, inspect the effective tools: a shell-capable role is not technically read-only.

## Client steps

### VS Code

- Local package registration uses an **absolute** directory key set to `true` under `chat.pluginLocations`.
- Refresh by reloading the consumer window after registration/update; inspect customization discovery and skill source before invoking.
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
