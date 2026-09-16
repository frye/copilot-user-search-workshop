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

```sh
npm run lab:examples:fetch
npm run lab:example -- --step 03-skill --preview
npm run lab:example -- --step 03-skill --stage
npm run lab:example -- --step 03-skill --apply
```

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
- The per-step `lab:example` helper never installs a package, invokes a skill, executes imported content, edits user settings, commits, pushes, or touches search code. Only the separate `lab:03:bootstrap` command creates its documented local checkpoint commit.

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
- Each upstream step requires its own preview and explicit application or reviewed authored equivalent.
- 07 imports only a toolkit-readiness checklist. Configure and **install** the author-built package in consumer separately; ordinary imports cannot bring in the search solution.
- 09 uses a repository-bundled, reviewed Spec Kit reference packet rather than the immutable
  `examples-v1` payload. The packet records its actual preparation version, but it is never learner
  execution evidence.
