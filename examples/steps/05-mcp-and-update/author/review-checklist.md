# MCP-aware API review checklist

- Confirm installed package revision and source; consumer must have no local canonical skill.
- Retrieve both fixture tools with `{}` when available. Retain returned source/version; label file fallback when not invoked.
- Reject invented/stale tool results and arbitrary path/command arguments.
- Preserve health/list/get and the exact archived four-user fixture.
- Search routes before get-by-ID, uses fullName-only trimmed case-insensitive substring, blank matches all.
- Strict singleton q/limit, including repeated blank q, and decimal limit 1–25 without whitespace/signs/leading zeros.
- Sort ordinal IDs before limiting; total counts all matches. Anchor `q=lee&limit=1` → u-001, total 3.
- Assert exact status/shape/content type, no-match emptiness, repeatability and frozen fixture.
- Logs contain only bounded route/status, never query-bearing URL, q, names or payloads.
- Isolated HTTP servers close; at least one meaningful learner test extends acceptance.
- Report actual regression/full acceptance exits, approved file scope and unresolved findings.
- No publishing/install/global-setting side effects. Reviewer with shell is advisory-only.
