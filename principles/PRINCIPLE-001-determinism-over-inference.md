# PRINCIPLE-001 — Prefer determinism over inference

**Status:** Accepted

## Principle

If a project property can be checked, derived, or encoded mechanically, prefer that mechanism over asking a coding agent to infer intent semantically.

## Why

Coding agents are strongest when they can combine reasoning with explicit evidence. Repeatedly inferring repository rules from surrounding code is slower, less reproducible, and more error-prone than following executable checks, path conventions, naming rules, or machine-readable metadata.

## Implications

Prefer:

- executable checks over subjective review instructions,
- deterministic mappings over repository-wide semantic search,
- explicit baselines over assumed branch state,
- structured ownership and scope over implicit conventions.

This principle is implemented by conventions such as `AGENT-001`, `AGENT-006`, and `REPO-001`.
