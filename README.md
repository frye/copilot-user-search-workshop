# Copilot customization workshop: user search

- **Main is the working, unfinished teaching starter.** Search returns **501** until the capstone. Default tests are green.
- Learn to **author, test, package, install, update, and use** instructions, prompts, skills, plugins, MCP, and bounded roles—not just generate API code.
- **Published guide:** [Read the workshop](https://frye.github.io/copilot-user-search-workshop/). The [public source](https://github.com/frye/copilot-user-search-workshop) is shared, read-only workshop material for learners.
- Preview the same guide locally with `npm run docs:dev`; complete [plain Markdown start guide](docs/start.md) works without Pages or JavaScript.
- [Labs 00–09](docs/index.md) · [Client routes](docs/clients.md) · [Contract](docs/reference/contract.md) · [Examples and checkpoints](docs/reference/examples.md).
- [Presenter runbook](presenter/runbook.md) · [Observed validation](presenter/evidence/validation.md) · [Compatibility metadata](workshop/compatibility.json).

## Set up your own local copy

Use the [canonical setup guide](docs/start.md#start-here) for the full client and recovery guidance.
You need local Git, approved **Node 24.20.0 / npm 11.19.0**, approved source-read access for cloning,
package-registry access for `npm ci`, and an entitled supported client for runtime activities.
No fork, personal upstream, push, PR, cloud task, or submission is required.

> **Local safety:** Work only in your own clone. Never send learner writes, API requests that modify
> the repository, PRs, cloud-agent tasks, or submissions to the shared source. The disabled origin
> push URL below is a local Git guard, **not** API, PR, or cloud safety enforcement. Keep the source
> fetch URL; do not add another push route or change personal/global settings.

Choose an approved parent directory without `.github` customizations (including inherited
customizations from ancestors), outside any account-notes repository. Replace the parent path
below. `user-search-author` must not already exist, even as an empty directory or symlink.
If a command fails, stop and inspect; do not reset, overwrite existing paths/branches, or blindly
reconfigure another checkout. Use a fresh author name if needed.

### Clone main and protect the shared source

```sh
cd /path/to/approved-workshop-parent &&
test ! -e user-search-author &&
test ! -L user-search-author &&
git clone --branch main https://github.com/frye/copilot-user-search-workshop user-search-author &&
cd user-search-author &&
git remote set-url --push origin https://example.invalid/no-workshop-push &&
git switch -c workshop-my-client
```

This is a normal, non-shallow clone of **main**, not `starter-v2`, examples, or solution.
Keep main unchanged. Check `git rev-parse --show-toplevel`, `git branch --show-current`,
`git remote get-url origin`, and `git remote get-url --push origin` before continuing:
expect your author folder, `workshop-my-client`, the public source, and the disabled push URL.

### Check tools and baseline

```sh
node --version &&
npm --version &&
npm ci &&
npm run preflight &&
npm run verify:baseline
```

### Verify the local release refs

The normal clone should include both annotated tags. These checks use local Git objects only;
`lab:examples:fetch` verifies the existing examples tag and manifest without contacting origin.

```sh
test "$(git cat-file -t refs/tags/examples-v1)" = tag &&
test "$(git rev-parse --verify 'refs/tags/examples-v1^{commit}')" = df1328a4c1b9de89bdba5854a75f55fc42ba872d &&
test "$(git cat-file -t refs/tags/starter-v2)" = tag &&
test "$(git rev-parse --verify 'refs/tags/starter-v2^{commit}')" = 1afbf9be347343dc15bb390f4ac843dca44ce034 &&
npm run lab:examples:fetch
```

Stop on missing or mismatched refs. Use an owner-reviewed bundle or a fresh clone under existing
source-read approval; preserve the old checkout. Do not force-fetch, replace tags, edit locks,
relax hash checks, or enable network fetching. `approvedOrigin` remains `null`.
See [release recovery](docs/reference/examples.md#verify-local-release-refs).

### Run locally, then continue to Lab 00

```sh
npm run build &&
npm start
```

- `.nvmrc` is an input to your approved version manager, not an installer. A toolchain mismatch fails preflight; do not claim it as a rehearsal.
- API binds loopback only: `http://127.0.0.1:3000/health`. Stop it with Ctrl+C before switching workspaces.
- `npm run test:search` is **intentionally red on main**, asserting 200/400 where the stub returns 501. It is not in `npm test`.
- `npm run verify:solution` is the real completion check after implementation; it does not run the starter-only 501 assertion.
- `examples` / `examples-v1`: inert per-step assets. `solution` / `solution-v2`: explicit opt-in complete API reference. `starter-v2` is the pinned consumer base. Do not merge examples or solution into main.
- Create **only author** now. In [Lab 04](docs/labs/04-plugin.md), the existing `consumer:create` helper creates the named sibling `../workshop-consumer` and removes its origin. Never nest consumer inside author. Author maintains the canonical skill/package; consumer implements search only at the Lab 07 capstone.
- Continue with [Lab 00](docs/labs/00-start.md). No submission does **not** make required lab evidence or checkpoint prerequisites optional. Keep actual refs, commands/results, client/build, approvals, and gaps privately in `.lab-evidence/`; samples are not execution evidence.
- If policy blocks a client, packages, or network, use approved pairing or a labeled artifact-only walkthrough. Later plugin installation and MCP permissions still require approval and observed runtime evidence.
- Optional author-only runtime: `npm ci --prefix tools/author`, then prepend `tools/author/node_modules/node/bin` and `tools/author/node_modules/.bin` to PATH for that shell only.
- Optional Lab 09 Spec Kit generation uses the latest learner-approved `specify-cli`; the lab also
  ships a reviewed artifact packet and does not require Python or `uv`.

## Fast-forward to Lab 09

Create a separate Lab 09-ready consumer without overwriting current lab work:

```sh
npm run lab:09:bootstrap -- --preview --destination ../user-search-lab-09
npm run lab:09:bootstrap -- --apply --destination ../user-search-lab-09
```

- Dirty work is preserved in a new local backup branch and local commit.
- Review preview output first; the local commit includes every listed non-ignored untracked file.
- The original branch is restored.
- The sibling consumer has no remote, uses `workshop/lab-09-ready`, and contains the reviewed Lab 07
  solution plus current Lab 09 support.
- The command does not install dependencies, push, or run Spec Kit. Continue with the
  [Lab 09 instructions](docs/labs/09-spec-kit.md#fast-forward-from-an-earlier-lab).

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
- The existing public source and live guide do not approve any new release or deployment. [Future publication](docs/reference/publication.md) remains owner-approved, manual, and protected-environment gated; local builds are not publication.
