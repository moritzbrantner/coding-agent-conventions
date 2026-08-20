# Testing conventions

## TEST-001 — Test location follows dependency scope

- Place a test at the lowest source-tree directory containing all production code it covers.

## TEST-002 — Validate tests bottom-up

- Validate from the narrowest affected scope outward; re-run lower layers after production-code fixes.

## TEST-003 — Keep test scope separate from test kind

- Use location for coverage scope and independent names or metadata for execution kind.

## TEST-004 — Test authorization as a decision matrix

- Cover relevant authentication, role, relationship, and context combinations, including denial cases.
- Assert denial causes neither protected disclosure nor side effects.

## TEST-005 — Behavior changes require executable evidence

- Add or update the smallest automated test that would fail without a behavior change or bug fix.
