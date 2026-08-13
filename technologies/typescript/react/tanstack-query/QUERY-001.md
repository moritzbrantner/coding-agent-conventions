# QUERY-001 — TanStack Query is the owner of backend-derived data

**Status:** Accepted  
**Technology:** TanStack Query

## Rule

Data whose source of truth is a backend should be read and cached through TanStack Query instead of being mirrored into another client-side owner.

## Agent behavior

Consume query results directly. Create another value only when it has genuinely separate semantics, such as an editable draft.

## Rationale

One owner avoids divergent copies and keeps freshness, loading, errors, and cache behavior together.

## Exceptions and trade-offs

Offline-first architectures may intentionally define a different ownership model and should document that override.
