# TS-003 — Prefer `type` over `interface`

**Status:** Accepted  
**Technology:** TypeScript

## Rule

Prefer `type` aliases over `interface` for application-level TypeScript models.

## Rationale

Using one default construct reduces stylistic branching and works consistently for object shapes, unions, intersections, and aliases.

## Agent behavior

Use `type` when introducing new application types. Do not convert an existing `interface` merely for churn unless the file is already being meaningfully changed.

## Preferred pattern

```ts
type User = {
  id: string;
  name: string;
};
```

## Anti-pattern

```ts
interface User {
  id: string;
  name: string;
}
```

## Automatable check

Use an ESLint TypeScript consistency rule configured to prefer `type` where available.

## Exceptions and trade-offs

Use `interface` when declaration merging or a third-party/framework API specifically requires or materially benefits from it.
