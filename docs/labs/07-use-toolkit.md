# 07 — Use the toolkit to implement search

## Goal and starting workspace

- **Consumer**, after 06: no canonical local skill, exactly one installed **1.1.0** package, MCP configured or fallback disclosed, roles inspected.
- This capstone exercises authored customizations; completing API code alone is not workshop completion.

## Build it yourself

1. Author `workshop/artifacts/toolkit-checkpoint.md` with readiness checks; verify current ref, package source/version and absence of `.github/skills`.
2. Select planner and ask: “Use the installed api-change-workflow for the approved search task. Return a plan and stop for approval.”
3. Inspect relevant repository/scoped rules and actual MCP conventions/validation lookup. Confirm both tools are available **to the selected role**, not merely connected globally; add their exact discovered IDs as described in 06 when needed. Use a labeled file fallback only when the capability is unavailable/denied.
4. Human reviews scope, questions and tests; explicitly approves one implementer.
5. Implement only search plus focused tests. Add at least one meaningful acceptance case, e.g. `?unused=1&q=LEE&limit=2` preserves filtering/total.
6. Run `npm test`, `npm run test:search`, then `npm run verify:solution`. Review diff and privacy logs with independent reviewer.
7. Record evidence showing toolkit use; do not embed the entire skill/conventions in a redundant implementation prompt.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/07-use-toolkit/).
- **Toolkit checkpoint only**, not implementation. Follow author 01–05, install 1.1.0, then consumer 05–06 if joining here.

## Bring in this step

```sh
# CONSUMER; import readiness checklist only
npm run lab:example -- --step 07-use-toolkit --preview
npm run lab:example -- --step 07-use-toolkit --stage
npm run lab:example -- --step 07-use-toolkit --apply
```

## If you already changed these files

- Keep your checklist/evidence; stage and compare. Never merge the examples branch or overwrite an attempted implementation.
- Ordinary importer cannot write `src` or fetch a solution. [Conflict and checkpoint rules](../reference/examples.md).

## Client steps

### VS Code

- In consumer, inspect installed package and MCP tools, choose planner then implementer after approval.
- Use native source/context/tool indicators and terminal outputs to demonstrate toolkit loading and calls.
- Review diff in consumer; package/source changes remain in author.

### Copilot CLI

- `copilot plugin list --json`, `/skills reload`, `/skills info`; confirm 1.1.0 and no local duplicate.
- Choose the bounded planner, call both MCP tools when available, record approval, then hand to one implementer.
- Keep test command output and actual exit codes; agent assertions are not sufficient.

### Copilot app

- In consumer app session, verify bridge-installed source/version before naming it in your completion evidence.
- Use agent picker with observed boundaries and Customize MCP tool discovery; record real calls.
- If the bridge cannot load, finish runtime capstone in CLI/VS Code or label the app route incomplete. Do not silently substitute local skill copying.

## Verify the result

- `npm run verify:solution` must pass. Do not run starter-only `test:stub` as a completion gate.
- `npm run verify:exercise -- --step 07-use-toolkit` checks readiness artifact, not actual completion.
- Recovery: preserve failing diff and test output, fix the implementation without weakening existing acceptance.

## Explicit solution walkthrough (only after attempt or deliberate choice)

```sh
git show solution-v2:src/api/search.ts
git diff starter-v2 solution-v2 -- src/api/search.ts tests/search
```

- Read-only local inspection; no merge/checkout/import into main. For full validation create a disposable worktree at `solution-v2`, install dependencies there and run `verify:solution`.
- A walkthrough is not evidence that your own toolkit produced the change.
- Next: [08 — Review and handoff](08-review-and-handoff.md).
