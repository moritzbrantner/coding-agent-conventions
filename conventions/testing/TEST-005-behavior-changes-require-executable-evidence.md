# TEST-005 — Behavior changes require executable evidence

**Status:** Accepted  
**Category:** Testing

## Rule

Every behavior change must add or update the smallest automated test that would fail without the change. Every bug fix must include a regression or characterization test unless deterministic automation is technically impossible.

## Rationale

Implementation completion must be observable independently of agent confidence. A focused test records the intended behavior and prevents the same defect from returning silently.

## Agent behavior

1. Translate the changed acceptance criterion or reported defect into an observable assertion.
2. Place the test at the lowest owning dependency scope under `TEST-001`.
3. Confirm the test detects the missing or defective behavior when practical.
4. Implement until the focused test passes.
5. Climb the validation ladder under `TEST-002`.
6. If automation is impossible, record the exact manual or external evidence and the missing capability.

## Example

A defect in a route resolver receives a colocated regression test. A changed browser workflow receives focused domain/component tests first and a Playwright assertion only for the boundary that requires a real browser.

## Exceptions and trade-offs

Pure documentation and mechanically verified configuration changes may rely on their deterministic validator. Do not add a low-value test that merely repeats a compiler, schema, or formatter check.

## Consequences

Behavioral intent accumulates as executable evidence and gives coding agents a falsifiable completion target.
