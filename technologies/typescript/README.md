# TypeScript conventions

TypeScript is a parent scope for the React stack documented in this repository. Rules here apply to all descendant TypeScript technology scopes unless a more specific rule overrides the conflicting part.

## Accepted conventions

| ID | Convention |
|---|---|
| TS-001 | [Keep TypeScript strict and do not use `any` to bypass uncertainty](TS-001-strict-types-no-any.md) |
| TS-002 | [Model invalid states out of the type system](TS-002-model-invalid-states-out.md) |
| TS-003 | [Prefer `type` over `interface`](TS-003-prefer-type-over-interface.md) |
| TS-004 | [Use semicolons](TS-004-semicolons.md) |

React-specific rules inherit these conventions under [`react/`](react/).
