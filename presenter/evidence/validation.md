# Local validation evidence

## Preparation boundary

- All implementation is in this standalone repository, not account notes.
- Initial host: Node 26.8.1/npm 11.19.0.
- Repository-local author runtime: **Node 24.20.0/npm 11.19.0**, obtained after manifests existed; no global runtime change.
- The full reference was implemented and its five HTTP acceptance tests passed before deriving the 501 starter.
- Baseline HTTP and real SDK stdio MCP tests passed on that full reference (5 tests total), including exact tool allowlist, strict input errors and fixture failure handling.
- Release-wide validation and immutable SHAs are recorded below after integrated checks; this initial preparation record is not a release pass.

## Not performed

- No VS Code, Copilot CLI or Copilot app runtime rehearsal or plugin install/update.
- No app-native local installation claim; CLI bridge remains unverified.
- No cloud task, hosted review, Mobile execution, remote repository, push, upload or Pages deployment.
- No global client settings, user plugin registrations, account notes or other repository changed.
- No Spec-Kit generation; optional extension unavailable.
