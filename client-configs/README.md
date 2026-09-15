# Inert client configuration area

- This directory is not a client auto-discovery directory.
- Lab 05 imports concrete MCP configuration examples here, then you inspect and register the server.
- VS Code uses workspace `.vscode/mcp.json`; CLI and app do not read that file.
- Never copy over existing user/server settings. Add only `workshop-standards` after inspecting the command.
- MCP launches the compiled local server via `node`, with a separate argument for its absolute path. Build before configuring.
- No token, URL, network permission, arbitrary path parameter, or shell execution tool is needed.
- Client-native settings and permissions differ. Confirm actual client build; do not infer parity.
