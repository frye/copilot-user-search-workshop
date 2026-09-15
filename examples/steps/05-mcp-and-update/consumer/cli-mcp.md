# CLI MCP registration recipe — consumer

1. Run `npm run build`; resolve actual consumer entry:
   `node -e "console.log(require('node:path').resolve('dist/src/standards-mcp/main.js'))"`.
2. In interactive CLI use `/mcp` to configure one local stdio server.
3. Name: `workshop-standards`; command: `node`; arguments: one string equal to the absolute entry path printed above.
4. No environment variables or credentials. Do not use `${workspaceFolder}`; that expansion belongs to VS Code.
5. Inspect/start/trust only this server; confirm exact `get_api_conventions` and `get_validation_commands` tools.
6. Request each with `{}`; retain returned `source`, `version: "1.0.0"` and requirements/commands.
7. Restart/reconnect just this server after rebuild. If policy denies it, use the checked-in standards files and explicitly label fallback.
8. Cleanup removes only `workshop-standards`; never replace a whole user MCP settings file.
