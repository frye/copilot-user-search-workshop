# Read-only fixture MCP

## Exact server contract

- Compiled entry: `dist/src/standards-mcp/main.js`; run `npm run build` in **consumer** before configuring.
- Transport: stdio JSON-RPC via pinned MCP SDK; stdout is protocol-only, diagnostics stderr.
- Tools: **get_api_conventions** and **get_validation_commands**, no arguments.
- Each returns source path, fixture version **1.0.0**, synthetic-fixture label, and requirements or commands.
- Tools read only two hard-coded fixture paths; no arbitrary path, network, mutation, or command-execution input.
- The server is genuinely read-only by implementation, not merely by annotation. Client policies still control whether it launches.
- `npm test` uses a real SDK stdio client to initialize/list/call/close; malformed/missing fixtures fail closed.

## Recipe versus active configuration

Lab 05 supplies one inert file for your client: `client-configs/vscode.mcp.json`,
`client-configs/cli-mcp.md`, or `client-configs/app-mcp.md`. Saving a recipe does **not** start the
server. VS Code's active workspace file is `.vscode/mcp.json`; CLI and app registration use their
own supported MCP controls rather than a configuration filename invented by this guide.

In consumer, run `npm run build` first. Run `pwd` and append
`/dist/src/standards-mcp/main.js` to obtain the absolute entry path needed by CLI/app. Pass that
entire path as **one argument**, including when it contains spaces. VS Code alone can use the
`${workspaceFolder}` variable shown below. No credentials are required.

After approving only this server, use this request:

```text
Call workshop-standards get_api_conventions with {} and get_validation_commands with {}.
For each call identify the tool, source path, fixture version, and the requirements or validation
commands relevant to the approved search contract. Do not edit files or execute returned commands.
If a tool is unavailable or denied, say so and read standards/api-conventions.json and
standards/validation-commands.json as "file-based fallback; no MCP invocation observed".
```

Inspect the actual two call records. Expect fixture `version` **1.0.0** and sources
`standards/api-conventions.json` and `standards/validation-commands.json`. This is independent of
the installed plugin's version (1.1.0 in Lab 05, 1.2.0 after Lab 08). Record source/version,
observed call or fallback, and any failure in `.lab-evidence/05-mcp-and-update.md`; never claim a
tool call merely because the response summarizes those files.

## Client steps

### VS Code

- In consumer create/merge `.vscode/mcp.json` using the Lab 05 `client-configs/vscode.mcp.json` sample:

```json
{
  "servers": {
    "workshop-standards": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/dist/src/standards-mcp/main.js"]
    }
  }
}
```

- This variable is VS Code-specific. Inspect/trust only this server; start it using native MCP controls.
- Confirm both tool names, invoke each with `{}` using the request above, and inspect both
  source/version results. Stop/restart just this server after rebuilds.
- If policy blocks it, read the two `standards/*.json` files and label file-based fallback.

### Copilot CLI

- In consumer use interactive `/mcp` to add the single local stdio server.
- Name `workshop-standards`; command `node`; one separate argument containing the **absolute** consumer path to `dist/src/standards-mcp/main.js`.
- Lab 05 supplies a complete command/argument recipe. Use actual path; do not paste a VS Code `${workspaceFolder}` substitution into CLI config.
- Inspect resulting configuration/permissions and start/reconnect using this build's `/mcp` controls; no global config file is edited by the importer.
- Request the two named tools and retain source/version/result evidence. Exact UI/tool-ID naming varies; do not preapprove generic shell access.

### Copilot app

- In consumer project's Customize MCP, configure the same stdio process: `node` plus an absolute consumer entry-path argument.
- Inspect the actual configuration scope and trust/permission prompts. UI labels may vary; no invented button sequence is required.
- Confirm tool discovery, call, and fixture version. If app configuration is restricted, perform it in CLI/VS Code or label file fallback.
- Plugin installation alone never starts this process; MCP registration is separate.

## Recover and clean up

- Wrong path/missing output: run `npm run build`, inspect actual absolute argument, reconnect only the lab server.
- Missing or malformed fixture: restore your own known fixture content using a reviewed diff, rerun tests; do not invent standards.
- Never paste credentials into this server config; none are needed.
- Disable/remove only `workshop-standards` when finished, and stop any manually launched server with Ctrl+C.
- Preserve evidence distinguishing actual Copilot tool usage from the automated protocol rehearsal.
