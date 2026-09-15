# Spec Kit reference packet

This is a reviewed, artifact-only snapshot for optional Lab 09. It lets participants follow the
Spec Kit-shaped workflow without installing Spec Kit.

- `constitution.md` contains the workshop principles used by the generated workflow.
- `001-team-filter/` contains the specification, clarification result, plan, research, design,
  contracts, checklists, tasks, analysis report, quickstart, and generation provenance.
- `provenance.json` records the actual tool version and commands used to prepare this snapshot.

These files are sample/reference artifacts. They are not evidence that a learner installed or ran
Spec Kit, approved the plan, implemented the feature, or passed validation.

To copy the packet into a consumer-owned working area without overwriting existing files:

```sh
node scripts/spec-kit-reference.mjs --preview
node scripts/spec-kit-reference.mjs --stage
node scripts/spec-kit-reference.mjs --apply
```

Use `--stage` instead of `--apply` when `workshop/artifacts/spec-kit-reference/` already contains
learner work.
