# REACT-005 — Prefer composition over highly configurable mega-components

**Status:** Accepted  
**Technology:** React

## Rule

Prefer small composable components over one component controlled by many unrelated boolean flags and modes.

## Rationale

Composition keeps responsibilities explicit and avoids a combinatorial state space that is difficult for humans, tests, and agents to reason about.

## Agent behavior

When adding another behavioral flag to an already configurable component, first consider extracting a child, wrapper, slot, or dedicated variant component.

## Preferred pattern

Compose focused components whose names and props describe one responsibility.

## Anti-pattern

A single component with numerous props such as `compact`, `editable`, `withHeader`, `showActions`, and `inline` that create many behavior combinations.

## Automatable check

No reliable general static check exists; component API size can be reviewed or monitored heuristically.

## Exceptions and trade-offs

A small number of closely related presentation variants can remain props when they do not create materially different responsibilities.
