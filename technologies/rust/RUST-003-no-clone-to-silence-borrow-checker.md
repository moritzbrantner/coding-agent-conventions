# RUST-003 — Do not clone merely to satisfy the borrow checker

**Status:** Accepted  
**Technology:** Rust

## Rule

Do not introduce `clone()` solely as the quickest way to make borrowing errors disappear; cloning should have a semantic or measured ownership reason.

## Rationale

Unnecessary clones obscure ownership design and can introduce hidden allocation or copying costs.

## Agent behavior

When the borrow checker rejects code, first inspect lifetimes, ownership boundaries, references, API shape, and move semantics. Clone only when independent ownership is actually desired or the cost is deliberately accepted.

## Preferred pattern

Restructure borrowing or ownership so the code expresses the intended lifetime relationship.

## Anti-pattern

Add `.clone()` reflexively at each compiler error without understanding why ownership is duplicated.

## Automatable check

Clippy can detect some redundant clones; semantic clone necessity still requires review and profiling where performance matters.

## Exceptions and trade-offs

A cheap clone can be the clearest design when independent ownership is intentional. Readability may outweigh micro-optimization.
