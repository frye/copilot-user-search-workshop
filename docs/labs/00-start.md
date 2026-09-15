# 00 — Start and choose a client

## Goal and starting workspace

- **Author**, learner branch from main; no completed customizations loaded.
- Prove baseline readiness, distinguish intentional 501, and record real client/build.
- Prerequisites: [start guide](../start.md). Artifact-only participation is acceptable when explicitly labeled.

## Build it yourself

1. Inspect task brief, approved contract, `src/api`, `tests`, `standards`, and `workshop/templates`.
2. Run `npm ci`, `npm run preflight`, and `npm run verify:baseline`.
3. Run `npm run test:search`; inspect the real expected 501 versus 200/400 failures, not a missing-dependency error.
4. Record `git rev-parse HEAD`, actual tools, client policy restrictions, and exact outcomes in `.lab-evidence/00-start.md`.
5. Run `npm start`, inspect health/list, then stop with Ctrl+C. No API UI is required.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/00-start/).
- Source checklist is an unfilled evidence aid, never a claim of successful setup.

## Bring in this step

```sh
npm run lab:example -- --step 00-start --preview
npm run lab:example -- --step 00-start --stage
npm run lab:example -- --step 00-start --apply
```

- Destination: `workshop/artifacts/setup-checklist.md`; no client discovery path.

## If you already changed these files

- Keep your real evidence; stage/compare checklist rather than replace it. [Whole-step conflict rules](../reference/examples.md).
- Missing release tag: use the local fetch verifier or obtain approved refs, never switch to examples.

## Client steps

### VS Code

- Open author folder, inspect workspace trust and Copilot build, and use integrated terminal for checks.
- Confirm no completed skill/prompt/role exists in native customization discovery.
- Keep this window as author after consumer gets its own window in 04.

### Copilot CLI

- Start CLI in author root; inspect `/skills info` and `copilot plugin list --json` for name conflicts.
- No workshop skill should be project-loaded yet. Do not remove unrelated user/global assets.
- Preserve a shell transcript separately from Copilot's assertions.

### Copilot app

- Open author as its own project/session and verify working directory/ref.
- Inspect Customize Skills/Plugins/MCP without installing anything. Record actual build and any policy limits.
- Native local plugin consumption remains a future CLI-assisted, unverified bridge—not a setup success claim.

## Verify the result

- `npm run verify:exercise -- --step 00-start` checks imported/authored checklist presence only.
- Baseline green, named search checks intentionally red for 501, server stopped, actual ref recorded.
- Recovery: fix dependency/runtime failures before claiming readiness; otherwise label artifact-only.
- Next: [01 — Instructions](01-instructions.md).
