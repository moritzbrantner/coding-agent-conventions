# TEMPLATE-001 — Template repositories are executable golden paths

**Status:** Accepted  
**Category:** Template repositories

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-002 — Structure should encode agent-relevant information
- PRINCIPLE-005 — Document decisions, not defaults

## Rule

A template repository should encode the preferred starting architecture and development workflow as a working repository, not merely provide an empty scaffold.

Creating a project from the template should start from an intentional golden path: directory structure, boundaries, development commands, testing approach, environment contract, and agent-facing instructions should already demonstrate the way projects of that class are expected to evolve.

## Rationale

A template has unusually high leverage because every accidental choice is copied into downstream projects. A working golden path removes repeated design decisions and gives coding agents concrete local examples instead of forcing them to infer the intended architecture from prose.

## Agent behavior

When improving a template, prefer implementing the intended pattern directly in the repository over documenting a sequence of manual setup steps for every new consumer.

Do not add abstractions merely to make the template look comprehensive; only encode decisions that are intentionally meant to propagate.

## Exceptions and trade-offs

A template may deliberately leave domain-specific choices open. Those extension points should be clear rather than represented by speculative boilerplate.