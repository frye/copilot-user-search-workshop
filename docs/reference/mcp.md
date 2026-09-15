# Read-only fixture MCP

## Exact server contract

- Compiled entry: `dist/src/standards-mcp/main.js`; run `npm run build` in **consumer** before configuring.
- Transport: stdio JSON-RPC via pinned MCP SDK; stdout is protocol-only, diagnostics stderr.
- Tools: **get_api_conventions** and **get_validation_commands**, no arguments.
- Each returns source path, fixture version **1.0.0**, synthetic-fixture label, and requirements or commands.
- Tools read only two hard-coded fixture paths; no arbitrary path, network, mutation, or command-execution input.
- The server is genuinely read-only by implementation, not merely by annotation. Client policies still control whether it launches.
- `npm test` uses a real SDK stdio client to initialize/list/call/close; malformed/missing fixtures fail closed.

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
- Confirm both tool names, invoke `get_api_conventions` with `{}`, and inspect source/version. Stop/restart just this server after rebuilds.
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
