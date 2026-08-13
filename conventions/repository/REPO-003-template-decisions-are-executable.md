# REPO-003 — Template decisions are executable

**Status:** Accepted  
**Category:** Repository

## Rule

A template repository should encode its chosen defaults through working configuration, scripts, structure, dependencies, tests, and examples. Documentation should explain deliberate trade-offs rather than ask a generated project to repeat setup manually.

## Rationale

A template exists to remove repeated setup decisions. Important choices should already be present and mechanically discoverable after instantiation.

## Agent behavior

Prefer changing generated repository state over adding setup prose. Do not duplicate formatter, compiler, lint, or package-manager configuration in documentation when generated files already make it explicit.

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-005 — Document decisions, not defaults