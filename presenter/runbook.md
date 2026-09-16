# Presenter runbook

## Existing source and learner boundary

The [public source](https://github.com/frye/copilot-user-search-workshop) and
[live guide](https://frye.github.io/copilot-user-search-workshop/) are already available.
This runbook update does not publish anything or record a new client rehearsal or approval.
Historical files under `presenter/evidence/` retain their original observed scope and results.

Send learners to the [canonical local-clone setup](../docs/start.md#start-here): normal main
clone into a fresh author folder, immediately disable origin pushes, then create the learner
branch. Keep origin fetch access and do not use `starter-v2` as the author entry point.
The shared source is read-only for learners; the push URL guard does not prevent API writes,
PRs, or cloud-agent tasks. Do not direct learner writes, tasks, or submissions to that source.
No fork, personal upstream, push, PR, cloud task, or submission is required, but required lab
evidence and checkpoint dependencies remain mandatory for a claimed completed route.

## Rehearse locally

- Confirm this repository, learner branch from main, Node **24.20.0** / npm **11.19.0**, and no active complete customizations. Use an approved parent without inherited `.github` customizations; preserve any existing directories/branches instead of overwriting them.
- `npm ci` → `npm run preflight` → `npm run verify:baseline`.
- `npm run test:search`: inspect intentional 501 failure reason. Do not advertise red acceptance as a test failure hidden by defaults.
- Run the setup guide's annotated-tag/commit checks and `npm run lab:examples:fetch`: existing local refs verify without network. Missing/mismatched refs require a stop and an approved bundle or fresh clone, not force-fetching, replaced tags, relaxed hashes, or new network permissions.
- Preview/stage each step; test learner edits are preserved. `npm run test:helpers` exercises transactional conflicts and package/consumer cases.
- `npm run docs:build` → `npm run test:browser`; `npm run docs:preview` for presenter navigation; stop preview when done.
- Use dependency map in `checkpoint-map.json`. Do not skip package install by copying a project skill into consumer.
- Rehearse user-facing client discovery/install/update and actual tool invocation on approved builds before describing runtime as observed.
- Start with author only. Lab 04's `consumer:create` creates the named sibling `../workshop-consumer` and removes its origin; do not create consumer during setup. Keep one writer. Author updates canonical skill/package; consumer configures MCP/roles and implements only at Lab 07. Use `verify:solution` after implementation, not the starter-only baseline.
- Actual installation is an explicit presenter/participant action, never part of scripted preparation.
- Use approved pairing or clearly labeled artifact-only participation if policy blocks runtime work. Record real client/build, commands/results, approvals and gaps privately; sample output is not evidence.
- Lab 09 defaults to the bundled Spec Kit reference packet. If demonstrating live generation, record
  the actual latest `specify` version, review every generated path, and keep `.specify/` and generated
  skills trackable rather than broadly ignored.

## Release refs

- `starter-v2` is immutable consumer base; current main includes its exact pin and examples release metadata. Earlier starter tags are preserved but superseded, not moved.
- Published annotated `examples-v1` resolves to `df1328a4c1b9de89bdba5854a75f55fc42ba872d`; `starter-v2` resolves to `1afbf9be347343dc15bb390f4ac843dca44ce034`. They match the existing locks; no pin change is needed.
- `examples-v1` pins inert per-step assets and hashes; moving examples branch is browseable only.
- `solution-v2` pins full reference; no ordinary importer exposes implementation.
- `presenter/evidence/releases.json` records real SHAs without a self-referential tag hash.
- `starter-v2` itself contains the previous starter lock by design; current main's consumer helper carries the reviewed current locks into the new consumer. Clone main for entry, never the bootstrap tag directly.
- Fixes use new immutable tags; never force/move a released tag.
- Consumer lock files are copied from approved author checkout so a bootstrap snapshot does not have to predict its own SHA.

## Before any future external release

- Existing public hosting is not approval for another release, deployment, or audience change. Obtain explicit target owner/name/visibility/Pages-audience approval and participant distribution access.
- Confirm sample/solution visibility, EMU restrictions, client policy/network prerequisites and rehearsal contacts.
- Review official source changes and exact action SHAs; real client versions remain unresolved.
- Only after separate future-release approval perform the reviewed remote distribution steps. Leave current release locks and `approvedOrigin: null` unchanged; public source availability does not authorize the helper's network route.
- Keep default main starter; never merge examples/solution. No remote action is automated by this runbook.
- Verify the protected `github-pages` environment and `PAGES_APPROVED=true`; `workflow_dispatch` must remain manual from main with explicit approval input after owner review. Do not infer current environment protections from this runbook.
- Build with approved, configurable `WORKSHOP_BASE` and `WORKSHOP_SOURCE_URL`. A missing source URL in local preview uses the preserved [source-link fallback](../docs/reference/examples.md#not-published), not an unpublished-source claim.
- Validate source/site access separately for the future release and record actual URL and new evidence; a local guide build is not publication. Do not rewrite historical presenter evidence to imply new approvals or rehearsals.
- Hosted Code Review evidence must be genuine and commit-specific. Optional cloud/Mobile tasks are not core prerequisites.

## End of session

- Stop API/docs/MCP processes started for the lab.
- Remove only lab-created client package registration and `workshop-standards` configuration if requested.
- Preserve learner work, evidence, versions and unrelated customizations.
- Remove only named scratch comparison/worktree directories that you created; never broad reset/clean profiles.
