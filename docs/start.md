# Start here

## Scope and prerequisites

This is the canonical setup route: clone the public workshop into a fresh **author** folder, keep
all learner work local, and create the separate **consumer** only in Lab 04.
Read the [published guide](https://frye.github.io/copilot-user-search-workshop/) or this plain
Markdown; both describe the same multi-page lab route.

- Local Git, approved Node **24.20.0** / npm **11.19.0**, approved source-read access for cloning, package-registry access for `npm ci`, and an entitled supported client for runtime activities.
- No database, frontend, Docker, Python, cloud account, personal fork, or public repository is
  required of the learner. Optional live Spec Kit generation in Lab 09 requires Python 3.11+ and `uv`; its bundled
  artifact route does not.
- The [public source](https://github.com/frye/copilot-user-search-workshop) and guide are already published. Your changes stay local; no fork, personal upstream, push, PR, cloud task, or submission is required. [Publication boundaries](reference/publication.md).
- Never work in an account-notes repository. Confirm `git rev-parse --show-toplevel` before any edit.
- Choose an approved parent without `.github` customizations, including inherited customizations from ancestors. Author and the later consumer must be separate siblings, never nested.
- Do not run concurrent writers, or disable unrelated user/global customizations to force success.

> **Local safety:** The shared source is read-only workshop material for learners. Do not send
> learner writes, API requests that modify the repository, PRs, cloud-agent tasks, or submissions
> to it. Disabling the origin push URL is a local Git guard, **not** API, PR, or cloud safety
> enforcement. Keep origin's fetch URL; do not add another push route or change personal/global
> settings. Later client/plugin/MCP actions still need their own approvals.

## Clone main and protect the shared source

Replace the parent path below with your approved directory. Use a fresh `user-search-author`
destination: the checks refuse any existing path, including an empty directory or symlink.
The `&&` chain stops on failure so a failed clone cannot reconfigure another checkout.
If a path or branch already exists, inspect it and choose a fresh name; never reset, overwrite,
or blindly reconfigure existing learner work.

```sh
cd /path/to/approved-workshop-parent &&
test ! -e user-search-author &&
test ! -L user-search-author &&
git clone --branch main https://github.com/frye/copilot-user-search-workshop user-search-author &&
cd user-search-author &&
git remote set-url --push origin https://example.invalid/no-workshop-push &&
git switch -c workshop-my-client
```

Use this normal, non-shallow **main** clone, not a ZIP, examples/solution checkout, or
`starter-v2` entry point. That older bootstrap tag is only the pinned consumer base; current main
supplies the reviewed release locks and helper support. Preserve original main.

Check `git rev-parse --show-toplevel`, `git branch --show-current`, `git remote get-url origin`,
and `git remote get-url --push origin`: expect your author folder, `workshop-my-client`, the
public source fetch URL, and `https://example.invalid/no-workshop-push`. Do not attempt a push
to test the guard.

## Check tools and baseline

Run in author using the approved runtime. `.nvmrc` is an input to your approved version manager,
not an installer. This setup installs project dependencies only, not clients or global tools.

```sh
node --version &&
npm --version &&
npm ci &&
npm run preflight &&
npm run verify:baseline
```

- `preflight` records actual Node/npm/ref and lists manual capability checks; it does not interrogate or install Copilot.
- Toolchain mismatch is a failed preflight, not a claimed rehearsal. Do not modify global settings as a workshop step.
- If package/network/client access is blocked, use approved pairing or inspect Markdown/assets and record **artifact-only**. Do not bypass policy or describe unobserved runtime work as completed.
- Main's `npm test` covers baseline API and real stdio MCP. `verify:baseline` adds the intentional stub assertion, helper/asset/docs checks and production docs build.

## Verify the local release refs

The normal clone should include the published annotated tags below. Verify their local object
types and peeled commits against the reviewed pins, then let the existing helper check the
examples manifest. None of these commands fetches from the network when the refs are present;
they do not evaluate or execute content from a release ref.

```sh
test "$(git cat-file -t refs/tags/examples-v1)" = tag &&
test "$(git rev-parse --verify 'refs/tags/examples-v1^{commit}')" = df1328a4c1b9de89bdba5854a75f55fc42ba872d &&
test "$(git cat-file -t refs/tags/starter-v2)" = tag &&
test "$(git rev-parse --verify 'refs/tags/starter-v2^{commit}')" = 1afbf9be347343dc15bb390f4ac843dca44ce034 &&
npm run lab:examples:fetch
```

`examples-v1` supplies inert per-step assets; `starter-v2` supplies the later clean consumer.
Stop on missing or mismatched refs. Obtain an owner-reviewed Git bundle containing the required
refs or use a fresh clone under existing source-read approval; keep the old checkout and learner
work. Do not force-fetch, replace tags, edit locks, relax hash guards, or add network permission.
`approvedOrigin` remains `null`; do not pass network flags to `lab:examples:fetch`.
See [safe release recovery](reference/examples.md#verify-local-release-refs).

## Run locally and keep the workspace boundary

```sh
npm run build &&
npm start
```

The API binds loopback only. Inspect `http://127.0.0.1:3000/health` and the existing user list;
stop with Ctrl+C before switching workspaces. Never log names, query text, query-bearing URLs,
or payloads.

- `npm run test:search` intentionally fails with `501 !== 200` or `501 !== 400`. Search stays **501 until Lab 07**; a missing dependency is not that expected failure. Do not weaken the acceptance tests.
- After implementing in consumer, use `npm run verify:solution`, not the starter-only check.
- Create **only author** during setup. In [Lab 04](labs/04-plugin.md), run the existing `consumer:create` helper with destination `../workshop-consumer`. It creates a fresh named sibling from the pinned base and removes consumer origin; it does not install the package.
- Author maintains the canonical skill/package. Consumer loads the installed package, configures MCP/roles, and later implements search. Do not copy the project skill into consumer to bypass installation.
- No submission does **not** make lab evidence or checkpoint prerequisites optional. Follow the dependency route; keep real refs, client/build, commands/results, discovery source/version, approvals, and gaps privately in `.lab-evidence/`. Sample output is not your execution evidence.

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
