<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Added principles: Preserve the Teaching Baseline; Contract Before Code; Approval-Gated Test-First Changes; Privacy-Safe Observability; Small and Reversible Scope
- Added sections: Workshop Constraints; Development Workflow
- Removed sections: none
- Follow-up TODOs: none
-->
# User Search Workshop Constitution

## Core Principles

### I. Preserve the Teaching Baseline
The four archived users, existing endpoints, and intentional 501 search starter MUST remain unchanged
until their named lab authorizes implementation. New exercises MUST build on the completed prior lab
without rewriting its learning objective or weakening its acceptance tests.

### II. Contract Before Code
Every behavior change MUST have one authoritative, testable contract before implementation begins.
Drafts and generated artifacts may inform the contract, but ambiguities MUST be resolved explicitly and
the approved contract MUST win when sources disagree.

### III. Approval-Gated Test-First Changes
Planning and requirements artifacts MUST be reviewed before source edits. Focused acceptance tests MUST
be added or identified before implementation, MUST fail for the expected reason, and MUST pass without
weakening existing regression coverage.

### IV. Privacy-Safe Observability
Logs MUST contain only bounded route labels and numeric status values. Names, raw query text,
query-bearing URLs, payloads, and other user-controlled values MUST NOT be logged.

### V. Small and Reversible Scope
Changes MUST be limited to the requested feature and directly related documentation or tests. Fixture
data, dependencies, unrelated files, publishing state, personal settings, and remote resources MUST
remain untouched unless separately approved.

## Workshop Constraints

- The service remains local, in-memory, and dependency-neutral.
- Main remains an unfinished starter; search returns 501 until Lab 07.
- Lab 09 is optional and starts only after the Lab 07 search contract passes.
- Supplied artifacts are reference material, not proof that a learner ran Spec Kit.
- No automatic commits, pushes, pull requests, package installation, or publication.

## Development Workflow

1. Read the task brief and authoritative contract or feature addendum.
2. Resolve behavior ambiguities and record the decisions in the feature specification.
3. Produce and review an implementation plan, requirements checklist, and dependency-ordered tasks.
4. Obtain explicit approval before editing application code.
5. Add focused tests, confirm the expected failure, implement, and run the named verification commands.
6. Review the diff and privacy behavior, then reconcile remaining gaps before declaring completion.

## Governance

This constitution governs Spec Kit artifacts produced for the workshop. Amendments require an explicit
rationale, semantic version change, review of affected artifacts, and confirmation that Labs 00-08
retain their original behavior. Compliance is checked during planning, analysis, implementation review,
and convergence.

**Version**: 1.0.0 | **Ratified**: 2026-09-15 | **Last Amended**: 2026-09-15
