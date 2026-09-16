# 04 — Package, install, and verify

Agent plugins bundle reusable customizations into an installable package; this lab packages the
skill you authored. Versioned packaging lets you verify the exact procedure used in a separate
workspace and manage updates or rollback without copying the source into each project.

**Documentation:** [Agent plugins in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-plugins).

## Goal and starting workspace

Begin in **author**, after 03; finish with a clean **sibling consumer** using an installed package. Search remains the intentional **501** starter: this is a packaging/planning exercise, not API implementation.

## Choose your route

Choose **one** way to prepare the manifest and catalog, then continue with the shared workflow. You do not need the other two routes. **Bring in this step** is the first-visit default; selecting a tab never creates files or runs commands. Preserve existing learner content with a reviewed merge in every route.

### Build it yourself

1. In **author**, create `toolkit/` if absent. Prepare only `toolkit/plugin.json` and `toolkit/catalog.md`; preserve existing personalizations. Do not create package output or a consumer skill copy.
2. Write `toolkit/plugin.json` as a JSON object with `$schema` exactly `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`, name `user-search-toolkit`, version `1.0.0`, description `A skill-only, approval-bounded HTTP API change workflow with a contract review checklist.`, and keywords `["workshop", "api", "review"]`. Schema and package versions are separate concepts. Do not add `extensions`, hooks, server startup or invented ownership metadata.
3. Write `toolkit/catalog.md` with title `User-search toolkit catalog` and these complete content requirements:
   - **Purpose/maintainer:** planning, human-approved implementation and independent review of a contract-driven HTTP API change; maintainer is the learner of the local author workspace, with repository/publication ownership unresolved.
   - **Source/version:** canonical `.github/skills/api-change-workflow/` plus `toolkit/plugin.json`; package 1.0.0 and Agent Plugins schema 1.0.0, skill-only.
   - **Compatibility/permissions:** VS Code workspace registration and CLI local install require real-build rehearsal; app local loading is an unverified CLI bridge. Procedure text only: no executables, hooks, embedded MCP or blanket execution/network approval; client permissions govern work.
   - **Integrity/install:** inspect generated provenance, three packaged inputs, per-file hashes, aggregate checksum and source commit/dirty state; establish clean consumer absence, then explicitly approve registration of one package.
   - **Rollback/evidence:** remove only this lab registration, re-register a preserved prior immutable version if available, otherwise return to no-plugin baseline; refresh and verify source/version. Static build success is not discovery or invocation evidence.
4. Save both files with your merged personalizations. Leave validation, package generation, consumer creation and registration for the common steps.

[Continue with this lab](#continue-with-this-lab).

### Copy-and-paste

Create the parent `toolkit/` directory in author if absent. Copy file contents only, not the **File** label or fence. If a destination already exists, compare and merge your personalizations rather than blindly replacing it.

**File:** `toolkit/plugin.json` (create; author).

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "user-search-toolkit",
  "version": "1.0.0",
  "description": "A skill-only, approval-bounded HTTP API change workflow with a contract review checklist.",
  "keywords": ["workshop", "api", "review"]
}
```

**File:** `toolkit/catalog.md` (create; author).

```markdown
# User-search toolkit catalog

- Purpose: reusable planning, approved implementation and review procedure for a small contract-driven HTTP API change.
- Maintainer role: learner of this local author workspace. Repository/publication owner intentionally unresolved.
- Version: **1.0.0**; source: `.github/skills/api-change-workflow/` plus `toolkit/plugin.json`.
- Compatibility: Agent Plugins **1.0.0**, skill-only. VS Code workspace registration and CLI local install are documented; real client builds need rehearsal. App local install is a CLI bridge, not native/verified.
- Permissions: procedure text only; no executables, hooks, embedded MCP, arbitrary network or blanket shell approval. Client permissions govern invoked work.
- Integrity: inspect generated `provenance.json`, exact three packaged input files, per-file hashes, aggregate source checksum, source commit/dirty state.
- Install: build locally, establish clean consumer absence, then explicitly register only one package through the selected client.
- Rollback: disable/uninstall only this lab version, re-register a preserved prior immutable package if one exists, refresh and verify actual source/version. On the first install, removal returns to the no-plugin baseline.
- Evidence: client discovery/invocation is required; successful static packaging is not runtime proof.
```

[Continue with this lab](#continue-with-this-lab).

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/04-plugin/).
- The importer uses the pinned `examples-v1` release, not the moving branch. Only metadata/catalog belongs to this step; use the explicit 03 prerequisite if needed. Never distribute an opaque prebuilt archive or write your own provenance.
- The inline recipe is an alternative to importing, not a requirement to import over files you just authored. Inspect source read-only with `git show examples-v1:examples/steps/04-plugin/files/plugin.json` and `git show examples-v1:examples/steps/04-plugin/files/catalog.md`.

Prepare only the author metadata/catalog with this activation. It displays the plan and applies after safety checks; packaging is a shared step afterward. Optional preview and comparison are available in [safe example operations](../reference/examples.md#optional-inspection-and-comparison).

```sh
# AUTHOR only
npm run lab:activate -- --step 04-plugin
```

#### If you already changed these files

- If manually copied or personalized content conflicts, optionally preview or stage the references, then merge metadata/catalog yourself. Do not replace learner skill content or commit merely to bypass a conflict.
- [Safe imports](../reference/examples.md) · [Complete installation/update/rollback procedure](../reference/plugin.md).

[Continue with this lab](#continue-with-this-lab).

## Continue with this lab

All three routes converge here. Keep the revised guide open from **author**: consumer is created from the pinned starter plus an explicit helper allowlist, not a copy of every revised guide page. Packaging, consumer creation and client registration are separate learner activities; no route installs anything automatically.

**Preserve learner work:** review/merge existing metadata and settings without replacing personalizations. Do not edit an immutable package to fix loading; inspect the registration/path first. Existing package versions with different bytes are refused, so use a new version for a deliberate revision. Existing consumer destinations are refused; choose a fresh sibling, never overwrite one.

### Artifact inventory

| Workspace | Exact path | Action |
| --- | --- | --- |
| Author | `toolkit/plugin.json` | Prepare manifest at plugin version 1.0.0 through one route |
| Author | `toolkit/catalog.md` | Prepare local catalog through the same route |
| Author | `.github/skills/api-change-workflow/SKILL.md` | Inspect canonical Lab 03 source; do not duplicate |
| Author | `.github/skills/api-change-workflow/references/review-checklist.md` | Inspect canonical linked reference |
| Author | `toolkit/dist/user-search-toolkit-1.0.0/plugin.json` | Generate; never hand-edit |
| Author | `toolkit/dist/user-search-toolkit-1.0.0/skills/api-change-workflow/SKILL.md` | Generate; never hand-edit |
| Author | `toolkit/dist/user-search-toolkit-1.0.0/skills/api-change-workflow/references/review-checklist.md` | Generate; never hand-edit |
| Author | `toolkit/dist/user-search-toolkit-1.0.0/provenance.json` | Generate checksums/ref; never fabricate |
| Consumer, VS Code only | `.vscode/settings.json` | Merge one workspace registration after approval |
| Author and consumer | `.lab-evidence/04-plugin.md` | Create one journal per workspace; record actual observations |

CLI registration is client-managed and may affect the user's profile. The app route is an **unverified CLI bridge**, not a promise of native local installation. Neither route asks you to create a personal settings file.

### Build the package and prepare consumer

1. **Confirm author inputs.** Read `workshop/task-brief.md` and `workshop/approved-contract.md`. Inspect both canonical Lab 03 skill files from the inventory. Run `git rev-parse --show-toplevel`, `git rev-parse HEAD`, `git status --short`, and `npm run verify:exercise -- --step 03-skill`. Preserve learner changes; do not copy a skill into consumer.
2. **Build, then inspect the generated package.** Run the following in author. The build prints provenance and a fixed output directory. Open each of the four generated files in the inventory; compare both skill files to canonical source. `provenance.json` records the three packaged input files, their digests, aggregate `sourceChecksum`, `sourceCommit`, `sourceDirty` and version. The catalog remains author documentation, not a fifth packaged file.

   ```sh
   npm run verify:exercise -- --step 04-plugin
   npm run toolkit:build
   npm run toolkit:build
   node -e "console.log(require('node:path').resolve('toolkit/dist/user-search-toolkit-1.0.0'))"
   ```

   The second build should report `"unchanged": true`. Save the real absolute directory printed by the last command for client setup. `/ABSOLUTE/AUTHOR/...` below is a placeholder, not a directory to create. Changed bytes cannot replace an already-built version: retain the immutable output and use a new version for an intentional revision.
3. **Create a fresh sibling consumer.** In author, explicitly run `npm run consumer:create -- --destination ../workshop-consumer`. If that destination exists, choose a new immediate sibling name; never overwrite or nest the consumer inside author. The helper creates a local clone from the pinned starter, removes clone-origin, and copies only its reviewed allowlist, including instructions/planning prompt and Lab 09 support. It does not copy the canonical skill, generated package, roles or client settings, install dependencies, register a plugin, or create a new commit. Inspect the returned destination and `copied` list.
4. **Establish consumer readiness.** Open that returned directory as a separate client workspace/window. Run the commands below in consumer. `npm ci` is an explicit local dependency-install step; review it before execution, not a permission for global installation.

   ```sh
   git rev-parse --show-toplevel
   git rev-parse HEAD
   git status --short
   npm ci
   npm run preflight
   npm run verify:baseline
   node -e "console.log({localSkillAbsent: !require('node:fs').existsSync('.github/skills')})"
   ```

   Expect a green baseline and `localSkillAbsent: true`. Inspect client user/workspace registrations too: absence of `.github/skills` alone does not prove absence of a globally registered copy. Preserve any unrelated registration.
5. **Approve and register only the built package.** Follow your **Client steps** below after explicitly approving that client's configuration/install scope. Record the real source directory/version. Never register canonical author source and the package together, or copy packaged skill files into consumer to mimic installation.
6. **Invoke and record evidence.** Use the read-only request in **Try it**, inspect discovery and response evidence, and write `.lab-evidence/04-plugin.md` in each workspace using the supplied templates. Keep API code and tests unchanged.

## Client steps

### VS Code

1. Open **consumer** in a separate window. Inspect workspace and user plugin settings/discovery for an existing `user-search-toolkit` or duplicate `api-change-workflow`; stop and resolve the lab duplicate without removing unrelated plugins.
2. Explicitly approve a **workspace-only merge** into consumer `.vscode/settings.json`. Replace the placeholder with the absolute directory printed in author. The following is a minimal settings object: if the file already exists, merge only this entry into its existing `chat.pluginLocations` object. Preserve all other settings and plugin entries. Do not paste a second top-level object or replace the file.

**File:** `.vscode/settings.json` (merge; consumer; vscode).

```json
{
  "chat.pluginLocations": {
    "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0": true
  }
}
```

3. Reload the consumer window using the supported window reload command. Inspect native plugin/skill discovery: require `user-search-toolkit`, version `1.0.0`, `api-change-workflow`, and the package source path, not the canonical author `.github/skills` directory.
4. Select/invoke the discovered skill with **Try it**. Inspect the displayed skill context/source and its linked checklist. If discovery is unavailable in this build, inspect/read those two **package** files manually and label the request a manual package walkthrough; do not claim installed usage.
5. Record actual client build, discovery source, one-registration check and invocation outcome. See [plugin procedure](../reference/plugin.md) for scoped rollback.

### Copilot CLI

1. Start in **consumer**; inspect `copilot plugin --help` and `copilot plugin list --json`. Confirm this build supports local-directory installation and that no conflicting lab registration is active.
2. Review the actual directory and approve installation explicitly. This can affect your CLI user profile, not just this repository. Only then run:

   ```sh
   copilot plugin install "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0"
   copilot plugin list --json
   ```

3. In interactive CLI, run `/skills reload`, then `/skills info` using this build's selection controls for `api-change-workflow`. Inspect source/version, and verify only one lab registration exists. Help/unsupported-command or policy errors are stops, not permission to edit a guessed personal config file.
4. Invoke **Try it** in consumer. Record the actual selected skill and planning response. If native discovery is unsupported, read the built `SKILL.md` and its packaged checklist as explicit context and label manual walkthrough-only; retain installation/discovery as not observed.

### Copilot app

1. Open the **consumer** project/session. Inspect Customize Plugins/Skills for existing lab registrations.
2. **CLI-assisted bridge, unverified:** if you explicitly approve trying it, perform the CLI installation above. This is a CLI-owned registration; no app-native local-directory button is assumed.
3. Refresh/reopen the consumer app session and inspect Customize Plugins/Skills again. Only if the actual app shows the package source/version may you record app discovery and invoke **Try it** through that skill.
4. If discovery is absent or policy-blocked, use CLI/VS Code for native execution, or manually provide the two packaged skill files as context and label **walkthrough-only; app plugin loading not observed**. Do not simulate installation by copying `.github/skills`.
5. Record client/build, observed grants and bridge outcome. Cleanup follows the CLI registration owner; inspect app discovery afterward.

## Try it

1. In consumer, invoke the selected package skill using this request; supply the actual consumer ref from your readiness check if the client cannot obtain it without execution:

   ```text
   Use the installed api-change-workflow for planning only. Read workshop/task-brief.md,
   workshop/approved-contract.md, applicable repository/scoped instructions and the
   current diff. Identify the package source/version and linked review checklist.
   Plan the unfinished search change: scope, questions, files, tests, privacy risks,
   and a human approval checkpoint. Distinguish intentional starter 501 from search
   acceptance. Do not edit files, implement, execute commands, install or delegate.
   Report any missing source/version evidence instead of inventing discovery.
   ```

2. Expect a bounded plan and an approval stop, not code. Independently inspect client discovery/context to corroborate the response's source claims; a model saying “I used the skill” is insufficient.
3. Exercise the linked reference with a second request:

   ```text
   Still planning only, use the packaged review checklist to identify the checks
   for ordering before limiting, total before limiting and privacy-safe logs.
   Cite the checklist source you actually read. Identify missing evidence and stop;
   do not implement or run tests.
   ```

4. Inspect the consumer diff after both requests: no new API/test edits should appear. Preserve pre-existing copied guidance changes. If the wrong skill loaded, remove/disable only the incorrect lab registration, reload and retry. Do not edit the package; Lab 05 demonstrates the canonical-source revision.
5. Create the following journals, then replace `not run`/`not observed` only with your real results. Do not paste API payloads, names, query text or query-bearing URLs into evidence.

**File:** `.lab-evidence/04-plugin.md` (create; author).

```markdown
# Lab 04 evidence — author

- Workspace root / branch / commit: not recorded
- Client and build: not recorded
- Canonical skill and checklist inspected: not observed
- Manifest/schema version and catalog reviewed: not observed
- verify:exercise command / exit: not run
- First toolkit:build command / exit / output directory: not run
- Second toolkit:build command / exit / unchanged result: not run
- Generated four-file inventory verified: not observed
- Provenance version / sourceCommit / sourceDirty / sourceChecksum: not observed
- Per-file digests compared with canonical inputs: not observed
- Actual absolute package directory: not recorded
- Consumer creation approval / command / result / destination: not run
- Copied allowlist and local-skill absence inspected: not observed
- API/test/fixture changes introduced by this lab: not checked
- Remaining gaps and next check: not recorded
```

**File:** `.lab-evidence/04-plugin.md` (create; consumer).

```markdown
# Lab 04 evidence — consumer

- Workspace root / branch / commit: not recorded
- Client and build / current author guide location: not recorded
- npm ci approval / command / exit: not run
- preflight and verify:baseline commands / exits: not run
- Local canonical skill absent / existing registrations checked: not observed
- Installation approval and scope: not recorded
- Registration command or workspace entry / result: not run
- Exactly one active lab package / observed source / version: not observed
- Discovery mechanism: not observed (native, manual, or app bridge)
- Skill and linked checklist source shown by client: not observed
- Planning invocation / approval stop / checklist follow-up: not run
- Consumer diff before/after / no new API or test writes: not checked
- Manual fallback or unverified app bridge limitations: not recorded
- Recovery/cleanup and remaining gaps: not recorded
```

## Verify the result

1. **Author:** `npm run verify:exercise -- --step 04-plugin` validates the manifest and skill shape; repeat `npm run toolkit:build` unchanged. A failure about extra/missing skill files means inspect the two-file canonical allowlist, not weaken validation.
2. **Consumer:** `npm run verify:baseline` should stay green. `npm run test:search` is intentionally red against 501; do not implement to make this lab pass. Check no local canonical skill, exactly one lab registration, and real source/version plus two invocation observations.
3. **Evidence limit:** packaging/static validation proves file integrity, not installation, permission enforcement or client invocation. Clearly leave native installation unverified if you used the manual fallback.
4. **Recovery/cleanup:** remove/disable only the lab path in `.vscode/settings.json`, or use `copilot plugin uninstall user-search-toolkit` after reviewing the exact registration. Preserve all unrelated settings/plugins. No broad cache/profile cleanup, automatic commits or publishing.
- Next: [05 — MCP and update](05-mcp-and-update.md).
