# Search acceptance contract

This is the single authoritative approved contract. Draft ambiguity exercises are not requirements.

## Preserve the fixture and baseline

| Archived order | ID | fullName | team |
| --- | --- | --- | --- |
| 1 | u-003 | Casey Lee | research |
| 2 | u-001 | Avery Lee | platform |
| 3 | u-004 | Riley Chen | platform |
| 4 | u-002 | Morgan Lee | data |

- `GET /health` → 200 `{"status":"ok"}`.
- `GET /api/v1/users` → 200 `{"items":[...archived order...],"total":4}`.
- `GET /api/v1/users/:id` → 200 user object when found.
- Missing resources and unsupported methods → 404 `{"error":{"code":"NOT_FOUND","message":"Resource not found."}}`.
- JSON responses use `application/json; charset=utf-8`. No database or external data source.

## Implement only in the capstone

- `GET /api/v1/users/search` routes before get-by-ID.
- Singleton `q`: trim leading/trailing whitespace, then case-insensitive substring match against **fullName only**. Omitted/blank matches all.
- Singleton `limit`: default **10**. Accept only decimal strings **1–25** without signs, decimal points, exponent notation, whitespace, or leading zeros.
- Reject repeated `q` or `limit`, even identical/blank duplicates. Unrecognized query keys have no effect.
- Sort matches by ordinal ID ascending **before** limiting; never mutate the fixture.
- Success is exactly `{"items":[...users...],"total":N}`; `total` counts all matches **before** limiting.
- No matches → 200 `{"items":[],"total":0}`.
- Anchor: `?q=lee&limit=1` → 200 `{"items":[{"id":"u-001","fullName":"Avery Lee","team":"platform"}],"total":3}`.
- Invalid query → 400:

```json
{"error":{"code":"INVALID_QUERY","message":"q and limit must occur at most once; limit must be an integer from 1 to 25 without leading zeros."}}
```

## Privacy and repeatability

- Never log names, raw query text, query-bearing URLs, or payloads.
- The server's injected logger receives only bounded `route` and numeric `status`; unknown paths use `unknown`, not user-controlled text.
- Repeat requests produce identical results; list ordering and frozen fixture contents remain unchanged.
- Tests exercise routing, exact shapes, all valid limit boundaries, malformed/duplicate input, empty/no matches, repeatability, immutability, and logs.

## Starter versus completion

- Main always returns 501 for the search route: `{"error":{"code":"NOT_IMPLEMENTED","message":"Search is the workshop exercise."}}`.
- `npm test` stays green on both states.
- `npm run verify:baseline` includes a starter-only 501 assertion.
- `npm run test:search` is intentionally red on main and must pass unchanged on solution.
- `npm run verify:solution` runs regression plus real full acceptance; it never pretends 501 is a successful solution.
