# 08 — Review, improve, and carry context forward

Evidence-backed review checks a concrete change against requirements and a reproducible result,
while a continuation brief carries the essential context into a fresh session. Together, they make
findings actionable, feed improvements back into the reusable toolkit, and reduce repeated
investigation without relying on a long chat history.

**Documentation:** [Custom agents and handoffs in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents) and [Manage agent sessions in VS Code](https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions).

## Goal and starting workspace

- **Consumer**, after a 07 attempt; preserve real implementation/ref/results, even if incomplete.
- Review a concrete defect and improve the reusable toolkit based on evidence.
- The review fixture is deliberately wrong and stays outside the API. A successful probe means
  **defect detected**, not “search is correct.”
- The package improvement happens in **author**; review, consumer registration, and handoff happen
  in **consumer**. Keep this revised guide open from author if your consumer uses the pinned guide.

## Choose your route

Choose **one** way to prepare the four initial consumer review files.
**Bring in this step** is the first-visit default; selecting a tab runs nothing.
All routes continue to the same first review, then the evidence-driven 1.2.0 improvement.

### Build it yourself

1. Create `workshop/artifacts/review/total-after-limit.mjs` in consumer. Export
   `faultyWindow(matches, limit)`: assign `matches.slice(0, limit)` to `items`, then return an object
   containing `items` and the intentionally wrong `total: items.length`. Add a comment identifying
   the teaching defect and forbidding application imports. Do not implement or fix API source.
2. Create `workshop/artifacts/review/probe.mjs`. Import strict assertions from `node:assert/strict`
   and `faultyWindow` from `./total-after-limit.mjs`. Call it with three objects whose IDs are
   `u-001`, `u-002`, and `u-003`, at limit 1. Assert item count 1, total 1, and total not equal to 3.
   Print a diagnostic saying the deliberate defect was detected and the approved total is 3.
   Explicitly say this probe is not API acceptance; never print input values or payloads.
3. Create `workshop/artifacts/review/review-rubric.md` with **Authoritative requirement**,
   **Teaching fixture and reproduction**, **Required finding**, **Review quality**, and
   **Improvement and follow-through** sections. Link `../../approved-contract.md` and
   `../../../docs/reference/contract.md`; require total before limit. Name
   `node workshop/artifacts/review/probe.mjs` and explain its successful defect-detection meaning.
   Require exact file/line, contract, actual reproduction, observed/expected behavior, impact,
   and a focused API check. Require fixed-match limits 1/2 comparison, honest not-run labels,
   no speculative findings, no fixture edits, and the distinction between local and hosted review.
4. Create `workshop/artifacts/review/continuation-brief.md` with **Goal and current state**,
   **Approval and ownership**, **Results and findings**, **Runtime inputs**, and
   **Next-session boundary** sections. Include consumer root/ref/diff, client/build, contract paths,
   actual approval/scope, probe/solution/exercise commands and exits, findings/fixes, installed
   toolkit source/version/checksum, MCP calls or fallback, role permissions, author update status,
   and pending work. Initialize observations to not recorded/not run/not observed and approval to
   not approved. Require the next session to re-read contract/source/ref and preserve learner work.
5. Keep existing observations if any destination already exists. Prepare only these four files;
   do not update the canonical checklist or package yet. That change must follow the first finding.

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

### Copy-and-paste

Prepare only the four initial files below. For existing learner files, compare before merging;
never replace actual results with the
initial states below. The two JavaScript files are complete teaching artifacts, **not search source**.
The later 1.2.0 update is shared work after the first finding, not part of this preparation route.

**File:** `workshop/artifacts/review/total-after-limit.mjs` (create; consumer).

```javascript
// Deliberate teaching defect, never imported into application source.
export function faultyWindow(matches, limit) {
  const items = matches.slice(0, limit);
  return { items, total: items.length };
}
```

**File:** `workshop/artifacts/review/probe.mjs` (create; consumer).

```javascript
import assert from 'node:assert/strict';
import { faultyWindow } from './total-after-limit.mjs';

const result = faultyWindow([{ id: 'u-001' }, { id: 'u-002' }, { id: 'u-003' }], 1);
assert.equal(result.items.length, 1);
assert.equal(result.total, 1);
assert.notEqual(result.total, 3);
console.log('DELIBERATE DEFECT DETECTED: total is 1 after limiting; approved contract requires 3. This probe is not API acceptance.');
```

**File:** `workshop/artifacts/review/review-rubric.md` (create; consumer).

```markdown
# Review rubric — supported findings, not sample evidence

## Authoritative requirement

Read [the approved search contract](../../approved-contract.md) and
[its canonical specification](../../../docs/reference/contract.md).
The total counts every match before limiting. The contract anchor has one item and total 3.

## Teaching fixture and reproduction

- Inspect total-after-limit.mjs with line numbers.
- Its return expression uses items.length after matches.slice(0, limit).
- Run node workshop/artifacts/review/probe.mjs from the consumer root.
- A successful probe detects the deliberate defect: total 1 instead of the required 3.
- The probe is not an HTTP acceptance test and does not establish API success.
- Do not change the teaching fixture or import it into src/api/search.ts.

## Required finding

1. Exact file and current line number of the defective expression.
2. Authoritative requirement, not a draft or a remembered preference.
3. Reproduction command and whether the reviewer or human actually ran it.
4. Observed behavior versus required behavior, distinguishing observation from inference.
5. Impact: total changes with the display window rather than the full matching set.
6. A focused check that would catch this class of defect in the real API.

## Review quality

- Trace total to the pre-limit collection; never infer correctness from the field name.
- Explain how fixed matches at limits 1 and 2 keep the same expected total.
- Label checks not run and observations not available.
- Avoid speculative performance or security findings without supporting evidence.
- Preserve source, fixture, and test ownership; review does not authorize edits.
- Treat shell-enabled roles as advisory-only, not enforced read-only.
- Keep local review distinct from hosted GitHub Copilot Code Review.

## Improvement and follow-through

Use the supported finding to improve the canonical author checklist, build immutable 1.2.0,
replace only the consumer's lab registration, refresh, and re-invoke the reviewer.
Record real before/after behavior in .lab-evidence/08-review-and-handoff.md.
Do not copy this rubric or a sample finding into the journal as if a client produced it.
```

**File:** `workshop/artifacts/review/continuation-brief.md` (create; consumer).

```markdown
# Continuation brief — verify these facts in the next session

## Goal and current state

- Goal: review the search attempt, improve the reusable checklist, and resume safely.
- Current stage / Lab 07 completion: not established.
- Consumer root / branch / commit: not recorded.
- Client and exact build: not recorded.
- Authoritative inputs: workshop/task-brief.md, workshop/approved-contract.md, docs/reference/contract.md.
- Contract decisions beyond those inputs: none recorded.

## Approval and ownership

- Human-approved plan and scope: no approval recorded here.
- Source/test surfaces to inspect: src/api/search.ts and tests/search/search.test.ts.
- Teaching artifacts: workshop/artifacts/review/total-after-limit.mjs and probe.mjs.
- Canonical checklist changes belong in author; package copies are read-only.
- Changed files / diff summary: not inspected.

## Results and findings

- Probe command: node workshop/artifacts/review/probe.mjs.
- Probe exit / diagnostic: not run. Success means intentional defect detected, not API success.
- npm run verify:solution exit / safe summary: not run.
- npm run verify:exercise -- --step 08-review-and-handoff exit: not run.
- Supported finding with file/line, requirement, reproduction, impact: not recorded.
- Fixes / rechecks / intentional failures / unresolved defects: not established.

## Runtime inputs

- Installed toolkit source / version / checksum: not observed.
- Local canonical skill absent / duplicate registrations checked: not inspected.
- MCP fixture-tool source/version and actual calls, or labeled file fallback: not observed.
- Role permissions / advisory-only limitations: not inspected.
- Author canonical revision / 1.2.0 build / consumer update status: not observed.
- Updated reviewer invocation / changed behavior: not observed.

## Next-session boundary

Re-read the authoritative inputs, current source, current ref, diff, and package/tool evidence.
Compare them with this brief before proposing the next safe action.
Preserve existing work. Ask for a new plan and approval before changing unapproved scope.
Do not treat this brief, reference results, or an earlier conversation as current execution proof.
Do not log names, query text, query-bearing URLs, or payloads.
Remaining work: inspect the unverified fields and record the actual state before continuing.
```

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/08-review-and-handoff/).
- Defect/probe, rubric and unfilled handoff template are complete instructional assets. No sample claims actual review execution.
- Read-only local example: `git show examples-v1:examples/steps/08-review-and-handoff/files/probe.mjs`.
  The pinned payload supplies the four consumer review files; the later 1.2.0 author improvement is
  your evidence-driven extension, not something the consumer importer builds for you.

#### Activate the review artifacts

Run the single command below in consumer. It displays the four-file import plan and applies after
the whole-step safety checks. This does not run the review or update a package. Optional
preview/comparison is available through [safe example operations](../reference/examples.md#optional-inspection-and-comparison).

```sh
# CONSUMER
npm run lab:activate -- --step 08-review-and-handoff
```

[Continue with this lab](#continue-with-this-lab). The other preparation routes are not required.

## Continue with this lab

All routes start shared work with the four consumer review files prepared. Preserve the real Lab 07
attempt and the intentional teaching defect; do not import it into API source. Never log names,
query text, query-bearing URLs, or payloads. Review does not approve API edits or installation.
**First obtain a supported finding; only then improve, build, and register the 1.2.0 toolkit.**
Use the client-specific steps as you reach each shared stage, not as another authoring route.

## Artifact inventory

| Path | Action and owner | Purpose |
| --- | --- | --- |
| `workshop/artifacts/review/total-after-limit.mjs` | Create in consumer | Inert, intentional defect |
| `workshop/artifacts/review/probe.mjs` | Create in consumer | Executable defect-detection probe |
| `workshop/artifacts/review/review-rubric.md` | Create or merge in consumer | Supported-finding criteria |
| `workshop/artifacts/review/continuation-brief.md` | Create, then update in consumer | Durable, honest fresh-session handoff |
| `.lab-evidence/08-review-and-handoff.md` | Create, then update privately in consumer | Review, update, and continuation observations |
| `.github/skills/api-change-workflow/references/review-checklist.md` | Append in author only | Canonical 1.2.0 checklist improvement |
| `toolkit/plugin.json` | Replace the reviewed standard variant or merge named fields in author | Manifest version 1.2.0 |
| `toolkit/catalog.md` | Replace the standard variant or merge named sections in author | 1.2.0 lifecycle and review change |
| `toolkit/dist/user-search-toolkit-1.2.0/plugin.json` | Generate in author; inspect | Packaged manifest |
| `toolkit/dist/user-search-toolkit-1.2.0/provenance.json` | Generate in author; inspect | Builder-owned source/version/checksums |
| `toolkit/dist/user-search-toolkit-1.2.0/skills/api-change-workflow/SKILL.md` | Generate in author; inspect | Existing MCP-aware workflow |
| `toolkit/dist/user-search-toolkit-1.2.0/skills/api-change-workflow/references/review-checklist.md` | Generate in author; inspect | Updated review criteria |
| `.vscode/settings.json` | Advanced VS Code alternative only; update instead of UI installation | Replace only the manual lab's 1.1.0 path with the real 1.2.0 path |

CLI/app registration uses the owning client's controls, not an invented repository settings file.
Do not create or edit package output by hand, and do not copy a canonical skill into consumer.

## Shared evidence setup

Create this private journal before the first review regardless of preparation route. If it exists,
merge fields while preserving actual results. The first-finding and later-update states remain
separate so package changes cannot masquerade as earlier review evidence.

**File:** `.lab-evidence/08-review-and-handoff.md` (create; consumer).

```markdown
# Lab 08 — private review and continuation evidence

## Starting state

- Consumer root / branch / commit / existing diff: not inspected.
- Client and exact build: not recorded.
- Lab 07 actual completion or remaining failures: not established.
- Initial installed toolkit source/version/checksum: not observed.
- Reviewer context / actual permissions: not inspected.

## Initial review

- node workshop/artifacts/review/probe.mjs exit and diagnostic: not run.
- Probe interpretation: a zero exit means the deliberate defect was detected, not API success.
- Reviewer invocation / loaded checklist source: not observed.
- Supported finding: file/line, contract, reproduction, observed/expected, impact: not recorded.
- Unsupported claims or checks not run: not evaluated.

## Author improvement

- Canonical checklist append and manifest/catalog 1.2.0 change: not made.
- Author branch / commit / dirty state: not recorded.
- npm run verify:exercise -- --step 03-skill exit in author: not run.
- npm run verify:exercise -- --step 04-plugin exit in author: not run.
- npm run toolkit:build exit and immutable output in author: not run.
- verifyPackage result / sourceChecksum / sourceCommit / sourceDirty: not observed.

## Consumer update and second review

- Explicit registration/install permission: not recorded.
- Old lab registration removed/disabled, unrelated entries preserved: not inspected.
- Updated package discovery source/version and refresh: not observed.
- Local canonical skill absence / duplicate package check: not inspected.
- MCP tool source/version and calls, or labeled file fallback: not observed.
- Second reviewer invocation and concrete before/after behavior: not observed.
- Runtime update outcome: not established.

## Handoff and verification

- Continuation brief updated with actual state: not completed.
- Fresh session/client and contract/ref/source re-read: not observed.
- Discrepancies found and next safe action: not established.
- npm run verify:exercise -- --step 08-review-and-handoff exit: not run.
- npm run verify:solution exit, if Lab 07 is complete: not run.
- Remaining work: perform and record the review, update, and fresh-session gates.

Keep this journal private. Record safe summaries, not names, query text, query-bearing URLs,
payloads, or unredacted diagnostics. Never present supplied examples as your own execution.
```

## Try it

### First independent review

1. In consumer, read `workshop/task-brief.md`, `workshop/approved-contract.md`, and
   `docs/reference/contract.md`. Run `git status --short`, `git branch --show-current`, and
   `git rev-parse HEAD`. Record the Lab 07 state without implying an incomplete implementation passed.
2. Run `node workshop/artifacts/review/probe.mjs` and record the actual exit and diagnostic.
   Exit 0 confirms the wrong total **1** was detected for three matches at limit 1. If it fails,
   compare the import path and the two fixture files; an altered fixture may no longer exhibit the defect.
3. Open an independent reviewer context using Lab 06's reviewer role. Inspect permissions:
   no generic edit/execute grants for a bounded reviewer. A shell-capable reviewer is advisory-only;
   if execution is unavailable, the human runs the probe and supplies the safe diagnostic.
4. Send this first review request before making the canonical update. Require a supported finding
   with exact file/line, authoritative requirement, reproduction, observed versus expected behavior,
   and impact. Unsupported claims about performance or security do not count as extra findings.

   ```text
   Review only; do not edit. Read docs/reference/contract.md and the installed
   api-change-workflow checklist. Inspect workshop/artifacts/review/total-after-limit.mjs,
   probe.mjs, and review-rubric.md. Use the actual probe result in
   .lab-evidence/08-review-and-handoff.md or request human execution if unavailable.
   Report the supported defect with exact file/line, requirement, reproduction,
   observed versus expected behavior, and impact. Explain why probe success is defect
   detection, not API acceptance. Do not fix the teaching fixture or the API.
   ```

### Improve the canonical checklist after the finding

After recording the supported first finding, switch to **author**. Apply the following canonical
checklist addition and full manifest/catalog updates as the shared revision exercise for every route.
Keep `.github/skills/api-change-workflow/SKILL.md` and the two-file package layout intact.

Append the following new section to the **canonical author** checklist. It is an addition, not a
replacement for the MCP-aware checklist from Lab 05. If the heading already exists, compare and
merge once rather than duplicating it.

**File:** `.github/skills/api-change-workflow/references/review-checklist.md` (append; author; 1.2.0).

```markdown
## Pre-limit total evidence — 1.2.0

- Trace total to the complete matching collection before the slice/limit operation. Cite the exact file and line; a field named total is not proof.
- For a fixed three-match search, compare limits 1 and 2: item counts change, but the expected total remains 3. Require a focused assertion or label this check not run.
- For each supported finding provide file/line, authoritative contract requirement, exact reproduction, observed versus expected behavior, and impact.
- Distinguish the teaching probe's successful defect detection from passing API acceptance; preserve the intentionally faulty fixture.
- After correction, require actual regression and full-search exits plus bounded access-event evidence. Never replace learner evidence with reference results.
```

Use this complete manifest for the standard workshop variant. If yours contains reviewed
customizations, merge the exact named edits instead: set `version` to `"1.2.0"`, use this
`description`, retain `name: "user-search-toolkit"`, the schema, and skill-only boundaries.

**File:** `toolkit/plugin.json` (replace; author; 1.2.0).

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "user-search-toolkit",
  "version": "1.2.0",
  "description": "An approval-bounded API workflow with read-only fixture MCP standards, explicit file fallback, and evidence-backed pre-limit total review.",
  "keywords": ["workshop", "api", "review", "mcp"]
}
```

For a customized catalog, preserve learner entries and merge the Version, Change, Update, and
Rollback bullets from this full standard variant. Catalog text documents the release; it is not a
fourth packaged skill file.

**File:** `toolkit/catalog.md` (replace; author; 1.2.0).

```markdown
# User-search toolkit catalog

- Purpose: reusable planning, approved implementation, and independent review for bounded API changes.
- Version: **1.2.0**, adding evidence-backed pre-limit total review to the MCP-aware 1.1.0 workflow.
- Maintainer role: learner in local author workspace; publication owner and visibility remain unresolved.
- Source: canonical .github/skills/api-change-workflow/ and toolkit/plugin.json. Inspect builder-generated provenance.json for sourceChecksum, sourceCommit, sourceDirty, version, and per-file hashes.
- Compatibility: Agent Plugins 1.0.0, skill-only; VS Code local source installation, CLI local install, and an app CLI bridge unverified until actual discovery.
- Permissions: no hooks, executables, embedded MCP, automatic installation, or server startup. Configure the two read-only fixture tools separately in consumer and label any file fallback.
- Change: require a file/line trace from total to pre-limit matches, a fixed-match comparison at limits 1 and 2, and findings linked to contract, reproduction, behavior, and impact. A successful teaching probe detects a defect; it is not API acceptance.
- Build: use npm run toolkit:build in author. The two canonical skill files and manifest produce an immutable toolkit/dist/user-search-toolkit-1.2.0/ plus generated provenance.
- Update: inspect the new package, explicitly replace only the prior lab registration, register/install 1.2.0, refresh, inspect real source/version, and re-invoke the reviewer.
- Rollback: disable/uninstall only the new lab registration, re-register the preserved 1.1.0 directory, refresh, and verify actual source/version. Never reset unrelated settings.
- Evidence: a build is not runtime discovery. Preserve the before/after reviewer observations and consumer registration source/version.
```

### Build and register the reviewed update

1. Run these commands in **author** after the canonical edits, not before the first review:

```sh
npm run verify:exercise -- --step 03-skill
npm run verify:exercise -- --step 04-plugin
npm run toolkit:build
node --input-type=module -e "import { verifyPackage } from './scripts/lib/toolkit.mjs'; console.log(JSON.stringify(verifyPackage('toolkit/dist/user-search-toolkit-1.2.0'), null, 2))"
node -e "console.log(require('node:path').resolve('toolkit/dist/user-search-toolkit-1.2.0'))"
```

The last command prints the real package directory for registration. Keep it available when
switching to consumer; do not substitute a guessed author path. Inspect the built checklist's
`Pre-limit total evidence — 1.2.0` section and retain the printed provenance values.

2. Inspect generated provenance and the packaged checklist. An already-built 1.2.0 with identical
   bytes can be reused; changed bytes at an existing version must fail. Preserve that output and
   choose a separately recorded later revision if you already used 1.2.0—never overwrite it.
3. Return to consumer. With explicit registration/install permission, replace **only** the prior
   lab registration, refresh, and inspect the observed 1.2.0 source/version using
   [Client steps](#client-steps). Do not claim success from a changed author manifest alone.

### Re-invoke and carry context forward

1. **Re-invoke after the author build and observed consumer update.** If source/version remains
   1.1.0, repair only the lab registration/refresh first; do not paste the new checklist and call
   that proof of a package update.

   ```text
   Review only. Confirm the loaded api-change-workflow checklist is from the observed
   1.2.0 package, then review workshop/artifacts/review/total-after-limit.mjs again.
   Apply its Pre-limit total evidence section: trace total to the collection, compare
   fixed matches at limits 1 and 2, and report file/line, contract, reproduction,
   observed versus expected behavior, and impact. Label inferred checks versus actual
   runs. Do not edit. If the updated package is not loaded, report the discovery gap.
   ```

2. Compare the first and second review: the updated checklist requires a pre-limit derivation and
   a limit-variation check, not just repetition of “total before limit.” Record whether the new
   behavior was actually observed.
3. **Fresh-session continuation.** Fill `workshop/artifacts/review/continuation-brief.md` with safe
   facts and remaining work, end the prior context, and start another session in the same consumer.
   Do not paste the full chat history.

   ```text
   Resume read-only from workshop/artifacts/review/continuation-brief.md and
   .lab-evidence/08-review-and-handoff.md. Re-read workshop/task-brief.md,
   workshop/approved-contract.md, docs/reference/contract.md, src/api/search.ts,
   and tests/search/search.test.ts. Verify current branch/commit/diff and installed
   package/tool source against the brief; request human inspection if your tools cannot.
   List discrepancies, supported remaining findings, and the next bounded action.
   Do not infer approval from the brief, edit files, install anything, or create remote resources.
   ```

Expected observations are a supported defect finding, an observed updated-checklist invocation, and
a new context that checks facts before continuing. They are not prefilled results to copy into evidence.

## Client steps

### VS Code

1. Open consumer and the two review `.mjs` files. Enable line numbers, inspect Source Control, and run
   the probe in the integrated terminal. Select the independent reviewer with inspected restrictions.
2. Send the first review request. Record the line-level finding, actual checklist source, and probe
   result in `.lab-evidence/08-review-and-handoff.md`. This is local review, not hosted Code Review.
3. Switch to author for the canonical append, metadata updates, and build commands. Return to
   consumer and open the Copilot Chat **cogwheel** (**Open Customizations**) > **Plugins**.
4. With registration approval, disable or uninstall only the old lab plugin. Select **Install Plugin from Source**
   and paste `/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.2.0`, replacing `/ABSOLUTE/AUTHOR` with the actual author path.
   Choose the package root containing `plugin.json`, not its nested `skills/` directory. Confirm the source and review any trust prompt.
   Preserve all unrelated registrations; installation can affect the client profile. Never leave both lab versions enabled.
5. Reload the consumer window if discovery has not refreshed. Inspect native plugin/skill discovery and the actual 1.2.0 checklist
   source, then send the second review request. If role discovery is unavailable, use the reviewed
   role body as manual advisory context and record that limitation.
6. Update the continuation brief. Open a fresh consumer chat and send the continuation prompt;
   record what it re-checked and any stale facts it detected.

If you used the advanced workspace settings route, update only the manual lab entry **instead of** adding a UI installation:
under `chat.pluginLocations` in consumer `.vscode/settings.json`, remove or disable the old 1.1.0 key and set the actual absolute
1.2.0 directory to `true`. Preserve unrelated entries, reload, and perform the same source/version and review checks.
[Plugin update and rollback](../reference/plugin.md).

### Copilot CLI

1. Start a separate reviewer context in consumer, inspect its actual tools, and send the first
   review request. Use the human-run probe diagnostic when the reviewer cannot execute.
2. In author, apply the canonical 1.2.0 append and metadata updates, build, verify, and retain the
   absolute directory printed above. Return to consumer.
3. Run `copilot plugin list --json` and inspect `copilot plugin --help` for your build.
   **Only after explicit permission for this client registration**, remove only the prior lab
   package with `copilot plugin uninstall user-search-toolkit`, then run
   `copilot plugin install "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.2.0"`.
   Replace the illustrative absolute path with the printed directory. CLI registration may affect
   the user profile; a managed-policy denial is a stop, not permission to bypass it.
4. Run `copilot plugin list --json` again, use `/skills reload` and `/skills info`, and confirm
   exactly one 1.2.0 source. Send the second review request and retain observed behavior.
   If native role selection is unsupported, read/paste its body as manual advisory context.
5. Save the continuation brief, start a fresh CLI session in consumer, and send the continuation
   prompt. Record the new context's verified facts in `.lab-evidence/08-review-and-handoff.md`.

### Copilot app

1. Open the local consumer project. Inspect the reviewer picker and real permissions, then open
   the review files and send the initial request. A pasted role is a manual fallback, and
   advisory-only roles are not technically read-only.
2. Apply/build the canonical change in author. Use the explicitly approved CLI registration
   procedure above only if pursuing the bridge; do not assume a native local-directory install UI.
3. Return to consumer, refresh/reopen the session, and inspect Customize Plugins/Skills for the
   real 1.2.0 source. If observed, send the second review request and record the result.
4. If the bridge is unavailable, perform updated-runtime review in CLI/VS Code or mark that gate
   incomplete. Reading the new checklist manually is not proof of an installed package update.
5. Save the brief and start a new local consumer session with the continuation prompt. Recheck
   source/ref/tool evidence. Hosted/cloud review remains optional and separately approval-gated;
   no Mobile/local MCP or plugin transfer is assumed.

## Verify the result

- `npm run verify:exercise -- --step 08-review-and-handoff`; `node workshop/artifacts/review/probe.mjs`.
- If feature complete: `npm run verify:solution`; otherwise retain exact failing outcome and remaining work.
- Evidence includes a supported finding, improved canonical asset and observed updated invocation, plus continuation from a fresh context.
- Static exercise validation checks artifact presence; it cannot prove reviewer independence,
  successful registration, or fresh-context continuation. Probe exit 0 detects an intentionally
  wrong total and must not be substituted for the real solution gate.
- Recovery: if the updated package fails, disable/uninstall only that lab registration and restore
  the preserved 1.1.0 registration, refresh, and verify. Keep the 1.2.0 evidence and explain the gap.
  Remove only lab package/MCP registrations after use; preserve authored artifacts and learner
  implementation. Stop only local processes you started.
- Optional: [09 — Spec Kit](09-spec-kit.md).
