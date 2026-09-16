# Examples, checkpoints, and safe recovery

## Release model

The [public source](https://github.com/frye/copilot-user-search-workshop) and
[published guide](https://frye.github.io/copilot-user-search-workshop/) are available now.
They are shared, read-only material for learners; your author and consumer work stays local.
Start with the [normal main clone](../start.md#start-here), not a bootstrap or solution tag.

- `main`: runnable unfinished app, acceptance tests, helpers, guide and minimal safety orientation only.
- `examples`: browseable inert payloads under `examples/steps/`. Source is pinned to immutable **examples-v1**, exact commit and manifest SHA-256 in `workshop/examples-lock.json`.
- `starter-v2`: approved consumer base. The consumer helper copies its release locks from author so bootstrap self-reference is not required.
- Earlier `starter-v1`, `starter-v1.1`, `starter-v1.2`, and `solution-v1` remain immutable but superseded preparation checkpoints. Final v2 also validates exact discovered MCP identifiers in bounded roles, without wildcard grants.
- `solution` / **solution-v2**: separate full implementation. Only inspect after an attempt or deliberate walkthrough choice.
- Actual release SHAs live in presenter release evidence. Tags are append-only release identifiers; never move them.
- **Do not** pull/merge examples, switch an active learner workspace to examples, reset files, force checkout, or use solution as a hidden starter.

## Copy from the guide or import an example

Each lab groups **Build it yourself**, **Copy & Paste**, and **Bring in this step** under one
route selector near the top. **Bring in this step** is the first-visit default; the guide remembers
your later choice across labs, independently of your client choice. Pick one route to obtain the
initial artifacts, then follow **Continue with this lab** below all three alternatives.

The copy route provides complete initial file contents, and the build route explains how to author
them. The **File** label is the exact destination, and its action tells you to create, append, or
merge. Neither manual route requires switching to the examples branch or running the importer.
Shared evidence templates and later revision blocks appear below the routes where everyone needs
them. A tab selection changes the displayed instructions only; imports still require explicitly
running `lab:activate`. Preview and staging are optional inspection/comparison tools.
The guide uses the reviewed examples as a starting point but may explain or extend them; inline
content is not a promise of byte-for-byte identity with the immutable `examples-v1` release.

- For a new file, create its parent directory and paste only the fenced contents into the named
  file. For `.github/copilot-instructions.md`, preserve the starter safety rules and append/merge
  the lab extension. Never paste the guide's surrounding prose into an automatically loaded file.
- If the destination already exists, compare first. Keep personalizations and copy only missing
  sections. A complete sample is not authorization to replace a learner's file.
- Do not run `--apply` after manually copying the same files and expect it to adopt them. Matching
  untracked bytes without an import receipt can still be a protected collision. Committed
  alternatives are also protected. Use `--stage` for comparison; do not edit hashes or force/reset.
- Later version updates must preserve earlier improvements. A learner-authored Lab 03 skill may
  correctly block the Lab 05 sample update; manually merge the MCP stage and update the manifest.
- Lab 09's larger complete packet is already under `workshop/spec-kit-reference/`. Its lab maps
  every source and destination and provides the separate no-install copy workflow.

After either construction route, return to **Try it**, **Client steps**, and **Verify the result**.
Copying an evidence template must leave observations unfilled/not run until you perform the work.

## Verify local release refs

The published annotated tags match the existing reviewed locks:

| Required tag | Peeled commit | Purpose |
| --- | --- | --- |
| `examples-v1` | `df1328a4c1b9de89bdba5854a75f55fc42ba872d` | Inert per-step assets and manifest verification |
| `starter-v2` | `1afbf9be347343dc15bb390f4ac843dca44ce034` | Clean sibling consumer base, not the main entry point |

Run the [setup tag checks](../start.md#verify-the-local-release-refs) in author. They inspect
local Git objects without shell `eval`, sourcing scripts from tags, or executing release
payloads. `npm run lab:examples:fetch` with the existing tag verifies its commit and manifest
SHA-256 locally, even though author retains origin's source fetch URL. It does not contact origin.

If either ref is missing or mismatched, stop. Preserve the existing checkout and learner work.
Obtain an owner-reviewed Git bundle containing main and both required refs, or repeat the
normal clone in a fresh author directory under existing source-read approval. Verify the
reviewed refs in the new copy before resuming. A bundle recovery is not permission to replace
tags in an existing checkout; a fresh clone is not permission to bypass network policy.

Never force-fetch, move/replace tags, lower hash guards, or edit the locks to accept a mismatch.
`approvedOrigin` remains `null`. The helper's explicit network gate stays intact: missing refs
fail without network access. Do not pass `--remote origin --approve-network` or configure a
network origin in the lock as a learner workaround. A future network-enabled release would
need separate owner review; the public source's existence does not grant that approval.

## Commands

For Labs 00–08, import the selected step with one command:

```sh
npm run lab:activate -- --step 03-skill
```

Activation displays the import plan and applies it after the existing whole-step safety checks.
Running this command explicitly requests application; no separate preview, staging directory, or
confirmation prompt is required. It imports only the selected step, not missing prerequisites.
It does not load or invoke the imported customization in your client.

**Safe to rerun:** unchanged imports succeed with `changed: 0`, including before you commit them.
Existing comparison directories do not block activation. Edited files, personalized content, and
later-step updates remain protected; rerunning is not a reset. Stop on conflicts and compare manually.

New consumers receive this shortcut through `consumer:create`. Existing consumers are not silently
updated; if the shortcut is unavailable there, the equivalent single command is
`npm run lab:example -- --step 03-skill --apply` (substitute that consumer step and client).
[Lab 09](../labs/09-spec-kit.md) keeps its separate Spec Kit packet and bootstrap commands; do not
substitute the legacy `09-spec-kit` examples payload for its bundled packet.

### Optional inspection and comparison

These are alternatives for inspection or recovery, **not a required sequence**:

```sh
# Read-only preview
npm run lab:example -- --step 03-skill --preview
# Stage inert references for manual comparison
npm run lab:example -- --step 03-skill --stage
# Explicit apply, equivalent to lab:activate
npm run lab:example -- --step 03-skill --apply
```

Use `lab:example`, not `lab:activate`, when selecting preview or staging.
The separate `npm run lab:examples:fetch` release check remains part of setup, not every activation.

### Starting at Lab 03

To begin specifically at Lab 03 with the reviewed Lab 01–02 prerequisites:

```sh
npm run lab:03:bootstrap
```

- This separate, explicitly invoked shortcut creates one local checkpoint commit containing only the imported Lab 01–02 destinations.
- It requires a learner branch, configured Git identity, no pre-existing staged changes, and conflict-free reviewed destinations.
- It does not import Lab 00's blank checklist. Run and record Lab 00's actual readiness checks separately.
- It does not import the Lab 03 skill, switch/merge branches, install, push, or contact a remote.

- Local refs work without origin/network. The fetch helper checks the existing tag rather than contacting a remote; use the recovery procedure above if refs are missing.
- `--workspace author|consumer` must match actual workspace marker; scope cannot be overridden to write the other workspace.
- `--client cli|vscode|app` selects only that client's payload. Default is CLI; supply your client explicitly for 05 and 06.
- Preview is read-only and reports source, prerequisites, all destinations, hashes, and conflicts.
- Stage writes a fresh `.lab-references/STEP-WORKSPACE-CLIENT/` comparison directory, never discovery paths. Existing stage directory is refused.
- Apply preflights the **whole step**. It permits missing destinations or clean tracked known starter/prerequisite bytes only.
- Existing participant edits, committed alternative content, untracked/ignored collisions, symlinks/hardlinks, duplicate destinations, and mismatched source are refused.
- Repeat imports recognize their own exact payload receipts; no force option exists.
- Apply rechecks hashes before writing, rolls back its writes on caught I/O failures, and explicitly reports incomplete rollback if concurrent content must be preserved.
- Payload-relative links resolve at their declared imported destination, not inside the inert examples directory.
- Filesystem operations cannot guarantee recovery from power loss/process termination; use one writer, keep Git checkpoints, and inspect a stopped transaction before retrying.
- LF checkout policy keeps reviewed text hashes portable. On unexpected line-ending conflicts, stage/compare and inspect local Git attributes rather than forcing replacement.
- The per-step `lab:example` helper and its `lab:activate` shortcut never install a package, invoke a skill, execute imported content, edit user settings, commit, push, or touch search code. Only the separate `lab:03:bootstrap` command creates its documented local checkpoint commit.

## If you already changed these files

1. Keep your authored files. `git diff` and `git diff --cached` explain local changes; committing is an explicit learner choice, not an importer action.
2. Use the step's `--stage` route even if apply is blocked. Compare side by side; manually incorporate only wanted rules.
3. Known prerequisite updates require the prior sample to be committed cleanly. **Committing different learner content does not authorize replacement**.
4. Do not erase your personalization just to match a hash. Use manual merge; rerun static checks and actual client invocation.
5. Preserve useful staged references outside discovery paths; remove only the named reference directory after your comparison. Never broad-clean the workspace.

<a id="not-published"></a>

## Source links in local previews

This fallback means the local build has no `WORKSHOP_SOURCE_URL` configured; it does **not**
mean the source or guide is unpublished. The existing `#not-published` anchor is retained for
links from the site configuration and older bookmarks.

- Source repository quick links are available by default, but do not by themselves enable hosted example links. An approved `WORKSHOP_SOURCE_URL` updates those quick links and enables the relative example links in the generated guide; the plain Markdown source is unchanged.
- In the **repository Markdown view**, each lab's relative “Browse examples branch” link points to its examples branch directory.
- In a **local preview without a source URL**, those links lead here. Browse the [published examples branch](https://github.com/frye/copilot-user-search-workshop/tree/examples/examples/steps/) or use local Git and the pinned per-step commands.
- For hosted-source links in a local build, use shell-scoped configuration; this builds documentation only and does not deploy or authorize remote writes:

```sh
WORKSHOP_BASE=/copilot-user-search-workshop/ WORKSHOP_SOURCE_URL=https://github.com/frye/copilot-user-search-workshop npm run docs:build
```

- Keep `WORKSHOP_BASE` and `WORKSHOP_SOURCE_URL` configurable for approved deployment targets. See [publication boundaries](publication.md); a local build is not publication.
- The learner setup requires a Git clone with the reviewed refs, not a ZIP or synthetic Git history. If Git/client access is blocked, use an approved pairing or labeled artifact-only walkthrough, not fabricated import or runtime evidence.

## Checkpoints are dependency maps, not answer dumps

- `presenter/checkpoint-map.json` is generated from the same manifest.
- Each upstream step requires its own explicit activation or reviewed authored equivalent. Preview and staging are optional comparison tools.
- 07 imports only a toolkit-readiness checklist. Configure and **install** the author-built package in consumer separately; ordinary imports cannot bring in the search solution.
- 09 uses a repository-bundled, reviewed Spec Kit reference packet rather than the immutable
  `examples-v1` payload. The packet records its actual preparation version, but it is never learner
  execution evidence.
