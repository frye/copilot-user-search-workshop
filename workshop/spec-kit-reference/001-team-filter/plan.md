# Implementation Plan: Filter User Search by Team

**Branch**: `001-team-filter` | **Date**: 2026-09-15 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-team-filter/spec.md`

## Summary

Extend the existing in-memory user search with a validated optional `team` parameter. Reuse the
current `URLSearchParams` parsing and immutable fixture, apply normalized name and team predicates
before ID sorting and limiting, and prove compatibility through a dedicated acceptance suite.

## Technical Context

**Language/Version**: TypeScript 5.9.3 on Node.js 24.20.x

**Primary Dependencies**: Node.js built-in HTTP, URL, and test APIs; no new dependency

**Storage**: In-memory frozen fixture in `src/api/users.ts`

**Testing**: Node.js test runner with strict assertions and the existing HTTP harness

**Target Platform**: Local loopback HTTP service

**Project Type**: Single TypeScript API service

**Performance Goals**: Preserve deterministic linear filtering over the four-record fixture with no
additional I/O

**Constraints**: Keep the exact response envelopes, route precedence, fixture contents, and
privacy-safe access event shape; do not weaken Labs 00-08 tests

**Scale/Scope**: One optional query parameter, one implementation module, and one focused test suite

## Constitution Check

- **Preserve the Teaching Baseline**: PASS. Work starts after Lab 07 and does not alter fixtures or
  earlier verification commands.
- **Contract Before Code**: PASS. `spec.md` contains resolved, testable behavior.
- **Approval-Gated Test-First Changes**: PASS. Tasks add and run the focused tests before source edits.
- **Privacy-Safe Observability**: PASS. The existing bounded access event remains unchanged.
- **Small and Reversible Scope**: PASS. No dependency, storage, publication, or unrelated-file change.

The same gates remain satisfied after design.

## Project Structure

### Documentation (this feature)

```text
specs/001-team-filter/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── user-search.md
├── checklists/
│   ├── requirements.md
│   └── api.md
└── tasks.md
```

### Source Code (repository root)

```text
src/api/
├── search.ts
└── users.ts

tests/
├── http.ts
├── search/search.test.ts
└── team-filter/team-filter.test.ts

package.json
```

**Structure Decision**: Keep the existing single-service layout. Extend only `search.ts`, add an
independent acceptance suite under `tests/team-filter/`, and add dedicated package scripts. No model,
route, or dependency layer is needed.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
