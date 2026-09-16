# Inert authoring scaffolds

- Instructions: scope → rule → reason → check. TODO: write path-specific rules during Lab 01.
- Prompt: references → requested plan → questions → approval stop. TODO: author frontmatter and body in Lab 02.
- Skill: frontmatter → trigger → inputs → stages → stop conditions → linked checklist → evidence. TODO: implement in Lab 03.
- Plugin: schema → name → version → description → catalog. TODO: create metadata in Lab 04.
- Roles: responsibility → allowed tools → owned files → prohibited changes → handoff. TODO: author in Lab 06.
- These incomplete scaffolds deliberately live outside auto-discovery directories.
- Use each lab's pinned example route to inspect a complete asset; nothing here claims to be loaded.

## Complete recipes and exact destinations

The scaffolds above are orientation, not the lab answer. Each linked lab has numbered authoring
steps, complete copyable file contents, invocation prompts, and observed-evidence checks:

| Artifact | Complete recipe | Destination |
| --- | --- | --- |
| Repository and scoped instructions | [Lab 01](../../docs/labs/01-instructions.md#copy-and-paste) | `.github/copilot-instructions.md`, `.github/instructions/api.instructions.md`, `.github/instructions/tests.instructions.md` |
| Planning prompt | [Lab 02](../../docs/labs/02-planning-prompt.md#copy-and-paste) | `.github/prompts/plan-api-change.prompt.md` |
| Skill and checklist | [Lab 03](../../docs/labs/03-skill.md#copy-and-paste) | `.github/skills/api-change-workflow/SKILL.md`, `.github/skills/api-change-workflow/references/review-checklist.md` |
| Plugin metadata and catalog | [Lab 04](../../docs/labs/04-plugin.md#copy-and-paste) | `toolkit/plugin.json`, `toolkit/catalog.md` |
| MCP recipe and procedure update | [Lab 05](../../docs/labs/05-mcp-and-update.md#copy-and-paste) | Selected `client-configs/vscode.mcp.json`, `client-configs/cli-mcp.md`, or `client-configs/app-mcp.md`; canonical skill and toolkit metadata |
| Planner, implementer, reviewer | [Lab 06](../../docs/labs/06-agent-roles.md#copy-and-paste) | `.github/agents/workshop-planner.agent.md`, `.github/agents/workshop-implementer.agent.md`, `.github/agents/workshop-reviewer.agent.md` |

Use the workspace named by the lab. Copy only the fenced content into the exact file, following its
create/append/merge action; preserve starter safety and learner changes. Do not copy this scaffold
into an auto-discovery directory or treat static file presence as client-loading evidence.
