---
name: api-change-workflow
description: Use for planning, approved implementation, or review of a small HTTP API change; retrieve fixture MCP standards and return versioned evidence or an explicit file fallback.
---

# API change workflow — MCP-aware procedure

## Inputs and boundaries

- Read the current workspace's `workshop/task-brief.md`, `workshop/approved-contract.md`, repository/scoped instructions and current diff.
- Confirm actual ref, author versus consumer, selected stage, approval and owned files.
- Use [review checklist](references/review-checklist.md). Consumer must use the installed package, not a copied local canonical skill.

## Retrieve standards before planning or review

- When configured and permitted, call **get_api_conventions** and **get_validation_commands** with `{}`.
- Inspect `source`, fixture `version` and returned requirements/commands; record actual tool results, not an assertion of tool use.
- These tools are read-only fixture lookups, not execution tools. Do not pass paths, credentials, URLs or commands as arguments.
- If unavailable or denied, read `standards/api-conventions.json` and `standards/validation-commands.json`; explicitly label **file-based fallback; no MCP invocation observed**.
- Do not invent tool results or treat malformed fixtures as authoritative. Resolve genuine conflict against the approved contract.

## Plan

- Return goal, requirements/questions, focused files, tests, privacy risks, actual validation commands and a human approval stop.
- Identify baseline 501 versus completed-search expectations. No edits for planning/review-only requests.

## Implement only after explicit approval

- Use one writer in consumer; preserve fixture and unrelated/learner changes.
- Own only approved search code and focused tests. Add a meaningful independent acceptance case.
- Run regression and full search acceptance; report actual exits and failures without weakening tests.

## Independent review

- Compare contract, diff, tests and checklist. Findings need file/line, requirement, impact and reproduction.
- Do not edit code. Generic shell access means boundaries are advisory, not technically read-only.

## Return evidence and stop

- Report current ref, approval, changed files, installed toolkit source/version, tool source/fixture version or explicit fallback, commands/exits and remaining work.
- Separate static presence from real client loading/invocation. Stop if installed revision is stale or duplicated.
- Never auto-commit, merge, push, publish, install, alter global settings or start cloud tasks.
