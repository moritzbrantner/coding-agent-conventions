# TEST-003 — Keep test scope separate from test kind

**Status:** Accepted  
**Category:** Testing

## Rule

Use **location to communicate what code a test covers**, and use an independent mechanism such as naming or metadata to communicate **how the test executes**.

Do not assume that directory depth alone determines whether a test is a unit, integration, system, or E2E test.

## Rationale

Two separate dimensions are involved:

1. **Scope** — which parts of the codebase are covered?
2. **Kind / execution characteristics** — does the test use a database, network, browser, container, external service, etc.?

Conflating them makes repository structure ambiguous. A broad test can still be fast and in-memory. A narrow component test can still require a database.

## Agent behavior

Use directory position to determine relevance and breadth.

Use naming, metadata, test-runner configuration, or explicit commands to determine execution characteristics and cost.

Example naming:

```text
calculate.test.ts
orders.integration.test.ts
application.system.test.ts
checkout.e2e.test.ts
```

An agent should therefore answer two separate questions:

```text
Where is this test in the dependency hierarchy?
How must this test be executed?
```

## Example

```text
src/
  application.system.test.ts

  billing/
    billing.integration.test.ts

    invoice/
      calculate.ts
      calculate.test.ts
```

The directory hierarchy expresses scope:

```text
invoice -> billing -> application
```

The suffixes express execution kind:

```text
.test
.integration.test
.system.test
```

## Exceptions and trade-offs

A framework may impose specific file locations for certain test kinds. Where unavoidable, preserve a deterministic mapping from production scope to test scope and document the framework-specific rule.

## Consequences

This separation allows agent orchestration to optimize independently for:

- relevance,
- breadth,
- cost,
- environment requirements,
- execution order.
