# QUERY-004 — Do not copy query results into local state

**Status:** Accepted  
**Technology:** TanStack Query

## Rule

Consume or derive from query data directly instead of synchronizing it into another local state value.

## Rationale

Mirrored copies create two sources of truth and require synchronization logic that can become stale.

## Agent behavior

Before copying query data, determine whether the new value has independent semantics. If not, render from the query data or derive a value during render.

## Preferred pattern

```ts
const visibleUsers = query.data?.filter(matchesFilter) ?? [];
```

## Anti-pattern

Use an effect solely to copy every new query result into `useState`.

## Automatable check

Effects whose body assigns query data into local state can be flagged heuristically.

## Exceptions and trade-offs

An editable draft is separate state when the user may intentionally diverge from the server value before saving or cancelling.
