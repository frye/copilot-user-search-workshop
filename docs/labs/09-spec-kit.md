# 09 — Spec Kit: extend search with a team filter

Spec Kit supports specification-driven development through linked requirements, plans, checklists,
and implementation tasks. Those artifacts help expose ambiguity before coding and make it possible
to reconcile the finished change against what was approved. This lab applies that workflow to a
bounded team-filter extension, with a complete artifact-guided route that does not require
installing Spec Kit.

**Documentation:** [Spec Kit quickstart](https://github.com/github/spec-kit/blob/main/docs/quickstart.md).

## Goal and starting workspace

- **Consumer**, after 07 passes; 08 is recommended but not required.
- Use Spec Kit artifacts to specify, plan, approve, implement, and reconcile one bounded follow-on
  feature: an optional `team` filter for user search.
- The primary route requires no Spec Kit installation. Supplied artifacts are reference material, not
  evidence that you ran the generator.
- Keep this revised guide open from **author** if the pinned consumer has older docs. All feature
  work happens in consumer; author/main retains the unfinished 501 starter.

## Choose your route

Choose **one** way to prepare the fourteen-file working packet; none requires Spec Kit installation.
**Bring in this step** is the first-visit default. Selecting it does not run the helper or approve work.

### Build it yourself

1. Assemble a consumer-owned packet at `workshop/artifacts/spec-kit-reference/`, using the complete
   bundled sources under `workshop/spec-kit-reference/` and the
   [exact source-to-destination map](#exact-14-file-source-to-destination-map) as your reference.
   Work file by file in the editor; this route does not require the copy tab or the helper.
2. Create `README.md` with the packet's reference-only and preservation boundaries. Bring over
   `constitution.md`, the unfilled `checkpoint-template.md`, and
   `001-team-filter/provenance.json` unchanged so the original governance, template, and preparation
   provenance remain accurate. Never claim your manual assembly was generator execution.
3. Assemble `001-team-filter/spec.md` and `contracts/user-search.md` from their complete sources.
   Preserve FR-001–FR-011, SC-001–SC-005, clarification decisions, exact singleton/normalization/
   empty/error behavior, and all compatibility/privacy boundaries. Do not abbreviate the contract.
4. Assemble `001-team-filter/research.md`, `data-model.md`, `plan.md`, and `quickstart.md` using their
   named sources. Preserve dependency-neutral design, fixture immutability, the filter/sort/total/
   limit sequence, prior solution prerequisites, and exact focused/full test commands.
5. Assemble `001-team-filter/checklists/requirements.md`, `checklists/api.md`, `tasks.md`, and
   `analysis.md`. Preserve reference review labels, CHK001–CHK009, the complete unchecked T001–T009
   entries and dependencies, and FR/SC coverage. Reference findings are not your own approval.
6. Compare every completed file with its mapped source. Keep deliberate wording changes distinct
   from copied preparation history and retain all required sections; preserve existing learner work
   instead of overwriting a destination. Keep the reference task list intact for later reconciliation.
7. Confirm all fourteen mapped destinations are present. Leave the packet's checkpoint template
   unfilled: the actual checkpoint, evidence, review, and approval are shared work below.

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

### Copy-and-paste

1. Use the [exact fourteen-file map](#exact-14-file-source-to-destination-map) below. Each named
   source under `workshop/spec-kit-reference/` already contains complete contents; no abbreviated
   snippets or legacy `examples-v1` Lab 09 files are needed.
2. Open each complete source in an editor, copy its entire contents, and save them to the matching
   missing destination under `workshop/artifacts/spec-kit-reference/`. Preserve the relative
   `001-team-filter/contracts/` and `001-team-filter/checklists/` directories and filenames.
3. Compare each source/destination pair. If a destination exists, preserve it and merge only
   reviewed differences instead of replacing learner work. Keep `provenance.json` unchanged with
   `learnerEvidence: false` and keep the packet's `checkpoint-template.md` unfilled.
4. Stop after the fourteen-file packet is ready. No helper, generator, installation, or other
   authoring route is required; the actual checkpoint and private evidence are shared below.

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

### Bring in this step

#### Inspect the example

- Open `workshop/spec-kit-reference/README.md` for the bundled packet.
- `workshop/spec-kit-reference/001-team-filter/provenance.json` records the actual preparation version
  and commands.
- The packet is a genuine reviewed snapshot, but its completed checklists and analysis are not your
  evidence. Your checkpoint must contain your own approvals, commands, failures, fixes, and results.
- The [fourteen mapped sources](#exact-14-file-source-to-destination-map) are complete. The old
  `examples-v1` Lab 09 payload is not this exercise's source and must not replace it.

#### Preview, stage, and apply

```sh
# CONSUMER; local reviewed packet, no Spec Kit installation
node scripts/spec-kit-reference.mjs --preview
node scripts/spec-kit-reference.mjs --stage
node scripts/spec-kit-reference.mjs --apply
```

1. Run preview and inspect all fourteen names, hashes, and destination states.
2. Run stage and compare the files under `.lab-references/09-spec-kit-reference/`. If that staging
   directory already exists, inspect it rather than deleting it blindly or repeatedly staging.
3. Run apply only if the destinations are missing and the preview is acceptable. Apply creates
   the reference working packet, not the learner checkpoint, evidence, tests, or implementation.

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

## Continue with this lab

Every route joins here with the same fourteen-file packet. Keep the original sources, learner work,
fixture users, and prior acceptance intact. Never log names, query text, query-bearing URLs, or
payloads. Preparing references is not implementation approval or evidence that Spec Kit ran.
The common checkpoint/evidence templates below apply even when the import route is selected.

Start a **separate artifact-guided Lab 09 session**, not the unchanged Lab 06
`workshop-implementer` role. That role requires Lab 07 approval and owns only
`src/api/search.ts` plus `tests/search/search.test.ts`; it does not authorize team-filter work.
If you choose to reuse a custom role instead, review and explicitly approve its Lab 09 gate,
exact edit scope, and actual tools before loading it. Do not silently widen the role or treat
earlier approval as permission for this feature. Existing team-filter tests are inspect/run scope;
only exact additions named in a newly approved plan may be edited.

## Artifact inventory

| Path | Action and owner | Purpose |
| --- | --- | --- |
| `workshop/spec-kit-reference/` | Inspect in consumer; do not edit | Complete, repository-bundled source packet |
| `workshop/artifacts/spec-kit-reference/` | Create the 14 mapped files in consumer | Consumer-owned reference/working packet |
| `.lab-references/09-spec-kit-reference/` | Generate with `--stage`; inspect | Collision-safe comparison copy, not execution evidence |
| `workshop/artifacts/spec-kit-checkpoint.md` | Create from the packet checkpoint template; update in consumer | Actual clarification, approval, red/green, and reconciliation record |
| `.lab-evidence/09-spec-kit.md` | Create, then update privately in consumer | Client route, provenance, commands, and limitations |
| `package.json` | Inspect existing scripts; no blind setup edit | `test:team-filter` and `verify:speckit-solution` already ship |
| `tests/team-filter/team-filter.test.ts` | Inspect and run existing suite; edit only exact coverage additions named in the approved plan | Focused acceptance, not blanket test-file edit permission |
| `src/api/search.ts` | Inspect; edit in consumer only after approval | Bounded implementation surface, no inline answer supplied |
| `.specify/`, `.github/skills/speckit-*`, `specs/` | Optional live-generated paths only | Inspect actual generated files; not destinations for the reference-copy route |

### Exact 14-file source-to-destination map

Every source below already contains complete file contents. This map is shared by all preparation
routes: guided assembly uses it as the content reference, copy uses each entire source, and the
helper applies the same destinations. Preserve the original source and `provenance.json`. For existing
destinations, compare with the original source or an available staged copy; never overwrite learner work.
No file comes from the legacy `examples-v1` Lab 09 payload.

| Complete existing source | Consumer destination | What to inspect |
| --- | --- | --- |
| `workshop/spec-kit-reference/README.md` | `workshop/artifacts/spec-kit-reference/README.md` | Reference-only and safe-copy boundaries |
| `workshop/spec-kit-reference/constitution.md` | `workshop/artifacts/spec-kit-reference/constitution.md` | Approval, test-first, fixture, privacy, and scope principles |
| `workshop/spec-kit-reference/checkpoint-template.md` | `workshop/artifacts/spec-kit-reference/checkpoint-template.md` | Unfilled source template; leave this copy as a template |
| `workshop/spec-kit-reference/001-team-filter/spec.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/spec.md` | FR-001–FR-011, SC-001–SC-005, and clarification decisions |
| `workshop/spec-kit-reference/001-team-filter/plan.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/plan.md` | Bounded TypeScript design and constitution checks |
| `workshop/spec-kit-reference/001-team-filter/research.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/research.md` | Exact-match and compatible ordering decisions |
| `workshop/spec-kit-reference/001-team-filter/data-model.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/data-model.md` | No new state; normalization, filtering, and pre-limit total |
| `workshop/spec-kit-reference/001-team-filter/contracts/user-search.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/contracts/user-search.md` | Exact status, shape, dedicated team error, and compatibility |
| `workshop/spec-kit-reference/001-team-filter/quickstart.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/quickstart.md` | Named red/green commands and expected behavior, not actual results |
| `workshop/spec-kit-reference/001-team-filter/tasks.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/tasks.md` | T001–T009 order; reconcile already-shipped setup before acting |
| `workshop/spec-kit-reference/001-team-filter/checklists/requirements.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/checklists/requirements.md` | Reference specification-quality review; checked items are not learner approval |
| `workshop/spec-kit-reference/001-team-filter/checklists/api.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/checklists/api.md` | Reviewer-owned CHK001–CHK009 pre-implementation gate |
| `workshop/spec-kit-reference/001-team-filter/analysis.md` | `workshop/artifacts/spec-kit-reference/001-team-filter/analysis.md` | Reference coverage/findings to re-evaluate in this workspace |
| `workshop/spec-kit-reference/001-team-filter/provenance.json` | `workshop/artifacts/spec-kit-reference/001-team-filter/provenance.json` | Preparation version/commands and `learnerEvidence: false` |

The same fourteen relative names appear under `.lab-references/09-spec-kit-reference/` after
staging. For example, compare
`.lab-references/09-spec-kit-reference/001-team-filter/spec.md` with
`workshop/artifacts/spec-kit-reference/001-team-filter/spec.md`. Record intentional working-copy
differences instead of treating every difference as corruption.

## Fast-forward from an earlier lab

**Optional prerequisite shortcut, not a fourth required authoring route.** Use the bootstrap when
you want to preserve the current author workspace and create a separate
consumer where the reviewed Lab 07 solution already passes. This is an **explicit shortcut choice**,
not evidence that your own toolkit implemented Lab 07. The apply command makes a local preservation
commit: review the preview and authorize that side effect before running it.

```sh
npm run lab:09:bootstrap -- --preview --destination ../user-search-lab-09
npm run lab:09:bootstrap -- --apply --destination ../user-search-lab-09
cd ../user-search-lab-09
npm ci
npm run verify:solution
```

- Preview is read-only.
- Apply preserves staged, unstaged, deleted, and untracked files in a new local backup branch and
  local commit before creating the sibling consumer.
- Review the preview before applying. The preservation commit includes every listed non-ignored
  untracked file; remove credentials or unrelated sensitive files before continuing.
- Use `--backup-branch workshop/my-lab-backup` to select the local preservation branch name.
- The generated consumer has no remote and uses local branch `workshop/lab-09-ready`.
- The bootstrap uses current local `origin/main` or `main` for Lab 09 support and verifies the pinned
  `solution-v2` release before copying its Lab 07 implementation and tests.
- It does not install packages, push, run Spec Kit, or change the original participant branch.
- Inspect the reported backup branch and consumer commit. Do not delete the backup until you have
  confirmed all earlier work is recoverable.
- After the prerequisite is ready, prepare the packet using your chosen route. The shortcut does not
  require using the helper if you selected manual assembly or copying complete sources.

## Shared workflow

Follow these steps with the packet prepared by your chosen route. The optional bootstrap and live
Spec Kit walkthrough are not prerequisites when the current consumer already passes Lab 07.

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, and
   `docs/reference/contract.md`. Inspect `git status --short`, `git branch --show-current`, and
   `git rev-parse HEAD`. Run `npm run verify:solution`; stop if the original acceptance is not green.
   A 501 failure is a missing Lab 07 prerequisite, not an acceptable team-filter red result.
2. Inspect `package.json` and **the existing**
   `tests/team-filter/team-filter.test.ts` before planning changes. The current repository already
   provides both dedicated npm scripts and the complete focused test file. T001/T002 describe
   setup done when the reference was prepared; they are not an instruction to duplicate files,
   overwrite tests, or edit scripts that already work.
3. Confirm every destination in the fourteen-file map is present from your chosen route. Compare
   any deliberate working-copy changes with the bundled sources; do not repeat another preparation
   route. The no-install workflow needs no `.specify/` directory, slash-command discovery, or download.
4. Read `workshop/artifacts/spec-kit-reference/README.md`, then
   `001-team-filter/provenance.json`. The observed preparation version is **1.0.6** and
   `learnerEvidence` is **false**. Preserve that history; do not change it to imply you generated
   these files. References to `/specs/001-team-filter/` in the snapshot describe its preparation
   layout, not your current working-copy location.
5. Read `constitution.md`, `001-team-filter/spec.md`, and
   `001-team-filter/contracts/user-search.md`. Use the clarification prompt below. Inspect
   singleton cardinality, trim/case/exact match, blank/unknown values, duplicate errors,
   `q`/`team` composition, order/total/limit, fixture preservation, and bounded logs.
   Record any unresolved behavior explicitly; do not let the implementer silently choose a contract.
6. Create the learner checkpoint at **`workshop/artifacts/spec-kit-checkpoint.md`** using
   `checkpoint-template.md` as the source structure or the initialized block below. Keep the
   fourteen-file packet's template unfilled. This separate checkpoint is the path named by T007;
   it is where real clarification decisions and later approval go.
7. Inspect `001-team-filter/checklists/requirements.md`. Its checked boxes are a reference review,
   not your execution evidence. Ask an independent reviewer to assess
   `001-team-filter/checklists/api.md` against the current spec and addendum using the checklist
   prompt. A reviewer marks CHK001–CHK009 only after the linked English requirement is complete,
   clear, consistent, and measurable; a checkbox does not mean code works. Resolve blocking
   findings before requesting implementation approval.
8. Read `001-team-filter/research.md`, `data-model.md`, `plan.md`, and `quickstart.md` in that order.
   Confirm dependency-neutral design, no fixture changes, and the full prior acceptance gate.
   In this lab the quickstart's mention of 501 is not permission to skip the Lab 07 prerequisite.
   Send the planning prompt to reconcile these inputs with actual source and existing tests.
9. Review `001-team-filter/tasks.md` and `analysis.md` last. Map FR-001–FR-011 and SC-001–SC-005 to
   actual tests and T001–T009; do not copy the snapshot's “no blocking findings” conclusion.
   Record T001 as **already present, inspected** only after checking both scripts, and T002 likewise
   only after reviewing test coverage. Identify any needed test additions separately before editing.
   In particular, inspect whether `team=platform&limit=1` asserts **total 2**: the shipped combined
   `q=lee` case has only one match and does not independently prove pre-limit team totals.
10. Run `npm run test:team-filter` before source edits. Record expected behavioral failures because
    the completed Lab 07 implementation ignores `team`; some compatibility cases may already pass.
    Unexpected compilation failures are setup problems, and an all-green suite requires checking
    whether the feature was already implemented—not manufacturing a red result.
11. Have the human review the reconciled plan, clarification decisions, requirements checklist,
    remaining analysis findings, and red evidence. Record approval in
    `workshop/artifacts/spec-kit-checkpoint.md` and only then send the separate approval message.
    Use the separate Lab 09 session, or a role whose revised Lab 09 scope was explicitly reviewed
    and approved; the unchanged Lab 06 implementer is not eligible. Keep source edits to
    `src/api/search.ts`. Treat `tests/team-filter/team-filter.test.ts` as inspect/run scope unless
    the approved plan names the exact missing-coverage additions. A missing script in an older consumer needs a revised
    plan/approval or a current consumer, not an unannounced scope expansion.
12. Send the implementation request only after approval. Add any approved coverage first, preserve
    all existing assertions, and make the smallest compatible team-filter change. Do not add
    persistence, dependencies, a team registry, or completed source from a solution branch.
13. Run `npm run test:team-filter`, `npm run verify:speckit-solution`, and the exercise check below.
    Review `git diff` and the captured access-event assertions without saving query values or
    payloads. Reconcile all task/requirement statuses with the final prompt.
14. Update the learner checkpoint and `.lab-evidence/09-spec-kit.md`. For the artifact-guided
    route, leave the reference task list intact and record real T001–T009 statuses in the
    checkpoint. This preserves the complete reference task format checked by static validation;
    unchecked reference boxes are not your final task status. Live generated tasks are reconciled
    in their actual generated location. Declare completion only when evidence supports it.

## Shared checkpoints and evidence

Every route creates these two learner records as part of the shared workflow. The fourteen-file
packet alone does not create them and its sample conclusions cannot fill in actual observations.

For learner evidence, use the same field structure as
`workshop/spec-kit-reference/checkpoint-template.md`, initialized to honest states below. It is a
**separate file**, not a fifteenth source packet file. If it exists, merge fields rather than
overwriting actual decisions/results.

**File:** `workshop/artifacts/spec-kit-checkpoint.md` (create; consumer).

```markdown
# Lab 09 Spec Kit checkpoint

- Workspace/ref: not recorded.
- Path: artifact-guided; live Spec Kit not run.
- Spec Kit version/source, if run: not run; reference preparation provenance is not learner execution.
- Artifact directory reviewed: workshop/artifacts/spec-kit-reference/; review not completed.
- Clarifications approved: not approved.
- Requirements checklist reviewer/result: not reviewed.
- Analysis findings and resolutions: not evaluated in this workspace.
- Implementation approval: not approved; copying artifacts grants no permission.
- Session/role scope: separate artifact-guided Lab 09 session not yet established; Lab 06 implementer scope does not apply.
- Team-filter test scope: inspect/run only unless exact additions are named in an approved plan.
- Red test command/result: npm run test:team-filter — not run.
- Green test command/result: npm run test:team-filter — not run.
- Full verification command/result: npm run verify:speckit-solution — not run.
- Convergence result or remaining tasks: not reconciled.
- Files changed: not inspected.
- Privacy/log review: not inspected.

## Existing setup and task reconciliation

| Task | Actual workspace status and evidence |
| --- | --- |
| T001 | Not inspected: check package.json for the two already-shipped scripts before any edit. |
| T002 | Not inspected: read and run tests/team-filter/team-filter.test.ts; any missing-coverage additions require exact plan approval. |
| T003 | Not run: establish expected team-filter behavioral failures after the Lab 07 gate passes. |
| T004 | Not approved: singleton-team validation work. |
| T005 | Not approved: composed filter and pre-limit total work. |
| T006 | Not run: focused and full verification. |
| T007 | Checkpoint created; actual execution evidence not yet complete. |
| T008 | Not inspected: diff scope and bounded access-event assertions. |
| T009 | Not reconciled: requirement/task coverage and remaining work. |

## Requirement reconciliation

- FR-001–FR-005 parameter behavior and error evidence: not mapped to actual results.
- FR-006–FR-008 composition, pre-limit totals, and compatibility evidence: not mapped to actual results.
- FR-009–FR-010 fixture and privacy evidence: not mapped to actual results.
- FR-011 test coverage and SC-001–SC-005 success criteria: not mapped to actual results.
- Reviewer-owned CHK001–CHK009 decisions: not reviewed.
- Approval scope and blocking findings: no implementation approval recorded.

Do not copy results from the reference packet. Record only commands and outcomes actually observed
in this workspace. Use safe summaries, never names, query text, query-bearing URLs, or payloads.
```

**File:** `.lab-evidence/09-spec-kit.md` (create; consumer).

```markdown
# Lab 09 — private route and execution evidence

## Workspace and route

- Consumer root / branch / commit / existing changes: not inspected.
- Client and exact build: not recorded.
- Route: artifact-guided; no Spec Kit installation or generator execution claimed.
- Lab 07 prerequisite npm run verify:solution exit: not run.
- Optional bootstrap choice / preservation commit / consumer ref: not used.

## Artifact provenance and review

- Source: workshop/spec-kit-reference/; fourteen-file comparison not completed.
- Working packet: workshop/artifacts/spec-kit-reference/; copy not yet observed.
- Reference preparation version: inspect 001-team-filter/provenance.json; not learner evidence.
- Preview / stage / apply commands and actual results: not run.
- Collisions / preserved learner changes / intentional packet edits: not inspected.
- Clarification request and decisions: not observed.
- Independent requirements-checklist review and findings: not observed.
- Reconciled plan / T001 and T002 existing setup inspection: not completed.
- Human approval: not recorded.
- Separate Lab 09 session or explicitly reviewed/approved revised role and tools: not inspected.
- Exact approved test additions, if any: none; existing team-filter tests are inspect/run scope.
- Durable checkpoint: workshop/artifacts/spec-kit-checkpoint.md.

## Commands and review

| Command | Exit and safe summary |
| --- | --- |
| npm run test:team-filter (before implementation) | not run |
| npm run test:team-filter (after implementation) | not run |
| npm run verify:speckit-solution | not run |
| npm run verify:exercise -- --step 09-spec-kit | not run |

- Approved implementation invocation / changed files: not observed.
- Diff / preserved acceptance / fixture / bounded logs review: not inspected.
- FR/SC/T reconciliation and unresolved gaps: not completed.
- Completion: not established.

## Optional live route — leave unclaimed unless actually used

- Installation/initialization approval: not requested.
- Actual specify version and distribution/source: not run.
- Initialization command and generated paths: not run.
- Native generated-skill discovery / manual fallback / actual invocations: not observed.
- Generated feature directory, distinct from reference-copy directory: not observed.
- Live implement approval / convergence and remaining tasks: not run.

Keep this file private. Do not log names, query text, query-bearing URLs, payloads, or unredacted
diagnostics. Reference checkmarks, analysis conclusions, and generator commands are not your results.
```

## Try it

Use these requests in order. The artifact-guided route uses ordinary read-only file context, not
unverified slash commands. Keep the checkpoint updated from actual human decisions and observed results.
Use a fresh Lab 09 context with no inherited Lab 06 implementer selection. The implementation
request below is not a way to override a role's narrower scope. If retaining a custom role, review
and approve its updated Lab 09 scope separately before sending these requests.

1. **Clarification — no edits or implicit decisions.**

   ```text
   Read workshop/task-brief.md, docs/reference/contract.md, and the constitution.md,
   001-team-filter/spec.md, and 001-team-filter/contracts/user-search.md files under
   workshop/artifacts/spec-kit-reference/. Review team cardinality, normalized exact
   matching, blank/unknown/repeated values, composition, totals, and privacy.
   Separate explicit decisions from unresolved cases, including competing invalid parameters.
   Cite the governing requirement for each answer; do not silently invent precedence.
   Return clarification questions and recommended resolutions for human review.
   Read-only: no artifact, source, or test edits; stop for decisions, not implementation.
   ```

2. **Independent requirements review — “unit tests for English.”** Provide the human's
   clarification decisions before sending this request.

   ```text
   Review requirements only. Read workshop/artifacts/spec-kit-checkpoint.md and the
   spec.md, contracts/user-search.md, checklists/requirements.md, and checklists/api.md
   under workshop/artifacts/spec-kit-reference/001-team-filter/. Assess CHK001–CHK009
   for completeness, clarity, consistency, and measurability. Return each item, its cited
   requirement, verdict, and blocking gap. Reference checkmarks are not our approval.
   Do not edit, mark boxes automatically, claim implementation completion, or approve code work.
   ```

3. **Planning — reconcile the snapshot with the existing workspace.**

   ```text
   Plan only. Read workshop/artifacts/spec-kit-checkpoint.md and the full working packet
   under workshop/artifacts/spec-kit-reference/, especially research.md, data-model.md,
   plan.md, quickstart.md, tasks.md, and analysis.md within 001-team-filter/.
   Inspect package.json, src/api/search.ts, tests/search/search.test.ts, and
   tests/team-filter/team-filter.test.ts. T001/T002 setup already ships: identify existing
   scripts/tests and gaps rather than repeat setup. Map FR-001–FR-011 and SC-001–SC-005 to
   checks and T001–T009. Evaluate pre-limit team-total coverage independently.
   Treat the existing team-filter test file as inspect/run scope; name any exact proposed
   coverage additions separately for approval. Plan for this separate Lab 09 session,
   not the unchanged Lab 06 implementer role.
   Return a bounded test-first plan, exact commands, unresolved questions, and edit scope.
   Preserve old acceptance, fixtures, dependencies, and bounded logs. Do not edit.
   Stop for human approval after checklist and analysis review.
   ```

4. **Human approval — only after requirements review, a reconciled plan, and expected red evidence.**
   If another file is needed, revise the plan first rather than treating this as broad approval.

   ```text
   I reviewed the clarification decisions, reviewer-owned checklist, analysis findings,
   expected red test evidence, and the immediately preceding bounded team-filter plan.
   I approve one implementer in this separate Lab 09 session to edit src/api/search.ts.
   tests/team-filter/team-filter.test.ts is inspect/run scope except for the exact coverage
   additions explicitly named in this approved plan; no blanket test-file edits are approved.
   This does not expand the Lab 06 implementer role. Existing package scripts need no changes.
   Preserve every prior assertion, fixture record/order, endpoint, exact error contract,
   and bounded log shape. No dependencies, installs, commits, or remote actions.
   Stop for a revised plan if any unresolved decision or broader scope is required.
   ```

5. **Implementation — send only after that recorded human approval.**

   ```text
   In this separate Lab 09 session, carry out the recorded human-approved team-filter plan using
   workshop/artifacts/spec-kit-checkpoint.md and the reviewed working packet.
   Do not use the unchanged Lab 06 implementer role or override a narrower selected role.
   Inspect and run tests/team-filter/team-filter.test.ts; edit it only for exact coverage
   additions named in the approved plan. Preserve all existing assertions. Add approved coverage first;
   confirm the expected red behavior before source changes. Implement the bounded feature.
   Run npm run test:team-filter and npm run verify:speckit-solution. Report actual exits,
   changed files, and remaining gaps. Do not expand scope or rewrite reference provenance.
   ```

6. **Reconciliation — not a fabricated convergence run.**

   ```text
   Review the current diff, actual test results, workshop/artifacts/spec-kit-checkpoint.md,
   and the spec/tasks/analysis under workshop/artifacts/spec-kit-reference/001-team-filter/.
   Reconcile every FR-001–FR-011, SC-001–SC-005, and T001–T009 against actual evidence.
   Identify already-shipped setup separately from learner changes, checks not run, blocking
   findings, and justified remaining tasks. Inspect fixture preservation and bounded access
   events without logging values or payloads. Return exact checkpoint updates for the human
   to record; do not edit source or claim Spec Kit ran. Label this artifact-guided unless
   actual live invocation evidence exists.
   ```

Expected observations: clarified decisions precede implementation; checklist findings are resolved
before approval; the plan recognizes existing scripts/tests; behavioral red becomes green without
weakening earlier acceptance; reconciliation identifies actual work rather than copying reference
completion claims.

## Optional: install and run the latest Spec Kit

The no-install route above is complete. Use this route only when local policy allows Python 3.11+,
`uv`, package download, and repository-local generated files. Installing/upgrading a user tool and
initializing files are separate explicit learner choices, **not authorized by following the
artifact-guided route or by approving API implementation**. Check available tooling first; do not
install globally or change personal settings automatically.

```sh
# Installs the latest published specify-cli at the time you run it.
uv tool install specify-cli
specify version

# Existing installations can check and then explicitly upgrade.
specify self check
specify self upgrade
```

Only after reviewing the install/version result and explicitly choosing initialization, from a clean,
reviewed consumer state:

```sh
specify init --here --force --non-interactive --integration copilot --script sh
git status --short
```

- Initialization adds `.specify/` and `.github/skills/speckit-*`. Review every generated path before
  use; `--force` permits merging into this non-empty repository.
- Do **not** broadly ignore `.github/`, `.github/skills/`, `.specify/`, or `specs/`. Those are normal
  project artifacts if you decide to adopt Spec Kit.
- Do not overwrite the workshop’s existing skill or learner-authored files. Stop and compare if a
  generated destination collides.
- Record the actual version and source. These instructions intentionally do not pin a release.
- Record which actual paths were generated. The reference snapshot's
  `specs/001-team-filter/` is not a guarantee that a live run chooses the same feature number/path.
  Do not overwrite `workshop/artifacts/spec-kit-reference/` with live output or vice versa.

Inspect generated skill discovery in your actual client/build first. If unsupported, stay
artifact-guided using the complete prompts above; do not claim that reading a generated skill is
native execution. When supported, run the Copilot skills in order, inspect each result before the
next command, and record actual invocations:

```text
/speckit-constitution Preserve the approved contracts, use test-first approval gates, keep logs free
of query values and names, and make only small reversible changes.

/speckit-specify Add an optional team filter to user search. Preserve all existing search behavior,
the archived fixture, deterministic totals, and privacy-safe logs.

/speckit-clarify Focus on matching semantics, blank and unknown values, repeated parameters, and
composition with q and limit.

/speckit-plan Use the existing TypeScript and Node.js HTTP structure, frozen in-memory fixture, and
node:test harness. Add no dependency or persistence.

/speckit-checklist Create a reviewer-owned API requirements-quality checklist.
/speckit-tasks Include focused tests before implementation and preserve prior verification gates.
/speckit-analyze
```

Review the generated clarification, checklist, plan, tasks, and analysis just as in the primary route.
Reconcile T001/T002 against existing scripts/tests and capture expected red evidence. **Only after
separate human implementation approval** recorded in `workshop/artifacts/spec-kit-checkpoint.md`:

```text
/speckit-implement
/speckit-converge
```

Repeat implement/converge only when convergence appends justified remaining tasks. Do not use
`taskstoissues`; this workshop does not create remote issues.
Inspect each convergence change and obtain approval for any expanded scope; an automatically appended
task is not automatic authorization. Do not claim sample preparation commands were your live run.

## Client steps

### VS Code

1. Open a fresh artifact-guided Lab 09 chat in consumer without selecting the Lab 06
   `workshop-implementer`. Inspect Source Control, run the Lab 07 gate in the integrated terminal, and open
   `package.json` plus `tests/team-filter/team-filter.test.ts` to check existing setup.
2. Use the packet already prepared by your chosen route. Open the files in the shared numbered
   reading order; use the editor's comparison for any intentional working-copy differences.
3. Open `workshop/artifacts/spec-kit-checkpoint.md`. Send the clarification prompt, record reviewed
   decisions, then start an independent reviewer chat for the requirements checklist.
4. Send the planning request with the named packet files. Inspect referenced source/context and
   the no-edit stop, run the focused red command, and record human approval before implementation.
   A normal chat with explicit file context is the primary route; no Spec Kit discovery is required.
5. After implementation, run the focused/full gates and send the reconciliation prompt. Review
   the diff and update `.lab-evidence/09-spec-kit.md` with actual exits and artifact-guided status.
6. For the optional live route, inspect generated `speckit-*` skills and their source indicators;
   refresh/reload the window if needed. Record extension/client version and actual generated paths.
   Review `.specify/`, `specs/`, and generated skill changes separately from feature source.

### Copilot CLI

1. Start a separate artifact-guided Lab 09 session in consumer, not the unchanged Lab 06
   `workshop-implementer` role. Inspect branch/ref/diff, run `npm run verify:solution`, and read `package.json`
   plus the existing focused test file before proposing T001/T002 work.
2. Use the packet already prepared by your chosen route. Supply ordinary file context with the exact
   working paths in the clarification request; this is artifact-guided, not a slash-command invocation.
3. Record reviewed decisions in the checkpoint. Open an independent reviewer context for
   CHK001–CHK009, then use the planning prompt. Inspect the approval stop and actual edit scope.
4. Run the focused red command, record human approval, and send the separate implementation
   request. Capture safe exit summaries for focused/full gates and run reconciliation.
5. Update `.lab-evidence/09-spec-kit.md` with the actual CLI build, command outcomes, and route.
   If using a bounded role, the human executes shell commands the role cannot run.
6. For an explicitly chosen live route, inspect `specify version` and actual generated paths;
   use `/skills reload` and `/skills info` as supported by the installed CLI before invoking
   generated `/speckit-*` skills. A copied packet proves neither discovery nor invocation.

### Copilot app

1. Open a new artifact-guided Lab 09 session in the local consumer project without the Lab 06
   `workshop-implementer` selection. Inspect its working directory, branch/ref, and diff.
   Use the local terminal or human-run command evidence for the Lab 07 gate and packet copy.
2. Open `package.json`, `tests/team-filter/team-filter.test.ts`, and the packet in reading order.
   Send the clarification prompt with explicit file context, then record human decisions.
3. Start a separate requirements-review context, use the checklist prompt, and resolve blocking
   findings before the planning request. App planning controls do not by themselves prove a
   Spec Kit skill was loaded; the primary path is explicitly artifact-guided.
4. Record the focused red result and human approval in the checkpoint before implementing.
   Inspect actual focused/full test results, review the diff, and send the reconciliation prompt.
5. Record app build, actual file reads, outcomes, and remaining gaps in `.lab-evidence/09-spec-kit.md`.
   Treat live generated-skill discovery as a candidate until observed in Customize Skills; refresh
   or reopen the session after initialization. If unavailable, use the supplied manual prompts
   without claiming native `/speckit-*` execution.
6. Keep [Research → Plan → Implement compared with Spec Kit](../reference/spec-kit-vs-built-in.md)
   as a side route; this numbered exercise remains Spec Kit-focused.

## Verify the result

Before implementation, after the Lab 07 solution gate is green, the existing focused suite must be
red for the expected team-filter behavior gap:

```sh
npm run test:team-filter
```

After implementation:

```sh
npm run test:team-filter
npm run verify:speckit-solution
npm run verify:exercise -- --step 09-spec-kit
```

- `verify:speckit-solution` includes the complete Lab 07 solution gate plus the team-filter suite.
- Evidence includes reviewed requirements, explicit implementation approval, the expected red result,
  green focused/full results, diff review, privacy review, and convergence or documented remaining
  tasks.
- `verify:exercise` checks the complete reference packet and its task format. It does not read your
  mind, verify approval, or prove native Spec Kit execution. Preserve the reference task list and
  record actual statuses in `workshop/artifacts/spec-kit-checkpoint.md`, as named by T007.
- When an initial red command fails because tools/dependencies are missing, resolve that setup
  failure first using the existing project instructions; do not call it a behavioral red result.
  If focused tests are already green, inspect prior work and accurately label an existing solution.
- Recovery: preserve learner artifacts, remove only the named reference copy if unwanted, and
  uninstall Spec Kit only through its documented integration/tool commands after reviewing modified
  generated files.
- No inline search or team-filter source answer is supplied. The optional Lab 07 solution walkthrough
  in [Lab 07](07-use-toolkit.md) remains a separate read-only choice; it does not implement this
  feature or establish learner/toolkit evidence.
