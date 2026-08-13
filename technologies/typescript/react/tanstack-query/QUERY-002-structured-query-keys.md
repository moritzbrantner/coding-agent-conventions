# QUERY-002 — Use structured deterministic query keys

**Status:** Accepted  
**Technology:** TanStack Query

## Rule

Define query keys with a consistent hierarchical structure instead of ad-hoc strings.

## Rationale

Deterministic keys make cache ownership, invalidation, and test expectations mechanically understandable.

## Agent behavior

Reuse feature-level key factories or an equivalent convention. Include every input that changes the fetched result.

## Preferred pattern

```ts
const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
};
```

## Anti-pattern

Construct unrelated string keys differently at each call site.

## Automatable check

Repository-specific linting or search checks can enforce key-factory usage.

## Exceptions and trade-offs

Very small features may use inline tuple keys when the structure remains obvious and consistent.
