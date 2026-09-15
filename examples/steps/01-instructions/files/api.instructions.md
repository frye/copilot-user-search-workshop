---
applyTo: "src/api/**/*.ts"
---

# API-scoped rules

- Preserve native HTTP routing; `/api/v1/users/search` must precede get-by-ID.
- Match fullName only; trim and normalize q, validate repeated q/limit and strict decimal 1–25 limit syntax.
- Sort ordinal IDs before slicing; compute total from all matches. Do not mutate frozen fixtures.
- Keep exact status/envelope/content type from `docs/reference/contract.md`.
- Log bounded route/status only, never request URLs, names, queries or response payloads.
- Make focused changes to search after human approval; no external service/database additions.
- Run `npm test` plus `npm run test:search`; report actual exits and failures.
