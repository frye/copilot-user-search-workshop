# 00 — Start and choose a client

GitHub Copilot offers AI assistance through clients such as VS Code, the CLI, and the app, with
capabilities that depend on the client and organizational policy. Choosing a supported client and
establishing a known local baseline helps you distinguish customization behavior from setup problems,
including the workshop's intentional 501 search response.

**Documentation:** [About GitHub Copilot](https://docs.github.com/en/copilot/get-started/about-github-copilot).

## Goal and starting workspace

**Author workspace** means your existing local checkout of
`copilot-user-search-workshop`, where you will create the workshop customizations.
It is not a folder named `author`; do not create or rename a folder for this step.

- Use a learner branch from main in this checkout; no completed customizations loaded.
- Prove baseline readiness, distinguish intentional 501, and record real client/build.
- Prerequisites: complete the [canonical local-clone setup](../start.md#start-here), including approved Node **24.20.0** / npm **11.19.0**, baseline and both pinned local release refs.
- The public source is read-only for learners. Author has the source fetch URL and disabled origin push URL; that Git guard does not prevent API writes, PRs, or cloud-agent tasks. None belongs in this local-only learner route.
- No consumer yet: Lab 04 creates the fresh named sibling `../workshop-consumer` through `consumer:create`, which removes its origin. Do not clone the bootstrap tag as your author entry point.
- Approved pairing or explicitly labeled artifact-only participation is acceptable when policy blocks runtime work. No submission does not waive required evidence or checkpoint prerequisites.

## Choose your route

Choose **one** way to obtain the setup checklist, not all three. The first-visit tab is **Bring in this step**; selecting a tab does not run commands or create files. Every route leads to the same shared readiness and evidence work.

### Build it yourself

1. In the author repository, read `workshop/task-brief.md` and `workshop/approved-contract.md` before authoring. Open or create `workshop/artifacts/setup-checklist.md` in your editor; create missing parent directories yourself. If the checklist exists, merge requirements rather than replacing learner observations.
2. Give it a setup-checklist title and fields for author root/branch/ref, Node/npm versions, selected client/build, policy restrictions, conflicting skill/plugin names, and participation route: native runtime, manual equivalent, artifact-only, or blocked with a reason.
3. Add observation slots for `npm ci`, `npm run preflight`, `npm run verify:baseline`, and the separately run `npm run test:search`. Request each command's actual exit and a privacy-safe summary; explicitly distinguish expected search 501-versus-200/400 assertions from dependency/build failures.
4. Add health/list inspection and server-shutdown observations. State that unchecked items are not proof of execution or client loading and that names, query text, query-bearing URLs, and payloads must never be logged. Leave results unobserved until you perform the shared steps; writing this checklist is not running its commands.

[Continue with this lab](#continue-with-this-lab).

### Copy-and-paste

Create the parent directories if needed in your editor. Copy only the file body, not the fence or **File** label. If the checklist already exists, merge it and retain every prior observation. The private evidence journal is created in the shared continuation, regardless of route.

**File:** `workshop/artifacts/setup-checklist.md` (create; author).

```markdown
# Setup checklist — fill with your own observations

- Workspace root and author branch: **record actual values**.
- `git rev-parse HEAD`: **record actual SHA**.
- Node/npm and selected client/build: **record actual versions**.
- `npm ci`, `npm run preflight`, `npm run verify:baseline`: **record commands, exits and relevant output**.
- `npm run test:search`: **record actual 501 versus 200/400 failure, not copied narrative**.
- Health/list request: **record result and server shutdown**.
- Conflicting plugin/skill names and managed-policy limits: **inspect, never disable unrelated entries**.
- Participation route: native runtime / manual equivalent / artifact-only / blocked, with reason.
- This checklist is not a claim that any command or client loading succeeded.
```

[Continue with this lab](#continue-with-this-lab).

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/00-start/).
- Source checklist is an unfilled evidence aid, never a claim of successful setup.
- The helper verifies the pinned `examples-v1` release. Selecting this route does not import anything; explicitly run each chosen operation from author.

```sh
npm run lab:activate -- --step 00-start
```

- Destination: `workshop/artifacts/setup-checklist.md`; no client discovery path.
- Activation checks the complete step before applying it and is safe to rerun unchanged. Optional inspection and comparison are described in [safe example operations](../reference/examples.md#optional-inspection-and-comparison); they are not a required sequence. Import does not overwrite learner work or fill your private evidence journal.

#### If you already changed these files

- Keep your real evidence; stage/compare checklist rather than replace it. [Whole-step conflict rules](../reference/examples.md).
- Missing or mismatched release tag: stop and follow [local release recovery](../reference/examples.md#verify-local-release-refs) using an approved bundle or fresh clone. Never force-fetch, replace tags, relax hashes, enable implicit network, or switch to examples.

[Continue with this lab](#continue-with-this-lab).

## Continue with this lab

Whichever preparation route you completed, do the shared steps below **once**. Do not repeat another route. Keep this current guide open in author throughout the workshop: the pinned sibling consumer created in Lab 04 may contain an older guide.

### Artifact inventory

All paths below are relative to the author repository root.

| File | Action | Purpose |
| --- | --- | --- |
| `workshop/artifacts/setup-checklist.md` | Prepared by your chosen route | Reusable list of readiness observations, not fabricated results |
| `.lab-evidence/00-start.md` | Create; update with actual observations | Private, ignored journal for this run |

### Shared readiness

1. Open the author repository, not an account-notes project. Confirm the root, learner branch, ref, existing changes, and origin fetch/push URLs using the identity commands below and the [start guide](../start.md). If still on main, follow that guide to create a learner branch; do not switch branches over unreviewed work. Do not switch to examples or solution.
2. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, and its authoritative target `docs/reference/contract.md`. Then inspect `src/api/server.ts`, `src/api/search.ts`, `src/api/users.ts`, `tests/baseline/api.test.ts`, `tests/starter/stub.test.ts`, and `tests/search/search.test.ts`. Identify the unchanged health/list/get routes, frozen fixture, and deliberate search 501 without implementing anything.
3. Read `standards/api-conventions.json`, `standards/validation-commands.json`, and `workshop/templates/authoring-guide.md`. The templates are inert orientation, not completed customizations.
4. Create `.lab-evidence/00-start.md` from the shared template below, preserving any existing journal. Obtain the root/ref/tool versions from the terminal and the actual client build from its version/About view. Leave unperformed operations **not run** and unseen behavior **not observed**; record only privacy-safe summaries.
5. Check Node/npm against the approved versions in `package.json` and the [start guide](../start.md). Run the dependency/preflight/baseline commands individually and complete the [local tag checks](../start.md#verify-the-local-release-refs), followed by `npm run lab:examples:fetch`; record each exit before proceeding. Retain actual setup results already obtained in this same checkout/session. A missing package, unavailable registry, runtime mismatch, or build failure is not the intentional search failure. Use an approved runtime or label the blocked activity artifact-only; do not install globally or change personal settings.
6. Run the separate acceptance command below. It must build successfully and reach assertions that observe 501 where the contract requires 200/400. Keep the test name and status mismatch, not sensitive request/response output. Do not edit tests or implement search to turn this lab green.
7. Complete the health/list exercise under [Try it](#try-it), select one [client route](#client-steps), and fill the journal. Client directions and Try it describe the same exercise; do not run it twice merely because both sections mention it. The checklist is an observation aid; the private journal is the actual run record.

Run these read-only identity checks from author:

```sh
git rev-parse --show-toplevel
git branch --show-current
git rev-parse HEAD
git status --short
git remote get-url origin
git remote get-url --push origin
node --version
npm --version
```

Run each readiness command separately so its failure cannot be confused with acceptance:

```sh
npm ci
npm run preflight
npm run verify:baseline
```

Then run this intentionally red command separately:

```sh
npm run test:search
```

### Evidence journal

Create this private file in your editor if absent. If it exists, update actual observations without replacing them with the blank template. Never retain names, query text, query-bearing URLs, or payloads.

**File:** `.lab-evidence/00-start.md` (create; author).

```markdown
# Lab 00 — setup evidence

## Workspace and client

- Author root: not recorded.
- Learner branch and `git rev-parse HEAD`: not recorded.
- Existing work before the lab: not inspected.
- Node/npm versions and preflight compatibility: not observed.
- Client name/build and where the version was read: not observed.
- Policy limits or conflicting skill/plugin names: not inspected.
- Route (native runtime / manual equivalent / artifact-only / blocked) and reason: not selected.

## Readiness

| Command or check | Actual exit/result | Privacy-safe observation |
| --- | --- | --- |
| Required source/contract reading | Not performed | Not observed |
| npm ci | Not run | Not observed |
| npm run preflight | Not run | Not observed |
| npm run verify:baseline | Not run | Not observed |
| npm run test:search | Not run | Record assertion name and 501 versus expected status only |
| npm start | Not run | Not observed |
| Health inspection | Not run | Record bounded route/status and check result only |
| List inspection | Not run | Record bounded route/status and check result only |
| Server shutdown and post-stop probe | Not run | Not observed |
| npm run verify:exercise -- --step 00-start | Not run | Not observed |

## Client exercise

- First readiness request and source/context evidence: not invoked.
- Checklist or evidence correction made after first request: none recorded.
- Second readiness request and observed difference: not invoked.
- Manual-read fallback used and why: not observed.
- Native discovery claims supported by actual indicators: none recorded.

## Remaining work

- Readiness decision and reason: not assessed.
- Failures, recovery attempted, and still-blocked activities: not recorded.
- Search implementation: not authorized in this lab.
- Do not copy sample results into this journal or retain names, query text, query-bearing URLs, or payloads.
```

## Client steps

### VS Code

1. If this repository is already open in VS Code, keep using that window. Otherwise, choose **File > Open Folder...** and select the repository root containing `README.md`, `package.json`, `src/`, and `workshop/`. Check the integrated terminal root/ref against the identity commands. Inspect workspace trust and installed VS Code/Copilot versions; record the actual build rather than this guide's expected capabilities.
2. Open `workshop/artifacts/setup-checklist.md` and `.lab-evidence/00-start.md`. Use the integrated terminal for the checks and a separate terminal for the foreground server.
3. Inspect the available Chat customization/context views for unexpected workshop skills/prompts/roles. Lab 00 creates no native customization; if discovery is absent, manually read the two files or attach them to Chat and state **manual context equivalent**.
4. Send the readiness request under **Try it**. Inspect any cited file/context indicators and check the answer against actual terminal output. Do not treat fluent prose as execution evidence.
5. Update one observation, repeat the request, and record the difference and remaining gaps. Keep this window as author; [Lab 04](04-plugin.md) creates the separate sibling consumer, which gets its own window. No consumer is needed in Lab 00.

### Copilot CLI

1. In an author-root terminal, run the identity/readiness checks, then start your already-approved `copilot`. Record the installed CLI build using its available version/help support.
2. Use `/skills info` in the interactive session and `copilot plugin list --json` in a shell to inspect workshop-name conflicts. No workshop skill should be project-loaded yet; do not remove unrelated user/global assets.
3. Send the readiness request naming both exact files. If this build does not discover or attach them, manually open/read the files and paste the necessary privacy-safe content as context; label it **manual context equivalent**.
4. Compare the answer with actual command exits, not Copilot's assertions. Keep a privacy-safe command summary, not a payload-bearing transcript.
5. Update one observed entry, repeat the request, and record the behavior change. Leave unavailable client features as not observed; no installation is required for artifact-only participation.

### Copilot app

1. Open author as its own project/session and verify its working directory/ref using the identity commands in an author terminal. Record the app build from the build/About information actually exposed.
2. Inspect Customize Skills/Plugins/MCP without installing anything, if your build exposes those views. Record policy limits and conflicting names without disabling unrelated entries.
3. Open/read the checklist and private evidence file, then send the readiness request. If file/context discovery is absent, explicitly ask the session to read those exact paths or paste their privacy-safe content and label **manual context equivalent**.
4. Inspect available source/context indicators and compare the response with actual command results. Native local plugin consumption remains a future CLI-assisted, unverified bridge—not a setup success claim.
5. Update a real observation, repeat the request in the author session, and record the difference. If the client is unavailable, keep the artifact route and mark both invocations not run.

## Try it

1. After baseline has built `dist`, run the server in a dedicated author terminal. This stays in the foreground; it is not an installation or a background daemon.

   ```sh
   PORT=3000 npm start
   ```

2. In a second author terminal, run this read-only inspection. It examines bodies in memory but prints only bounded route/status and a check result, never user records or payloads. No API UI is required.

   ```sh
   node --input-type=module <<'NODE'
   for (const [route, path] of [['health', '/health'], ['list', '/api/v1/users']]) {
     const response = await fetch(`http://127.0.0.1:3000${path}`);
     const body = await response.json();
     const shapeMatches = route === 'health'
       ? body.status === 'ok' && Object.keys(body).length === 1
       : Array.isArray(body.items) && body.items.length === 4 && body.total === 4 &&
         Object.keys(body).sort().join(',') === 'items,total';
     const ok = response.status === 200 &&
       response.headers.get('content-type') === 'application/json; charset=utf-8' &&
       shapeMatches;
     console.log(JSON.stringify({ route, status: response.status, check: ok ? 'pass' : 'fail' }));
     if (!ok) process.exitCode = 1;
   }
   NODE
   ```

3. Stop **your** server with Ctrl+C in its original terminal. Check that a new request fails to connect; an exit of zero means something is still listening, not verified shutdown.

   ```sh
   curl --silent --output /dev/null --max-time 2 http://127.0.0.1:3000/health
   ```

   If port 3000 was already occupied before you started, do not stop the existing process. Select an unused local port, replace 3000 in all three commands consistently, and record it. Never kill processes by name. Do not retain a server log containing payloads.

4. Use this ready-to-paste request with your selected client. If discovery is absent, explicitly read or attach the two exact files; that is a manual read, not customization discovery.

   ```text
   Read workshop/artifacts/setup-checklist.md and .lab-evidence/00-start.md in the current author workspace. Do not edit files, run commands, or implement search. Distinguish recorded observations from not-run/not-observed entries. List the smallest remaining readiness checks and explain why baseline green and search acceptance red can coexist. Never infer command success or include names, query text, request URLs, or payloads.
   ```

5. **Revision and second invocation:** fill one previously unobserved entry using an actual check, or correct a misclassified failure after inspecting its real output. Run the same request again. Observe whether the answer now separates that observed check from remaining unknowns; it must not claim everything passed. If nothing new could be checked, record that limitation rather than inventing a difference.

## Verify the result

- `npm run verify:exercise -- --step 00-start` checks imported/authored checklist presence only.
- Baseline green, named search checks intentionally red for 501, server stopped, actual ref recorded.
- Save the real outcomes in `.lab-evidence/00-start.md`. A populated template or passing file-presence check proves neither runtime readiness nor client discovery.
- Search stays 501 until Lab 07; implement only in consumer then. `npm run verify:solution` is the final completion check, not today's starter-only baseline.
- Recovery: fix dependency/runtime failures before claiming readiness; otherwise label artifact-only.
- Next: [01 — Instructions](01-instructions.md).
