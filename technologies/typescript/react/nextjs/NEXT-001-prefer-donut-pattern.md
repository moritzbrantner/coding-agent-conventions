# NEXT-001 — Prefer the donut pattern

**Status:** Accepted  
**Technology:** Next.js

## Rule

Prefer a server-first donut pattern: keep as much of the component tree server-rendered as practical and introduce focused client boundaries only around interactive behavior.

## Rationale

Small client islands preserve server rendering and data access while avoiding an unnecessarily large client-side subtree.

## Agent behavior

Start from Server Components. Add a client boundary only where browser APIs, interactive state, effects, or event handlers require it. Keep surrounding and pass-through content server-rendered when possible.

## Preferred pattern

A small interactive client component is composed inside a larger server-rendered page while server-rendered content remains outside or passes through that client boundary.

## Anti-pattern

Mark a large route subtree as client-side because one deeply nested control needs interactivity.

## Automatable check

No complete static check exists; review the placement and breadth of client boundaries.

## Exceptions and trade-offs

Client-heavy application areas may legitimately have larger client boundaries when interactivity dominates the subtree.
