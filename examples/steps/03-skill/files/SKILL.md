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
