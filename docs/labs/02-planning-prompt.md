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

## Build it yourself

1. Author `.github/prompts/plan-api-change.prompt.md` with name/description frontmatter.
2. Link task brief, approved contract, and conventions using paths valid from the prompt file.
3. Request scope, questions, test cases, expected checks, and an explicit human approval stop.
4. Invoke twice with a different question; confirm it creates a bounded plan, not code.
5. Improve one unclear output requirement; keep the reusable invocation short.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/02-planning-prompt/).
- This step imports only the prompt, not later procedure assets.

## Bring in this step

```sh
npm run lab:example -- --step 02-planning-prompt --preview
npm run lab:example -- --step 02-planning-prompt --stage
npm run lab:example -- --step 02-planning-prompt --apply
```

- Prerequisite: reviewed Lab 01 guidance. Presence allows authored equivalents; you must check their quality.

## If you already changed these files

- Stage and compare rather than overwrite your prompt. A clean but different authored file is still protected.
- Fix relative links in your own file, not by importing a later skill. [Recovery](../reference/examples.md).

## Client steps

### VS Code

- Use native prompt discovery to select `plan-api-change`; refresh/reload if it is absent.
- Inspect referenced files and the approval stop in the result. Record the actual reusable invocation.
- A pasted body is a valid fallback, but not native prompt-discovery evidence.

### Copilot CLI

- **Manual equivalent:** open the prompt file, use its body as the current request, and explicitly read its linked sources.
- Prompt-file discovery is not assumed. Label the invocation as manual rather than inventing a slash command.
- Confirm no implementation change; preserve response/ref before moving to the skill lab.

### Copilot app

- Use native prompt discovery only if your actual build exposes it; otherwise paste the body or ask the session to read this exact file as the request.
- Keep its role distinct from persistent project instructions. Record native versus manual route.
- Resume author session with a plan-only request after revision.

## Verify the result

- `npm run verify:exercise -- --step 02-planning-prompt`; inspect `git diff -- src tests` for no implementation edits.
- Evidence: reusable invocation, source references, scope/questions/tests, human approval point.
- Recovery: if code was proposed or edited prematurely, stop the agent and review that diff yourself; do not auto-reset learner work.
- Next: [03 — Skill](03-skill.md).
