# Spec Kit and built-in Research → Plan → Implement

Use these as two related workflows, not interchangeable labels. Lab 09 stays focused on Spec Kit;
this page is a side route for choosing the lighter built-in path when durable Spec Kit artifacts are
not needed.

| Concern | Spec Kit | Built-in Research → Plan → Implement |
| --- | --- | --- |
| Starting point | Project constitution plus a feature description | A research question or change request in the current session |
| Durable outputs | Repository-resident spec, clarifications, plan, research/design, checklists, tasks, and feature state | Session research and plan, with code changes after approval |
| Requirements gate | Built-in spec-quality checklist plus optional reviewer-owned checklists | Human review of research and plan |
| Consistency gate | `speckit-analyze` compares spec, plan, tasks, and constitution | Review the plan against cited repository evidence |
| Execution | `speckit-implement` follows dependency-ordered tasks | Implement the approved built-in plan |
| Completion | `speckit-converge` finds gaps and appends remaining tasks | Run validation and compare the result with the approved plan |
| Best fit | Shared, repeatable work where specifications should persist with the repository | Bounded work where session-local research and planning are sufficient |

## Apply the built-in flow to the same feature

### Research

- Read `workshop/task-brief.md`, `workshop/approved-contract.md`,
  `docs/reference/contract.md`, `src/api/search.ts`, and the existing search tests.
- Identify compatibility constraints, privacy rules, route behavior, and the smallest test boundary.
- Return findings and unresolved decisions only; do not edit.

### Plan

- Define the `team` semantics and exact error behavior.
- Name the files and tests to change.
- Preserve Lab 07 verification and add a separate Lab 09 gate.
- Stop for explicit approval.

### Implement

- Add the focused test and establish the expected red state.
- Make the approved `search.ts` change.
- Run focused and full verification, review logs and fixture immutability, and reconcile the plan.

## Practical distinction

The built-in flow is usually faster for one session. Spec Kit adds value when the constitution,
requirements, decisions, tasks, and convergence state should remain inspectable and reusable after
the session ends. Do not claim one workflow ran when you used the other; record the actual path in the
Lab 09 checkpoint.
