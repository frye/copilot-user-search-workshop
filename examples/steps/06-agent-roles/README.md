# 06-agent-roles reviewed example

- Reviewed 06-agent-roles customization payload; see docs/labs/06-agent-roles.md. Import explicitly, never merge examples.
- Prerequisite steps: 05-mcp-and-update.
- Files are inert here. Use the pinned importer from a learner workspace.
- Preview: `npm run lab:example -- --step 06-agent-roles --preview`; select consumer/client where the map requires it.
- Stage references before manual merge if you already authored content. Never force overwrite.
- Expected destination starter/prerequisite hashes and per-workspace requirements: [manifest](../../manifest.json).
- Static content is not proof of client loading or usage.

| Source | Workspace/client | Destination | SHA-256 |
| --- | --- | --- | --- |
| `examples/steps/06-agent-roles/clients/vscode/workshop-planner.agent.md` | consumer/vscode | `.github/agents/workshop-planner.agent.md` | `cfe5ca0b5a1589e8813a1bdb60cf9f5615624b99a5de96ff3b45cd79ece5dd2b` |
| `examples/steps/06-agent-roles/clients/vscode/workshop-implementer.agent.md` | consumer/vscode | `.github/agents/workshop-implementer.agent.md` | `c51d70d56f5ed28ca6e93d455e56f6525466b2a5dab4660e6f20fe42ca694daa` |
| `examples/steps/06-agent-roles/clients/vscode/workshop-reviewer.agent.md` | consumer/vscode | `.github/agents/workshop-reviewer.agent.md` | `a8bdb5d6b86776d95198f5d5818b46919efd6e8e7207af7c3c0f518345deef15` |
| `examples/steps/06-agent-roles/clients/cli/workshop-planner.agent.md` | consumer/cli | `.github/agents/workshop-planner.agent.md` | `b396bed805c25a31d0ade84bd4e767e60a0e99ab31f11f621f707d59dd244411` |
| `examples/steps/06-agent-roles/clients/cli/workshop-implementer.agent.md` | consumer/cli | `.github/agents/workshop-implementer.agent.md` | `79fa4937b2e2f2128e49218224e0eb53c3778b5c76f18a3609612dab5747f492` |
| `examples/steps/06-agent-roles/clients/cli/workshop-reviewer.agent.md` | consumer/cli | `.github/agents/workshop-reviewer.agent.md` | `cedb4ca14612e3959ac8e37343c60f4bc85b1947169315126841754c3956e1df` |
| `examples/steps/06-agent-roles/clients/app/workshop-planner.agent.md` | consumer/app | `.github/agents/workshop-planner.agent.md` | `1c45e32c2aa0ae4bf284e750688e5f26958ec2526e77997db199dedb0fe0e5fa` |
| `examples/steps/06-agent-roles/clients/app/workshop-implementer.agent.md` | consumer/app | `.github/agents/workshop-implementer.agent.md` | `de1dcdf7a7a1b85249d0d1b79bf524cac3430351685274790b47ad70f9d994f6` |
| `examples/steps/06-agent-roles/clients/app/workshop-reviewer.agent.md` | consumer/app | `.github/agents/workshop-reviewer.agent.md` | `5529bd0a3459b7da2ddf76fdc0a9a7e8f766e325d1ef97d4ed36453537b6b492` |
