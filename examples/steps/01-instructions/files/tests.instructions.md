---
applyTo: "tests/**/*.ts"
---

# Test-scoped rules

- Use node:test and strict assertions through isolated ephemeral loopback servers; always close each server.
- Assert exact shape/status, routing precedence, sorting before limit, total before limit, no-match and blank behavior.
- Cover repeated q/limit, 1/25 boundaries and invalid signed/decimal/exponent/leading-zero limits.
- Preserve fixture immutability, repeatability and privacy-safe logger checks.
- Do not delete/weaken acceptance or turn an intentional starter 501 into completion.
- Add a meaningful independent case before declaring capstone done.
- Default `npm test` is regression-safe. `test:search` is explicit completion acceptance; `test:stub` is starter-only.
