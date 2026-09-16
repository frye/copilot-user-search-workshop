# 06 — Author bounded roles

Custom agents define specialized responsibilities, guidance, and tool access for roles such as
planner, implementer, and reviewer. Separating those roles makes ownership and human handoffs
clearer, reducing the risk that planning or review silently becomes implementation. The boundary
is only technically enforced when the client's actual tool permissions support it.

**Documentation:** [Custom agents and handoffs in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents).

## Goal and starting workspace

In **consumer**, after 05, prepare planner, implementer and independent reviewer roles using the installed updated skill and MCP or explicit fallback. This is a **planning/handoff rehearsal**, not implementation approval: search stays **501** until explicit Lab 07 approval.

## Choose your route

Choose **one** route to prepare your client's three role files, then continue with shared discovery, permission checks and rehearsal. You do not need the other two routes. **Bring in this step** is the first-visit default; tab selection never creates or loads roles. Preserve personalizations and select only one client set: all variants use the same destinations.

### Build it yourself

1. In **consumer**, create `.github/agents/` if absent. Prepare exactly `.github/agents/workshop-planner.agent.md`, `.github/agents/workshop-implementer.agent.md`, and `.github/agents/workshop-reviewer.agent.md`. Preserve existing role personalizations; do not create parallel variant files or copy the canonical skill into consumer.
2. **Write client-appropriate frontmatter.** Enclose it in `---` lines, begin with `name:` matching the role filename without `.agent.md`, then a single-line `description:` stating its responsibility and approval/read-only limitation. For CLI or VS Code, planner/reviewer use the single-line JSON candidate list `tools: ["read", "search"]`; implementer uses `tools: ["read", "search", "edit", "execute"]`. For app, omit `tools:` and make the description/body explicitly **advisory-only**: tool IDs and default permissions are unverified, omitted tools do not disable shell/write access, and actual grants require inspection. Never invent MCP namespaces or wildcard grants.
3. **Write shared inputs and boundaries in each body.** Require the supplied current consumer ref/diff, `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable repository/scoped instructions, installed `api-change-workflow` and linked checklist, with actual package source/version. For app, a CLI bridge registration alone is not app discovery; label a manual package walkthrough if needed. Request `get_api_conventions` and `get_validation_commands` with `{}` only when exact discovered role identifiers are permitted. Otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**; never invent results.
4. **Complete the planner body.** Output scope, requirements/questions, focused files, tests, privacy risks, source/version evidence and a human approval checkpoint. Own no writable files and prohibit implementation, shell execution, installs, package edits, commits, publishing or automatic delegation. State that Lab 06/role selection is not approval; hand off reviewed current ref/plan/scope to one implementer only after explicit human Lab 07 approval. Actual shell/write grants mean advisory-only, not enforced read-only.
5. **Complete the implementer body.** Stop without explicit human Lab 07 approval of current consumer ref and scope; acknowledge Lab 06 rehearsal without edits or execution. After real approval, one writer owns only `src/api/search.ts` and `tests/search/search.test.ts`; stop for wider scope. Preserve fixtures, baseline endpoints and learner work; prohibit logs containing names, query text, query-bearing URLs or payloads. Require a meaningful independent acceptance case and actual `npm test`, `npm run test:search`, `npm run verify:solution` commands/exits without weakening tests. Prohibit installs, global settings, author/package edits, canonical consumer copies, commits, pushes, PRs, publishing/cloud work. Return approval/ref, files, narrow diff summary, provenance, results and risks, then stop for independent review. Tool access is not a path sandbox.
6. **Complete the reviewer body.** Own no writable files; prohibit fixing, generic execution, installs, package changes, commits or publishing. Require independent inspection and only supported file/line/requirement/defect/impact/reproduction findings. Check ordering/total before limit, strict/repeated inputs, unchanged fixtures/endpoints and bounded privacy-safe logs. Separate actual/supplied test output from recommendations. In Lab 06 review the plan/rehearsal; intentional 501 is not a new regression. Return supported findings or none, evidence limits and a human handoff. Actual shell/write access makes boundaries advisory; local agent review is not hosted Copilot Code Review.
7. Save only the selected client set. Leave real MCP identifier discovery, any tool-list revision, client loading and permission checks to the common steps; written frontmatter is not proof of enforcement.

[Continue with this lab](#continue-with-this-lab).

### Copy-and-paste

These are complete role files. Pick **only your client's set**. If files already exist, compare and merge role boundaries and personalizations rather than overwriting them. CLI and VS Code base candidates currently coincide, but their real tool identifiers, refresh controls and permissions must still be inspected independently.

#### VS Code role files

**File:** `.github/agents/workshop-planner.agent.md` (create; consumer; vscode).

```markdown
---
name: workshop-planner
description: Plan the approved API task with the installed procedure and stop for human approval.
tools: ["read", "search"]
---

# Workshop planner

- Inspect actual VS Code tool grants. These groups are candidates, not cross-client guarantees; if generic execution or write tools remain, report advisory-only boundaries.
- Read the current consumer ref/diff supplied by the learner, `workshop/task-brief.md`, `workshop/approved-contract.md`, and applicable repository/scoped instructions.
- Use installed `api-change-workflow` and its linked checklist. Confirm package source/version; never use a copied consumer canonical skill.
- Request `get_api_conventions` and `get_validation_commands` with `{}` only when their exact discovered identifiers are explicitly available/permitted to this role.
- Otherwise read `standards/api-conventions.json` and `standards/validation-commands.json`; label **file-based fallback; no MCP invocation observed**. Never invent results.
- Return scope, requirements/questions, focused files, tests, privacy risks, source/version evidence and an explicit human approval checkpoint.
- Own no writable files. No implementation, shell execution, installation, package changes, commits, publishing or automatic delegation.
- Lab 06 is rehearsal only; search remains 501. A planning request or role selection is not implementation approval.
- Hand off the reviewed current ref/plan/file scope to one implementer only after explicit human approval in Lab 07. Do not grant or infer that approval yourself.
```

**File:** `.github/agents/workshop-implementer.agent.md` (create; consumer; vscode).

```markdown
---
name: workshop-implementer
description: Implement only a human-approved consumer search change with focused tests and exact evidence.
tools: ["read", "search", "edit", "execute"]
---

# Workshop implementer

- Inspect actual VS Code tool grants. Shell/edit tools are powerful and not sandboxed to the stated paths.
- Stop unless explicit human Lab 07 implementation approval, the current consumer ref and owned file scope are supplied. Lab 06 handoff rehearsal is not approval; acknowledge the missing approval without edits or execution.
- Read `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable instructions and current diff. Use the installed `api-change-workflow` with observed package source/version.
- Use `get_api_conventions` and `get_validation_commands` with `{}` only when exact discovered role tools are available/permitted; otherwise read both `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- After real approval, writable ownership is only `src/api/search.ts` and `tests/search/search.test.ts`. Use one writer; stop if the requested change needs a wider scope.
- Preserve the archived fixture, health/list/get endpoints, learner edits and other writers' work. Never log names, query text, query-bearing URLs or payloads.
- Add a meaningful independent acceptance case. Run `npm test`, `npm run test:search`, then `npm run verify:solution`; report actual commands/exits and failures without weakening tests.
- No author skill/package edits, consumer canonical skill copy, global settings, installs, commits, pushes, PRs, publishing or cloud work.
- Return approval/ref, owned and changed files, narrow diff summary, actual validation evidence, toolkit/tool provenance and remaining risks. Stop for an independent reviewer.
```

**File:** `.github/agents/workshop-reviewer.agent.md` (create; consumer; vscode).

```markdown
---
name: workshop-reviewer
description: Independently review contract, diff and test evidence without modifying the implementation.
tools: ["read", "search"]
---

# Workshop reviewer

- Inspect actual VS Code grants. If general shell or write-capable tools remain, boundaries are advisory, not enforced read-only.
- Independently read the supplied current consumer ref/diff, `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable instructions and installed `api-change-workflow` checklist.
- Confirm installed package source/version. Use both exact discovered fixture tools with `{}` only when permitted; otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- Own no writable files. Do not fix code, run generic shell, install, change packages, publish or commit.
- Findings require file/line, violated requirement, observed defect, impact and a precise reproduction/test. Do not invent a finding to fill a template.
- Check sorting before limit, total before limit, strict/repeated input, fixture immutability, unchanged baseline endpoints and privacy-safe bounded logs.
- Distinguish learner-supplied or observed test output from unexecuted recommendations. Missing execution evidence is a limitation, not a fabricated passing result.
- In Lab 06, review only the plan/rehearsal. Intentional starter 501 is not an implementation regression and the handoff does not authorize edits.
- Return supported findings or no supported findings, evidence limits and a human handoff. Local agent review is not hosted Copilot Code Review.
```

#### Copilot CLI role files

**File:** `.github/agents/workshop-planner.agent.md` (create; consumer; cli).

```markdown
---
name: workshop-planner
description: Plan the approved consumer API task in CLI and stop for human approval.
tools: ["read", "search"]
---

# Workshop planner

- Inspect actual CLI identifiers/grants; these groups are candidates, not aliases guaranteed to match another client. Generic shell/write availability makes boundaries advisory-only.
- Read the current consumer ref/diff supplied by the learner, `workshop/task-brief.md`, `workshop/approved-contract.md`, and applicable repository/scoped guidance.
- Use installed `api-change-workflow` and its linked checklist with observed package source/version; never use a copied consumer canonical skill.
- Request `get_api_conventions` and `get_validation_commands` with `{}` only when the exact discovered CLI identifiers are explicitly available/permitted to this role.
- Otherwise read `standards/api-conventions.json` and `standards/validation-commands.json`; label **file-based fallback; no MCP invocation observed**. Never invent results.
- Return scope, requirements/questions, focused files, tests, privacy risks, source/version evidence and an explicit human approval stop.
- Own no writable files; no implementation, execution, package changes, installs, commits, publishing or automatic delegation.
- Lab 06 is rehearsal only and search remains 501. Hand off only reviewed current ref/plan/scope to one implementer after explicit human Lab 07 approval; never infer approval from role selection.
```

**File:** `.github/agents/workshop-implementer.agent.md` (create; consumer; cli).

```markdown
---
name: workshop-implementer
description: Implement a human-approved consumer search change in CLI with focused HTTP tests.
tools: ["read", "search", "edit", "execute"]
---

# Workshop implementer

- Inspect actual CLI grants; shell/edit access is not technically constrained to the stated paths.
- Stop without explicit human Lab 07 implementation approval, the current consumer ref and file scope. Lab 06 rehearsal is not approval; acknowledge that gap without edits or execution.
- Read `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable instructions and current diff. Use installed `api-change-workflow` with observed package source/version.
- Use `get_api_conventions` and `get_validation_commands` with `{}` only if exact discovered CLI role tools are available/permitted; otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- After real approval, own only `src/api/search.ts` and `tests/search/search.test.ts`; one writer, no shared writable scope. Stop if a wider scope is needed.
- Preserve learner edits, the archived fixture and baseline endpoints. Never log names, query text, query-bearing URLs or payloads.
- Add a meaningful independent acceptance case. Run `npm test`, `npm run test:search`, then `npm run verify:solution`; report actual commands/exits without weakening tests.
- No installs, global settings, author skill/package edits, consumer canonical skill copy, commits, pushes, PRs, publishing or cloud tasks.
- Return approval/ref, owned and changed files, narrow diff summary, toolkit/tool provenance, actual validation results and remaining work. Stop for independent review.
```

**File:** `.github/agents/workshop-reviewer.agent.md` (create; consumer; cli).

```markdown
---
name: workshop-reviewer
description: Independently review consumer evidence in CLI without modifying the implementation.
tools: ["read", "search"]
---

# Workshop reviewer

- Inspect actual CLI grants; do not claim enforced read-only if general shell or write tools remain.
- Independently read the supplied current consumer ref/diff, `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable instructions and installed workflow/checklist.
- Confirm package source/version. Use both exact discovered fixture tools with `{}` only when role-permitted; otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- Own no writable files. No fixing, executing, installation, package changes, publishing or commits.
- Report only supported findings with file/line, violated requirement, actual defect, impact and a reproducible check.
- Prioritize total before limit, ID ordering, strict/repeated input, immutable fixture, unchanged baseline endpoints and privacy-safe bounded logs.
- Separate observed/learner-supplied test output from recommendations; do not invent passing results or findings.
- Lab 06 reviews a plan/rehearsal only; intentional starter 501 is not an implementation regression and rehearsal is not implementation approval.
- Return supported findings or no supported findings, evidence limitations and a human handoff. This is local agent review, not hosted Copilot Code Review.
```

#### Copilot app advisory role files

These complete alternatives intentionally have no `tools:` field. That omission **does not disable tools**; the default app session may have shell/write access. Real permission enforcement must be inspected separately.

**File:** `.github/agents/workshop-planner.agent.md` (create; consumer; app; advisory).

```markdown
---
name: workshop-planner
description: Advisory-only app planning role with no implementation authority.
---

# Workshop planner — advisory app route

- Tool IDs are deliberately omitted because app permissions were not rehearsed. Default tools may include shell/write access; this role is NOT enforced read-only.
- Before use inspect native agent discovery and actual tool grants. Restrict to supported read/search and exact fixture-tool permissions if exposed, or use a manually scoped planning session and record advisory-only boundaries.
- Read the learner-supplied consumer ref/diff, `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable guidance and the installed `api-change-workflow` checklist.
- Confirm actual app package source/version; a CLI bridge registration alone is not app discovery. If unavailable, label manual package walkthrough.
- Use both fixture tools with `{}` only when actually available/permitted; otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- Return scope, requirements/questions, focused files, tests, privacy risks and source/version evidence, then stop for human approval.
- No authorized writable files, execution, implementation, installs, package edits, commits, publishing or automatic delegation.
- Lab 06 is rehearsal only; search remains 501. Hand off reviewed current ref/plan/scope to one implementer only after explicit human Lab 07 approval. Advisory wording does not technically prevent writes.
```

**File:** `.github/agents/workshop-implementer.agent.md` (create; consumer; app; advisory).

```markdown
---
name: workshop-implementer
description: Advisory bounded app implementer requiring human approval and inspected actual grants.
---

# Workshop implementer — advisory app route

- App tool IDs/permissions require inspection; no cross-client parity or filesystem sandbox is claimed. Omitted tools do not remove default access.
- Stop without explicit human Lab 07 implementation approval of the current consumer ref and file scope. Lab 06 rehearsal is not approval; acknowledge the gap without edits or execution.
- Read `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable guidance and current diff. Use installed `api-change-workflow` with actual app source/version evidence or label manual package walkthrough.
- Use both fixture tools with `{}` only when actually available/permitted; otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- After real approval, authorized ownership is only `src/api/search.ts` and `tests/search/search.test.ts`. One writer; stop if a wider scope is needed.
- Preserve fixture, baseline endpoints and learner work. Never log names, query text, query-bearing URLs or payloads.
- Add a meaningful independent acceptance case. Run `npm test`, `npm run test:search`, then `npm run verify:solution` only after real approval; report actual commands/exits and failures.
- No author skill/package changes, consumer canonical skill copy, global settings, installs, commits, remote resources or publishing.
- Return approval/ref, owned and changed files, narrow diff summary, toolkit/tool provenance, validation results and remaining risks. Stop for independent review.
```

**File:** `.github/agents/workshop-reviewer.agent.md` (create; consumer; app; advisory).

```markdown
---
name: workshop-reviewer
description: Advisory-only independent app reviewer requiring actual permission inspection.
---

# Workshop reviewer — advisory app route

- Tool IDs are omitted pending app rehearsal; default generic shell/write access may remain. This role is advisory-only, not enforced read-only.
- Inspect grants and restrict them using supported controls before claiming a technical boundary. Otherwise use a manually scoped review session with the limitation recorded.
- Independently read the learner-supplied consumer ref/diff, `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable guidance and installed workflow/checklist.
- Confirm actual app package source/version or label manual package walkthrough. CLI bridge registration alone is not app discovery.
- Use both fixture tools with `{}` only if actually available/permitted; otherwise read `standards/api-conventions.json` and `standards/validation-commands.json` and label **file-based fallback; no MCP invocation observed**.
- No authorized writes, fixing, execution, installs, package changes, commits or publishing.
- Return only supported findings: file/line, requirement, actual defect, impact and reproduction. Check total-before-limit, ordering, strict/repeated input, fixture immutability, baseline endpoints and privacy-safe bounded logs.
- Distinguish observed/supplied test output from recommendations; do not invent passing results or findings.
- Lab 06 reviews the plan/rehearsal only. Intentional 501 is not an implementation regression and handoff rehearsal is not implementation approval.
- End with supported findings or no supported findings, evidence limitations and a human handoff. Local agent review is not hosted Copilot Code Review.
```

[Continue with this lab](#continue-with-this-lab).

### Bring in this step

#### Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/06-agent-roles/).
- Client-specific tool candidates are separate payloads in pinned `examples-v1`. Inspect identifiers in your build; no parity guarantee.
- Read a pinned source with `git show examples-v1:examples/steps/06-agent-roles/clients/cli/workshop-planner.agent.md`; change the client directory to `vscode` or `app` and role basename to inspect the other variants. Do not check out/merge examples over your work.

Activate only your actual client's three role files. The command displays the plan and applies after safety checks; optional preview/comparison is available through [safe example operations](../reference/examples.md#optional-inspection-and-comparison). Loading, real grants and rehearsal are shared steps afterward.

```sh
# CONSUMER; cli, vscode and app are supported selectors
npm run lab:activate -- --step 06-agent-roles --workspace consumer --client cli
```

- Before switching clients, stage the other client's definitions. Do not force them over edited/loaded roles.

[Continue with this lab](#continue-with-this-lab).

## Continue with this lab

All three routes converge here. Keep the revised guide open from author because consumer's pinned starter may contain older lab prose. Author's canonical skill and package remain unchanged; consumer uses installed 1.1.0, never a copied local canonical skill.

**Shared safeguards:** choose one set of three role files for the actual client; variants have the same destinations and must not be concatenated or installed together. Preserve existing role/tool personalizations with a reviewed merge. Changing clients requires comparing the same three destinations, not force-overwriting them. Roles describe responsibilities; only inspected, supported permissions can enforce restrictions. A shell can write files regardless of a “read-only” sentence.

### Artifact inventory

| Workspace | Exact path | Action |
| --- | --- | --- |
| Consumer | `.github/agents/workshop-planner.agent.md` | Prepared selected client variant; no writable ownership |
| Consumer | `.github/agents/workshop-implementer.agent.md` | Prepared selected client variant; one future writer after Lab 07 approval |
| Consumer | `.github/agents/workshop-reviewer.agent.md` | Prepared selected client variant; independent, no writable ownership |
| Consumer | `.lab-evidence/06-agent-roles.md` | Create permission/discovery/rehearsal journal |
| Consumer | `src/api/search.ts` | Inspect only in Lab 06; future implementer-owned surface |
| Consumer | `tests/search/search.test.ts` | Inspect only in Lab 06; future focused test surface |

### Establish consumer context

1. Read `workshop/task-brief.md`, `workshop/approved-contract.md`, applicable repository/scoped instructions, and the installed skill/checklist. In your own terminal run `git rev-parse --show-toplevel`, `git rev-parse HEAD`, and `git status --short`. Keep the actual root/ref and current diff available to the roles; do not grant a planner shell merely to obtain Git metadata. Confirm observed package source/version 1.1.0 or record the manual package walkthrough limitation.
2. Inspect the three files prepared by your chosen route. Select the matching **Client steps** below for native discovery or the manual fallback. All routes need the same effective-grant inspection; neither import nor frontmatter proves runtime enforcement.
3. During that client setup, apply the exact-tool procedure and permission gate below before any **Try it** request.

### Discover exact fixture tool grants

1. In the selected consumer client, open its MCP/tool inspection controls for the already configured `workshop-standards`. Verify the process is the consumer fixture server and its only tools are `get_api_conventions` and `get_validation_commands`; use the Lab 05 `{}` calls to corroborate source/version.
2. Copy each **exact tool identifier as exposed to custom roles by this build**, not just a display label or a name from another client. Record both in the evidence journal. Do not invent a common `mcp` namespace.
3. For CLI/VS Code, edit the existing single-line `tools:` JSON array in each role that needs standards: append those two strings, JSON-quoted, preserving its base candidates. Planner/reviewer must still omit `edit` and `execute`; implementer keeps its explicit candidates. This is a **revision to the selected role**, not a fourth role or second `tools:` key.
4. The static validator allows strings `read`, `search`, `edit`, `execute`, or exact fixture-tool identifiers ending in `get_api_conventions` / `get_validation_commands`, with a supported separator when namespaced. It rejects wildcards and unknown grants. If the client's real identifier shape does not fit, report the compatibility limitation and use file fallback; do not fabricate an alias to make validation pass.
5. In app, use only verified role-scoped permission controls if exposed. Do not invent `tools:` syntax to make the advisory sample look enforced. If role-level configuration is unavailable, retain advisory wording and record that limitation.
6. Reload/select each role and inspect its **effective** tool list. A server connection and `read`/`search` groups do not automatically grant MCP. If adding a fixture tool would require a wildcard or broad server grant, do not add it; use the labeled two-file fallback.

### Permission gate and rehearsal

1. **Verify actual permissions before any rehearsal.** Inspect all effective grants, not merely the copied frontmatter. Planner/reviewer should have no generic terminal, write-capable tools or hidden execution route. If any remain, restrict them using supported controls or explicitly record advisory-only boundaries. Do not test restrictions by intentionally writing a file or running an unsafe command.
2. **Rehearse with no API writes.** After client setup, use the planner, non-approval handoff, implementer stop and independent reviewer prompts in **Try it**. Do not automatically delegate or launch multiple writers. Select implementer only to rehearse its refusal to act without real Lab 07 approval.
3. **Record and improve.** Create `.lab-evidence/06-agent-roles.md` from the shared template in **Try it**; include exact source paths, grants, native/manual status and owned files. If the client exposed an unexpected grant, correct the selected role/control, reload and repeat the planner request; compare actual before/after permissions and output. If no native fix is available, retain the explicit fallback and gap.

## Client steps

### VS Code

1. Open consumer with the three **VS Code** role files prepared by your chosen route. Inspect native custom-agent discovery for `workshop-planner`, `workshop-implementer`, and `workshop-reviewer`; confirm their `.github/agents/` source paths.
2. Refresh using supported agent discovery controls, or reload the consumer window if required. Select planner and inspect actual `read`/`search` candidates and the full effective tool list; repeat for reviewer. Omitted `edit`/`execute` in text is not permission proof.
3. Follow [Discover exact fixture tool grants](#discover-exact-fixture-tool-grants) to append exactly the two identifiers shown by **VS Code's** fixture-tool picker to selected roles. Reload and inspect role-level tool availability; do not copy CLI IDs or use a wildcard.
4. Confirm no generic execution/write grants before claiming read-only. If those remain through other tooling, restrict them or record advisory-only. Inspect implementer's powerful grants as well, but do not authorize their use in Lab 06.
5. Run all three **Try it** requests, selecting roles explicitly and keeping the reviewer independent. If native discovery is absent, open each exact role file and supply its full contents as manual context in separate sessions; record **manual role context, native agent loading not observed**.

### Copilot CLI

1. Start CLI in consumer with the three **CLI** role files prepared by your chosen route. Use this build's help and supported custom-agent selector to discover the three named roles from `.github/agents/`; record the actual selection/refresh mechanism rather than inventing a slash command.
2. Inspect loaded source paths and effective tool lists. Samples are JSON candidates only; confirm planner/reviewer have no generic terminal/write tools. If unsupported or ineffective, use a manually scoped session and retain advisory-only wording.
3. In `/mcp`, inspect this build's actual fixture-tool identifiers; follow [Discover exact fixture tool grants](#discover-exact-fixture-tool-grants) to append only those two strings to the selected roles, reload and recheck role availability. Server connection alone is not sufficient and cross-client naming parity is not assumed.
4. Invoke planner, then select implementer only for the **non-approval rehearsal** below. Start a separate reviewer context for the supplied plan/handoff, not a second writable implementation session.
5. If agent loading is unavailable, read the exact role file into each manual session and label **manual role context, native agent loading not observed**. Do not add shell permission just to make a role discoverable.

### Copilot app

1. Open consumer with the three **app advisory** role files prepared by your chosen route. Check the current build's agent picker for their exact names/source paths; do not assume CLI role discovery carries into app.
2. Inspect actual app tool grants. These samples intentionally omit unverified IDs; default access may include shell/write tools. Configure real restrictions only if supported and observable. Otherwise all role boundaries remain **advisory-only**.
3. Confirm installed skill discovery in the app independently of the unverified CLI plugin bridge. Inspect MCP tools separately and apply only exact observed role-scoped grants if the app exposes them; otherwise use the labeled standards-file fallback.
4. Run separate planning/review contexts with no edit authorization, and select implementer solely for the non-approval rehearsal. If native agent discovery is absent, paste/read the relevant complete role file as manual context and record that instead.
5. Never call advisory/manual sessions technically read-only. Record missing permission controls or bridge discovery as limitations, not proof of success.

## Try it

1. **Planner invocation.** Supply your actual consumer root/ref from the terminal checks and select `workshop-planner`. If native loading is unavailable, explicitly read/paste that selected role variant as manual context first.

   ```text
   Lab 06 rehearsal, planning only. Use workshop-planner and the installed
   api-change-workflow to read workshop/task-brief.md, workshop/approved-contract.md,
   applicable guidance and the supplied current diff. The consumer root/ref are:
   <paste the actual root and commit from my terminal checks>.
   Inspect actual tool grants and report enforced versus advisory boundaries.
   Use the two permitted fixture tools with {} or the exact file fallback.
   Return scope, requirements/questions, files, tests, privacy risks, package/tool
   source/version evidence and a human approval stop. Writable ownership: none.
   No edits, shell execution, implementation, installs or automatic delegation.
   ```

   Expected: a bounded plan naming future `src/api/search.ts` and `tests/search/search.test.ts`, missing evidence/questions and an approval checkpoint. It must distinguish intentional 501 from completed acceptance. Check the actual tool/context trace against any claimed source or grant.
2. **Human handoff rehearsal, not implementation approval.** Select `workshop-implementer` in a separate context and paste the following with your real plan/ref. Do not paste the later Lab 07 approval statement here.

   ```text
   REHEARSAL ONLY — NOT IMPLEMENTATION APPROVAL.
   Consumer root/ref: <paste the actual root and commit>.
   Proposed plan: <paste the planner's actual plan and unresolved questions>.
   Proposed future file scope: src/api/search.ts and tests/search/search.test.ts.
   Use workshop-implementer only to acknowledge this handoff and explain what real
   human approval/evidence is still missing. Confirm Lab 06 grants no writable
   ownership and no command execution. Do not implement, edit, run tests, install
   or delegate. Stop for explicit human Lab 07 implementation approval.
   ```

   Expected: acknowledgement and a stop, no patch or executed command. Merely selecting a write-capable role must not be treated as approval. If it attempts a write, stop/cancel before execution, preserve the diff and record the failed boundary.
3. **Independent reviewer invocation.** Select `workshop-reviewer` in a fresh context. Supply the actual planner output, rehearsal acknowledgement, current diff and any already-run validation command/exits; do not claim tests ran when they did not.

   ```text
   Review the Lab 06 plan and handoff rehearsal independently, not an implemented
   feature. Use workshop-reviewer, the approved contract and installed workflow
   checklist. I will supply the current consumer ref/diff, planner output,
   implementer acknowledgement and any actual command results.
   Check ownership, missing approval, ordering/total-before-limit coverage,
   repeated/strict input coverage, fixture preservation and privacy-safe logging.
   Use permitted fixture tools with {} or label the file fallback. Report only
   supported findings with file/line or plan-section evidence, requirement, impact
   and a reproducible next check. Separate supplied test output from unexecuted
   recommendations. Intentional 501 is not a new regression. No writes or shell.
   End with evidence limits and a human handoff, not implementation authorization.
   ```

   Expected: supported plan/permission gaps or “no supported findings,” with evidence limits. Since no implementation exists yet, do not fabricate code defects or green search tests.
4. **Inspect and improve.** Compare effective grants/source evidence before and after the shared [exact-tool revision](#discover-exact-fixture-tool-grants). Reinvoke planner with the same request; inspect two real fixture calls or the explicit fallback. If a restriction failed, narrow only the offending role/control and recheck; when no enforceable route exists, retain the manual advisory fallback. Do not widen permissions to force native success.
5. In your own terminal inspect `git status --short` and `git diff -- src/api/search.ts tests/search/search.test.ts`. Compare with the initial diff; no new API/test changes should have occurred. The learner writes the evidence journal below, not a planner/reviewer with no writable scope.

**File:** `.lab-evidence/06-agent-roles.md` (create; consumer).

```markdown
# Lab 06 evidence — consumer

- Workspace root / branch / commit / client build: not recorded
- Selected variant (vscode, cli, or app advisory): not recorded
- Planner source: .github/agents/workshop-planner.agent.md
- Implementer source: .github/agents/workshop-implementer.agent.md
- Reviewer source: .github/agents/workshop-reviewer.agent.md
- Native discovery/refresh mechanism or manual-context label: not observed
- Observed installed package source/version or manual walkthrough: not observed
- Planner effective tool list / read-only versus advisory: not inspected
- Implementer effective tool list / no path-sandbox claim: not inspected
- Reviewer effective tool list / read-only versus advisory: not inspected
- Exact discovered get_api_conventions identifier / role availability: not observed
- Exact discovered get_validation_commands identifier / role availability: not observed
- Role tool-ID revision / reload / before-after grants: not performed
- Actual fixture-call source/version or file fallback and reason: not observed
- Planner invocation / output / human approval stop: not run
- Handoff rehearsal / explicit NOT APPROVED acknowledgement: not run
- Independent reviewer invocation / findings / evidence limits: not run
- Lab 06 authorized writable API/test files: none
- Proposed Lab 07 files: src/api/search.ts and tests/search/search.test.ts
- Real Lab 07 implementation approval: NOT GRANTED by this lab
- Initial/final diff comparison / no new API or test writes: not checked
- verify:exercise command / exit: not run
- Permission failures, manual/app-bridge limitations and next checks: not recorded
```

## Verify the result

1. Run `npm run verify:exercise -- --step 06-agent-roles --client cli` in consumer; use `vscode` or `app` for the actual selected set. Expect green static checks for all three roles. For CLI/VS Code this checks JSON candidates, no wildcard/unknown grants and no planner/reviewer `edit`/`execute`; for app it accepts the explicit advisory route, not proven permission enforcement.
2. Check role source, effective tool lists, package/tool source/version, planning output, **non-approval** rehearsal, independent reviewer outcome and no new API/test writes in `.lab-evidence/06-agent-roles.md`. Static role presence alone does not establish native loading, tool permissions or invocation.
3. Search remains intentional 501; full search acceptance is not expected green in Lab 06. No need to “fix” API code or weaken tests to finish a role exercise.
4. Recovery: stop/cancel on unexpected writes or permissions, inspect the diff without reverting unrelated learner work, revise only the selected role/control, reload and recheck. If unsupported, use separate manual advisory sessions and record the gap. Do not grant wildcard tools, publish or automatically delegate.
- Next: [07 — Use toolkit](07-use-toolkit.md).
