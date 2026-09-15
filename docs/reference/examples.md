# Examples, checkpoints, and safe recovery

## Release model

- `main`: runnable unfinished app, acceptance tests, helpers, guide and minimal safety orientation only.
- `examples`: browseable inert payloads under `examples/steps/`. Source is pinned to immutable **examples-v1**, exact commit and manifest SHA-256 in `workshop/examples-lock.json`.
- `starter-v2`: approved consumer base. The consumer helper copies its release locks from author so bootstrap self-reference is not required.
- Earlier `starter-v1`, `starter-v1.1`, `starter-v1.2`, and `solution-v1` remain immutable but superseded preparation checkpoints. Final v2 also validates exact discovered MCP identifiers in bounded roles, without wildcard grants.
- `solution` / **solution-v2**: separate full implementation. Only inspect after an attempt or deliberate walkthrough choice.
- Actual release SHAs live in presenter release evidence. Tags are append-only release identifiers; never move them.
- **Do not** pull/merge examples, switch an active learner workspace to examples, reset files, force checkout, or use solution as a hidden starter.

## Commands

```sh
npm run lab:examples:fetch
npm run lab:example -- --step 03-skill --preview
npm run lab:example -- --step 03-skill --stage
npm run lab:example -- --step 03-skill --apply
```

- Local refs work without origin/network. Fetch checks the existing tag rather than contacting a remote.
- Missing tag: obtain an owner-reviewed bundle/release. Future network retrieval requires exact `approvedOrigin` in lock plus `--remote origin --approve-network`; it fetches only that tag and checks its commit/manifest.
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
- The helper never installs a package, invokes a skill, executes imported content, edits user settings, commits, pushes, or touches search code.

## If you already changed these files

1. Keep your authored files. `git diff` and `git diff --cached` explain local changes; committing is an explicit learner choice, not an importer action.
2. Use the step's `--stage` route even if apply is blocked. Compare side by side; manually incorporate only wanted rules.
3. Known prerequisite updates require the prior sample to be committed cleanly. **Committing different learner content does not authorize replacement**.
4. Do not erase your personalization just to match a hash. Use manual merge; rerun static checks and actual client invocation.
5. Preserve useful staged references outside discovery paths; remove only the named reference directory after your comparison. Never broad-clean the workspace.

## Not published

- In the **repository Markdown view**, every lab's relative “Browse examples branch” link points to its examples branch directory.
- In the **local site**, those links lead here because owner/host is intentionally unresolved. Use local Git plus the exact step commands, not a fabricated hosted URL.
- Once owner approves publishing, set `WORKSHOP_SOURCE_URL` to the approved repository URL when building to enable hosted source links.
- ZIP downloads without `.git`: use browser-copy from the exact reviewed examples tag and compare per-file SHA-256 against the manifest. Do not initialize a synthetic Git history just to bypass checks.
- No reviewed standalone archive is included; offline ZIP users should obtain the prepared repository/bundle or use the labeled browser-copy route.

## Checkpoints are dependency maps, not answer dumps

- `presenter/checkpoint-map.json` is generated from the same manifest.
- Each upstream step requires its own preview and explicit application or reviewed authored equivalent.
- 07 imports only a toolkit-readiness checklist. Configure and **install** the author-built package in consumer separately; ordinary imports cannot bring in the search solution.
- 09 uses a repository-bundled, reviewed Spec Kit reference packet rather than the immutable
  `examples-v1` payload. The packet records its actual preparation version, but it is never learner
  execution evidence.
