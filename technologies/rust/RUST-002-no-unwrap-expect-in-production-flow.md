# RUST-002 — Do not use `unwrap` or `expect` in normal production control flow

**Status:** Accepted  
**Technology:** Rust

## Rule

Propagate or handle recoverable errors explicitly instead of using `unwrap()` or `expect()` as ordinary production control flow.

## Rationale

Unexpected panics hide failure semantics from callers and weaken Rust's explicit error model.

## Agent behavior

Use `Result`, `?`, typed errors, or explicit recovery. When using `unwrap` or `expect`, be able to state the invariant that makes failure impossible or intentionally fatal.

## Preferred pattern

```rust
let config = load_config()?;
```

## Anti-pattern

```rust
let config = load_config().unwrap();
```

## Automatable check

Clippy and repository-specific lint policy can flag unwrap/expect usage in production modules.

## Exceptions and trade-offs

Tests, examples, initialization with a proven invariant, or intentionally unrecoverable states may use them when the reason is clear.
