# TS-001 — Keep TypeScript strict and do not use `any` to bypass uncertainty

**Status:** Accepted  
**Technology:** TypeScript

## Rule

Keep TypeScript strict and do not use `any` to bypass uncertainty; use `unknown`, explicit types, generics, and narrowing instead.

## Rationale

Type uncertainty should be visible and resolved rather than silently disabling the type system. This gives humans and coding agents reliable compiler feedback during refactoring.

## Agent behavior

1. Preserve strict compiler settings.
2. Do not introduce `any` to make an error disappear.
3. Use `unknown` at uncertain boundaries and narrow it before use.
4. Prefer precise domain types and generics when the shape is known.

## Preferred pattern

```ts
function parse(value: unknown): User {
  return userSchema.parse(value);
}
```

## Anti-pattern

```ts
function parse(value: any): User {
  return value;
}
```

## Automatable check

Use `strict: true` in `tsconfig.json` and a linter rule forbidding explicit `any` where supported.

## Exceptions and trade-offs

An unavoidable third-party boundary may require a temporary escape hatch, but it should be isolated and documented rather than propagated through application code.
