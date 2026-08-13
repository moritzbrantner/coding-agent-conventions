# AGENT-006 — Prefer mechanical discovery before semantic search

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`

## Rule

When relevant artifacts can be derived from paths, naming conventions, metadata, or explicit indexes, use that deterministic mapping before repository-wide semantic search.

## Rationale

Semantic search is useful when relationships are genuinely implicit, but it should not be the first mechanism for relationships the repository already encodes. Mechanical discovery is cheaper, reproducible, and easier to verify.

## Agent behavior

1. Check documented path and naming rules.
2. Follow explicit metadata or indexes.
3. Use local upward/downward traversal where the repository hierarchy encodes scope.
4. Fall back to semantic or repository-wide search only for relationships not resolved mechanically.

## Example

For a changed file:

```text
src/orders/pricing/calculate.ts
```

relevant tests may be discovered by walking:

```text
src/orders/pricing/
→ src/orders/
→ src/
```

rather than searching the whole repository for files that "look related".

## Exceptions and trade-offs

Legacy repositories may not encode enough structure for deterministic discovery. In that case semantic search is appropriate, and the missing mapping may itself be a candidate for a future convention.

## Consequences

Agent behavior becomes faster and more predictable, and repository structure doubles as a lightweight dependency index.
