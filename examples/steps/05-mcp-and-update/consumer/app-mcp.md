# App MCP registration recipe — consumer

1. Run `npm run build`; obtain the absolute consumer path to `dist/src/standards-mcp/main.js`.
2. Use this build's Customize MCP interface to configure a local stdio process named `workshop-standards`.
3. Command: `node`; one separate argument: the actual absolute consumer entry path. No credentials/environment variables.
4. Inspect scope/trust/permissions; confirm tool names `get_api_conventions` and `get_validation_commands`.
5. Call each with `{}` and inspect source/version and returned requirements; record actual app evidence.
6. Reconnect only this server after rebuild; plugin registration is a separate operation and never starts MCP automatically.
7. If unsupported or policy-blocked, continue in CLI/VS Code or label file-based fallback. No precise button labels or tool-ID parity are assumed.
8. Cleanup removes only this lab server; preserve unrelated configuration.
