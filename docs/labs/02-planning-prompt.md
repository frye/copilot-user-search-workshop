# 02 — Create a reusable planning prompt

Reusable planning prompts capture a task's context and expected output in a request you can invoke
again, rather than in rules applied to every interaction. They make scope, open questions, tests,
and the human approval point easier to review consistently before implementation. Native prompt-file
support depends on the client and session type; the manual route preserves the planning exercise
when discovery is unavailable.

**Documentation:** [Prompt files in VS Code](https://code.visualstudio.com/docs/agent-customization/prompt-files).

## Goal and starting workspace

- **Author**, after 01; instructions present, search still 501.
- Separate invocation-time planning from persistent rules and an on-demand skill.

## Choose your route

Choose **one** way to prepare the planning prompt, not all three. The first-visit tab is **Bring in this step**; tab selection does not run an import. All routes join the same client, invocation, revision, and evidence steps.

### Build it yourself

1. Read `workshop/task-brief.md` and `workshop/approved-contract.md`, then review your Lab 01 instructions. Open the author repository in your editor and create missing prompt directories yourself; preserve existing learner content if the destination already exists.
2. Create `.github/prompts/plan-api-change.prompt.md`. Start with YAML frontmatter containing `name: plan-api-change` and a one-line `description` stating that it plans a focused API change and stops before implementation. Keep this file distinct from always-on repository instructions: it is selected for one request, not a place to duplicate every persistent rule.
3. Add links to the task brief, approved contract, and fixture conventions. From `.github/prompts/`, the paths are `../../workshop/task-brief.md`, `../../workshop/approved-contract.md`, and `../../standards/api-conventions.json`. Resolve them from the **prompt's saved location**, not this guide. Read the approved contract's linked canonical document, not the ambiguous draft.
4. Require the current workspace/ref and applicable guidance, then name the output sections: **Goal**, **In-scope files**, **Out-of-scope work**, **Contract decisions**, **Unresolved questions**, **Test matrix**, **Exact validation commands**, **Risks**, and **Human approval**. Scope should identify focused search/test surfaces, not authorize edits. Questions should identify genuine gaps rather than reopen settled requirements.
5. Require fixture/endpoint preservation, strict inputs, ordinal ordering, total before limit, and privacy-safe logs. In validation, distinguish baseline readiness from completion: `npm run verify:baseline` is starter-only, `npm run test:search` is intentionally red until implementation, and `npm run verify:solution` belongs after approved implementation. Listing commands is not claiming to have run them.
6. Add explicit no-edit/no-install/no-publish/no-remote/no-write-tool boundaries and an approval request at the end. A planning request is not approval. Do not embed an approval response or API implementation answer in the prompt.
7. Review the authored file against these frontmatter, link, output-section, and safety requirements. If merging an existing prompt, retain custom sections and one YAML frontmatter block. Save the initial prompt; invocations and the later matrix improvement belong to the shared continuation.

[Continue with this lab](#continue-with-this-lab).

### Copy-and-paste

Create missing parent directories in the author workspace. Copy the whole file, including its frontmatter. If it already exists, review and merge the requirements without discarding custom sections or creating duplicate YAML frontmatter. The body below reuses the reviewed planning boundaries and makes the requested output sections explicit.

**File:** `.github/prompts/plan-api-change.prompt.md` (create; author).

```markdown
---
name: plan-api-change
description: Plan a focused API change against the approved contract; stop before implementation.
---

Read the [task brief](../../workshop/task-brief.md), [approved contract](../../workshop/approved-contract.md), and [fixture conventions](../../standards/api-conventions.json).

- Identify applicable repository/scoped guidance and the current workspace/ref.
- Return the following named sections:
  1. Goal — the requested outcome and current stage.
  2. In-scope files — focused files and the reason each is needed.
  3. Out-of-scope work — preserved endpoints, fixtures, unrelated files, and deferred implementation.
  4. Contract decisions — settled requirements and their authoritative source.
  5. Unresolved questions — genuine gaps, or an explicit statement that none were found.
  6. Test matrix — input categories, expected outcomes, and existing coverage versus proposed independent cases.
  7. Exact validation commands — starter readiness versus post-implementation acceptance, expected results, and checks not run.
  8. Risks — correctness, scope, privacy, and evidence limitations.
  9. Human approval — a request to approve the bounded plan before any implementation.
- Preserve fixture users and existing endpoints. Address strict input syntax, ordinal ordering, total before limit and privacy-safe logs.
- State how to distinguish starter baseline readiness from completed search.
- Do not edit files, implement, install, publish, create remote resources or run write-capable tools.
- End with an explicit request for human approval of the plan. A planning request is not approval.
```

[Continue with this lab](#continue-with-this-lab).

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/02-planning-prompt/).
- This step imports only the prompt, not later procedure assets.
- Prerequisite: reviewed Lab 01 guidance. Presence allows authored equivalents; you must check their quality. The helper verifies the pinned `examples-v1` release.

```sh
npm run lab:activate -- --step 02-planning-prompt
```

- Activation displays the plan and applies only if the protected destination permits it. Optional preview/comparison is available through [safe example operations](../reference/examples.md#optional-inspection-and-comparison). Importing a prompt does not invoke it or create `.lab-evidence/02-planning-prompt.md`.

#### If you already changed these files

- Stage and compare rather than overwrite your prompt. A clean but different authored file is still protected.
- Fix relative links in your own file, not by importing a later skill. [Recovery](../reference/examples.md).

[Continue with this lab](#continue-with-this-lab).

## Continue with this lab

Whichever preparation route you completed, do the shared steps below **once**. Do not repeat another route. A prompt file is a reusable request, not evidence that it was selected or followed.

### Artifact inventory

| File | Action in author | Purpose |
| --- | --- | --- |
| `.github/prompts/plan-api-change.prompt.md` | Prepared by your chosen route | Reusable planning request with source links and approval stop |
| `.lab-evidence/02-planning-prompt.md` | Create; update actual observations | Two invocations, source checks, and before/after evidence |

### Shared preparation and evidence

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, your Lab 01 instructions, and the prepared prompt. Inspect `git status --short` and `git diff -- src tests` so prior learner work is not mistaken for a change caused by this lab.
2. Check prompt frontmatter and resolve its three links from `.github/prompts/plan-api-change.prompt.md`. The reviewed import requests the same planning topics in a compact list; the inline authoring recipe spells them out as named sections. For either, inspect goal, in-scope files, out-of-scope work, contract decisions, unresolved questions, test matrix, exact validation commands, risks, and human approval in the response; record missing structure rather than assuming it appeared.
3. Record the actual author ref using `git rev-parse HEAD` and obtain the client/build from its version information. Create `.lab-evidence/02-planning-prompt.md` in your editor using the template below, or update an existing journal without discarding its observations.
4. Use one [client route](#client-steps) to perform [Try it](#try-it): first invocation, matrix-format revision, refresh/reread, and second invocation. The client directions and practice describe one exercise, not two. Keep both responses plan-only and run the shared [verification](#verify-the-result) afterward.

**File:** `.lab-evidence/02-planning-prompt.md` (create; author).

```markdown
# Lab 02 — planning prompt evidence

## Context and source

- Author root, branch, actual ref, and existing learner changes: not recorded.
- Client/build: not observed.
- Route (native prompt selection / manual context equivalent / artifact-only): not selected.
- Prompt source: .github/prompts/plan-api-change.prompt.md.
- Frontmatter and links resolved from the prompt destination: not checked.
- Repository/scoped instructions actually included: not observed.
- Native selection/context indicators, or exact manual-read procedure: not observed.

## First invocation — strict input validation

- Request from Try it: not invoked.
- Source links actually read: not observed.
- Named output sections and bounded files: not observed.
- Genuine questions versus settled contract decisions: not assessed.
- Test matrix, baseline/completion distinction, and commands not run: not observed.
- Human approval stop and absence of edits: not checked.

## Revision and second invocation — ordering and total

- Explicit matrix-column requirement appended: not performed.
- Refresh/reselection/manual reread action: not performed.
- Second request from Try it: not invoked.
- Matrix columns and two mandatory input-category rows: not observed.
- Comparison with first invocation; unsolicited structure versus revision effect: not assessed.
- Incorrect, missing, or unsupported output: not assessed.
- No implementation approval has been given by this lab.

## Validation and recovery

| Command/check | Actual exit/result | Privacy-safe observation |
| --- | --- | --- |
| npm run verify:exercise -- --step 02-planning-prompt | Not run | Not observed |
| git diff -- .github/prompts/plan-api-change.prompt.md | Not run | Not observed |
| git diff -- src tests | Not run | Compare with starting learner work |

- Remaining gaps and next corrective action: not recorded.
- Record command summaries and source evidence only; no names, query text, query-bearing URLs, payloads, or invented results.
```

## Client steps

### VS Code

1. Open author and `.github/prompts/plan-api-change.prompt.md`; check frontmatter and open each linked file from that destination.
2. Use the current native prompt picker/discovery interface to select `plan-api-change`, if available, and submit invocation one. Inspect actual source/context references and the approval stop.
3. If the prompt is absent, use available refresh/reload controls. If still unavailable, explicitly read/attach the exact prompt file and linked sources, or paste the body as the current request; label **manual context equivalent**, not native discovery.
4. Append the revision, save, and reselect the prompt after refresh if needed. For a manual route, reread the revised file rather than reusing stale pasted text.
5. Submit invocation two. Record the actual reusable invocation, source indicators, matrix differences, and no-edit boundary in `.lab-evidence/02-planning-prompt.md`.

### Copilot CLI

1. Start the approved CLI in author root and record the actual ref/build. Open `.github/prompts/plan-api-change.prompt.md` in your editor or ask the CLI to read that exact path.
2. Use its body as the current request and explicitly read `workshop/task-brief.md`, `workshop/approved-contract.md`, and `standards/api-conventions.json`. This is the **manual context equivalent** fallback; prompt-file discovery is not assumed and no new slash command is required.
3. Submit invocation one and inspect the named output sections, sources, no-command boundary, and approval stop. If your actual build offers native discovery, record its observed selection evidence separately.
4. Append the revision in the file, then explicitly reread it in a fresh bounded conversation or the current session before invocation two. A skill reload is not prompt-refresh proof.
5. Compare the matrix and planning scope, inspect `git diff -- src tests` against the starting state, and save response summaries/ref in `.lab-evidence/02-planning-prompt.md`.

### Copilot app

1. Open the author project/session, confirm its root/ref, and open or read `.github/prompts/plan-api-change.prompt.md`.
2. Use native prompt discovery only if this actual build exposes it. Otherwise explicitly ask the session to read the exact file as its request and read the linked sources, or paste the complete body; label **manual context equivalent**.
3. Send invocation one and inspect any actual source/context evidence, all named sections, and the approval stop. Keep the invocation-time prompt distinct from persistent project instructions.
4. Append the revision, save, and use available refresh controls or a fresh author session. Explicitly reread the revised file in the manual route.
5. Send invocation two, compare the matrix and scope, and record native versus manual behavior and remaining gaps in `.lab-evidence/02-planning-prompt.md`. Do not grant implementation approval.

## Try it

1. Use native prompt selection if available, then submit **invocation one** as its task. In a manual route, explicitly read `.github/prompts/plan-api-change.prompt.md` as the request and read its three linked sources first. Do not invent a CLI slash command. Pasting the body is also valid, but resolve its links from the saved file location and label the route manual.

   ```text
   Use .github/prompts/plan-api-change.prompt.md as the planning request for the approved search task in this author workspace. Focus on singleton q/limit handling, blank input, and strict limit syntax. Identify existing acceptance coverage and a possible independent gap after reading it. Return the prompt's named sections, exact proposed checks, and the human approval stop. Read only; do not run commands, edit files, or implement search.
   ```

2. Inspect the result against the prompt: all nine named sections, evidence of reading the brief/contract/conventions, no invented unresolved requirements, and an explicit stop before implementation. Inspect native prompt/source indicators where available; the answer quoting the prompt name does not establish native discovery.
3. **Concrete improvement:** the starting matrix request does not prescribe columns or force a per-row pre-approval state. Append the requirement below to the prompt. This is an exercise variant; do not insert it into a different instructions or skill file.

**File:** `.github/prompts/plan-api-change.prompt.md` (append; author; revision).

```markdown
- In Test matrix, use exactly these columns: Input category | Expected contract outcome | Existing coverage or proposed case | Pre-approval test state. Include rows for duplicate blank q and invalid limit syntax even when the current question focuses on ordering. In Pre-approval test state distinguish the expected starter 501 failure from a check actually run; mark unrun checks not run. Do not log raw query text or payloads.
```

4. Save, refresh/reselect using your client route, or manually reread the revised file. Send **invocation two**:

   ```text
   Use the revised .github/prompts/plan-api-change.prompt.md as the planning request. Focus on ordinal ID ordering before limit, total before limit, and preserving archived list order. Refer to the anchor case in the approved contract without emitting user payloads. Return every named section and the revised Test matrix, including its mandatory input-category rows. Explain which commands belong before versus after implementation. Read only; do not run commands, edit, or implement. Stop for explicit human approval.
   ```

5. Compare the two actual responses. The second should show the specified four columns, the duplicate-blank and invalid-limit rows, a truthful not-run state, and the ordering/total emphasis. If the first already used a similar table on its own, say so; the new requirement makes the structure explicit, not proof that this run changed because of it. Missing output is a gap to record and retry, not success evidence. Do not approve implementation during this lab.

## Verify the result

- `npm run verify:exercise -- --step 02-planning-prompt`; inspect `git diff -- src tests` for no implementation edits.
- Evidence: reusable invocation, source references, scope/questions/tests, human approval point.
- Save the prompt diff and actual two-invocation observations in `.lab-evidence/02-planning-prompt.md`. The static check does not establish prompt selection, source reading, or behavioral compliance.
- Recovery: if code was proposed or edited prematurely, stop the agent and review that diff yourself; do not auto-reset learner work.
- Next: [03 — Skill](03-skill.md).
