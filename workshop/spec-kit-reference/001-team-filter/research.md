# Research: Filter User Search by Team

## Decision: Extend the existing search route

- **Decision**: Add `team` to `GET /api/v1/users/search`.
- **Rationale**: The requested behavior narrows the same result set and composes naturally with the
  existing `q` and `limit` criteria.
- **Alternatives considered**: A new team endpoint would duplicate search behavior; changing the list
  endpoint would broaden the original contract.

## Decision: Normalize then compare exactly

- **Decision**: Trim `team` and compare case-insensitively against the complete stored team value.
- **Rationale**: Exact matching avoids surprising partial matches while tolerating casing and
  accidental surrounding whitespace.
- **Alternatives considered**: Substring matching was rejected as ambiguous for short team names;
  strict known-value validation was rejected because an unknown team is a normal zero-result search.

## Decision: Preserve current parsing and ordering

- **Decision**: Validate singleton parameters first, apply `q` and `team` filters, sort by ordinal ID,
  compute total, then apply limit.
- **Rationale**: This preserves the existing contract and makes the new criterion composable.
- **Alternatives considered**: Filtering after limiting would produce incorrect totals and omit valid
  matches; mutating the fixture was rejected.

## Decision: Use a separate acceptance suite

- **Decision**: Add `tests/team-filter/team-filter.test.ts` and dedicated npm scripts.
- **Rationale**: Lab 07 completion must remain independently verifiable while Lab 09 gains its own
  intentional red/green gate.
- **Alternatives considered**: Adding these cases to `test:search` would make the earlier lab depend on
  the optional feature.

## Decision: Keep logs unchanged

- **Decision**: Continue emitting only `{ route: "search", status }`.
- **Rationale**: Team values are user-controlled query data and are prohibited from logs.
- **Alternatives considered**: Logging normalized team values or full URLs was rejected for privacy.
