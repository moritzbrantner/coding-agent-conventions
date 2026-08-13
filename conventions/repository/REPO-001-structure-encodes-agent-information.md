# REPO-001 — Repository structure encodes agent-relevant relationships

**Status:** Accepted  
**Category:** Repository  
**Derived from:** `PRINCIPLE-002`

## Rule

Prefer repository layouts where relationships an agent needs can be derived mechanically from paths, hierarchy, naming, or local metadata.

## Rationale

When scope, relevance, ownership, or dependency relationships are encoded structurally, agents can act without repeatedly reconstructing them through broad semantic search.

## Agent behavior

Use structure as an index before inference. Examples:

```text
path depth        → code/test scope
file suffix       → test execution kind
AGENTS.md location → instruction scope
worktree boundary → task ownership
```

When adding a new convention, ask whether the relationship it describes can be made visible in the repository itself.

## Exceptions and trade-offs

Do not distort a codebase merely to satisfy an agent. Human readability, framework constraints, and domain boundaries remain important. Structural encoding is valuable when it expresses a real relationship cleanly.

## Consequences

The repository itself becomes a lightweight machine-readable model for agents and tooling, reducing dependence on model-specific intuition.
