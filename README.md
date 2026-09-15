# Copilot customization workshop: user search

- **Main is the working, unfinished teaching starter.** Search returns **501** until the capstone. Default tests are green.
- Learn to **author, test, package, install, update, and use** instructions, prompts, skills, plugins, MCP, and bounded roles—not just generate API code.
- **Primary guide:** GitHub Pages is prepared but **not published**. There is no live guide URL yet; owner, visibility, and Pages audience await approval.
- Preview the same guide locally with `npm run docs:dev`; complete [plain Markdown start guide](docs/start.md) works without Pages or JavaScript.
- [Labs 00–09](docs/index.md) · [Client routes](docs/clients.md) · [Contract](docs/reference/contract.md) · [Examples and checkpoints](docs/reference/examples.md).
- [Presenter runbook](presenter/runbook.md) · [Observed validation](presenter/evidence/validation.md) · [Compatibility metadata](workshop/compatibility.json).

## Start

```sh
git switch -c workshop-my-client
node --version
npm --version
npm ci
npm run preflight
npm run verify:baseline
npm run build
npm start
```

- Tested toolchain: Node **24.20.0**, npm **11.19.0**; `.nvmrc` is an input to your approved version manager, not an installer.
- API binds loopback only: `http://127.0.0.1:3000/health`. Stop it with Ctrl+C before switching workspaces.
- `npm run test:search` is **intentionally red on main**, asserting 200/400 where the stub returns 501. It is not in `npm test`.
- `npm run verify:solution` is the real completion check after implementation; it does not run the starter-only 501 assertion.
- `examples` / `examples-v1`: inert per-step assets. `solution` / `solution-v2`: explicit opt-in complete API reference. `starter-v2` is the pinned consumer base. Do not merge examples or solution into main.
- No remote repository, deployment, cloud task, PR, personal client setting, or plugin installation was created by preparing this workshop.
- Optional author-only runtime: `npm ci --prefix tools/author`, then prepend `tools/author/node_modules/node/bin` and `tools/author/node_modules/.bin` to PATH for that shell only.
- Optional Lab 09 Spec Kit generation uses the latest learner-approved `specify-cli`; the lab also
  ships a reviewed artifact packet and does not require Python or `uv`.

## Documentation preview

```sh
npm run docs:dev
# Production subpath rehearsal:
npm run docs:build
npm run docs:preview
# Optional maintainer browser rehearsal after production build:
npm run browser:install
npm run test:browser
```

- Follow the local address printed by VitePress, including `/copilot-user-search-workshop/`.
- GitHub Pages serves documentation only, not the API or MCP server.
- Browser binaries and process scratch stay repository-local; browser tests stop their preview server automatically.
- Publication runbook is approval-gated; never infer a Pages URL or expose private content without owner approval.
