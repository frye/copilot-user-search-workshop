# 05 — Connect MCP and update the installed procedure

Model Context Protocol (MCP) provides a standard way for an AI client to access tools and context
from a server. Connecting the local standards tools and updating the installed skill makes the
workflow use inspectable requirements instead of relying only on remembered or pasted guidance.
Checking tool results and package versions shows which source and procedure actually informed the work.

**Documentation:** [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) and [Agent plugins in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-plugins).

## Goal and starting workspace

- **Consumer:** unfinished app plus installed 1.0.0 package from 04.
- **Author:** canonical skill and package source. Do not edit a packaged copy or add local skill to consumer.
- Demonstrate a real tool result and a changed installed procedure—not just a JSON config.

## Build it yourself

1. Consumer: inspect `src/standards-mcp`, both fixture JSON files, and exact two-tool allowlist; run `npm run build` and `npm test`.
2. Author an inert reviewable recipe at `client-configs/vscode.mcp.json`, `client-configs/cli-mcp.md`, or `client-configs/app-mcp.md`. Configure MCP separately using your client below. Call `get_api_conventions` and `get_validation_commands` with `{}`; retain source/version and returned requirements.
3. Author: update skill to use those tools when available; explicitly label local standards-file fallback when unavailable.
4. Bump manifest to `1.1.0`, update catalog, rebuild immutable package.
5. Consumer: replace only previous lab registration, reload and prove 1.1.0 is active. Invoke updated procedure; record actual tool use or fallback.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/05-mcp-and-update/).
- Two explicit groups: updated skill/checklist/metadata in author, inert client-specific MCP setup in consumer.

## Bring in this step

```sh
# AUTHOR
npm run lab:activate -- --step 05-mcp-and-update --workspace author
npm run toolkit:build
# CONSUMER — choose the actual client (cli, vscode, or app)
npm run lab:activate -- --step 05-mcp-and-update --workspace consumer --client cli
```

- Application refuses wrong workspace. Other client groups use exactly `--client vscode` or `--client app`; no undocumented step substitution.

## If you already changed these files

- Commit clean known sample prerequisites before a sample update. Personalized skill/metadata blocks overwrite even when committed.
- Stage references and merge the tool/fallback behavior into your authored skill; retain your improvements.
- Existing MCP settings must be merged manually, never replaced. [Recovery](../reference/examples.md).

## Client steps

### VS Code

- Use consumer sample `--client vscode`; inspect `client-configs/vscode.mcp.json`, then merge its `servers.workshop-standards` entry into workspace `.vscode/mcp.json`.
- Start/trust only this server using native MCP controls; inspect tools and call both.
- With learner approval, open the Copilot Chat **cogwheel** (**Open Customizations**) > **Plugins** and disable or uninstall only the old lab plugin. Select **Install Plugin from Source** and paste the full absolute path `/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.1.0`, replacing `/ABSOLUTE/AUTHOR` with the actual author workspace. Choose the package root containing `plugin.json`, not its nested `skills/` directory.
- Confirm the source, review any installation/trust prompt, inspect source/version, then invoke the updated skill. Reload consumer if discovery has not refreshed; keep only one active lab version.
- If you used the advanced settings route in 04, update only that lab path instead of adding a UI installation. [Plugin update/rollback](../reference/plugin.md) · [MCP configuration](../reference/mcp.md).

### Copilot CLI

- Use `--client cli`; inspect `client-configs/cli-mcp.md`. Interactive `/mcp` adds `node` with the absolute consumer server entry path as one argument.
- Inspect/approve the actual two tools; call them. Never give the fixture server arbitrary execution input.
- Use the [local-package reinstall route](../reference/plugin.md), then `copilot plugin list --json`, `/skills reload`, `/skills info`, and reinvoke.

### Copilot app

- Use `--client app`; inspect `client-configs/app-mcp.md`. In Customize MCP, configure the same process with an absolute consumer path.
- Verify tools and actual calls in this app build. If blocked, use CLI/VS Code or clearly label file fallback.
- Update via the CLI bridge, refresh consumer session, inspect 1.1.0 in app; bridge loading remains unverified until observed.

## Verify the result

- In each workspace: `npm run verify:exercise -- --step 05-mcp-and-update --client cli` (use `vscode` or `app` for that consumer's recipe).
- Consumer: `npm test`; retain real tool result, source/version, updated package provenance and invocation.
- Recovery: rebuild before MCP restart; malformed fixture fails closed. Roll back only the lab package to the prior immutable directory if needed.
- Next: [06 — Roles](06-agent-roles.md).
