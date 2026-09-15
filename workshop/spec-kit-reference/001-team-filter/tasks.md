# Tasks: Filter User Search by Team

**Input**: Design documents from `/specs/001-team-filter/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/user-search.md`

**Tests**: Required by FR-011 and the workshop constitution.

**Organization**: One independently testable user story, followed by documentation and convergence.

## Phase 1: Setup

**Purpose**: Establish the optional Lab 09 verification path without changing earlier lab gates.

- [ ] T001 Add `test:team-filter` and `verify:speckit-solution` scripts in `package.json`

---

## Phase 2: User Story 1 - Narrow user search to one team (Priority: P1) MVP

**Goal**: Compose an optional team filter with the existing user search behavior.

**Independent Test**: `q=lee&team=platform&limit=1` returns Avery Lee with total 1, while blank,
unknown, repeated, and privacy cases match the feature contract.

### Tests for User Story 1

- [ ] T002 [US1] Add the complete red acceptance suite in `tests/team-filter/team-filter.test.ts`
- [ ] T003 [US1] Run `npm run test:team-filter` and record the expected pre-implementation failure

### Implementation for User Story 1

- [ ] T004 [US1] Validate singleton `team` with its dedicated error while preserving existing query errors in `src/api/search.ts`
- [ ] T005 [US1] Normalize and compose the team predicate before sorting, total calculation, and limiting in `src/api/search.ts`
- [ ] T006 [US1] Run `npm run test:team-filter` and `npm run verify:speckit-solution`

**Checkpoint**: The optional feature is complete without changing fixture data or earlier lab gates.

---

## Phase 3: Polish & Cross-Cutting Concerns

**Purpose**: Reconcile implementation and durable artifacts.

- [ ] T007 [P] Update the Lab 09 learner checkpoint with actual commands and results in `workshop/artifacts/spec-kit-checkpoint.md`
- [ ] T008 Review `git diff` for unrelated changes and inspect captured access events for prohibited data
- [ ] T009 Run the Spec Kit convergence step or manually reconcile every incomplete task and requirement

---

## Dependencies & Execution Order

- T001 precedes T002-T006.
- T002 precedes T003, and T003 precedes source edits T004-T005.
- T004 and T005 affect the same file and run sequentially.
- T006 follows implementation.
- T007 can proceed in parallel with T008 after T006; T009 follows both.

## Implementation Strategy

1. Add the dedicated verification script.
2. Write and run the focused tests to establish the red state.
3. Implement the smallest compatible parser and filter change.
4. Run the focused and full verification commands.
5. Record evidence and converge artifacts with the completed implementation.
