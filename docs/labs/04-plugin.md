# 04 — Package, install, and verify

Agent plugins bundle reusable customizations into an installable package; this lab packages the
skill you authored. Versioned packaging lets you verify the exact procedure used in a separate
workspace and manage updates or rollback without copying the source into each project.

**Documentation:** [Agent plugins in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-plugins).

## Goal and starting workspace

- Begin in **author**, after 03; finish with a clean **sibling consumer** using an installed package.
- Packaging and installation are learner activities. This release preparation does not install anything into a client.

## Build it yourself

1. Author `toolkit/plugin.json`: Agent Plugins 1.0 schema, name `user-search-toolkit`, version `1.0.0`, description.
2. Write `toolkit/catalog.md`: purpose, learner-maintained owner role (no invented repository owner), compatibility, source, version, permissions, rollback.
3. Run `npm run toolkit:build`. Inspect exact skill-only files, manifest, and provenance.
4. Run `npm run consumer:create -- --destination ../workshop-consumer`.
5. Open consumer, run `npm ci` and baseline. Confirm `.github/skills` is absent and client has no duplicate lab registration.
6. Explicitly install/register the author-built package using your route below; invoke planning in consumer.

## Inspect the example

- [Browse examples branch](../../../../tree/examples/examples/steps/04-plugin/).
- Only metadata/catalog; use the explicit 03 prerequisite if needed. Never distribute an opaque prebuilt archive.

## Bring in this step

```sh
# AUTHOR only
npm run lab:example -- --step 04-plugin --preview
npm run lab:example -- --step 04-plugin --stage
npm run lab:example -- --step 04-plugin --apply
npm run toolkit:build
```

## If you already changed these files

- Stage and merge metadata/catalog yourself. Do not replace learner skill content.
- Existing package version with different bytes is refused; bump version rather than overwrite. Existing consumer path is refused; choose a new sibling.
- [Safe imports](../reference/examples.md) · [Complete installation/update/rollback procedure](../reference/plugin.md).

## Client steps

### VS Code

- Open **consumer** in a separate window; merge one absolute author-package path under workspace `chat.pluginLocations`, value `true`.
- Reload consumer, inspect plugin and skill source/version, then invoke planning through the packaged skill.
- Do not register the canonical source and package simultaneously. See the exact settings shape in [plugin procedure](../reference/plugin.md).

### Copilot CLI

- In **consumer**, inspect `copilot plugin list --json`, then explicitly run `copilot plugin install "/ABSOLUTE/AUTHOR/toolkit/dist/user-search-toolkit-1.0.0"`.
- Inspect list JSON again; `/skills reload` and `/skills info`; retain installed source/version and planning invocation.
- This registration may affect your user profile. Installation needs your approval; preparation has not performed it.

### Copilot app

- **CLI-assisted bridge, unverified:** perform the CLI install, then open the consumer project/session and inspect Customize Plugins/Skills.
- If actual app discovery shows this package, record version/source and invoke. Otherwise continue with CLI/VS Code or label walkthrough-only.
- Never call this app-native local installation or simulate it by copying `.github/skills`.

## Verify the result

- Author: `npm run verify:exercise -- --step 04-plugin`; `npm run toolkit:build` repeated unchanged.
- Consumer: `npm run verify:baseline`; local skill absent, one package registration, actual source/version and invocation observed.
- Recovery/cleanup: remove/disable only the lab package registration, preserve all unrelated settings. No broad cache/profile cleanup.
- Next: [05 — MCP and update](05-mcp-and-update.md).
