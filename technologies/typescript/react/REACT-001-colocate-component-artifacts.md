# REACT-001 — Colocate components and their directly related artifacts

**Status:** Accepted  
**Technology:** React

## Rule

Keep a component, its focused tests, styles, hooks, and types in the smallest shared directory that owns them.

## Rationale

Colocation makes ownership and relevant context mechanically discoverable for humans and coding agents.

## Agent behavior

Place component-specific artifacts beside the component. Move an artifact upward only when its real scope expands beyond that component.

## Preferred pattern

```text
UserCard/
  UserCard.tsx
  UserCard.test.tsx
  useUserCard.ts
```

## Anti-pattern

```text
components/UserCard.tsx
hooks/useUserCard.ts
tests/UserCard.test.tsx
```

## Automatable check

Repository scripts can validate known path relationships; the ownership decision itself may require review.

## Exceptions and trade-offs

Truly shared artifacts belong at the lowest common scope of all consumers rather than being duplicated.
