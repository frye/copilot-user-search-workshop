# Examples, checkpoints, and safe recovery

## Release model

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
them. A tab selection changes the displayed instructions only; imports still require your explicit
preview, review, and application.
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
- The per-step `lab:example` helper never installs a package, invokes a skill, executes imported content, edits user settings, commits, pushes, or touches search code. Only the separate `lab:03:bootstrap` command creates its documented local checkpoint commit.

## If you already changed these files

1. Keep your authored files. `git diff` and `git diff --cached` explain local changes; committing is an explicit learner choice, not an importer action.
2. Use the step's `--stage` route even if apply is blocked. Compare side by side; manually incorporate only wanted rules.
3. Known prerequisite updates require the prior sample to be committed cleanly. **Committing different learner content does not authorize replacement**.
4. Do not erase your personalization just to match a hash. Use manual merge; rerun static checks and actual client invocation.
5. Preserve useful staged references outside discovery paths; remove only the named reference directory after your comparison. Never broad-clean the workspace.

## Not published

- In the **repository Markdown view**, every lab's relative “Browse examples branch” link points to its examples branch directory.
- In the **local site** without `WORKSHOP_SOURCE_URL`, those links lead here because hosted examples require explicit publication approval. The source repository quick links do not enable hosted examples. Use local Git plus the exact step commands.
- Once owner approves publishing, set `WORKSHOP_SOURCE_URL` to the approved repository URL when building to enable hosted example links and override source repository quick links.
- ZIP downloads without `.git`: use browser-copy from the exact reviewed examples tag and compare per-file SHA-256 against the manifest. Do not initialize a synthetic Git history just to bypass checks.
- No reviewed standalone archive is included; offline ZIP users should obtain the prepared repository/bundle or use the labeled browser-copy route.

## Checkpoints are dependency maps, not answer dumps

- `presenter/checkpoint-map.json` is generated from the same manifest.
- Each upstream step requires its own preview and explicit application or reviewed authored equivalent.
- 07 imports only a toolkit-readiness checklist. Configure and **install** the author-built package in consumer separately; ordinary imports cannot bring in the search solution.
- 09 uses a repository-bundled, reviewed Spec Kit reference packet rather than the immutable
  `examples-v1` payload. The packet records its actual preparation version, but it is never learner
  execution evidence.
