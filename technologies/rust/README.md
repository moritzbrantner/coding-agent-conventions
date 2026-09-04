# Rust

Rust-specific conventions.

Repository-specific rules override these where they conflict.

## RUST-001 — Encode invariants in types

* Prefer types that make invalid domain states unrepresentable.
* Validate external input when converting it into those types.
* Do not replace meaningful domain distinctions with primitive strings, integers, or booleans merely for convenience.

## RUST-002 — Avoid `unwrap` and `expect` in normal production control flow

* Handle or propagate recoverable errors explicitly.
* Prefer `Result`, `?`, typed errors, or explicit recovery.
* `unwrap()` or `expect()` require a proven invariant or an intentionally fatal condition.
* Exceptions: tests, examples, and clearly proven initialization invariants.

## RUST-003 — Do not clone merely to satisfy the borrow checker

* Treat unnecessary cloning as a signal to inspect ownership boundaries first.
* Prefer borrowing, moving ownership, restructuring lifetimes, or changing API boundaries when those better express ownership.
* Clone when duplication is semantically intended or materially simpler than introducing inappropriate complexity.

## RUST-004 — Keep source-item groups deterministic without alphabetizing implementations

- At module scope, keep source items in canonical groups: modules and foreign modules, imports, macros, global assembly, constants and statics, types/traits/implementations, then functions.
- Do not alphabetize items within those groups.
- In traits, order associated item kinds as constants, types, then functions.
- Do not impose declaration ordering inside impl blocks, struct fields, or enum variants.
- Deterministic enforcement: [`./RUST-004.json`](./RUST-004.json).

## Enforcement

Formatting, Clippy configuration, compiler settings, and other deterministic checks belong in repository tooling and CI rather than being duplicated as conventions here.
