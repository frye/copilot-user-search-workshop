# 07 — Use the toolkit to implement search

## Goal and starting workspace

- **Consumer**, after 06: no canonical local skill, exactly one installed **1.1.0** package, MCP configured or fallback disclosed, roles inspected.
- This capstone exercises authored customizations; completing API code alone is not workshop completion.
- Keep this revised guide open from **author** if your pinned consumer has older documentation. All
  commands below run in consumer unless explicitly labeled otherwise.
- Reading the approved contract is not implementation approval. The planner must stop; a human
  approves a specific plan before one implementer changes source or tests.

## Choose your route

Choose **one** way to prepare the readiness checkpoint, then continue with the shared lab.
**Bring in this step** is the first-visit default; selecting a tab does not import files or approve work.

### Build it yourself

1. Create `workshop/artifacts/toolkit-checkpoint.md` in consumer. If it exists, preserve observations
   and merge missing checks. Title it “Toolkit checkpoint — readiness is not implementation approval”
   and leave all new checks unchecked.
2. Add a **Starting state** section with checks for reading `workshop/task-brief.md`,
   `workshop/approved-contract.md`, and `docs/reference/contract.md`; recording consumer root/ref/diff;
   distinguishing fresh 501 from a resumed attempt; no local canonical skill or duplicate
   registration; and observed installed `user-search-toolkit` **1.1.0** provenance.
3. Add **Workflow inputs** checks for repository/API/test instructions, the installed workflow
   and linked checklist, actual role permissions, and both no-argument fixture-tool calls or the
   explicitly labeled `standards/api-conventions.json` and `standards/validation-commands.json`
   fallbacks. Require observed source/version, not invented tool results.
4. Add **Plan and approval** checks for a planner that stops without edits, ownership limited to
   `src/api/search.ts` and `tests/search/search.test.ts`, independent coverage chosen after inspecting
   existing tests, resolved questions, and explicit human approval of one implementer. Include
   `Approval state: not approved. This checklist does not grant permission.`
5. Add **Implementation and independent review** checks for the new test's expected red result,
   unchanged existing assertions/fixtures/endpoints/privacy, actual exits for `npm test`,
   `npm run test:search`, and `npm run verify:solution`, plus independent file/line/contract/
   reproduction review, fixes, rechecks, and separately observed toolkit use.
6. Add **Completion boundary** with `Completion state: not established`, the evidence path
   `.lab-evidence/07-use-toolkit.md`, and remaining unchecked gates. State that `test:stub` is not
   a solution gate and a solution walkthrough does not prove toolkit-produced work.
   Do not run checks or mark completion merely to finish authoring.

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

### Copy-and-paste

Create parent directories if needed. Copy the contents, not the fence or **File** paragraph.
If the checkpoint exists, merge the structure while retaining actual observations and learner
decisions. This complete template intentionally begins **not approved/not run/not observed**.

**File:** `workshop/artifacts/toolkit-checkpoint.md` (create; consumer).

```markdown
# Toolkit checkpoint — readiness is not implementation approval

## Starting state

- [ ] Read workshop/task-brief.md, workshop/approved-contract.md, and docs/reference/contract.md.
- [ ] Recorded consumer root, branch, commit, and existing changes in .lab-evidence/07-use-toolkit.md.
- [ ] Identified a fresh intentional-501 baseline or accurately described a resumed attempt.
- [ ] Confirmed no local .github/skills/api-change-workflow and no duplicate client registration.
- [ ] Observed exactly one installed user-search-toolkit 1.1.0 with source and provenance.

## Workflow inputs

- [ ] Inspected repository instructions and the API/test scoped instructions.
- [ ] Loaded the installed api-change-workflow and its linked review checklist.
- [ ] Inspected actual planner/implementer/reviewer tools; disclosed advisory-only restrictions.
- [ ] Called both read-only fixture tools with no arguments, or labeled both standards-file fallbacks.
- [ ] Recorded returned source/version or actual fallback paths without claiming an unmade call.

## Plan and approval

- [ ] Planner returned a bounded plan and stopped without source/test edits.
- [ ] Plan owns only src/api/search.ts and tests/search/search.test.ts.
- [ ] Compared existing coverage and selected one meaningful independent acceptance case.
- [ ] Resolved all blocking questions before human approval.
- [ ] Recorded explicit approval of this plan and one implementer before implementation.

Approval state: not approved. This checklist does not grant permission.

## Implementation and independent review

- [ ] Added or extended the approved independent test and observed its expected red result.
- [ ] Preserved all prior acceptance assertions, fixture records/order, endpoints, and privacy rules.
- [ ] Ran npm test and recorded its actual exit.
- [ ] Ran npm run test:search and recorded its actual exit.
- [ ] Ran npm run verify:solution and recorded its actual exit.
- [ ] Independent reviewer inspected file/line, contract, reproduction, scope, and privacy evidence.
- [ ] Resolved supported findings and re-ran affected checks without weakening acceptance.
- [ ] Recorded package/workflow use separately from API completion.

## Completion boundary

Completion state: not established.
Evidence: .lab-evidence/07-use-toolkit.md.
Remaining work: complete unchecked gates or record why a gate is blocked.
Do not run starter-only test:stub as a solution gate.
Do not claim solution walkthrough output as a toolkit-produced implementation.
```

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/07-use-toolkit/).
- **Toolkit checkpoint only**, not implementation. Follow author 01–05, install 1.1.0, then consumer 05–06 if joining here.
- Read-only local alternative: `git show examples-v1:examples/steps/07-use-toolkit/files/toolkit-checkpoint.md`.
  Compare its readiness structure with your file; it is not a record of your execution.

#### Preview, stage, and apply

1. Preview the checkpoint destination and inspect the proposed change.
2. Stage the reference for comparison; preserve an existing staged reference instead of overwriting it.
3. Apply only after reviewing the preview and resolving conflicts without discarding learner work.

```sh
# CONSUMER; import readiness checklist only
npm run lab:example -- --step 07-use-toolkit --preview
npm run lab:example -- --step 07-use-toolkit --stage
npm run lab:example -- --step 07-use-toolkit --apply
```

#### If you already changed these files

- Keep your checklist/evidence; stage and compare. Never merge the examples branch or overwrite an attempted implementation.
- Ordinary importer cannot write `src` or fetch a solution. [Conflict and checkpoint rules](../reference/examples.md).
- Inline copies and personalized checklists may correctly cause an importer conflict. Keep them,
  compare the staged reference, and merge only useful structure. Never force an overwrite.

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

## Continue with this lab

All routes join here with `workshop/artifacts/toolkit-checkpoint.md` prepared, not completed.
Preserve learner work and fixture users. Never log names, query text, query-bearing URLs, or payloads.
No route grants implementation, installation, commit, or remote-action approval. Planning must stop
for a human decision before one implementer changes the two approved source/test surfaces.

## Artifact inventory

| Path | Action and owner | Purpose |
| --- | --- | --- |
| `workshop/artifacts/toolkit-checkpoint.md` | Create or merge in consumer | Readiness, approval, and completion checklist |
| `.lab-evidence/07-use-toolkit.md` | Create, then update privately in consumer | Actual source/version, invocation, command, and review observations |
| `src/api/search.ts` | Inspect; edit in consumer only after approval | Focused implementation surface, not an inline answer |
| `tests/search/search.test.ts` | Inspect; extend in consumer only after approval | Preserve every existing assertion and add independent coverage |
| `.github/agents/workshop-planner.agent.md`, `.github/agents/workshop-implementer.agent.md`, `.github/agents/workshop-reviewer.agent.md` | Inspect existing consumer roles | Confirm each role's actual permissions before selection |

The installed `skills/api-change-workflow/SKILL.md` and its
`references/review-checklist.md` are read-only package inputs. Never edit packaged copies or add a
duplicate `.github/skills/api-change-workflow/` in consumer.

## Shared evidence setup

Every route uses this private journal. Create it before executing the shared workflow; if it already
exists, merge fields and preserve actual observations rather than replacing them with initial states.

**File:** `.lab-evidence/07-use-toolkit.md` (create; consumer).

```markdown
# Lab 07 — private execution evidence

## Workspace and starting state

- Consumer root / branch / commit: not recorded.
- Client and exact build: not recorded.
- Existing changes / fresh or resumed attempt: not inspected.
- Search baseline command / exit / reason: not run.

## Loaded inputs

- Instruction and scoped-file inclusion: not observed.
- Installed workflow and linked checklist source: not observed.
- Toolkit version / sourceChecksum / sourceCommit / sourceDirty: not observed.
- Local canonical skill absence / duplicate registration check: not inspected.
- Role permissions and enforcement versus advisory limitations: not inspected.
- get_api_conventions call / source / version: not observed.
- get_validation_commands call / source / version: not observed.
- File fallback, if used, with exact paths and reason: not used.

## Approval and coverage

- Planner invocation / plan summary / approval stop: not observed.
- Existing test comparison and independent case selected: not inspected.
- Human approval and owned files: not approved.
- Implementer invocation: not observed.

## Commands

| Command | Workspace | Exit and safe summary |
| --- | --- | --- |
| npm run test:search (new test before source edit) | consumer | not run |
| npm test | consumer | not run |
| npm run test:search (after implementation) | consumer | not run |
| npm run verify:solution | consumer | not run |
| npm run verify:exercise -- --step 07-use-toolkit | consumer | not run |

## Independent review and completion

- Reviewer context / invocation / loaded source: not observed.
- Supported finding: file/line, contract requirement, reproduction, impact: not recorded.
- Fix and recheck result, or reason no supported findings remain: not established.
- Diff scope / fixture preservation / bounded access-event review: not inspected.
- Runtime capstone completion: not established.
- Toolkit-use evidence complete: not established.
- Remaining gaps and next safe action: inspect readiness gates before requesting implementation.

Record only actual observations. Do not store names, query text, query-bearing URLs, payloads,
or unredacted test diagnostics. Keep this journal private; sample output is not execution evidence.
```

## Shared workflow

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, and
   `docs/reference/contract.md` in consumer. Inspect `git status --short`,
   `git branch --show-current`, and `git rev-parse HEAD`. Preserve all existing changes. If this is a
   resumed attempt, record that fact instead of claiming a fresh 501 baseline.
2. Open the checkpoint prepared by your chosen route; do not pre-check entries. In a fresh attempt,
   run `npm run test:search` and confirm that the failure is the intentional 501, not a
   build/dependency failure. Save only a privacy-safe result summary.
3. Inspect the installed package's `plugin.json`, `provenance.json`, and discovery source. Confirm
   exactly one `user-search-toolkit` at **1.1.0**, and no local canonical skill. Record the real
   `sourceChecksum`, `sourceCommit`, and `sourceDirty` values; these are provenance, not test results.
4. Select the planner from Lab 06. Inspect repository instructions, API/test scoped instructions,
   the installed workflow, and its review checklist. Confirm `get_api_conventions` and
   `get_validation_commands` are available **to this role**, not merely connected globally.
   Use the exact discovered IDs as explained in [Lab 06](06-agent-roles.md); request both with `{}`.
   If unavailable or denied, read `standards/api-conventions.json` and
   `standards/validation-commands.json`, explicitly label **file fallback**, and do not invent calls.
5. Send the planning request in **Try it**. Inspect its questions, file scope, tests, and approval
   stop. If it starts editing, stop the action and preserve/review the unexpected diff; role prose
   alone does not enforce read-only access.
6. Require a concrete new acceptance case in `tests/search/search.test.ts`: request
   `?unused=1&q=LEE&limit=2` and assert 200, exactly the first two matching ordinal IDs
   `u-001` and `u-002`, total **3**, and a bounded `{ route: "search", status: 200 }` access event.
   First compare the existing test names and assertions. The shipped base suite has no combined
   unknown-key/mixed-case/limit-2 case; document which behavior this adds rather than renaming an
   existing test. If your suite already covers it, extend the case to repeated unknown keys
   `?unused=1&unused=2&q=LEE&limit=2` and prove they remain ignored. Do not duplicate an equivalent
   existing assertion and call it independent coverage.
7. Review the plan yourself. Resolve questions and record the approved scope in the checkpoint
   and evidence. Only then send the separate approval message. Use **one** implementer for
   `src/api/search.ts` and `tests/search/search.test.ts`; no shared writable agent scope.
8. Let the implementer add the approved test, demonstrate its expected red result, implement the
   smallest change, and run `npm test`, `npm run test:search`, and `npm run verify:solution`.
   Do not weaken tests, mutate fixtures, change dependencies, or implement the optional team filter.
9. In an independent reviewer context, provide the contract, current diff, test evidence, and the
   reviewer request below. The human runs checks when the reviewer lacks execution permission.
   Fix supported defects inside the approved scope and re-run the affected checks; scope expansion
   requires a new plan and approval.
10. Update `.lab-evidence/07-use-toolkit.md` and mark checklist entries only from observations.
    A green API with no observed installed-workflow use is incomplete toolkit evidence.

## Try it

1. **Planner request — read-only; no approval embedded.** Use this after checking installed-source
   discovery. Keep the request short so the reusable workflow supplies the process.

   ```text
   Use the installed api-change-workflow to plan the approved search contract in
   workshop/approved-contract.md and docs/reference/contract.md. Read the existing
   src/api/search.ts and tests/search/search.test.ts. Propose only those two edit surfaces
   and the independent acceptance case from Lab 07. Identify loaded workflow/checklist
   source and both fixture-tool results, or label the standards-file fallback.
   Return questions, test-first steps, exact checks, and risks. Do not edit. Stop for approval.
   ```

2. **Human approval — send only after reviewing the returned plan and recording the decision.**
   If the plan differs from the two-file scope, revise it first; this text does not approve that
   broader plan.

   ```text
   I reviewed and approve the immediately preceding two-file search plan and its independent
   acceptance case. One implementer may edit only src/api/search.ts and
   tests/search/search.test.ts. Preserve all prior assertions, fixtures, endpoints, and
   bounded logs. Run npm test, npm run test:search, and npm run verify:solution.
   Stop and request a revised plan if the scope must expand. No installs, commits, or remote actions.
   ```

3. **Implementer request — separate from planning and valid only after that human approval.**

   ```text
   Use the installed api-change-workflow to carry out the recorded, human-approved two-file
   search plan. Add the approved independent acceptance case first and confirm its expected
   red result, then implement. Preserve existing tests. Report changed files and actual exits
   for npm test, npm run test:search, and npm run verify:solution. Do not expand scope.
   ```

4. **Independent reviewer request — new reviewer context, not the implementer's self-review.**

   ```text
   Review only; do not edit. Read workshop/approved-contract.md, docs/reference/contract.md,
   the installed api-change-workflow checklist, the current diff in src/api/search.ts and
   tests/search/search.test.ts, and .lab-evidence/07-use-toolkit.md. For each supported
   finding give file/line, contract requirement, reproduction, and impact. Check independent
   test coverage, pre-limit totals, fixture preservation, and bounded access events.
   Separate observed command results from assertions and unknowns. Do not claim a check ran
   if it did not; request human execution when your role cannot execute.
   ```

Expected observations: planning stops before edits; the implementer uses the approved scope;
acceptance changes from expected red to green; the reviewer cites evidence rather than declaring
success from a checkpoint alone. A discrepancy is a learning result—record it and correct the
specific instruction, role permission, or implementation rather than fabricating a successful run.

## Client steps

### VS Code

1. Open the **consumer** folder. Open `workshop/artifacts/toolkit-checkpoint.md`,
   `src/api/search.ts`, and `tests/search/search.test.ts`; inspect Source Control before any edits.
2. Inspect the single 1.1.0 plugin registration and native skill source. Reload the consumer window
   if discovery is stale. Inspect the selected planner's tools and both fixture-tool calls.
3. Select `workshop-planner`, send the planner request, and check source/context indicators.
   If a role file is not natively discovered, paste its body as manual context and disclose that
   permissions are advisory; do not claim a native role selection.
4. Review and record approval, select one implementer, and send the implementer request. Inspect
   terminal exits for the exact three solution commands rather than accepting an agent's summary.
5. Start a separate reviewer chat using `workshop-reviewer`, send the reviewer request, and inspect
   the diff. Update `.lab-evidence/07-use-toolkit.md` with native versus manual observations.
   Canonical package changes still belong in author, not this workspace.

### Copilot CLI

1. Start the CLI from consumer; run `copilot plugin list --json`, then use `/skills reload` and
   `/skills info` in the interactive session. Inspect the real 1.1.0 path/version and absence of a
   local duplicate; these commands do not authorize installation.
2. Select the bounded planner using your build's role selector. Inspect exact tool IDs and request
   both fixture tools with `{}`. If unsupported, use the role-file manual context and labeled
   standards-file fallback; never report native discovery or enforced read-only access from prose.
3. Send the planning request, inspect the stop, and record the human decision. Only after approval
   hand the plan to one implementer with the supplied implementation request.
4. Run/inspect the three exact solution checks, recording actual exits and safe summaries.
   Open a separate reviewer context and send the reviewer request.
5. Update `.lab-evidence/07-use-toolkit.md` with CLI build, role/source evidence, and remaining gaps.

### Copilot app

1. Open a local **consumer** project/session. In Customize Plugins/Skills inspect the bridge-loaded
   1.1.0 source/version; reopen/refresh the session after a registration change.
2. Inspect the agent picker and actual permissions, then Customize MCP and the selected role's
   access to both tools. If role discovery is unavailable, read/paste the role body as explicitly
   manual, advisory context.
3. Send the planning request and inspect the approval stop. Record human approval before selecting
   one implementer and sending its request. Do not assume the app's plan control proves toolkit use.
4. Inspect actual local test exits, then start a new reviewer context with the reviewer request.
   Record app build, observed calls/fallbacks, and file scope in `.lab-evidence/07-use-toolkit.md`.
5. If the plugin bridge cannot load, finish the runtime capstone in CLI/VS Code or label this app
   route incomplete. Reading package text manually is a walkthrough, not installed-skill evidence.
   Never silently substitute local skill copying.

## Verify the result

- `npm run verify:solution` must pass. Do not run starter-only `test:stub` as a completion gate.
- `npm run verify:exercise -- --step 07-use-toolkit` checks readiness artifact, not actual completion.
- Completion also requires one independent acceptance case, preserved original tests and fixture,
  privacy/diff review, explicit approval, observed installed workflow source/version, real MCP calls
  or disclosed fallback, and independent reviewer evidence.
- Recovery: preserve failing diff and test output, fix the implementation without weakening existing acceptance.
  Store only safe summaries in the journal; do not save raw query-bearing assertion diagnostics.

## Explicit solution walkthrough (only after attempt or deliberate choice)

```sh
git show solution-v2:src/api/search.ts
git diff starter-v2 solution-v2 -- src/api/search.ts tests/search
```

- Read-only local inspection; no merge/checkout/import into main. For full validation create a disposable worktree at `solution-v2`, install dependencies there and run `verify:solution`.
- A walkthrough is not evidence that your own toolkit produced the change.
- Next: [08 — Review and handoff](08-review-and-handoff.md).
