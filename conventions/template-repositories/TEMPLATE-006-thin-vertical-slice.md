# TEMPLATE-006 — Prove the stack with a thin vertical slice

**Status:** Accepted  
**Category:** Template repositories

## Principles

- PRINCIPLE-002 — Structure should encode agent-relevant information
- PRINCIPLE-004 — Make completion observable

## Rule

A template should include the smallest working vertical slice that proves its intended architecture and critical integrations end to end.

Prefer one coherent example that crosses the important boundaries over many disconnected demo components, sample endpoints, or placeholder modules.

## Rationale

A thin vertical slice gives humans and agents executable evidence for how the pieces are meant to fit together: where code lives, how boundaries are crossed, how state or data flows, and which tests validate the path.

## Agent behavior

When a core technology or architectural boundary is part of the template's promise, keep one minimal path that exercises it. Remove examples that do not prove a deliberate integration or convention.

## Exceptions and trade-offs

The slice should remain domain-neutral and small. It is not a demo application and should not introduce business architecture that downstream projects are expected to delete.