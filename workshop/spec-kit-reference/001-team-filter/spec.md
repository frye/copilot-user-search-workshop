# Feature Specification: Filter User Search by Team

**Feature Branch**: `001-team-filter`

**Created**: 2026-09-15

**Status**: Ready for planning

**Input**: User description: "Add an optional team filter to user search so callers can narrow
name-search results to one team while preserving existing behavior, deterministic totals, fixture
immutability, and privacy-safe logging."

## Clarifications

### Session 2026-09-15

- Q: How should team values match and how should blank or unknown values behave? → A: Trimmed,
  case-insensitive exact match; blank means no team filter; an unknown team returns an empty result.

## User Scenarios & Testing

### User Story 1 - Narrow user search to one team (Priority: P1)

An API caller can add a team value to the existing user search request and receive only matching users
without losing the existing name search, ordering, limit, total, and privacy guarantees.

**Why this priority**: Team filtering is the complete user-visible value of this bounded feature.

**Independent Test**: Search for `lee` in `platform` with a limit of 1 and confirm the response contains
only Avery Lee while `total` counts every platform match before limiting.

**Acceptance Scenarios**:

1. **Given** the archived user fixture, **When** a caller searches with `team=PLATFORM`, **Then** only
   users whose team is `platform` are returned in ascending ordinal ID order.
2. **Given** both `q` and `team`, **When** a caller performs a search, **Then** both filters are applied
   before sorting and limiting.
3. **Given** an omitted or whitespace-only `team`, **When** a caller performs a search, **Then** the
   existing search behavior is unchanged.
4. **Given** a team value that is not present in the fixture, **When** a caller performs a search,
   **Then** the response is successful with an empty item list and total zero.
5. **Given** repeated `team` parameters, **When** a caller performs a search, **Then** the response uses
   the existing invalid-query error envelope.

### Edge Cases

- Leading and trailing whitespace around `team` is ignored.
- Team matching is exact after trimming and case folding; partial team names do not match.
- Repeated `team` is invalid even when the repeated values are identical or blank.
- Unknown query keys continue to have no effect.
- `total` counts matches after both filters and before `limit`.
- Requests remain deterministic and never mutate the archived fixture.
- Logs reveal no team value, name, raw query text, query-bearing URL, or payload.

## Requirements

### Functional Requirements

- **FR-001**: The search operation MUST accept an optional singleton `team` filter.
- **FR-002**: The system MUST trim leading and trailing whitespace from `team` and compare it to the
  complete stored team value using case-insensitive exact matching.
- **FR-003**: An omitted or blank `team` MUST apply no team filter.
- **FR-004**: An unknown non-blank team MUST return the normal success envelope with no matching items
  and `total` equal to zero.
- **FR-005**: The system MUST reject repeated `team` parameters, including repeated identical or blank
  values, with `{"error":{"code":"INVALID_QUERY","message":"team must occur at most once."}}`.
- **FR-006**: The system MUST apply the existing full-name query and the team filter before sorting by
  ordinal user ID, then apply the existing limit.
- **FR-007**: The success response shape MUST remain exactly `{"items":[...],"total":N}`, where `total`
  counts all matches after filtering and before limiting.
- **FR-008**: Existing `q`, `limit`, unknown-query-key, route precedence, response content type, and
  error behavior MUST remain unchanged.
- **FR-009**: The archived user fixture and its order MUST remain unchanged.
- **FR-010**: Logs MUST contain only the bounded route label and numeric status, never names, team
  values, query text, query-bearing URLs, or payloads.
- **FR-011**: Focused automated tests MUST cover the primary scenario and every listed edge case.

### Key Entities

- **User**: An existing immutable record identified by `id`, with `fullName` and `team`.
- **Search criteria**: Optional singleton `q`, `team`, and `limit` values used only for the current
  request; no criteria are persisted.
- **Search result**: The existing response envelope containing limited matching users and the
  pre-limit total.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Every supported team-filter scenario returns the exact documented status and response
  shape in automated acceptance tests.
- **SC-002**: Existing baseline and search acceptance suites continue to pass unchanged after the
  feature is implemented.
- **SC-003**: Repeating the same combined search at least four times returns byte-equivalent data and
  leaves the archived fixture unchanged.
- **SC-004**: Captured access events for successful and invalid team-filter requests contain only
  `route` and numeric `status`.
- **SC-005**: The feature is implemented without adding a database, external service, or runtime
  dependency.

## Assumptions

- Lab 07 has already implemented the approved base search contract.
- Team values remain the existing fixture strings; this feature adds no team registry or new data.
- Locale-specific case folding is out of scope; matching follows the service's existing
  case-insensitive comparison approach.
- Authentication, authorization, pagination beyond `limit`, and team discovery are out of scope.
