# 01 — Author repository and scoped instructions

## Goal and starting workspace

- **Author**, after 00; main-based learner branch with intentional 501.
- Create durable guidance with correct scope, not a giant task prompt.

## Build it yourself

1. Extend `.github/copilot-instructions.md`, preserving every starter safety rule.
2. Create `.github/instructions/api.instructions.md` with `applyTo: "src/api/**/*.ts"` and test guidance scoped to `tests/**/*.ts`.
3. State ordering-before-limit, privacy-safe logs, exact validation commands, small diffs, and human approval before implementation.
4. Ask a read-only planning question: “Identify relevant guidance and a bounded plan for the approved search task. Do not edit.”
5. Inspect included instructions. Correct an overly broad rule; explain why test-only assertions do not belong in global instructions.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/01-instructions/).
- Only three instruction files; no prompt, skill, plugin, role, or implementation.

## Bring in this step

```sh
npm run lab:activate -- --step 01-instructions
```

- A clean tracked starter instructions file is the only known replacement. Review diff and explicitly commit when ready for later sample updates.

## If you already changed these files

- Edited/untracked/committed alternative instructions block replacement. Keep them; stage and manually merge wanted rules.
- Do not discard safety guidance to satisfy a sample hash. [Recovery](../reference/examples.md).

## Client steps

### VS Code

- Inspect native instructions discovery and path scope for an API file versus a test file.
- Refresh/reload if discovery is stale; run the planning request and inspect context references.
- Record which scoped file applied, not merely whether the answer sounds correct.

### Copilot CLI

- Repository instructions are the persistent route. Inspect the current build's loaded guidance.
- If scoped instruction loading is not visible/supported, explicitly attach/read the relevant scope file and label **manual context equivalent**.
- Reopen session after edits if needed; do not use `/skills reload` as proof of instruction refresh.

### Copilot app

- Inspect repository guidance in author session and any surfaced scope/context information.
- If native path-specific inclusion cannot be confirmed, supply the relevant file explicitly and record manual fallback.
- Start a fresh bounded planning session after rule revision; do not claim native inclusion without observed evidence.

## Verify the result

- `npm run verify:exercise -- --step 01-instructions`; `npm test`.
- Keep authored diff, rule-scope explanation, and actual client context/behavior evidence; API remains unchanged and 501.
- Recovery: remove conflicting rule by your own reviewed edit, reload/reinvoke, retain failed and corrected evidence.
- Next: [02 — Prompt](02-planning-prompt.md).
