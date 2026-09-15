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
