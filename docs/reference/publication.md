# Future publication — owner approval required

- Pages and release publication remain approval-gated. A source repository link does not establish participant access or prove publication. No push, deployment, marketplace upload or hosted review is part of this preparation.
- Before release approve final owner/name/visibility, participant access (including EMU restrictions), Pages audience, and whether hosting exposes content beyond repository audience.
- Rehearse required client versions, local plugin load/update, app bridge or explicit fallback, permissions, network/install restrictions, and a clean participant machine.
- `main` must remain starter; never merge examples/solution wholesale. Publish refs separately only after approval.
- Keep source/example/solution release tags immutable. A fix gets a new versioned tag and reviewed locks.
- Baseline CI checks starter changes; solution CI runs real acceptance on solution or an explicitly selected manual completion check.
- Future Pages workflow is `workflow_dispatch` only, gated on main, explicit approval input, repository `PAGES_APPROVED` variable, and a protected `github-pages` environment.
- Owner must review workflow action pins and grant only necessary Pages/OIDC permissions. Do not dispatch until approvals and environment protection exist.
- Source repository quick links default to `https://github.com/frye/copilot-user-search-workshop` in plain Markdown and local builds. An approved `WORKSHOP_SOURCE_URL` overrides those links in the generated guide and enables hosted example links; it does not change the Markdown source.
- Build with approved `WORKSHOP_BASE` and `WORKSHOP_SOURCE_URL`; default base is `/copilot-user-search-workshop/`. Without an explicit source override, example links still lead to the not-published guidance.
- After genuine deployment, record actual Pages URL/access result in README and learner communication. Do not label a successful local build “published”.
- Optional cloud/Mobile/hosted review need separate approval and genuine evidence; local installed plugins/MCP cannot be assumed available remotely.
