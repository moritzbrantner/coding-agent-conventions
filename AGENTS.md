# AGENTS.md

This repository contains conventions for coding agents.

Keep it small, precise, mechanically navigable, and single-sourced.

## Responsibility

Conventions answer **what the resulting code must look like or satisfy**.

Do not put reusable procedures such as implementation, debugging, review, or refactoring workflows here; those belong in `coding-agent-skills`.

Do not put repository-specific consumer rules here; those belong in that repository's `AGENTS.md`.

## Before adding a rule

Ask:

1. Is this a real engineering decision?
2. Could a competent engineer reasonably choose differently?
3. Does an agent need to know this decision?
4. Is it already completely expressed by configuration or deterministic tooling?
5. Does an existing rule already cover it?

If tooling already expresses the rule completely, prefer tooling over prose.

Do not add generic best practices merely to make the catalog more complete.

## Choose the narrowest correct scope

Put durable ideas that explain multiple conventions under `principles/`.

Put technology-independent rules under `conventions/<category>/README.md`.

Put technology-specific rules under `technologies/<technology>/README.md`.

Nest technologies only when inheritance is intentional. Keep independent technologies separate.

## Registry modules

`registry/registry.json` is a distribution manifest, not another authoring location.

- Rule text remains single-sourced in `principles/`, `conventions/`, and `technologies/`.
- Registry modules reference those sources.
- Use module dependencies for inherited policy instead of copying parent sources.
- Keep modules coherent; do not create one module per individual rule.
- Profiles are convenience compositions of modules.
- Prefer one registry revision for the whole catalog rather than independent versions per module.

When adding or moving a convention scope, update the registry only when that scope should be independently installable.

## Writing rules

Prefer short normative bullets.

Good:

```md
## RUST-002 — Avoid unwrap in normal production control flow

- Handle or propagate recoverable errors explicitly.
- `unwrap()` and `expect()` require a proven invariant or intentionally fatal condition.
- Exceptions: tests and examples.
```

Avoid mandatory rationale, agent-behavior, example, consequence, and trade-off sections unless necessary to understand or apply the rule.

## IDs

Preserve existing IDs. Do not renumber rules after deletion or reorganization. Use the prefix associated with the rule's scope.

## Avoid duplication

Do not:

- repeat parent rules in child technology scopes;
- copy convention text into registry modules or profiles;
- restate executable configuration;
- create several rules for the same decision;
- duplicate explanations already given by the root `README.md`.

Reference existing policy instead.

## Exceptions

Prefer a strong main rule followed by an explicit exception. Consumer repositories place deliberate local exceptions in repository-local guidance, not in managed installed convention snapshots.

## Updating structure

When introducing a new technology or category:

1. create its authoring directory;
2. add a concise `README.md`;
3. document inheritance only if it is not obvious from the path;
4. add or update a registry module only if consumers should select it independently;
5. add it to a registry profile only when the profile genuinely improves installation ergonomics.

Keep root documentation architectural. Keep leaf documentation normative.
