# Data Model: Filter User Search by Team

## Existing entity: User

| Field | Type | Constraint |
| --- | --- | --- |
| `id` | string | Existing unique ordinal identifier; unchanged |
| `fullName` | string | Existing searchable display name; unchanged |
| `team` | string | Existing team label used for exact normalized filtering; unchanged |

The four `User` records remain frozen and in their archived order. The feature adds no persistence,
relationship, or lifecycle state.

## Request value: Team filter

| Property | Rule |
| --- | --- |
| Cardinality | Zero or one `team` query parameter |
| Normalization | Trim leading/trailing whitespace, then case-fold |
| Blank value | Equivalent to omission |
| Match | Exact comparison with the complete normalized `User.team` |
| Unknown value | Valid request with zero matches |
| Repeated value | Invalid query, including identical or blank duplicates |

## Derived result

1. Validate singleton `q`, `team`, and `limit`.
2. Normalize `q` and `team`.
3. Filter users by full-name substring and exact team match.
4. Sort matches by ordinal ID ascending.
5. Capture `total`.
6. Return up to `limit` items.

No state transition occurs; each request derives a result without mutating input data.
