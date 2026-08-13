# PRINCIPLE-002 — Structure should encode agent-relevant information

**Status:** Accepted

## Principle

Repository structure should communicate relationships that agents need to act safely and efficiently.

## Why

A repository is not only storage. Paths, hierarchy, names, and local instruction files can form a machine-readable map of scope, ownership, relevance, and dependency boundaries.

When the same information must instead be reconstructed from broad semantic search, agent behavior becomes less predictable.

## Implications

Examples include:

- test location communicates dependency scope,
- test suffix or metadata communicates execution kind,
- `AGENTS.md` placement communicates instruction scope,
- worktree boundaries communicate task ownership and isolation.

This principle is implemented by `REPO-001`, `TEST-001`, `TEST-003`, and `AGENT-006`.
