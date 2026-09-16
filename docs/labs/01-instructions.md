# 01 — Author repository and scoped instructions

Custom instructions give Copilot durable project guidance, with repository-wide rules for shared
conventions and scoped rules for particular files. They reduce repeated prompting and help keep
generated changes aligned with the codebase without burdening every task with unrelated rules.

**Documentation:** [Custom instructions in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions).

## Goal and starting workspace

- **Author**, after 00; main-based learner branch with intentional 501.
- Create durable guidance with correct scope, not a giant task prompt.

## Choose your route

Choose **one** way to prepare the three instruction files, not all three. The first-visit tab is **Bring in this step**; selecting it does not import anything. Loading, scope exercises, evidence, and checks are shared below.

### Build it yourself

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, and the current `.github/copilot-instructions.md` in your editor before authoring. Keep all existing learner customizations; a tracked file is not permission to replace it. Create missing directories yourself.
2. Append a clearly separated participant-rules section to `.github/copilot-instructions.md`. Preserve **every** starter safety rule: read the brief/contract first; the deliberate 501; plan until explicit approval; preserve fixture/learner/unrelated work; never log names, query text, query-bearing URLs, or payloads; no publishing/global installation/personal-setting changes/remote resources without approval; and the statement that starter orientation is not Lab 01's answer.
3. Put cross-cutting rules in that extension: authoritative contract, small approved diffs, one writer, explicit planning/review stop, exact validation and honest evidence. Explain author ownership of canonical skill/package versus consumer ownership of configuration/roles/application work. Keep ordering-before-limit and total-before-limit as shared correctness boundaries, not implementation code.
4. Create `.github/instructions/api.instructions.md`. Its first lines must be YAML frontmatter with exactly `applyTo: "src/api/**/*.ts"`, followed by API rules. Include search-before-ID routing, fullName-only normalization, repeated-parameter/strict-limit validation, ordinal sorting and total before slicing, exact envelopes, immutable fixtures, and bounded route/status logging. These guide API edits without imposing a test harness on production files.
5. Create `.github/instructions/tests.instructions.md` with exactly `applyTo: "tests/**/*.ts"` in frontmatter. Explain `node:test`, strict assertions, ephemeral loopback server cleanup, exact status/shape, malformed/boundary input, repeatability/immutability/privacy checks, and an independent acceptance case. Distinguish `npm test` regression, `npm run test:search` completion acceptance, and starter-only `npm run test:stub`; never relax acceptance to accept 501.
6. Review your three files against these requirements and merge existing scoped guidance without adding a second YAML frontmatter block. Keep API/test rules in their respective scopes. Save the initial guidance; client invocations and rule corrections happen in the shared continuation, not while preparing this route.

[Continue with this lab](#continue-with-this-lab).

### Copy-and-paste

Create missing parent directories in your editor. **Append** the first block beneath existing repository instructions; it intentionally omits the starter section so it cannot replace or weaken it. The two scoped blocks are complete new files. If a scoped file exists, review and merge its rules while retaining one correct frontmatter block. Copying manually can legitimately cause later importer conflicts.

**File:** `.github/copilot-instructions.md` (append; author).

```markdown
# Participant-authored workshop rules — sample extension

- Use the approved contract, not the ambiguous draft. Ask about genuine gaps; do not invent user details or success evidence.
- Keep the archived user fixture and existing endpoints stable. Search sorts ordinal IDs before limiting; total is computed before limiting.
- Work only on explicitly approved files and one writable implementation at a time.
- Planning and review requests are not implementation approval; stop after reporting scope, tests, risks and questions.
- Before capstone use `npm run verify:baseline`; after implementation use `npm test`, `npm run test:search`, and `npm run verify:solution`.
- Search acceptance is intentionally red on starter. Never weaken tests, hide failures, or claim that static customization validation proves client loading.
- Record exact client, ref, selected role, skill/package source/version, tool evidence or fallback, command exits, and unresolved work.
- Author workspace owns canonical skill/package; consumer owns MCP configuration, roles and application work.
```

**File:** `.github/instructions/api.instructions.md` (create; author).

```markdown
---
applyTo: "src/api/**/*.ts"
---

# API-scoped rules

- Preserve native HTTP routing; `/api/v1/users/search` must precede get-by-ID.
- Match fullName only; trim and normalize q, validate repeated q/limit and strict decimal 1–25 limit syntax.
- Sort ordinal IDs before slicing; compute total from all matches. Do not mutate frozen fixtures.
- Keep exact status/envelope/content type from `docs/reference/contract.md`.
- Log bounded route/status only, never request URLs, names, queries or response payloads.
- Make focused changes to search after human approval; no external service/database additions.
- Run `npm test` plus `npm run test:search`; report actual exits and failures.
```

**File:** `.github/instructions/tests.instructions.md` (create; author).

```markdown
---
applyTo: "tests/**/*.ts"
---

# Test-scoped rules

- Use node:test and strict assertions through isolated ephemeral loopback servers; always close each server.
- Assert exact shape/status, routing precedence, sorting before limit, total before limit, no-match and blank behavior.
- Cover repeated q/limit, 1/25 boundaries and invalid signed/decimal/exponent/leading-zero limits.
- Preserve fixture immutability, repeatability and privacy-safe logger checks.
- Do not delete/weaken acceptance or turn an intentional starter 501 into completion.
- Add a meaningful independent case before declaring capstone done.
- Default `npm test` is regression-safe. `test:search` is explicit completion acceptance; `test:stub` is starter-only.
```

[Continue with this lab](#continue-with-this-lab).

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/01-instructions/).
- Only three instruction files; no prompt, skill, plugin, role, or implementation.
- The helper verifies the pinned `examples-v1` release. Explicitly run the operations below from author; tab selection is not permission to execute them.

```sh
npm run lab:activate -- --step 01-instructions
```

- Activation displays the plan and applies all three files only after the importer checks pass; it does not merge learner rules. Optional preview/comparison is available through [safe example operations](../reference/examples.md#optional-inspection-and-comparison).
- A clean tracked starter instructions file is the only known replacement. The reviewed full file retains the starter section; inspect it after activation or use the optional comparison route first. No commit is required by this lab. If you later choose a local checkpoint commit, review its exact scope yourself.

#### If you already changed these files

- Edited/untracked/committed alternative instructions block replacement. Keep them; stage and manually merge wanted rules.
- Do not discard safety guidance to satisfy a sample hash. [Recovery](../reference/examples.md).

[Continue with this lab](#continue-with-this-lab).

## Continue with this lab

Whichever preparation route you completed, do the shared steps below **once**. Do not repeat another route. Instructions guide behavior; they do not enforce filesystem or tool permissions.

### Artifact inventory

| File | Action in author | Scope |
| --- | --- | --- |
| `.github/copilot-instructions.md` | Prepared extension; preserve starter and learner rules | Repository-wide safety and workflow |
| `.github/instructions/api.instructions.md` | Prepared by your chosen route | `src/api/**/*.ts` |
| `.github/instructions/tests.instructions.md` | Prepared by your chosen route | `tests/**/*.ts` |
| `.lab-evidence/01-instructions.md` | Create; update actual observations | Private instruction-scope evidence |

### Shared preparation and evidence

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, and the three instruction files regardless of route. Review `git status --short`, `git diff -- .github`, and `git diff -- src tests`; distinguish existing learner work from this lab's instruction edits before invoking a client.
2. Confirm every starter safety rule remains, both scoped files have the exact `applyTo` values in the inventory, and no API/test implementation was introduced. Record the actual author ref with `git rev-parse HEAD`; obtain the client/build from its available version information.
3. Create `.lab-evidence/01-instructions.md` in your editor from the shared template below, or preserve and update an existing journal. Keep unperformed activities marked not run/not observed rather than filling them with sample claims.
4. Use one [client route](#client-steps) to carry out the shared [Try it](#try-it) requests, misplaced-rule correction, and second invocations. Those sections describe the same exercise, not separate rounds to perform twice. Record actual scope evidence and manual fallbacks, then run [verification](#verify-the-result).

**File:** `.lab-evidence/01-instructions.md` (create; author).

```markdown
# Lab 01 — instruction scope evidence

## Context

- Author root, branch, and actual ref: not recorded.
- Client/build: not observed.
- Starting learner changes and starter-rule preservation review: not performed.
- Route (native scope discovery / manual context equivalent / artifact-only): not selected.

## Initial invocations

- API request from the lab: not invoked.
- API file under discussion: src/api/search.ts.
- Repository/API/test instruction paths actually included and inclusion indicators: not observed.
- Test request from the lab: not invoked.
- Test file under discussion: tests/search/search.test.ts.
- Repository/API/test instruction paths actually included and inclusion indicators: not observed.
- Expected scope versus actual scope; manual files supplied: not assessed.
- Planning-only stop and absence of implementation edits: not checked.

## Misplaced-rule revision

- Broad-scope trial and observed effect: not performed.
- Exact test-title rule removed from repository extension and appended to test instructions: not performed.
- Why the rule belongs in tests rather than all files: not recorded.
- Refresh/reopen operation: not performed.
- Repeated API/test invocations and observed difference: not invoked.
- Remaining native scope-discovery gaps: not assessed.

## Validation

| Command/check | Actual exit/result | Privacy-safe observation |
| --- | --- | --- |
| npm run verify:exercise -- --step 01-instructions | Not run | Not observed |
| npm test | Not run | Not observed |
| git diff -- .github | Not run | Starter safety and learner work not yet checked |
| git diff -- src tests | Not run | Compare with starting changes, not an assumed clean tree |

- Unresolved failures or recovery: not recorded.
- No names, query text, query-bearing URLs, payloads, or invented client evidence belong here.
```

## Client steps

### VS Code

1. Open the author folder and the three instruction files. Check both `applyTo` values exactly and confirm the starter section remains unchanged.
2. Open `src/api/search.ts`, use the current Chat context/discovery controls, and send the API-file request. Inspect instruction/source indicators exposed by this build.
3. In a fresh conversation, open `tests/search/search.test.ts` and send the test-file request. Compare which scoped file was actually included, not merely whether answers sound correct.
4. If discovery is absent or stale, use the available refresh/reload controls. If still unobservable, explicitly read/attach `.github/copilot-instructions.md` and the relevant scoped file before the request; label **manual context equivalent**, not native inclusion.
5. Perform the trial/correction, reload if needed, and repeat both requests. Record initial and revised source indicators, behavior, and any missing evidence in `.lab-evidence/01-instructions.md`.

### Copilot CLI

1. Start your approved CLI from author root; verify the ref and inspect the current build's loaded repository guidance using its available context interface.
2. Send the API-file request naming `src/api/search.ts`. Inspect whether the repository file and API-scoped file were loaded natively.
3. Use a fresh bounded conversation for the test-file request. If scoped loading is not visible/supported, explicitly ask the CLI to read `.github/copilot-instructions.md` and `.github/instructions/tests.instructions.md` before answering. For the API fallback use `.github/instructions/api.instructions.md` instead; label each **manual context equivalent**.
4. Perform the misplaced-rule trial and correction. Reopen the author session after edits if needed; do not use `/skills reload` as proof of instruction refresh.
5. Repeat both requests and record source/context evidence, test-title behavior, manual fallback, and remaining gaps in `.lab-evidence/01-instructions.md`.

### Copilot app

1. Open the author project/session, confirm its root/ref, and inspect repository guidance and any surfaced scope/context information.
2. Open or name `src/api/search.ts` in the API-file request. Inspect the actual repository/API context indicators if this build exposes them.
3. Start a separate bounded conversation for the test-file request naming `tests/search/search.test.ts`. If native inclusion cannot be confirmed, explicitly ask the session to read `.github/copilot-instructions.md` plus the relevant API/test instruction file, or paste their bodies; record **manual context equivalent**.
4. Make the trial and corrected edits in author. Use available refresh controls or start a fresh author session, without treating skill/plugin controls as instruction-loading proof.
5. Repeat both requests, compare actual evidence and test-title behavior, and save `.lab-evidence/01-instructions.md`. Do not claim native inclusion or enforced read-only permissions without evidence.

## Try it

1. Open `src/api/search.ts` and send this **API-file request** in a read-only conversation. For native scope observation, let the client resolve instructions first; explicitly reading a scoped file is the fallback, not proof of automatic scope selection.

   ```text
   Read workshop/task-brief.md and workshop/approved-contract.md. For a future approved change to src/api/search.ts, identify the repository and path-scoped instructions relevant to that file. Give a bounded plan covering routing, input validation, ordering/total, privacy-safe logging, and exact checks. Distinguish sources actually included from sources you merely expect the client to include. Do not edit, run commands, implement, or request write-capable tools. Stop for human approval.
   ```

2. Open `tests/search/search.test.ts` and send this separate **test-file request**, preferably in a fresh conversation so manually supplied API context cannot masquerade as test-file discovery.

   ```text
   Read workshop/task-brief.md and workshop/approved-contract.md. For a future approved change to tests/search/search.test.ts, identify repository and test-scoped guidance. Propose one independent test category after inspecting existing coverage; explain exact assertions, ephemeral-server cleanup, immutable fixtures, and privacy-safe evidence. Distinguish included context from inferred scope. Do not edit or execute anything. Search remains the 501 starter and this request is not implementation approval.
   ```

   Expect repository guidance in both contexts, API-specific guidance for `src/api/**/*.ts`, and test-specific guidance for `tests/**/*.ts`. Citation of a file is not by itself native-discovery evidence. If the client cannot expose scope, explicitly read the repository file plus the relevant scoped file and record **manual context equivalent**.

3. **Deliberately misplaced rule:** append the following new rule to the participant extension only. This is an exercise variant, not part of the initial recipe. It is not already present in the starting snippet. Repeat the API request and note that the test-title rule is now repository-wide, even if the answer does not visibly change.

**File:** `.github/copilot-instructions.md` (append; author; revision-misplaced).

```markdown
- Name each new table-driven test case with its input category and expected status so failures can be identified without printing raw query text.
```

4. Correct the scope yourself: remove **only that exact newly appended bullet** from the repository extension, preserving every starter and learner rule. Append it to the test-scoped file instead:

**File:** `.github/instructions/tests.instructions.md` (append; author; revision-corrected).

```markdown
- Name each new table-driven test case with its input category and expected status so failures can be identified without printing raw query text.
```

5. Refresh or open a fresh bounded conversation using your client route. Repeat both original requests; for the test request add: “Show an example test title using an input category and expected status, without logging raw query text.” Inspect the actual source/scope indicators and whether the test plan includes the new naming requirement. Do not claim a native scope change when you supplied the file manually or no indicators were exposed. Save both trial and corrected observations; leave only the corrected rule in the final files.

## Verify the result

- `npm run verify:exercise -- --step 01-instructions`; `npm test`.
- Keep authored diff, rule-scope explanation, and actual client context/behavior evidence; API remains unchanged and 501.
- Inspect `git diff -- .github` to ensure the extension was appended and all starter/learner safety remains. Compare `git diff -- src tests` with the starting state; this lab authorizes no implementation or test edits.
- The static exercise check is not a scope-discovery or behavioral test. Save actual command exits, both invocations, and the correction in `.lab-evidence/01-instructions.md`; leave unsupported observations marked not observed.
- Recovery: remove conflicting rule by your own reviewed edit, reload/reinvoke, retain failed and corrected evidence.
- Next: [02 — Prompt](02-planning-prompt.md).
