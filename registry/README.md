# Convention registry

The registry is the distribution view of the convention catalog.

The authoring source remains the existing `principles/`, `conventions/`, and `technologies/` hierarchy. `registry/registry.json` groups those sources into installable modules and profiles without copying rule text.

## Consumer model

Consumer repositories install only the modules they need:

```sh
coding-tooling conventions init
coding-tooling conventions add react testing-library vitest
coding-tooling conventions check
```

Installation vendors managed snapshots into `.conventions/` and records the selected modules and source revision in `conventions.json` and `conventions.lock.json`.

Installed convention snapshots are managed files. Repository-specific additions and exceptions belong in `AGENTS.md` or another explicitly local policy document rather than edits to `.conventions/`.

## Registry rules

- Keep rule text single-sourced in the normal authoring hierarchy.
- Add a registry module only for a coherent reusable policy scope.
- Model inheritance through module `dependencies`; do not repeat parent sources.
- Keep profiles as convenience compositions of modules.
- Prefer one repository-wide registry revision over independent versions for every module.
- Mechanical enforcement remains the responsibility of repository tooling, analyzers, linters, tests, and CI.

## Boundary

- `coding-agent-skills`: how to perform reusable development procedures.
- `coding-agent-conventions`: what shared engineering policy the resulting code must satisfy.
- repository `AGENTS.md`: repository-specific context, commands, boundaries, and exceptions.
- deterministic tooling and CI: verification and enforcement.
