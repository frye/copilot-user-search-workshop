# Local validation evidence

## Preparation boundary

- All implementation is in this standalone repository, not account notes.
- Initial host: Node 26.8.1/npm 11.19.0.
- Repository-local author runtime: **Node 24.20.0/npm 11.19.0**, obtained after manifests existed; no global runtime change.
- The full reference was implemented and its five HTTP acceptance tests passed before deriving the 501 starter.
- Baseline HTTP and real SDK stdio MCP tests passed on that full reference (5 tests total), including exact tool allowlist, strict input errors and fixture failure handling.
- Release-wide validation and immutable SHAs are recorded below after integrated checks; this initial preparation record is not a release pass.

## Not performed

- No VS Code, Copilot CLI or Copilot app runtime rehearsal or plugin install/update.
- No app-native local installation claim; CLI bridge remains unverified.
- No cloud task, hosted review, Mobile execution, remote repository, push, upload or Pages deployment.
- No global client settings, user plugin registrations, account notes or other repository changed.
- No Spec-Kit generation; optional extension unavailable.

## Final observed gates — 2026-09-15 UTC

| Check | Observed outcome | Persistent evidence |
| --- | --- | --- |
| Main `verify:baseline` | PASS: strict build, 5 baseline/MCP tests, 1 starter test, 22 helper checks, 2 Markdown checks, production guide | [baseline.log](baseline.log) |
| Main explicit search acceptance | Expected exit 1; all 5 groups fail for the intentional 501, including required 200/400 responses | [intentional-red.tap](intentional-red.tap) |
| Isolated `verify:solution` | PASS: regression/MCP, all 6 search groups including added unknown-key coverage, helpers/assets/docs/build | [solution.log](solution.log) |
| Chromium production guide | PASS: 4 browser tests; selection, persistence, query/anchor links, keyboard focus/navigation, SPA navigation, narrow viewport, no-JS and print-all | [browser.log](browser.log) |
| Actual local helper commands | 76 commands, all exit 0; per-step preview/stage/apply, static exercise validation, package builds, fresh consumer baseline and review probe | [local-rehearsal.json](local-rehearsal.json) |
| Canonical package 1.0.0 → 1.1.0 | PASS: exact files/schema/checksums, immutable output versions, preserved consumer guidance, no local duplicate skill | [package-rehearsal.json](package-rehearsal.json) |
| Real stdio fixture calls | PASS: SDK initialize/list/both calls/close; source/version and stderr retained | [mcp-observed.json](mcp-observed.json) |
| Release refs | Main starter; examples/solution separate; tags immutable, no origin | [releases.json](releases.json) |

## Rehearsal coverage

- Tested **Node 24.20.0**, **npm 11.19.0**, strict **TypeScript 5.9.3**, **MCP SDK 1.30.0**, **zod 4.5.4**, **VitePress 1.6.4** on macOS ARM64.
- Browser: **Playwright 1.63.0 / Chromium 153.0.8010.12**. Browser binaries and process scratch were repository-local.
- Final local author/consumer rehearsal used the pinned **starter-v2**; no source skill/package was left active on main.
- Negative checks include staged/unstaged/committed edits, tracked deletion, untracked matching collision, symlink/dangling parent, traversal, missing/moved source, manifest hash, prerequisite failures, repeat apply, race recheck, rollback, missing references, stale package version, extra/tampered package content and duplicate consumer skill.
- Every example source hash and client group was checked. VS Code/app role payloads were applied to separate fixture consumers; **not loaded in those clients**.
- Exact discovered MCP tool-name suffixes can be added to bounded roles; wildcard and generic reviewer execution grants are rejected statically. Actual client tool recognition remains a runtime observation.
- The SDK tool transcript is genuine **protocol evidence**, not evidence that Copilot invoked MCP.
- Package source commits describe disposable rehearsal checkpoints; the immutable examples ref and per-file/aggregate hashes identify reproducible source bytes.
- Earlier starter/solution tags are preserved superseded preparation checkpoints, never force-moved. Final entries use main, examples-v1, starter-v2 and solution-v2.

## Remaining owner/client gates

- Approve repository owner/name/visibility, participant/EMU distribution, and Pages audience before any publishing.
- Rehearse real VS Code, Copilot CLI and Copilot app builds, native/manual discovery, exact role tool IDs, package install/update/removal and source/version evidence.
- App local plugin consumption remains an **unverified CLI bridge**, not an app-native claim.
- Linux/Windows runtime and hosted CI execution were not performed locally; workflows are prepared, not observed remote runs. Node 26 was the initial host, not the validated workshop target.
- Optional hosted review/cloud/Mobile routes require separate access and genuine evidence.
- No remaining failing implementation test is being treated as a release pass. Named main search failures are the documented teaching boundary.
