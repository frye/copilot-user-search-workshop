# 03 — Build and exercise a skill

## Goal and starting workspace

- **Author**, after 02. Create a reusable procedure before packaging it.
- Canonical source is `.github/skills/api-change-workflow/`, not a copied package directory.

## Build it yourself

1. Create `SKILL.md` with `name: api-change-workflow` and a one-line discovery description.
2. Describe trigger, inputs, planning/approved implementation/review stages, human stop conditions and evidence.
3. Create and link `references/review-checklist.md`; keep detailed edge cases there.
4. Invoke a planning request and a review-only request without implementing search.
5. Add one missed boundary case, such as duplicate blank `q`, to the checklist; reload and demonstrate changed behavior.
6. Do not add broad shell preapproval or automatic publish/install steps.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/03-skill/).
- Complete two-file skill; personalize a rule and demonstrate its effect instead of merely reading it.

## Bring in this step

```sh
npm run lab:example -- --step 03-skill --preview
npm run lab:example -- --step 03-skill --stage
npm run lab:example -- --step 03-skill --apply
```

- Requires reviewed prompt/guidance. Import does not invoke the skill.

## If you already changed these files

- Retain your procedure; stage references and manually merge. Source personalization is expected.
- When 05 later updates the sample, different authored content remains protected even after a commit. [Recovery](../reference/examples.md).

## Client steps

### VS Code

- Inspect native skills discovery for `api-change-workflow` and its project path.
- Request it for planning, then for review; inspect actual loading/invocation indicators where available.
- Reload the window after revision if needed. Similar-looking output alone is not loading proof.

### Copilot CLI

- `/skills reload`, then `/skills info`; select/inspect `api-change-workflow` using this build's supported interface.
- Request: “Use api-change-workflow to plan the approved search task; stop for approval.”
- Reinvoke for review, modify the checklist, reload, and record source plus behavior change.

### Copilot app

- Inspect Customize Skills for the author project and confirm the canonical project source.
- Invoke the named procedure, inspect any loading/source evidence, revise and start/refresh session as needed.
- If skill loading cannot be observed, explicitly read its procedure as a **manual walkthrough**, not a native skill success.

## Verify the result

- `npm run verify:exercise -- --step 03-skill` validates required frontmatter/reference/boundaries.
- `npm test`; search remains 501. Retain planning/review invocations and changed-rule evidence.
- Recovery: fix missing reference/frontmatter, reload and reinvoke; do not equate validator success with discovery.
- Next: [04 — Plugin](04-plugin.md).
