# 06 — Author bounded roles

Custom agents define specialized responsibilities, guidance, and tool access for roles such as
planner, implementer, and reviewer. Separating those roles makes ownership and human handoffs
clearer, reducing the risk that planning or review silently becomes implementation. The boundary
is only technically enforced when the client's actual tool permissions support it.

**Documentation:** [Custom agents and handoffs in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents).

## Goal and starting workspace

- **Consumer**, after 05: installed updated skill plus configured MCP (or explicit fallback).
- Create planner, implementer, and independent reviewer with human handoffs and one writer.

## Build it yourself

1. Author three `.github/agents/*.agent.md` roles with name, description, appropriate supported tools, responsibility, inputs, output and stops.
2. Planner returns plan/questions/tests only. Reviewer returns supported findings, evidence, impact and next check.
3. Implementer owns only `src/api/search.ts` and focused search tests after approval; no publishing or package edits.
4. Inspect actual tool permissions. Any general terminal access means the planner/reviewer is **not enforced read-only**.
   - After MCP discovery, add **only the two exact fixture-tool identifiers shown by this client** to the selected roles, preserving the read/write boundaries.
   - The sample `read`/`search` groups do not automatically grant MCP. Server connection alone is not role-level availability.
   - Static validation permits the two fixture-tool name suffixes, not namespace wildcards; it does not prove that a client recognizes the identifiers.
5. Run plan → human approval → implementer handoff without implementing until 07. Optional contract analysis must not share writable scope.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/06-agent-roles/).
- Client-specific tool candidates are separate payloads. Inspect identifiers in your build; no parity guarantee.

## Bring in this step

```sh
# CONSUMER; cli, vscode and app are supported selectors
npm run lab:activate -- --step 06-agent-roles --workspace consumer --client cli
```

- Before switching clients, stage the other client's definitions. Do not force them over edited/loaded roles.

## If you already changed these files

- Preserve role/tool choices; compare sample responsibility and handoff sections manually.
- If a tool identifier is unsupported, correct it using actual client discovery or use manually scoped sessions. Never replace restrictions with wildcard tools just to load. [Recovery](../reference/examples.md).

## Client steps

### VS Code

- Use `--client vscode`; inspect native custom-agent discovery and actual `read`, `search`, `edit`, `execute` tool groups.
- Planner/reviewer candidates omit write/execute; confirm the UI grants really exclude them.
- Add the two MCP identifiers from VS Code's actual tool picker before requesting MCP through this role. Do not copy CLI IDs.
- If execution remains available through other tooling, record advisory-only boundaries. Select implementer only after human approval.

### Copilot CLI

- Use `--client cli`; inspect `.github/agents` discovery through CLI's supported agent selector/help.
- Samples use CLI tool candidates; verify loaded tools instead of assuming frontmatter alone enforces them.
- Add the two MCP identifiers exposed by this CLI build and recheck role tool availability; no VS Code/CLI naming parity is assumed.
- Hand off contract/ref/approved files to one implementer; record actual choice and permissions.

### Copilot app

- Use `--client app`; load through app agent picker only after checking compatibility.
- App samples intentionally omit unverified tool IDs and explicitly declare **advisory-only** boundaries; default tool access may include shell.
- Configure real restrictions if exposed, or run separate planning/review sessions without authorizing edits. Never call those sessions technically read-only.

## Verify the result

- `npm run verify:exercise -- --step 06-agent-roles --client cli` (choose actual client).
- Evidence: role source, loaded tool list, planning output, explicit approval handoff, owned files. Static role presence alone does not pass runtime evidence.
- Recovery: stop on unexpected writes/permissions; inspect diff, revise role, reload and recheck before 07.
- Next: [07 — Use toolkit](07-use-toolkit.md).
