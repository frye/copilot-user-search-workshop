# Presenter runbook

## Rehearse locally

- Confirm this repository, main starter, pinned Node/npm, no active complete customizations.
- `npm ci` → `npm run preflight` → `npm run verify:baseline`.
- `npm run test:search`: inspect intentional 501 failure reason. Do not advertise red acceptance as a test failure hidden by defaults.
- `npm run lab:examples:fetch`: local refs must work without origin.
- Preview/stage each step; test learner edits are preserved. `npm run test:helpers` exercises transactional conflicts and package/consumer cases.
- `npm run docs:build` → `npm run test:browser`; `npm run docs:preview` for presenter navigation; stop preview when done.
- Use dependency map in `checkpoint-map.json`. Do not skip package install by copying a project skill into consumer.
- Rehearse user-facing client discovery/install/update and actual tool invocation on approved builds before describing runtime as observed.
- Keep two named siblings and one writer. Author updates canonical skill/package; consumer configures MCP/roles and implements.
- Actual installation is an explicit presenter/participant action, never part of scripted preparation.
- Lab 09 defaults to the bundled Spec Kit reference packet. If demonstrating live generation, record
  the actual latest `specify` version, review every generated path, and keep `.specify/` and generated
  skills trackable rather than broadly ignored.

## Release refs

- `starter-v2` is immutable consumer base; current main includes its exact pin and examples release metadata. Earlier starter tags are preserved but superseded, not moved.
- `examples-v1` pins inert per-step assets and hashes; moving examples branch is browseable only.
- `solution-v2` pins full reference; no ordinary importer exposes implementation.
- `presenter/evidence/releases.json` records real SHAs without a self-referential tag hash.
- `starter-v2` itself contains the previous starter lock by design; current main's consumer helper carries the reviewed current locks into the new consumer. Clone main for entry, never the bootstrap tag directly.
- Fixes use new immutable tags; never force/move a released tag.
- Consumer lock files are copied from approved author checkout so a bootstrap snapshot does not have to predict its own SHA.

## Before external release

- Obtain explicit owner/name/visibility/Pages-audience approval and participant distribution access.
- Confirm sample/solution visibility, EMU restrictions, client policy/network prerequisites and rehearsal contacts.
- Review official source changes and exact action SHAs; real client versions remain unresolved.
- Only after approval add the chosen remote, distribute starter/examples/solution refs, and configure approvedOrigin/source URL.
- Keep default main starter; never merge examples/solution. No remote action is automated by this runbook.
- Configure protected `github-pages` environment and `PAGES_APPROVED=true`; dispatch Pages manually from main with approval input after owner review.
- Validate source/site access separately and record actual URL; local guide build is not publication.
- Hosted Code Review evidence must be genuine and commit-specific. Optional cloud/Mobile tasks are not core prerequisites.

## End of session

- Stop API/docs/MCP processes started for the lab.
- Remove only lab-created client package registration and `workshop-standards` configuration if requested.
- Preserve learner work, evidence, versions and unrelated customizations.
- Remove only named scratch comparison/worktree directories that you created; never broad reset/clean profiles.
