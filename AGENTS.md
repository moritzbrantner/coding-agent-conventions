# AGENTS.md

This repository contains conventions for coding agents.

Keep it small, precise, and mechanically navigable.

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

Put rules under:

```text
principles/
```

for durable ideas that explain multiple conventions.

Put technology-independent rules under:

```text
conventions/<category>/README.md
```

Put technology-specific rules under:

```text
technologies/<technology>/README.md
```

Nest technologies only when inheritance is intentional.

For example:

```text
typescript/
  react/
    nextjs/
```

Keep independent technologies separate and compose them through profiles.

## Writing rules

Prefer short normative bullets.

Good:

```md
## RUST-002 — Avoid unwrap in normal production control flow

- Handle or propagate recoverable errors explicitly.
- `unwrap()` and `expect()` require a proven invariant or intentionally fatal condition.
- Exceptions: tests and examples.
```

Avoid mandatory sections such as:

```text
Rationale
Agent behavior
Example
Consequences
Trade-offs
```

unless that information is necessary to understand or apply the rule.

A convention should normally be understandable in a few bullets.

## IDs

Preserve existing IDs.

Do not renumber rules after deletion or reorganization.

Use the prefix associated with the rule's scope.

## Avoid duplication

Do not:

* repeat parent rules in child technology scopes;
* copy convention text into profiles;
* restate executable configuration;
* create several rules for the same decision;
* duplicate explanations already given by the root `README.md`.

Reference an existing rule instead.

## Exceptions

Prefer a strong main rule followed by an explicit exception.

Example:

```md
- Use shared UI primitives before creating local equivalents.
- Exception: create a local primitive when the shared component cannot satisfy the required semantics without inappropriate coupling.
```

Do not weaken every rule with vague phrases such as "usually", "generally", or "when appropriate".

## Updating structure

When introducing a new technology or category:

1. create its directory;
2. add a concise `README.md`;
3. document inheritance only if it is not obvious from the path;
4. add it to a profile only when independent branches need composition.

Update `catalog.source.json` when scope inheritance or profile composition changes. Regenerate `catalog.json` and `convention-ids.json` with `coding-tooling conventions catalog --write`; do not hand-edit the generated indexes. Run the matching `--check` command before completion.

Keep the root documentation architectural.

Keep the leaf documentation normative.
