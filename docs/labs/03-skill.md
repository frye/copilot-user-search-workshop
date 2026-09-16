# 03 — Build and exercise a skill

Agent skills package a specialized procedure with supporting instructions and resources that Copilot
can load when relevant. They make multi-step work repeatable and easier to improve without placing
the entire procedure in always-on project guidance.

**Documentation:** [About agent skills](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/about-agent-skills).

## Goal and starting workspace

- **Author**, after 02; [optional reviewed prerequisites](#starting-here-with-reviewed-prerequisites) are available if starting here.
- Canonical source is `.github/skills/api-change-workflow/`, not a copied package directory.

## Choose your route

Choose **one** way to prepare the two-file skill, not all three. The first-visit tab is **Bring in this step**; selecting it does not import or invoke anything. Loading, practice, revision, evidence, and checks follow in the shared continuation.

### Build it yourself

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, and your Lab 01–02 artifacts before authoring. In your editor, create the canonical `.github/skills/api-change-workflow/` directory and its `references/` subdirectory if missing; preserve existing learner files.
2. Create `.github/skills/api-change-workflow/SKILL.md`. Its YAML frontmatter must contain `name: api-change-workflow` and a one-line `description` explaining when to use it: planning, approved implementation, or independent review of a small HTTP API change with contract tests and privacy-safe evidence. Discovery metadata is a selection aid, not evidence that a client loaded the file.
3. Write **Inputs and boundaries**: read the brief, contract, repository/scoped instructions, and conventions from the **current workspace**; confirm ref, stage, author/consumer, owned files, and existing work. Use workspace-relative code paths for these inputs so a future installed package does not accidentally read author or package-local application files.
4. Add a Markdown link labelled **review checklist**, targeting `references/review-checklist.md`, from `SKILL.md`. This link deliberately resolves inside the skill bundle. Create `.github/skills/api-change-workflow/references/review-checklist.md`; it is required content, not an optional attachment the client can silently ignore.
5. Write separate **Plan**, **Implement after approval**, **Independent review**, and **Return evidence and stop** sections. Planning identifies scope/questions/tests/commands and stops for approval. Implementation uses one writer, preserves changes, adds a meaningful case, and runs real acceptance only after approval. Review reports supported file/line/impact/reproduction findings without editing. Evidence states actual ref, source/version where visible, commands/exits, approvals, and unknowns. Naming an implementation stage does not authorize using it in Lab 03.
6. Put the detailed checklist in the linked file: contract authority; unchanged endpoints/fixtures; routing/fullName semantics; omitted/blank/no-match input; duplicate parameters including duplicate blank q; strict limit boundaries; sorting/total; anchor case; exact response; fixture/repeatability/server-cleanup/privacy; actual checks; and approval/source evidence. This starting checklist already includes duplicate blank q, so do **not** claim adding that same case is an improvement.
7. Keep this on-demand procedure distinct from persistent instructions and the invocation-time planning prompt. Do not add broad shell preapproval or automatic commit, publish, install, merge, or cloud-task steps. Role text alone cannot enforce read-only permissions when generic shell access remains available.
8. Review both authored files against these requirements, follow the reference link from the saved `SKILL.md`, and retain one valid frontmatter block when merging. Save the initial procedure and checklist. Invocation, the later unknown-query-key criterion, and reload/reread happen in the shared continuation.

[Continue with this lab](#continue-with-this-lab).

### Copy-and-paste

Create the exact directories in author. These are the complete reviewed two-file skill contents. If either file exists, stage/compare and merge your intended rules rather than replacing learner work; keep one correct frontmatter block in `SKILL.md`. Copy the following initial files before attempting the separately marked revision.

**File:** `.github/skills/api-change-workflow/SKILL.md` (create; author).

```markdown
---
name: api-change-workflow
description: Use for planning, approved implementation, or independent review of a small HTTP API change with contract tests and privacy-safe evidence.
---

# API change workflow

## Inputs and boundaries

- Read the current workspace's `workshop/task-brief.md`, `workshop/approved-contract.md`, repository/scoped guidance and `standards/api-conventions.json`.
- Confirm goal, actual ref, author versus consumer workspace, selected stage, owned files, and existing work.
- Use [review checklist](references/review-checklist.md) for detailed edge cases.
- Do not alter fixtures, unrelated files, user/global settings, package registrations, or remote resources.

## Plan

- Identify requirements, assumptions, questions, focused files, test cases and exact validation commands.
- Report starter versus completed-search expectations.
- Stop for explicit human approval; no implementation in a planning or review-only request.

## Implement after approval

- Re-read approved scope; use one writer and preserve learner changes.
- Change only search and focused tests unless approval explicitly expands scope.
- Add a meaningful acceptance case; run regression and full search checks.
- Do not weaken tests or treat a failed command as success.

## Independent review

- Compare contract, diff, tests and checklist; report only supported findings with file/line, impact and reproduction.
- Do not modify the reviewed code. If generic shell is available, do not claim enforced read-only permissions.

## Return evidence and stop

- Report actual ref, changed files, approvals, procedure source/version where visible, exact commands/exits and remaining work.
- Distinguish client loading/invocation evidence from static file inspection.
- Never auto-commit, push, publish, install, merge or launch cloud tasks.
```

**File:** `.github/skills/api-change-workflow/references/review-checklist.md` (create; author).

```markdown
# API change review checklist

- Is the approved contract authoritative rather than the ambiguous draft?
- Are health/list/get routes and the archived four-user fixture unchanged?
- Does search route before get-by-ID and match only trimmed case-insensitive fullName substrings?
- Do omitted/blank q match all and no matches return an empty array with total zero?
- Are singleton q/limit enforced, including duplicate blank q values?
- Are valid limits 1–25 only, with default 10 and no sign/whitespace/decimal/exponent/leading zeros?
- Are matches sorted by ordinal ID before slicing, with total computed before limiting?
- Does `q=lee&limit=1` return u-001 and total 3, not total 1?
- Are response status, shape and content type exact?
- Are fixtures immutable, results repeatable, isolated servers closed, and logs limited to route/status?
- Are focused regression/full acceptance commands actually run and their exits reported?
- Was implementation approved, scope preserved and package/client evidence distinguished from assertions?
```

[Continue with this lab](#continue-with-this-lab).

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/03-skill/).
- Complete two-file skill; the shared exercise personalizes a rule and demonstrates its effect instead of merely reading it.
- Requires reviewed prompt/guidance. If starting here without them, inspect the separate [optional prerequisite shortcut](#starting-here-with-reviewed-prerequisites) before import. The helper verifies the pinned `examples-v1` release; importing does not invoke the skill.

```sh
npm run lab:activate -- --step 03-skill
```

- Activation displays the plan and applies both files only with safe destinations. Optional preview/comparison is available through [safe example operations](../reference/examples.md#optional-inspection-and-comparison). The private journal and later personalized criterion are not imported. Manually authored or revised files may correctly block later sample replacement.

#### If you already changed these files

- Retain your procedure; stage references and manually merge. Source personalization is expected.
- When 05 later updates the sample, different authored content remains protected even after a commit. [Recovery](../reference/examples.md).

[Continue with this lab](#continue-with-this-lab).

## Continue with this lab

Whichever preparation route you completed, do the shared steps below **once**. Do not repeat another route. Create a reusable procedure before packaging it; this lab remains planning and review only, with search still 501.

### Artifact inventory

| File | Action in author | Purpose |
| --- | --- | --- |
| `.github/skills/api-change-workflow/SKILL.md` | Prepared by your chosen route | Discovery metadata, stage workflow, and safety boundaries |
| `.github/skills/api-change-workflow/references/review-checklist.md` | Prepared by your chosen route | Linked, reusable edge-case and review criteria |
| `.lab-evidence/03-skill.md` | Create; update actual observations | Planning, review, revision, reload, and source evidence |

The skill is exactly this two-file tree; the private journal is not packaged:

```text
.github/skills/api-change-workflow/
├── SKILL.md
└── references/
    └── review-checklist.md
```

### Starting here with reviewed prerequisites

This is an **optional prerequisite shortcut**, not a fourth route or a step to repeat after completing Labs 01–02. If you deliberately start at Lab 03 without those prerequisites, review this shortcut before preparing the skill. It imports the reviewed Lab 01–02 example assets and creates one local checkpoint commit containing only those files:

```sh
npm run lab:03:bootstrap
```

- Run it only if you explicitly choose that local-commit behavior, from a learner branch in author with no staged changes and a configured Git name/email.
- It verifies the pinned `examples-v1` release, imports through the same conflict-safe helper, and never switches/merges examples, pushes, installs, or imports the Lab 03 skill.
- It preserves unrelated unstaged work and refuses learner-owned destination conflicts.
- This supplies example prerequisites only. You must still run and record the real Lab 00 readiness/baseline checks; importing a blank checklist would not prove them. If the shortcut is not appropriate, complete the prior labs instead.

### Shared preparation and evidence

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, your Lab 01–02 artifacts, and both prepared skill files. Inspect `git status --short` and `git diff -- src tests` so prior learner work is not mistaken for a change caused by this exercise.
2. Check frontmatter, the current-workspace input boundaries, the linked reference, and separate planning/approved-implementation/review stages. Record the actual author ref with `git rev-parse HEAD` and the client/build from its version information. No stage name authorizes implementation in this lab.
3. Create `.lab-evidence/03-skill.md` in your editor using the shared template below, or preserve and update an existing journal. Do not turn unperformed operations into success claims.
4. Use one [client route](#client-steps) for the common [Try it](#try-it) planning request, review-only request, checklist improvement, and reload/review. The client directions and practice describe the same exercise; do not perform a second full round merely because both mention it. Record source and reference-use evidence, then run [verification](#verify-the-result).

**File:** `.lab-evidence/03-skill.md` (create; author).

```markdown
# Lab 03 — skill evidence

## Workspace and discovery

- Author root, branch, actual ref, and existing learner changes: not recorded.
- Client/build and route (native skill / manual walkthrough / artifact-only): not observed.
- Canonical skill source: .github/skills/api-change-workflow/SKILL.md.
- Linked reference: .github/skills/api-change-workflow/references/review-checklist.md.
- Source actually loaded, discovery indicator, and version if exposed: not observed.
- Conflicting same-name sources or policy restrictions: not inspected.
- Optional bootstrap chosen and local checkpoint commit, if any: not recorded; no execution inferred.

## Initial invocations

- Planning request from Try it: not invoked.
- Actual source/reference reads and stage selection: not observed.
- Bounded scope, starter/completion checks, and approval stop: not observed.
- Initial review-only request from Try it: not invoked.
- Supported findings or evidence gaps, with file/line and reproduction basis: not assessed.
- Intentional 501 correctly distinguished from an accidental regression: not assessed.
- Command executions versus proposals and no-edit behavior: not checked.

## Checklist revision and reinvocation

- Unknown-query-key criterion absent from starting checklist: not checked.
- New criterion appended to canonical reference: not performed.
- Reload/refresh/manual reread operation and observed source: not performed.
- Repeated review-only request and addendum: not invoked.
- New coverage discussion and unknown-key versus duplicate-known-key distinction: not observed.
- Missing evidence or unchanged behavior: not assessed.

## Validation

| Command/check | Actual exit/result | Privacy-safe observation |
| --- | --- | --- |
| npm run verify:exercise -- --step 03-skill | Not run | Not observed |
| npm test | Not run | Not observed |
| git diff -- .github/skills/api-change-workflow | Not run | Not observed |
| git diff -- src tests | Not run | Compare with starting learner work |

- Human implementation approval: not granted in this lab.
- Remaining failures, recovery, and unsupported runtime claims: not recorded.
- Do not retain names, query text, query-bearing URLs, payloads, or invented success evidence.
```

## Client steps

### VS Code

1. Open author and both skill files; follow the reference link from `SKILL.md` to confirm the two-file layout.
2. Inspect native skills discovery for `api-change-workflow` and its `.github/skills/api-change-workflow/SKILL.md` project path. Do not disable a conflicting unrelated global skill; record the conflict if the source cannot be distinguished.
3. Send the planning request, then the review-only request in a fresh bounded conversation. Inspect loading/invocation and reference-source indicators actually available in this build.
4. If discovery is absent, refresh/reload using available controls. If still unsupported or unobservable, explicitly read/attach both exact files before each request and label **manual walkthrough**; similar-looking output alone is not loading proof.
5. Append the unknown-key criterion, save, and reload the window if needed. Reinspect the source and repeat review with the addendum; in the manual route reread both files instead.
6. Record actual invocations, source/reload indicators, coverage discussion, and remaining gaps in `.lab-evidence/03-skill.md`.

### Copilot CLI

1. Start the approved CLI from author root and record the current ref/build.
2. Run `/skills reload`, then `/skills info` in the interactive session. Inspect/select `api-change-workflow` using this build's supported interface and confirm its canonical project source, not a packaged or global duplicate.
3. Send the planning request and then the review-only request, using a fresh bounded conversation for review. Inspect actual source/loading evidence and whether the linked checklist was read.
4. If discovery is absent or unavailable, explicitly read `.github/skills/api-change-workflow/SKILL.md` and `.github/skills/api-change-workflow/references/review-checklist.md`, or paste their complete bodies. Label **manual walkthrough**, not native skill execution.
5. Append the criterion to the canonical reference. Run `/skills reload` and `/skills info` again when supported, then repeat review with the addendum; for manual use explicitly reread both files.
6. Save source, reload operation, before/after observations, command proposals versus real exits, and no-edit evidence in `.lab-evidence/03-skill.md`.

### Copilot app

1. Open the author project/session and confirm its root/ref. Open or read both canonical skill files before evaluating discovery.
2. Inspect Customize Skills for the author project if available and confirm the source path. Record the actual build and observed source; this is not a claim about local plugin installation.
3. Invoke the planning request and then the review-only request in a fresh bounded conversation. Inspect any actual loading/source/reference evidence.
4. If discovery or loading cannot be observed, explicitly ask the session to read the exact `SKILL.md` and its `references/review-checklist.md`, or paste both bodies, as a **manual walkthrough**, not a native skill success.
5. Append the new criterion in author, save, and use the available refresh controls or a fresh author session. Reinspect the source or explicitly reread both files before repeating review with the addendum.
6. Save actual source/reload observations, new coverage discussion, and remaining limitations in `.lab-evidence/03-skill.md`. Do not infer tool permission enforcement from the procedure's wording.

## Try it

1. Discover/inspect the skill through your client route. Confirm its canonical project source rather than a same-name user/global skill. If discovery is unavailable, explicitly read `.github/skills/api-change-workflow/SKILL.md` **and** its linked reference and label the activity a **manual walkthrough**.
2. Send this **planning request**:

   ```text
   Use api-change-workflow from .github/skills/api-change-workflow/SKILL.md for the Plan stage of the approved search task. Read its linked review checklist and the current author workspace's brief, contract, instructions, and conventions. Report actual ref/source where observable, focused scope, questions, test categories, proposed exact commands, and starter versus completion expectations. Do not edit files, run commands, implement search, install, or commit. Stop for explicit human approval.
   ```

3. In a fresh bounded conversation, send this **review-only request**. Review may inspect current files even when the API diff is empty; an empty diff is not permission to fabricate findings.

   ```text
   Use api-change-workflow for Independent review only. Read .github/skills/api-change-workflow/SKILL.md and its linked checklist, then compare the approved contract, current src/api/search.ts, tests/search/search.test.ts, and any existing relevant diff without changing it. Separate the intentional starter 501 and unfinished acceptance from accidental regressions. Report only supported findings with file/line, impact, and a reproduction basis, plus evidence gaps and commands not run. Do not execute commands, edit, implement, or approve implementation.
   ```

4. Inspect stage selection, reference reads, approval stop, and evidence limits. A static validator or a response saying “I used the skill” is not native loading proof. Because this lab is plan/review-only, proposed tests remain unrun unless you run the separate validation yourself.
5. **Concrete improvement:** compare the starting checklist with the contract's requirement that unrecognized query keys have no effect. That explicit criterion is missing from the starting checklist. Append it to the canonical reference, not a packaged copy:

**File:** `.github/skills/api-change-workflow/references/review-checklist.md` (append; author; revision).

```markdown
- Are unrecognized query keys ignored without changing matching, ordering, total, or validation of recognized q/limit parameters? Check existing coverage before proposing an independent case; ignoring an unknown key must not permit duplicate recognized parameters.
```

6. Reload/refresh the skill using your client route; in a manual walkthrough, explicitly reread both files. Repeat the review-only request with this addendum:

   ```text
   Reread the revised canonical review checklist. Address its new unrecognized-query-key criterion explicitly: identify supporting existing coverage or a coverage gap, and distinguish ignoring unknown keys from accepting duplicate recognized q/limit parameters. Do not invent a passing result or create a test. Keep the review read-only.
   ```

7. Observe whether the second review cites the revised criterion and evidence for existing coverage or a gap. It may find the coverage already exists; the improvement is checklist completeness, not an invented API defect. If the first review mentioned this requirement without a checklist rule, record that fact instead of claiming an artificial before/after effect. Save actual source/reload evidence and remaining gaps; keep search unchanged at 501.

## Verify the result

- `npm run verify:exercise -- --step 03-skill` validates required frontmatter/reference/boundaries.
- `npm test`; search remains 501. Retain planning/review invocations and changed-rule evidence.
- Inspect `git diff -- .github/skills/api-change-workflow` and compare `git diff -- src tests` with the starting state. Only the two canonical skill files and private journal belong to this lab's authored work; no API/test implementation is authorized.
- Save exact exits and observations in `.lab-evidence/03-skill.md`. Static validation cannot prove client discovery, linked-reference use, behavioral change, or read-only tool enforcement.
- Recovery: fix missing reference/frontmatter, reload and reinvoke; do not equate validator success with discovery.
- Next: [04 — Plugin](04-plugin.md).
