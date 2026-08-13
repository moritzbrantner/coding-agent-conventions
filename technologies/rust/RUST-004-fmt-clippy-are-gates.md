# RUST-004 — `cargo fmt` and `cargo clippy` are completion gates

**Status:** Accepted  
**Technology:** Rust

## Rule

A Rust change is not complete until formatting and the repository's relevant Clippy checks pass.

## Rationale

Formatting and linting are deterministic feedback and therefore belong to the harness definition of done rather than optional cleanup.

## Agent behavior

Run formatting and Clippy before declaring a Rust task complete. Fix findings rather than suppressing them unless the suppression is intentional and documented.

## Preferred pattern

```text
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
```

Use the repository's actual commands when they differ.

## Anti-pattern

Declare completion based only on compilation or tests while deterministic format/lint gates remain red.

## Automatable check

Enforce the same commands in CI or the repository validation harness.

## Exceptions and trade-offs

Repositories may use a narrower Clippy invocation or allow explicitly documented lints; the repository-specific command is authoritative.
