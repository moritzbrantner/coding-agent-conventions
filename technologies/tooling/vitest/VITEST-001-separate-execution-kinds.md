# VITEST-001 — Separate execution kinds with names and scripts

**Status:** Accepted  
**Technology:** Vitest  
**Applies to:** TypeScript and JavaScript repositories using Vitest

## Principles

- `PRINCIPLE-002` — Structure should encode agent-relevant information.
- `PRINCIPLE-003` — Validate progressively.

## Inherits

- `TEST-001`, `TEST-002`, and `TEST-003`
- `BENCH-001` and `BENCH-002`

## Rule

Keep tests at their dependency scope, encode execution kind in the filename, and expose one non-interactive script per kind.

Use suffixes such as `*.unit.test.ts`, `*.integration.test.ts`, and `*.bench.ts`. Use separate Vitest configurations when environments or setup differ materially.

## Rationale

This matches the repository hierarchy while allowing deterministic selection by cost and environment.

## Agent behavior

1. Add the smallest relevant test next to the code it covers.
2. Select `test:unit`, `test:integration`, or `benchmark` from the filename kind.
3. Use `vitest run` for automation, never watch mode.
4. Emit JSON for benchmark CI runs.
5. Broaden only after the focused kind is green.

## Preferred pattern

Use explicit Bun scripts such as `test:unit`, `test:integration`, `bench`, and `bench:ci`.

## Anti-pattern

Do not centralize unrelated tests only to simplify a runner glob or let one catch-all script hide materially different environments.

## Automatable check

`coding-tooling` discovers the declared scripts and filename suffixes. Repository tests may verify that files are colocated and mapped to an execution kind.

## Exceptions and trade-offs

Small repositories may share one Vitest configuration while retaining explicit scripts and naming.

## Consequences

Agents can map changed scope and execution cost independently and run a deterministic narrow-to-broad ladder.
