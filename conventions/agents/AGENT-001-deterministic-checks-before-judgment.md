# AGENT-001 — Deterministic checks before agent judgment

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-004`

## Rule

If a project property can be checked deterministically, encode it as an executable check instead of asking an agent to judge it informally.

## Rationale

Formatting, linting, type safety, compilation, dependency constraints, generated-file consistency, repository invariants, and many other properties have objective answers. Leaving them to agent judgment creates inconsistent results and wastes reasoning on work a tool can perform exactly.

## Agent behavior

1. Discover repository-provided checks before making completion claims.
2. Run the narrowest relevant checks during development.
3. Treat check failures as evidence to repair, not as suggestions to waive unless the task explicitly changes the rule.
4. Do not replace an available deterministic check with a statement such as "looks correct".

## Example

```text
format
lint
typecheck
build
focused tests
repository invariant scripts
```

## Exceptions and trade-offs

Not every quality property is mechanically decidable. Design quality, naming clarity, and product intent may still require judgment. Deterministic checks should constrain those decisions, not pretend to replace them.

## Consequences

This convention makes agent runs reproducible and lets a harness enforce the same acceptance criteria across different models and orchestration environments.
