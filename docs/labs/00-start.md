# 00 — Start and choose a client

## Goal and starting workspace

- **Author**, learner branch from main; no completed customizations loaded.
- Prove baseline readiness, distinguish intentional 501, and record real client/build.
- Prerequisites: complete the [canonical local-clone setup](../start.md#start-here), including approved Node **24.20.0** / npm **11.19.0**, baseline and both pinned local release refs.
- The public source is read-only for learners. Author has the source fetch URL and disabled origin push URL; that Git guard does not prevent API writes, PRs, or cloud-agent tasks. None belongs in this local-only learner route.
- No consumer yet: Lab 04 creates the fresh named sibling `../workshop-consumer` through `consumer:create`, which removes its origin. Do not clone the bootstrap tag as your author entry point.
- Approved pairing or explicitly labeled artifact-only participation is acceptable when policy blocks runtime work. No submission does not waive required evidence or checkpoint prerequisites.

## Build it yourself

1. Confirm `git rev-parse --show-toplevel`, learner branch from main, and origin fetch/push URLs match the setup guide. Inspect task brief, approved contract, `src/api`, `tests`, `standards`, and `workshop/templates`; preserve fixture users and learner work.
2. Run `npm ci`, `npm run preflight`, `npm run verify:baseline`, and the start guide's local tag checks followed by `npm run lab:examples:fetch`. Retain the actual setup results if already completed in this same checkout/session.
3. Run `npm run test:search`; inspect the real expected 501 versus 200/400 failures, not a missing-dependency error.
4. Author `workshop/artifacts/setup-checklist.md` listing the required observations; record `git rev-parse HEAD`, actual tools, client policy restrictions, and exact outcomes privately in `.lab-evidence/00-start.md`.
5. Run `npm run build` then `npm start`, inspect loopback health/list, then stop with Ctrl+C before changing workspaces. No API UI is required. Never log names, query text, query-bearing URLs, or payloads.

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
- Missing or mismatched release tag: stop and follow [local release recovery](../reference/examples.md#verify-local-release-refs) using an approved bundle or fresh clone. Never force-fetch, replace tags, relax hashes, enable implicit network, or switch to examples.

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
- Search stays 501 until Lab 07; implement only in consumer then. `npm run verify:solution` is the final completion check, not today's starter-only baseline.
- Recovery: fix dependency/runtime failures before claiming readiness; otherwise label artifact-only.
- Next: [01 — Instructions](01-instructions.md).
