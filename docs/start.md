# Start here

Get the workshop code and lab assets from the [Source repository](https://github.com/frye/copilot-user-search-workshop).

**Author workspace** means your existing local checkout of
`copilot-user-search-workshop`, where you will create the workshop customizations.
It is not a folder named `author`; do not create or rename a folder for this step.
A separate **consumer workspace** is created in [Lab 04](labs/04-plugin.md) to
use the packaged customizations. No consumer is needed in Lab 00.

## Scope and prerequisites

- Local Git, approved Node 24.20.0/npm 11.19.0, package-registry access for `npm ci`, and an entitled supported client for runtime activities.
- No database, frontend, Docker, Python, cloud account, personal fork, or public repository is
  required. Optional live Spec Kit generation in Lab 09 requires Python 3.11+ and `uv`; its bundled
  artifact route does not.
- Obtain the prepared repository including local release tags through an approved readable clone or Git bundle; the source link alone does not confirm hosted release tags or participant access.
- Pages publication and audience require separate approval. A repository link is not a published guide. [Publication boundaries](reference/publication.md).
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

- If this repository is already open in VS Code, keep using that window.
  Otherwise, choose **File > Open Folder...** and select the repository root:
  the folder containing `README.md`, `package.json`, `src/`, and `workshop/`.
- In the integrated terminal, run `git rev-parse --show-toplevel` to confirm the
  repository root before continuing. Use this terminal for the workshop commands.
- Confirm workspace trust is appropriate.
- Inspect installed VS Code/Copilot versions and managed settings; record them privately.
- Use native Chat customization discovery; check instructions, prompts, skills, and agents individually as their labs create them.
- Keep this as your author window. In [Lab 04](labs/04-plugin.md), open the new
  sibling consumer in a separate window for plugin consumption. Local plugin
  settings are not portable paths.

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
