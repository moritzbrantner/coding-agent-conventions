# QUERY-003 — Update or invalidate the narrowest relevant query scope

**Status:** Accepted  
**Technology:** TanStack Query

## Rule

After a mutation, update or invalidate only the query scopes whose server data may actually have changed.

## Rationale

Broad invalidation hides dependency relationships, causes unnecessary refetches, and makes mutation effects harder to reason about.

## Agent behavior

Identify which query keys depend on the mutated resource. Prefer exact cache updates when the new value is known; otherwise invalidate the narrowest affected key prefix.

## Preferred pattern

Invalidate the affected entity or feature query keys.

## Anti-pattern

Invalidate the entire query cache after every mutation.

## Automatable check

No complete static check exists; broad invalidation APIs can be flagged for review.

## Exceptions and trade-offs

Broad invalidation is acceptable when the backend operation genuinely affects a broad unknown set and correctness is more important than refetch cost.
