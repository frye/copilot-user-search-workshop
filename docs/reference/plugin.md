# Package, install, update, and roll back

## Author workspace: canonical source

```sh
npm run verify:exercise -- --step 03-skill
npm run toolkit:build
```

- Build only from `.github/skills/api-change-workflow/SKILL.md` and `references/review-checklist.md`; no manually maintained package copy.
- Root `plugin.json` targets Agent Plugins **1.0.0**. `skills/` is the portable package component; source metadata lives separately in `provenance.json`.
- First version **1.0.0**; MCP-enhanced procedure **1.1.0**; Lab 08 review-checklist improvement **1.2.0**. Keep MCP separately configured, never bundled executables/hooks/server startup.
- Inspect exact package files and `sourceChecksum`, `sourceCommit`, `sourceDirty`, per-file digests and version before installation.
- Same version/content rebuild reports unchanged. Changed bytes at an existing version fail: bump the version rather than overwrite.
- If a linked reference is missing or extra file is present, packaging fails. Keep extensions outside this bounded core package.

The authored metadata files are `toolkit/plugin.json` and `toolkit/catalog.md`; the catalog is
documentation, not a file copied into the package. Keep its version/source/rollback information
consistent with the manifest. The builder creates these four files for each version:

```text
toolkit/dist/user-search-toolkit-1.0.0/plugin.json
toolkit/dist/user-search-toolkit-1.0.0/skills/api-change-workflow/SKILL.md
toolkit/dist/user-search-toolkit-1.0.0/skills/api-change-workflow/references/review-checklist.md
toolkit/dist/user-search-toolkit-1.0.0/provenance.json
```

For 1.1.0 or 1.2.0, substitute that version in the directory name. Do not hand-author provenance
or edit any installed copy. To obtain a registration path, run `pwd` in author, then append
`/toolkit/dist/user-search-toolkit-1.0.0` (or the version you just built). Preserve spaces and quote
the complete path in shell commands. `/ABSOLUTE/AUTHOR` below is a placeholder, not a directory
to create.

## Create consumer

```sh
npm run consumer:create -- --destination ../workshop-consumer
```

- New **sibling**, from pinned starter; existing destination and nested paths are rejected.
- The customization copy set is repository instructions, the two scoped instruction files, and
  the planning prompt. The helper also carries an explicit Lab 09 support allowlist and release
  locks, not the entire author checkout. Inspect its reported `copied` paths; their hashes are
  recorded in consumer `.git/workshop-context.json`. Keep the revised guide open from author
  because other consumer guide pages may still be from the pinned starter.
- No inherited `.github/skills`, package output, agents, client settings, secrets, or arbitrary files are copied.
- The helper does not install dependencies or a plugin; it removes clone-origin so no accidental push is implied.
- In consumer run `npm ci`, `npm run preflight`, `npm run verify:baseline`; inspect `.github` and verify shared skill is absent.
- Inspect client user/global registrations too. Filesystem absence alone cannot rule out an already-installed user-level skill.

## Client steps

### VS Code

1. Open **consumer** in a separate VS Code window. Select the **cogwheel** at the top of Copilot Chat (**Open Customizations**).
2. Select **Plugins**, then **Install Plugin from Source**.
3. Paste the **full absolute path** to the built package in **author**, for example:

```text
/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0
```

4. With explicit learner approval, confirm the source and review any installation/trust prompt. Installation can affect the client profile; opening a consumer window does not guarantee workspace-only scope.
5. Inspect the installed plugin and `api-change-workflow` skill in consumer. Confirm package source and version, then request planning through the skill. Reload the consumer window if discovery has not refreshed.

- Replace `/ABSOLUTE/AUTHOR` with the actual author workspace path. The build creates `toolkit/dist/user-search-toolkit-VERSION/`; choose that **package root containing `plugin.json`**, not `toolkit/dist`, a `toolkit/dist/skill` path, the nested `skills/` directory, or `SKILL.md`.
- The source prompt accepts `owner/repo`, a Git URL, or a **local folder path**. This lab uses the local folder; no repository upload or marketplace is needed.
- Use only one registration route and one active version. Never also copy the canonical skill into consumer.
- Update: in **Plugins**, disable or uninstall **only `user-search-toolkit`**, then repeat **Install Plugin from Source** with `/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.1.0`. Inspect source/version and invoke again; do not assume a registry update refreshes a local package.
- Lab 08 repeats that same UI replacement from `1.1.0` to `1.2.0`; use the new absolute package directory and confirm the revised checklist is present in the installed source before re-invoking review.
- Rollback: disable/remove only the new lab registration, then re-enable the prior immutable package or install its `1.0.0` directory through the same UI. Verify source/version before invoking.
- Cleanup: disable or uninstall only the lab plugin using plugin management. Preserve unrelated registrations and immutable author package directories; no broad cache/profile cleanup.

#### Advanced alternative: manual workspace registration

Use this **instead of** the UI installation, not in addition to it. Open **consumer** `.vscode/settings.json` (create `.vscode/` and the file only if missing). Merge a single lab entry into its existing JSON object; preserve every unrelated setting:

```json
{
  "chat.pluginLocations": {
    "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0": true
  }
}
```

- Replace the illustrative path with the actual built directory. The value is `true`, not an array or relative path.
- Reload consumer, inspect plugin/skill discovery and source/version, then invoke planning.
- For this settings-based route, update by removing/disabling **only the old lab path** and adding the new `1.1.0` path. Reload and inspect again; never enable both.
- For Lab 08, repeat that same settings replacement from `1.1.0` to `1.2.0`; confirm the revised checklist is present in the installed source before re-invoking review.
- Rollback disables the new lab path and re-enables the prior immutable package. Cleanup removes only this lab's settings entry.

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
- For Lab 08, after approval, use the same named uninstall and install
  `"/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.2.0"` instead. List the registration again,
  reload/inspect skills, and re-invoke the reviewer against the revised checklist.
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
- After the Lab 08 extension: observed **1.2.0**, reviewer uses the improved total-before-limit
  checklist, and a fresh continuation brief names the actual installed version.
- A manifest and successful package build alone do **not** satisfy installation or usage.
