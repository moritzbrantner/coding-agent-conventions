# Reproducibility conventions

## REP-001 — Green verification introduces no new warnings

- New and cleaned repositories should treat compiler and linter warnings as failures.
- Existing warning debt may use an explicit temporary baseline, but changes must not add warnings and the baseline may only shrink.
- Prefer a narrow suppression with a reason over disabling a warning category globally.

## REP-002 — Mechanize stable preferences before instructing agents

- Prefer ecosystem-native compiler options, formatters, linters, analyzers, schemas, tests, and configuration over prose instructions for mechanically decidable policy.
- Keep policy in conventions and mechanics in deterministic tools; do not invent a bespoke checker when an established native tool already expresses the rule well.

## REP-003 — Generated outputs are disposable local state by default

- Do not commit generated artifacts when source inputs plus a deterministic generator can reproduce them.
- Generation must be deterministic and idempotent. Expensive generators may reuse a valid local result based on declared inputs and generator/tool versions.
- Clean verification and CI may regenerate required outputs from source. Commit generated output only when the generated file itself is intentionally part of a distribution or public contract.

## REP-004 — Observable output has stable ordering

- Define deterministic ordering for values that are serialized, persisted, hashed, snapshotted, compared, or emitted through user- or machine-visible interfaces.
- Internal sets and maps may remain unordered when order has no observable meaning.

## REP-005 — Control time, randomness, and generated identities where behavior depends on them

- Put clocks, randomness, and ID generation behind a controllable seam only when behavior depends on them.
- Tests use fixed clocks and fixed or seeded randomness/identities by default; use real implementations when their behavior is specifically under test.

## REP-006 — Keep machine time and locale semantics explicit

- Represent instants and machine-readable timestamps in UTC unless the domain explicitly requires another zone.
- Parsing, serialization, and tests use explicit invariant formats, time zones, and locales.
- Convert to a user's locale, currency, number format, or time zone at deliberate presentation boundaries.

## REP-007 — Compare floating-point results by their semantic contract

- Exact comparison is appropriate when exactness is part of the contract or a value is merely carried through unchanged.
- Computed floating-point results use an explicit domain-appropriate tolerance; do not hide different accuracy requirements behind one global epsilon.

## REP-008 — Pin toolchains exactly

- Repositories pin exact versions of the toolchains that participate in build and verification using the ecosystem's normal native mechanism.
- When a landscape-wide canonical version exists, repository pins must match it unless the repository documents an explicit compatibility exception.
- Do not use floating toolchain channels such as `latest` or silently upgrade a toolchain to make a task pass.

## REP-009 — Unused implementation code is not part of a green baseline

- Unused private code, imports, variables, parameters, and unreachable implementation paths should fail deterministic verification where the language can detect them.
- Public library seams, callbacks, FFI, generated bindings, and feature-gated code may use an explicit language/tooling-supported annotation or suppression when the unused shape is intentional.
- Do not globally disable unused-code diagnostics to accommodate one intentional seam.

## REP-010 — Handle closed variants exhaustively and unknown external values explicitly

- Closed enums, variants, and discriminated unions owned by the application should be handled exhaustively so adding a new case creates a deterministic failure at affected callers.
- External protocols and deserialization boundaries may use an explicit unknown/fallback case when forward compatibility requires it.
