# 05-mcp-and-update reviewed example

- Reviewed 05-mcp-and-update customization payload; see docs/labs/05-mcp-and-update.md. Import explicitly, never merge examples.
- Prerequisite steps: 04-plugin.
- Files are inert here. Use the pinned importer from a learner workspace.
- Preview: `npm run lab:example -- --step 05-mcp-and-update --preview`; select consumer/client where the map requires it.
- Stage references before manual merge if you already authored content. Never force overwrite.
- Expected destination starter/prerequisite hashes and per-workspace requirements: [manifest](../../manifest.json).
- Static content is not proof of client loading or usage.

| Source | Workspace/client | Destination | SHA-256 |
| --- | --- | --- | --- |
| `examples/steps/05-mcp-and-update/author/SKILL.md` | author | `.github/skills/api-change-workflow/SKILL.md` | `704a1cdc94acc7614c5c8fc3b13f364d76ea3851eedac4d7ce8a9cbd90e61f3b` |
| `examples/steps/05-mcp-and-update/author/review-checklist.md` | author | `.github/skills/api-change-workflow/references/review-checklist.md` | `00f29d16e7e4c1c2abdda03b517eff37924e2553d10eb46a493045cbb8a7f2ea` |
| `examples/steps/05-mcp-and-update/author/plugin.json` | author | `toolkit/plugin.json` | `aed1fdf73aa405e4b14cf206bb1343f3cdb4d10f527328370f35899daf47ef34` |
| `examples/steps/05-mcp-and-update/author/catalog.md` | author | `toolkit/catalog.md` | `ddc6d3c8921966950fdae75256dae75496e1f1f61e494f4c7a52271f56bd130b` |
| `examples/steps/05-mcp-and-update/consumer/vscode.mcp.json` | consumer/vscode | `client-configs/vscode.mcp.json` | `9934f72edbe4564e057cd3bfe3e4e161835d83678ecfd3bc57d7122a9984698c` |
| `examples/steps/05-mcp-and-update/consumer/cli-mcp.md` | consumer/cli | `client-configs/cli-mcp.md` | `7c04ba4504d5eb89580908b15affdb83f9859289b0105d78ea56104e68274e3c` |
| `examples/steps/05-mcp-and-update/consumer/app-mcp.md` | consumer/app | `client-configs/app-mcp.md` | `3417d28c9b195255aa8e374aa9eef5d889a01a71cf4a483f90e888804de5ee5f` |
