# RUST-001 — Encode invariants in types

**Status:** Accepted  
**Technology:** Rust

## Rule

Use Rust's type system to make invalid domain states unrepresentable when doing so keeps the model understandable.

## Rationale

Compile-time invariants reduce runtime checks and give refactoring agents strong mechanical feedback.

## Agent behavior

Prefer enums, newtypes, constrained constructors, and ownership-aware APIs over comments or repeated runtime assumptions.

## Preferred pattern

A validated domain value is constructed through an API that guarantees its invariant.

## Anti-pattern

Represent several mutually exclusive states with unrelated booleans and document the valid combinations only in comments.

## Automatable check

The compiler enforces the encoded invariants once they are represented in types; choosing the model itself requires design review.

## Exceptions and trade-offs

Do not introduce elaborate type machinery when a simple runtime check is clearer and the invariant is not central to the domain.
