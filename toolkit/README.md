# Participant-owned package source

- Lab 03 authors `.github/skills/api-change-workflow/` in the author workspace.
- Lab 04 authors `toolkit/plugin.json` and `toolkit/catalog.md`.
- `npm run toolkit:build` copies only the canonical skill/checklist and manifest into `toolkit/dist/user-search-toolkit-VERSION/`.
- `provenance.json` records source commit, dirty-source flag, per-file SHA-256, aggregate checksum, and version.
- Same version + same content is unchanged; same version + changed content is an error. Do not delete version directories to bypass this guard.
- No package, complete skill, or plugin manifest ships active on main. Lab 05 updates source and bumps version.
- Installing/registration is a separate explicit client action; see [Lab 04](../docs/labs/04-plugin.md).
