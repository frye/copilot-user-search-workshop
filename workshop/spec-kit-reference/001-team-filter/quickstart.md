# Quickstart: Validate the Team Filter

## Prerequisite

Complete Lab 07 so `npm run verify:solution` passes before starting this optional feature.

## Red

```sh
npm run test:team-filter
```

Expected before implementation: the focused suite fails because `team` is ignored or the search
route is still the starter 501.

## Green

Implement the approved tasks, then run:

```sh
npm run test:team-filter
npm run verify:speckit-solution
```

The focused suite proves:

- trimmed, case-insensitive exact team matching;
- blank and unknown team behavior;
- duplicate rejection;
- composition with `q` and `limit`;
- pre-limit totals, deterministic results, fixture immutability, and privacy-safe logs.

## Manual anchor

With the local API running after implementation:

```sh
curl 'http://127.0.0.1:3000/api/v1/users/search?q=lee&team=platform&limit=1'
```

Expected response:

```json
{"items":[{"id":"u-001","fullName":"Avery Lee","team":"platform"}],"total":1}
```
