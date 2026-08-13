# REPO-008 — Templates expose a canonical validation interface

**Status:** Accepted

## Rule
Template repositories should expose a small, predictable set of canonical commands for development and validation, even when the underlying framework tools differ.

The exact script names may vary by ecosystem, but a newly created project should make it mechanically obvious how to start development, run focused tests, run the broader validation gate, and build the project.

## Rationale
Agents should not rediscover the repository's basic control surface on every task. Templates are the right place to establish that interface once.

## Agent behavior
Prefer repository scripts or task commands as stable entry points over instructions that require agents to reconstruct long framework-specific command sequences.

## Principles
- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-004 — Make completion observable