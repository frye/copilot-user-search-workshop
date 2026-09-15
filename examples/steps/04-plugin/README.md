# 04-plugin reviewed example

- Reviewed 04-plugin customization payload; see docs/labs/04-plugin.md. Import explicitly, never merge examples.
- Prerequisite steps: 03-skill.
- Files are inert here. Use the pinned importer from a learner workspace.
- Preview: `npm run lab:example -- --step 04-plugin --preview`; select consumer/client where the map requires it.
- Stage references before manual merge if you already authored content. Never force overwrite.
- Expected destination starter/prerequisite hashes and per-workspace requirements: [manifest](../../manifest.json).
- Static content is not proof of client loading or usage.

| Source | Workspace/client | Destination | SHA-256 |
| --- | --- | --- | --- |
| `examples/steps/04-plugin/files/plugin.json` | author | `toolkit/plugin.json` | `1d161f4e8e05dff078fb792314cff389870b5d9c2e8447b33e89ae2a4bbd645d` |
| `examples/steps/04-plugin/files/catalog.md` | author | `toolkit/catalog.md` | `cfa930425346e154b78952859d97e81de30bf9dbaabb13c82ca75ff58c2b6305` |
