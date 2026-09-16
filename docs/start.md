# Start here

Get the workshop code and lab assets from the [Source repository](https://github.com/frye/copilot-user-search-workshop).

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

## How to complete each lab

1. Read **Goal and starting workspace** and the artifact table. Every filename is relative to the
   named workspace root, not to `docs/` or the file currently open in your editor. **Author** owns
   canonical customization/package sources; **consumer** owns application changes and client setup.
2. Under **Choose your route**, select **Build it yourself**, **Copy & Paste**, or **Bring in this
   step**. Only that preparation route is shown in the interactive guide. **Bring in this step**
   is selected on a first visit; your next choice is remembered across labs and reloads in this
   browser, separately from your VS Code/CLI/app selection. Complete **one** route, not all three.
   Selecting a tab never imports a file or runs a command.
3. For each copy block, create any missing parent directory, open the exact **File** path, and
   follow its action: **create** only if absent, **append** without removing existing rules, or
   **merge/replace** only after comparing and preserving learner-owned content. Copy the fenced
   contents, not the fence markers or the filename paragraph.
4. Follow **Continue with this lab** below the tabs, whichever route you chose. The shared
   inventory, runtime/build steps, evidence templates, **Client steps**, **Try it**, and
   **Verify the result** apply to every route. Complete later revisions where the shared
   sequence requests them, not during initial artifact creation. Copying a file does not load
   it, and loading it does not prove that an agent used it.
5. Run **Verify the result** and fill the lab's exact `.lab-evidence/<lab-id>.md` file with your
   observations. Replace `not run`/`not observed` only with results you actually obtained. Record
   ref, client/build, native/manual route, source/version, approvals, command exit codes, and gaps.
   Do not save names, query text, query-bearing URLs, credentials, or payloads in logs/evidence.

An explicit `?route=build`, `?route=copy`, or `?route=import` link selects that route. A link to a
heading inside a route opens its panel even if another route was saved. Otherwise the last saved
choice is used. Client links keep their separate `client` setting. If browser storage is blocked,
the guide reports that persistence is unavailable while keeping the tabs usable.

Repository Markdown, no-JavaScript viewing, and printing expose all three alternatives for
readability. They still mean **choose one**, then continue with the shared steps below.

The copyable material supplies complete customization rules, not fabricated execution results.
Environment-specific values such as absolute directories and discovered tool identifiers are
explained where they are needed. API implementation answers remain behind the capstone's separate
solution walkthrough; copying a checklist is not completing search.

Keep this guide open from the **author** checkout or its local generated site when moving to a
consumer. The consumer helper starts from a pinned release, so its bundled guide may be older than
the guide you are following. Do not move release tags or copy the entire author tree to refresh it.

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
