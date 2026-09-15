# Review rubric — use real evidence

- Requirement: total counts matches before limiting; anchor expects total 3 with one item.
- Fixture location: `total-after-limit.mjs`, return expression uses `items.length`.
- Reproduce: `node workshop/artifacts/review/probe.mjs`; positive result means it detected the deliberate defect, not that search passed.
- Ask reviewer for file/line, requirement, observed behavior, impact and exact focused check.
- A supported finding links the wrong `total` to the sliced array; unsupported broad performance/security claims do not count.
- Do not copy a sample review into your evidence as though a client produced it.
- Improve the author's checklist from the finding, bump package revision, update consumer and re-invoke.
- Keep local review distinct from GitHub Copilot Code Review.
