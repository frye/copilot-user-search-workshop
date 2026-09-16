# 00 — Start and choose a client

## Goal and starting workspace

**Author workspace** means your existing local checkout of
`copilot-user-search-workshop`, where you will create the workshop customizations.
It is not a folder named `author`; do not create or rename a folder for this step.

- Use a learner branch from main in this checkout; no completed customizations loaded.
- Prove baseline readiness, distinguish intentional 501, and record real client/build.
- Prerequisites: [start guide](../start.md). Artifact-only participation is acceptable when explicitly labeled.

## Build it yourself

1. Inspect task brief, approved contract, `src/api`, `tests`, `standards`, and `workshop/templates`.
2. Run `npm ci`, `npm run preflight`, and `npm run verify:baseline`.
3. Run `npm run test:search`; inspect the real expected 501 versus 200/400 failures, not a missing-dependency error.
4. Author `workshop/artifacts/setup-checklist.md` listing the required observations; record `git rev-parse HEAD`, actual tools, client policy restrictions, and exact outcomes privately in `.lab-evidence/00-start.md`.
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

- If this repository is already open in VS Code, keep using that window.
  Otherwise, choose **File > Open Folder...** and select the repository root:
  the folder containing `README.md`, `package.json`, `src/`, and `workshop/`.
- In the integrated terminal, run `git rev-parse --show-toplevel` to confirm the
  repository root before continuing. Use this terminal for the lab checks.
- Inspect workspace trust and the Copilot build.
- Confirm no completed skill/prompt/role exists in native customization discovery.
- Keep this as your author window. [Lab 04](04-plugin.md) creates a separate
  sibling consumer workspace, which you will open in its own VS Code window;
  no consumer is needed in Lab 00.

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
