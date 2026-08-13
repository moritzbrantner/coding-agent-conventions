# TS-002 — Model invalid states out of the type system

**Status:** Accepted  
**Technology:** TypeScript

## Rule

Prefer types that make invalid state combinations unrepresentable, especially discriminated unions over loosely related booleans or optional fields.

## Rationale

A valid state model reduces runtime branching and lets the compiler guide both humans and agents through refactors.

## Agent behavior

When multiple fields describe one state machine, consider replacing them with a discriminated union before adding more conditionals.

## Preferred pattern

```ts
type LoadState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
```

## Anti-pattern

```ts
type LoadState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
};
```

## Automatable check

No general linter can prove this reliably; enforce through review and domain-focused tests.

## Exceptions and trade-offs

Simple independent booleans are fine when they truly represent independent facts rather than one state machine.
