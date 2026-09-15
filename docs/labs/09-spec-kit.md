# 09 — Spec Kit: extend search with a team filter

## Goal and starting workspace

- **Consumer**, after 07 passes; 08 is recommended but not required.
- Use Spec Kit artifacts to specify, plan, approve, implement, and reconcile one bounded follow-on
  feature: an optional `team` filter for user search.
- The primary route requires no Spec Kit installation. Supplied artifacts are reference material, not
  evidence that you ran the generator.

## Build it yourself

1. Confirm the base capstone is complete with `npm run verify:solution`. Stop if search still returns
   501 or the original acceptance contract is not green.
2. Preview, stage, then apply the reviewed artifact packet. Read
   `workshop/artifacts/spec-kit-reference/README.md` and `001-team-filter/provenance.json` first.
3. Follow the artifacts in workflow order: constitution → spec and clarification → plan/research/design
   → reviewer-owned API checklist → tasks → analysis.
4. Review `checklists/api.md` as “unit tests for English.” Mark an item only after the linked
   requirement is complete, clear, consistent, and measurable. Checkbox state is not implementation
   status.
5. Record the approval in `checkpoint-template.md`, then follow `tasks.md`: add/run the focused tests
   before editing `src/api/search.ts`.
6. Implement the smallest compatible change:
   - optional singleton `team`;
   - trimmed, case-insensitive exact match;
   - blank means no team filter; unknown means a successful empty result;
   - apply `q` and `team` before sorting, total calculation, and `limit`;
   - repeated `team` returns the dedicated error from `contracts/user-search.md`;
   - preserve the original `q`/`limit` error, fixtures, other endpoints, and bounded logs.
7. Run the focused and full verification commands, review the diff, then reconcile every requirement
   and task. If you did not run Spec Kit, label the result **artifact-guided**, not generated.

## Optional: install and run the latest Spec Kit

The no-install route above is complete. Use this route only when local policy allows Python 3.11+,
`uv`, package download, and repository-local generated files.

```sh
# Installs the latest published specify-cli at the time you run it.
uv tool install specify-cli
specify version

# Existing installations can check and then explicitly upgrade.
specify self check
specify self upgrade
```

From a clean, reviewed consumer state:

```sh
specify init --here --force --non-interactive --integration copilot --script sh
git status --short
```

- Initialization adds `.specify/` and `.github/skills/speckit-*`. Review every generated path before
  use; `--force` permits merging into this non-empty repository.
- Do **not** broadly ignore `.github/`, `.github/skills/`, `.specify/`, or `specs/`. Those are normal
  project artifacts if you decide to adopt Spec Kit.
- Do not overwrite the workshop’s existing skill or learner-authored files. Stop and compare if a
  generated destination collides.
- Record the actual version and source. These instructions intentionally do not pin a release.

Run the Copilot skills in order:

```text
/speckit-constitution Preserve the approved contracts, use test-first approval gates, keep logs free
of query values and names, and make only small reversible changes.

/speckit-specify Add an optional team filter to user search. Preserve all existing search behavior,
the archived fixture, deterministic totals, and privacy-safe logs.

/speckit-clarify Focus on matching semantics, blank and unknown values, repeated parameters, and
composition with q and limit.

/speckit-plan Use the existing TypeScript and Node.js HTTP structure, frozen in-memory fixture, and
node:test harness. Add no dependency or persistence.

/speckit-checklist Create a reviewer-owned API requirements-quality checklist.
/speckit-tasks Include focused tests before implementation and preserve prior verification gates.
/speckit-analyze
```

Review and approve the generated artifacts before:

```text
/speckit-implement
/speckit-converge
```

Repeat implement/converge only when convergence appends justified remaining tasks. Do not use
`taskstoissues`; this workshop does not create remote issues.

## Inspect the example

- Open `workshop/spec-kit-reference/README.md` for the bundled packet.
- `workshop/spec-kit-reference/001-team-filter/provenance.json` records the actual preparation version
  and commands.
- The packet is a genuine reviewed snapshot, but its completed checklists and analysis are not your
  evidence. Your checkpoint must contain your own approvals, commands, failures, fixes, and results.

## Bring in this step

```sh
# CONSUMER; local reviewed packet, no Spec Kit installation
node scripts/spec-kit-reference.mjs --preview
node scripts/spec-kit-reference.mjs --stage
node scripts/spec-kit-reference.mjs --apply
```

## If you already changed these files

- `--apply` refuses any destination collision. Use `--stage` and compare the named files instead.
- Keep learner-authored specs, checklists, tests, and implementation. Never replace actual evidence
  with the supplied packet.
- A consumer created before this Lab 09 update may not contain the support script, packet, or focused
  test. Create a fresh consumer from the updated author workspace or copy only those named Lab 09
  files after reviewing the diff.
- Live Spec Kit initialization is optional. If you already initialized it, keep useful `.specify/`
  and `specs/` work; do not apply the reference packet over active generated artifacts.

## Client steps

### VS Code

- The artifact-first path works in the repository and terminal without Spec Kit discovery.
- For the live path, inspect the generated `speckit-*` skills and source indicators before invoking
  them. Record actual extension/client versions and generated paths.
- Use source control to review `.specify/`, `specs/`, and `.github/skills/speckit-*` separately from
  the feature implementation.

### Copilot CLI

- The artifact-first path works with ordinary file and terminal operations.
- After live initialization, reload/inspect project skills as supported by your installed CLI and
  invoke the generated `/speckit-*` skills.
- Record the actual `specify version`; a copied reference packet does not prove skill discovery or
  invocation.

### Copilot app

- The artifact-first path is fully usable in a local project session.
- Treat live discovery of generated Spec Kit skills as a candidate until observed in your app build.
  If unavailable, continue artifact-guided and label the result accurately.
- Keep [Research → Plan → Implement compared with Spec Kit](../reference/spec-kit-vs-built-in.md) as
  a side route; the numbered exercise remains Spec Kit-focused.

## Verify the result

Before implementation, the new suite must be red for the expected reason:

```sh
npm run test:team-filter
```

After implementation:

```sh
npm run verify:speckit-solution
npm run verify:exercise -- --step 09-spec-kit
```

- `verify:speckit-solution` includes the complete Lab 07 solution gate plus the team-filter suite.
- Evidence includes reviewed requirements, explicit implementation approval, the expected red result,
  green focused/full results, diff review, privacy review, and convergence or documented remaining
  tasks.
- Recovery: preserve learner artifacts, remove only the named reference copy if unwanted, and
  uninstall Spec Kit only through its documented integration/tool commands after reviewing modified
  generated files.
