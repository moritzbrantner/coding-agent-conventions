# AUTHN-002 — One-time authentication secrets are non-recoverable credentials

**Status:** Proposed  
**Category:** Authentication  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-005`

## Rule

Email-verification, password-reset, invitation, login-code, recovery, and similar one-time secrets must be:

- generated with a cryptographically secure random source,
- bound to one purpose and intended subject,
- stored server-side only as a cryptographic digest when later comparison is sufficient,
- short-lived,
- consumed atomically at most once, and
- absent from logs, analytics, audit metadata, and production response bodies.

Unauthenticated endpoints that initiate these flows must not disclose whether the targeted account, profile, or membership exists through materially different public responses.

## Rationale

A bearer who obtains one of these values can often verify an account, reset a credential, accept membership, or start a session. Encoding is reversible and therefore does not protect a database copy. Logging a complete token-bearing URL creates additional credential stores with unclear access and retention.

Purpose binding prevents a value issued for a low-risk flow from being replayed in a more privileged flow. Atomic consumption prevents concurrent requests from using the same supposedly one-time credential more than once.

## Agent behavior

```text
1. Generate a random raw secret.
2. Return or transmit the raw secret only through the intended delivery channel.
3. Persist digest(secret), subject, purpose, expiry, and consumption state.
4. On presentation, derive the same digest and load the exact purpose-bound record.
5. Reject missing, expired, consumed, or mismatched records.
6. Apply the state change and consume the record in one transaction.
7. Record only a non-sensitive event identifier in audit output.
```

## Example

```text
raw reset secret sent by email:
  n7u...high-entropy-value...J2

persisted record:
  digest: sha256(raw secret)
  subject_account_id: account-17
  purpose: password-reset
  expires_at: 2026-08-13T14:30:00Z
  consumed_at: null
```

Anti-pattern:

```text
console.info("reset URL", fullUrlContainingRawSecret)
database.token = base64(rawSecret)
```

## Exceptions and trade-offs

A deliberately non-secret local fixture may expose a deterministic token to make an isolated test executable. Production code paths must not inherit that behavior, and the distinction must be mechanically configured rather than inferred from an operator's intent.

Some protocols prescribe structured signed tokens. Use a maintained implementation, validate every protocol-required claim, keep lifetimes short, and retain replay state when the flow requires single use.

## Consequences

Compromise of application logs or the token table does not immediately disclose usable bearer credentials. Authentication lifecycle tests gain deterministic expiry, purpose, and replay cases.
