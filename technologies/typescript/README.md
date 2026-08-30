# TypeScript conventions

## TS-002 — Model invalid states out of the type system

- Prefer types, especially discriminated unions, that make invalid combinations unrepresentable.

## TS-003 — Prefer type over interface

- Use type aliases instead of interfaces for TypeScript models and declarations.
- If interface-specific semantics such as declaration merging are genuinely required, use an explicit, narrowly scoped lint suppression rather than weakening the shared rule.
- Deterministic lint configuration: [`./TS-003.oxlint.json`](./TS-003.oxlint.json).
