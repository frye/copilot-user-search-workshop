# Published source and future publication

## Existing hosted workshop

The [public source](https://github.com/frye/copilot-user-search-workshop) and
[live guide](https://frye.github.io/copilot-user-search-workshop/) are confirmed available.
Pages serves documentation only, not the API or MCP server. These are existing hosted
resources, not a new publication or rehearsal performed by this documentation update.
A source repository link alone does not prove publication or establish participant access.

Learners use the [local-clone setup](../start.md#start-here). No fork, personal upstream, push,
PR, cloud task, or submission is required. Do not send learner writes or tasks to the shared
source. The disabled origin push URL is only a local Git guard; it does not enforce API,
PR, or cloud safety. Keep required lab evidence private and complete checkpoint prerequisites;
no submission does not make the learning activities optional.

## Future releases — owner approval required

Existing public access is not approval for a new push, deployment, marketplace upload, hosted
review, or change in audience. This guide records no new approvals or client rehearsals;
historical presenter evidence remains a record of what was actually observed at that time.

- Before each future release obtain explicit owner approval for the target owner/name/visibility, participant access (including EMU restrictions), Pages audience, and whether hosting exposes content beyond repository audience.
- Rehearse required client versions, local plugin load/update, app bridge or explicit fallback, permissions, network/install restrictions, and a clean participant machine.
- `main` must remain starter; never merge examples/solution wholesale. Publish refs separately only after approval.
- Keep source/example/solution release tags immutable. A fix gets a new versioned tag and reviewed locks.
- Published `examples-v1` and `starter-v2` match the current locks; leave those locks unchanged and `approvedOrigin` set to `null`. Any future network-enabled release needs separate review, not an inferred approval from the existing source URL.
- Baseline CI checks starter changes; solution CI runs real acceptance on solution or an explicitly selected manual completion check.
- The Pages workflow is `workflow_dispatch` only, gated on main, explicit approval input, repository `PAGES_APPROVED` variable, and a protected `github-pages` environment. Verify those protections for any future release; their presence is not asserted by this guide.
- Owner must review workflow action pins and grant only necessary Pages/OIDC permissions. Do not dispatch until approvals and environment protection exist.
- Source repository quick links default to `https://github.com/frye/copilot-user-search-workshop` in plain Markdown and local builds. An approved `WORKSHOP_SOURCE_URL` overrides those links in the generated guide and enables hosted example links; it does not change the Markdown source.
- Build with approved `WORKSHOP_BASE` and `WORKSHOP_SOURCE_URL`; default base is `/copilot-user-search-workshop/`. The known source URL may configure local preview links without authorizing deployment. Missing source configuration is a [local-preview fallback](examples.md#not-published), not an unpublished-source claim.
- After a genuine future deployment, record its actual URL/access result and release-specific evidence in learner communication. Keep current links accurate without rewriting historical evidence or labeling a successful local build “published”.
- Optional cloud/Mobile/hosted review need separate approval and genuine evidence; local installed plugins/MCP cannot be assumed available remotely.
