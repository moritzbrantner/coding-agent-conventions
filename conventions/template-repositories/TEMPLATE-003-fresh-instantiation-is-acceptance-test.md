# TEMPLATE-003 — Fresh instantiation is the acceptance test

**Status:** Accepted  
**Category:** Template repositories

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-004 — Make completion observable

## Rule

The authoritative acceptance test for a template is a fresh project instance created from the template and validated without relying on the maintainer's existing machine-local project state.

A template change is not complete merely because the template repository itself still runs. The generated or freshly copied result must bootstrap and pass its required deterministic gates.

## Rationale

Templates commonly accumulate hidden assumptions: cached dependencies, local environment files, generated artifacts, global tools, existing databases, or paths that only work in the source repository. Testing a clean instantiation detects exactly the class of failure a real consumer experiences.

## Agent behavior

For meaningful template changes, create or simulate a clean instance, perform the documented setup, then run the narrowest relevant validation followed by the broader required gates.

Prefer automation that performs this check repeatedly over a manual release checklist.

## Consequences

The template itself becomes testable as a product rather than only as source code.