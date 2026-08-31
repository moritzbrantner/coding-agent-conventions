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

## Generator assets

A module may also distribute deterministic scaffolds that materialize structures implied by its installed conventions. Generators are first-class module assets: the module registers a globally unique generator ID and descriptor path, while the descriptor and every referenced template are included in the module's normal `assets` list so installation and hashing use the existing snapshot model.

```json
{
  "assets": [
    "technologies/typescript/react/generators/react-component/generator.json",
    "technologies/typescript/react/generators/react-component/templates/Component.tsx.tmpl"
  ],
  "generators": [
    {
      "id": "react-component",
      "path": "technologies/typescript/react/generators/react-component/generator.json"
    }
  ]
}
```

A generator descriptor may declare:

- a stable `id`, description, referenced convention rule IDs, and applicable technologies;
- a small typed input schema (`string`, `boolean`, `enum`, and narrowly validated identifier/path values);
- a deterministic target concept that must resolve unambiguously or be supplied explicitly by the caller;
- declarative operations from a closed set, initially text-template file creation plus narrowly supported structured updates;
- explicit acyclic `compose` references with input mappings;
- exact prerequisites and focused semantic postconditions;
- whether a future supported native/dependency adapter or explicit network permission would be required.

Templates support only variable interpolation and a closed set of deterministic name transforms such as `pascal`, `camel`, `kebab`, and `snake`. They are not executable programs: no arbitrary expressions, loops, filesystem access, shell commands, JavaScript hooks, regex rewrite programs, or general AST/codemod DSL belongs in a convention generator.

Generators are one-shot constructors. Once generated, application source is ordinary repository code; updating a convention or template does not make the old source generator-owned or synchronize it later. Rich refactoring and codemods belong outside this registry/tooling boundary.

Rule prose remains the policy source. A generator's `rules` list explains which installed decisions it materializes; generator metadata does not reinterpret or replace those rules. Repository-local generators may use the same restricted descriptor contract, but remain repository-owned rather than shared policy.

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
- Keep generator descriptors declarative, module-owned, globally unique, and fully included in normal module assets.
- Mechanical composition, generation, and enforcement remain the responsibility of deterministic repository tooling, analyzers, linters, tests, and CI.

## Boundary

- `coding-agent-skills`: how to perform reusable development procedures.
- `coding-agent-conventions`: what shared engineering policy, tool-native policy fragments, and declarative generator assets the resulting code must satisfy or may deterministically materialize.
- repository `AGENTS.md`: repository-specific context, commands, boundaries, exceptions, and local generator definitions.
- deterministic tooling and CI: composition, generation planning/application, verification, and enforcement.
