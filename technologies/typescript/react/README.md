# React conventions

React is treated as a specialization of TypeScript in this repository and inherits the parent TypeScript conventions.

## Accepted conventions

| ID | Convention |
|---|---|
| REACT-001 | [Colocate components and directly related artifacts](REACT-001-colocate-component-artifacts.md) |
| REACT-002 | [Keep state at the narrowest scope that needs it](REACT-002.md) |
| REACT-003 | [Put important navigational state in URL query parameters](navigation-convention.md) |
| REACT-004 | [Use effects for external synchronization](REACT-004-effects-for-external-synchronization.md) |
| REACT-005 | [Prefer composition over highly configurable mega-components](REACT-005-prefer-composition-over-mega-components.md) |
| REACT-006 | [Keep component boundaries structurally clear](component-boundaries.md) |
| REACT-007 | [Reuse shared UI before creating local primitives](REACT-007-reuse-shared-ui-before-local-primitives.md) |

## Child scopes

- [`nextjs/`](nextjs/)
- [`moritzbrantner-ui/`](moritzbrantner-ui/)
- [`tanstack-query/`](tanstack-query/)
- [`react-hook-form/`](react-hook-form/)
- [`zustand/`](zustand/)
- [`testing-library/`](testing-library/)

These are sibling specializations of React and may be composed together when a project uses several of them.
