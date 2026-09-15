# Start here

## Scope and prerequisites

- Local Git, approved Node 24.20.0/npm 11.19.0, package-registry access for `npm ci`, and an entitled supported client for runtime activities.
- No database, frontend, Docker, Python, cloud account, personal fork, or public repository is
  required. Optional live Spec Kit generation in Lab 09 requires Python 3.11+ and `uv`; its bundled
  artifact route does not.
- This release is local only. Obtain the prepared repository including local release tags; future distribution requires an approved readable clone or Git bundle.
- Owner/name/visibility and Pages audience remain undecided. [Publication boundaries](reference/publication.md).
- Never work in an account-notes repository. Confirm `git rev-parse --show-toplevel` before any edit.
- Create a learner branch from **main**, not examples or solution; preserve original main.
- Author/consumer must be separate sibling workspaces beneath a parent without `.github` customizations. Never nest consumer inside author.
- Do not run concurrent writers, or disable unrelated user/global customizations to force success.

## First commands

```sh
git switch main
git switch -c workshop-my-client
npm ci
npm run preflight
npm run verify:baseline
npm run lab:examples:fetch
```

- `preflight` records actual Node/npm/ref and lists manual capability checks; it does not interrogate or install Copilot.
- Toolchain mismatch is a failed preflight, not a claimed rehearsal. Use your approved runtime manager; do not modify global settings as a workshop step.
- If package/network/client access is blocked, inspect Markdown/assets and record **artifact-only**.
- Main's `npm test` covers baseline API and real stdio MCP. `verify:baseline` adds the intentional stub assertion, helper/asset/docs checks and production docs build.
- `npm run test:search` intentionally fails with `501 !== 200` or `501 !== 400`. Do not weaken those tests. After implementing, use `verify:solution`, not the starter-only check.

## Client steps

### VS Code

- Open only the author folder; confirm workspace trust is appropriate.
- Inspect installed VS Code/Copilot versions and managed settings; record them privately.
- Use native Chat customization discovery; check instructions, prompts, skills, and agents individually as their labs create them.
- For plugin consumption open the sibling consumer in a separate window. Local plugin settings are not portable paths.

### Copilot CLI

- Start an already-installed, approved `copilot` in author root. Do not install a client just to rehearse documentation.
- Record your CLI version using its help/version support and actual command output.
- `/skills reload` refreshes project skills; `/skills info` is the supported inspection entry point.
- Check `copilot plugin list --json` for conflicting `user-search-toolkit` registrations before Lab 04.

### Copilot app

- Open/register author as a distinct project/session, not the account-notes project.
- Inspect Customize Skills/MCP/Plugins and record actual app build. This guide does not assume precise button labels or local install parity.
- Consumer gets its own project/session. The local plugin path uses a **CLI-assisted bridge, unverified in app** until an actual rehearsal.
- If the bridge cannot be observed, continue in CLI/VS Code or record a package walkthrough; do not call it app-native completion.
- Lab 09's live Spec Kit skill discovery is also build-dependent. The artifact-first path remains
  available when generated skills are not discovered.

## Next

- [Lab 00](labs/00-start.md) · [Exact contract](reference/contract.md) · [Safe example operations](reference/examples.md).
