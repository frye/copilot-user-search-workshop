# Package, install, update, and roll back

## Author workspace: canonical source

```sh
npm run verify:exercise -- --step 03-skill
npm run toolkit:build
```

- Build only from `.github/skills/api-change-workflow/SKILL.md` and `references/review-checklist.md`; no manually maintained package copy.
- Root `plugin.json` targets Agent Plugins **1.0.0**. `skills/` is the portable package component; source metadata lives separately in `provenance.json`.
- First version **1.0.0**; MCP-enhanced procedure **1.1.0**. Keep MCP separately configured, never bundled executables/hooks/server startup.
- Inspect exact package files and `sourceChecksum`, `sourceCommit`, `sourceDirty`, per-file digests and version before installation.
- Same version/content rebuild reports unchanged. Changed bytes at an existing version fail: bump the version rather than overwrite.
- If a linked reference is missing or extra file is present, packaging fails. Keep extensions outside this bounded core package.

## Create consumer

```sh
npm run consumer:create -- --destination ../workshop-consumer
```

- New **sibling**, from pinned starter; existing destination and nested paths are rejected.
- Only repository instructions, two scoped instruction files, and planning prompt are copied from author; hashes are recorded in consumer Git metadata.
- No inherited `.github/skills`, package output, agents, client settings, secrets, or arbitrary files are copied.
- The helper does not install dependencies or a plugin; it removes clone-origin so no accidental push is implied.
- In consumer run `npm ci`, `npm run preflight`, `npm run verify:baseline`; inspect `.github` and verify shared skill is absent.
- Inspect client user/global registrations too. Filesystem absence alone cannot rule out an already-installed user-level skill.

## Client steps

### VS Code

- In the **consumer's workspace settings**, merge a single lab entry; preserve every unrelated setting:

```json
{
  "chat.pluginLocations": {
    "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0": true
  }
}
```

- Replace the illustrative path with the actual built directory. The value is `true`, not an array or relative path.
- Reload consumer window; inspect native plugin/skill discovery, confirm package source and version, then request planning through `api-change-workflow`.
- Update: remove/disable **only the old lab path**, add the new `1.1.0` path, reload and inspect again. Never register both.
- Rollback: disable the new lab path, re-enable prior immutable package, reload and verify. Cleanup removes only this lab's settings entry.

### Copilot CLI

- In consumer, after explicit installation approval:

```sh
copilot plugin list --json
copilot plugin install "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0"
copilot plugin list --json
```

- Use the actual absolute directory; this can register in the user's CLI environment and was **not performed by repository preparation**.
- In interactive CLI: `/skills reload`, then `/skills info`; inspect installed source/version before requesting the procedure.
- Update/reinstall local packages: inspect `copilot plugin --help` in your build. Run `copilot plugin uninstall user-search-toolkit` to remove **only** the previous lab registration, then `copilot plugin install "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.1.0"`.
- Confirm `copilot plugin list --json` shows exactly one lab package at **1.1.0**, refresh skills, invoke, and record provenance. Do not assume a registry update refreshes a local directory install.
- Rollback uses the same named uninstall and install-old-immutable-directory process; preserve unrelated registrations. Cleanup: `copilot plugin uninstall user-search-toolkit`. A managed-policy refusal is a stop, not a bypass opportunity.

### Copilot app

- **CLI bridge, unverified until observed:** use the CLI procedure above, then return to the consumer app project/session and inspect Customize Plugins/Skills.
- Do not claim a native “install local directory” button; official app documentation establishes marketplace installation, not this local mechanic.
- If the package appears, record source/version and actual invocation in app. Refresh/reopen the session after updates and check only one revision is active.
- If it does not appear, use CLI or VS Code consumer execution, or label package inspection as walkthrough-only. Do not copy a skill into consumer to simulate plugin installation.
- Rollback/cleanup for this bridge follows the CLI registration owner; inspect app discovery afterward.

## Usage evidence

- Before: consumer local skill absent, existing client registrations checked.
- After: one installed package, path/source/version observed, procedure invoked, bounded plan returned without API changes.
- After update: observed **1.1.0**, MCP conventions call or explicit file fallback, revised boundary applied.
- A manifest and successful package build alone do **not** satisfy installation or usage.
