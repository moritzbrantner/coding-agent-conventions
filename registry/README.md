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

## Companion tooling configuration

A convention module may distribute tool-native configuration beside its prose rules. Keep the relationship simple: a rule can point to a nearby JSON/config/dotfile, and the module declares that file as an `asset`.

When an asset is intended for deterministic enforcement, `configurations` associates it with the stable rule ID, tool, and existing semantic capability. Example:

```json
{
  "sources": ["technologies/typescript/README.md"],
  "assets": ["technologies/typescript/TS-003.oxlint.json"],
  "configurations": [
    {
      "rule": "TS-003",
      "path": "technologies/typescript/TS-003.oxlint.json",
      "tool": "oxlint",
      "capability": "lint"
    }
  ]
}
```

The companion file is the native configuration format of the target tool. Do not invent a second abstract policy DSL. `coding-tooling` installs and hashes the asset, then deterministically composes applicable fragments into the normal formatter/linter configuration used by its existing capabilities and hooks.

## Token-efficient composition

`base` is intentionally a small, high-signal core. It contains the cross-cutting principles plus concise agent, codebase-design, repository, and testing rules that are useful in nearly every implementation task.

Policy that is important only for some workloads is installed explicitly instead of being pulled into every technology module. Current focused modules include:

- `dependencies` for cross-repository dependency, source-development, and package-ownership policy;
- `environment` and `git` for development-environment and Git policy;
- `security` for authentication and authorization;
- `ui` for technology-independent interface policy;
- `benchmarking` for performance-validation policy;
- `agent-delegation` for detailed delegated/multi-run execution guidance;
- `template-authoring` for template-repository and reusable-script policy.

Technology modules such as `react`, `nextjs`, and `rust` still depend on `base`, but no longer transitively install unrelated optional policy. Profiles compose focused modules when the profile's workload consistently needs them; repositories can add other modules explicitly.

This keeps the default agent context small without weakening or duplicating the underlying convention catalog.

## Registry rules

- Keep rule text single-sourced in the normal authoring hierarchy.
- Keep `base` limited to policy that is broadly useful in ordinary implementation work.
- Add a registry module only for a coherent reusable policy scope.
- Model inheritance through module `dependencies`; do not repeat parent sources.
- Keep rarely applicable deep guidance in an explicit module rather than making every technology inherit it.
- Keep profiles as convenience compositions of modules.
- Prefer one repository-wide registry revision over independent versions for every module.
- Keep companion configuration tool-native and explicitly associated with an existing stable rule and semantic capability.
- Mechanical composition and enforcement remain the responsibility of deterministic repository tooling, analyzers, linters, tests, and CI.

## Boundary

- `coding-agent-skills`: how to perform reusable development procedures.
- `coding-agent-conventions`: what shared engineering policy and tool-native policy fragments the resulting code must satisfy.
- repository `AGENTS.md`: repository-specific context, commands, boundaries, and exceptions.
- deterministic tooling and CI: composition, verification, and enforcement.
