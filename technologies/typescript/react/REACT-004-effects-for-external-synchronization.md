# REACT-004 — Use effects for external synchronization

**Status:** Accepted  
**Technology:** React

## Rule

Use React effects to synchronize with systems outside React, not as a general mechanism for deriving values or sequencing ordinary application logic.

## Rationale

Effects add an asynchronous synchronization layer that is harder to reason about than render-time derivation or explicit event handling.

## Agent behavior

Before adding an effect, identify the external system being synchronized. Prefer render-time computation or event handlers when no external system exists.

## Preferred pattern

Use an effect to subscribe to a browser API and clean up that subscription.

## Anti-pattern

Use an effect solely to copy one piece of React state into another.

## Automatable check

React hook lint rules catch dependency errors, but the semantic need for an effect requires review.

## Exceptions and trade-offs

Framework or library integrations may expose effect-based APIs; keep those effects focused at the integration boundary.
