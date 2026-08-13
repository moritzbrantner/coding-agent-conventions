# REACT-002 — Keep React state local by default

**Status:** Accepted  
**Technology:** React

## Rule

Own state at the smallest React subtree that needs it and widen its scope only when another real consumer requires shared ownership.

## Agent behavior

Begin with local ownership. Before lifting or centralizing a value, identify the additional consumer that requires the broader scope.

## Exceptions and trade-offs

Values that represent navigation or a shareable view should be evaluated under REACT-003.
