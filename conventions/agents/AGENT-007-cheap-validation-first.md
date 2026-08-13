# AGENT-007 — Run cheap validation before expensive validation

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-003`

## Rule

Order required validation approximately from cheapest and narrowest to most expensive and broadest, and stop progression at the first failing layer.

## Rationale

Running an expensive system or E2E suite before inexpensive local checks wastes execution and gives less precise feedback. Early narrow failures are usually easier to diagnose and repair.

## Agent behavior

Prefer an order such as:

```text
format
→ lint/static analysis
→ typecheck/compile focused code
→ focused unit/module tests
→ integration tests
→ system tests
→ E2E tests
```

Only advance after the currently required lower-cost layer passes.

## Exceptions and trade-offs

The exact ordering is repository-specific. A fast integration smoke test may sometimes be cheaper than a full typecheck. The rule concerns observed cost and scope, not fixed tool names.

## Consequences

Agent loops fail faster, consume fewer resources, and receive better-localized diagnostic signals.
