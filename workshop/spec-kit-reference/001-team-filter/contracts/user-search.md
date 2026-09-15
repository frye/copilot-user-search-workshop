# Contract Addendum: User Search Team Filter

## Request

`GET /api/v1/users/search`

| Query parameter | Cardinality | Behavior |
| --- | --- | --- |
| `q` | zero or one | Existing trimmed, case-insensitive full-name substring filter |
| `team` | zero or one | Trimmed, case-insensitive exact team filter; blank means no filter |
| `limit` | zero or one | Existing decimal integer from 1 through 25; default 10 |

Unknown query keys remain ignored. Repeated `q`, `team`, or `limit` is invalid.

## Success

```json
{
  "items": [
    { "id": "u-001", "fullName": "Avery Lee", "team": "platform" }
  ],
  "total": 1
}
```

- Status: `200`
- Content type: `application/json; charset=utf-8`
- `total` counts matches after `q` and `team` filtering and before `limit`.
- Empty matches use `{"items":[],"total":0}`.

## Invalid query

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "team must occur at most once."
  }
}
```

- Status: `400`
- Repeated `team` uses this envelope.
- Existing malformed `limit` and repeated `q`/`limit` cases retain their original exact envelope and
  message.

## Compatibility

- Route precedence, response shape, ordering, fixture contents, and unrelated endpoints are unchanged.
- Access events remain exactly `{ "route": "search", "status": number }`.
