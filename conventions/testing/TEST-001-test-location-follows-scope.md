# TEST-001 — Test location follows dependency scope

**Status:** Accepted  
**Category:** Testing

## Rule

Place a test at the **lowest directory in the source tree that contains all production-code elements conceptually covered by that test**.

Equivalently, the test belongs at the lowest common ancestor of the code whose behavior it verifies.

## Rationale

Test location should encode test scope.

This lets both humans and coding agents infer relevant tests from the directory tree without relying on repository-wide semantic search or a separate mapping between production files and test files.

A narrow test naturally sits close to the code it covers. A broader test naturally sits higher in the hierarchy.

## Agent behavior

When production code changes:

1. Start in the changed file's directory.
2. Consider tests in that directory relevant.
3. Walk through ancestor directories toward the source/module root.
4. Consider tests encountered on that path progressively broader validations of the change.

An agent should not need a separate central `/tests` tree merely to discover which tests correspond to a source file.

## Example

```text
src/
  application.test.ts                # covers multiple top-level subsystems

  orders/
    orders.test.ts                   # covers multiple parts of orders

    pricing/
      calculate.ts
      calculate.test.ts              # covers calculate.ts / pricing locally

    discounts/
      apply.ts
      apply.test.ts

  users/
    user-service.ts
    user-service.test.ts
```

For a change to:

```text
src/orders/pricing/calculate.ts
```

the structural validation path is:

```text
src/orders/pricing/calculate.test.ts
src/orders/orders.test.ts
src/application.test.ts
```

## Exceptions and trade-offs

### Toolchain constraints

Some ecosystems strongly prefer separate test projects or source roots. In that case, mirror the production hierarchy deterministically.

Example for C#:

```text
Backend/Users/UserService.cs
Backend.Tests/Users/UserServiceTests.cs
```

The important property is deterministic mapping, not literal physical adjacency.

### End-to-end assets

Tests whose main subject is an externally observable user journey rather than a source-tree dependency set may live in a dedicated E2E area. Their mapping should still be explicit.

## Consequences

- Directory structure becomes a lightweight test-dependency index.
- Agents can discover validation scope without broad semantic search.
- Test scope becomes visible in code review.
- Progressive validation can be derived from ancestor traversal.
