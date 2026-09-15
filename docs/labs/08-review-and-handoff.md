# 08 — Review, improve, and carry context forward

## Goal and starting workspace

- **Consumer**, after a 07 attempt; preserve real implementation/ref/results, even if incomplete.
- Review a concrete defect and improve the reusable toolkit based on evidence.

## Build it yourself

1. Author `workshop/artifacts/review/total-after-limit.mjs`: export `faultyWindow(matches, limit)` that slices then incorrectly reports `items.length` as total. Author `probe.mjs` importing it and asserting that three input matches at limit 1 incorrectly produce total 1, not 3. Keep these inert teaching files outside API code.
2. Run `node workshop/artifacts/review/probe.mjs`. The probe succeeds only when it **detects the intentional defect** (1 returned instead of total 3).
3. Ask independent reviewer to connect the exact defective line, authoritative requirement, failing anchor and impact.
4. Distinguish supported finding from speculation; reviewer must not edit the fixture/API.
5. **Author extension:** improve the canonical checklist from this finding, bump to `1.2.0`, build, then explicitly update consumer registration and re-invoke reviewer.
6. Author `workshop/artifacts/review/review-rubric.md` linking requirement/line/reproduction. Fill `continuation-brief.md` in that directory: goal, actual ref, decisions, files, exact commands/exits, installed toolkit version, MCP/fallback, pending work.
7. Start a new session/client and re-read contract/source/ref rather than paste full chat history.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/08-review-and-handoff/).
- Defect/probe, rubric and unfilled handoff template are complete instructional assets. No sample claims actual review execution.

## Bring in this step

```sh
# CONSUMER
npm run lab:example -- --step 08-review-and-handoff --preview
npm run lab:example -- --step 08-review-and-handoff --stage
npm run lab:example -- --step 08-review-and-handoff --apply
```

## If you already changed these files

- Never replace your actual handoff/results with sample text. Stage a fresh reference and merge structure only.
- Changed fixtures or role definitions remain protected. [Recovery](../reference/examples.md).

## Client steps

### VS Code

- Select the independent reviewer with observed tool restrictions; inspect local diff and defect fixture.
- Record line-level finding, requirement and reproduction. This is local review, not hosted Copilot Code Review.
- After author package update, replace only lab registration and reload before verifying checklist improvement.

### Copilot CLI

- Use a separate reviewer context; retain `git diff` and probe output, no implementation permissions by assumption.
- Inspect package version/source after 1.2.0 update using list JSON and skill inspection.
- Start a fresh session in the same consumer and provide only continuation brief plus authoritative paths.

### Copilot app

- Pick reviewer only after inspecting real permissions; advisory-only roles are not technically read-only.
- Preserve ref and evidence when starting the next session/client. Recheck bridge version or use supported CLI/VS Code.
- Hosted/cloud review is optional and approval-gated; no Mobile/local MCP or plugin transfer assumptions.

## Verify the result

- `npm run verify:exercise -- --step 08-review-and-handoff`; `node workshop/artifacts/review/probe.mjs`.
- If feature complete: `npm run verify:solution`; otherwise retain exact failing outcome and remaining work.
- Evidence includes a supported finding, improved canonical asset and observed updated invocation, plus continuation from a fresh context.
- Recovery: remove only lab package/MCP registrations after use; preserve authored artifacts. Stop local processes.
- Optional: [09 — Spec-Kit status](09-spec-kit.md).
