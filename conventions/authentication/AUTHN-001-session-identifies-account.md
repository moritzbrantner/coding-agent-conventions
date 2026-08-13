# AUTHN-001 — A session identifies an account, not an authorization context

**Status:** Proposed  
**Category:** Authentication  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-005`

## Rule

Authentication must establish the account acting in the session. It must not authenticate a profile, active space, membership, or role as though that mutable context were the principal.

For first-party browser applications, prefer a server-owned, revocable session represented in the browser by an opaque, high-entropy identifier. The server must enforce session expiry, revocation, and current account eligibility. Session cookies must be restricted to the narrowest practical host and path and set `Secure`, `HttpOnly`, and an appropriate `SameSite` policy in production.

Mutable authorization facts copied into a cookie, token, header, client state, or request body are hints unless the repository explicitly chooses the claim lifetime as its revocation window. Before a protected operation, resolve facts that require stronger freshness from an authoritative server-side source.

## Rationale

Profiles and spaces change independently of authentication. A profile can be renamed or hidden, an account can leave a space, and a role can be revoked while a session remains active. Treating login-time claims or a client-selected space as authority delays revocation and can turn context switching into privilege escalation.

An opaque server session also exposes less identity data to the browser and gives the application a direct way to terminate an individual session.

## Agent behavior

```text
1. Resolve and validate the presented session.
2. Obtain the immutable account identifier from the validated session.
3. Reject expired, revoked, disabled, or otherwise ineligible accounts.
4. Resolve the requested profile or space independently from request input.
5. Load current roles and relationships from their authoritative source.
6. Pass those facts to the authorization policy.
```

When changing account status, credentials, or privilege level, invalidate affected sessions or rotate them according to the repository's documented policy.

## Example

Preferred session and request model:

```text
cookie: __Host-session=<opaque random value>

server session:
  session_id -> account_id, authenticated_at, expires_at, revoked_at

request:
  PATCH /spaces/space-42/profiles/profile-7

authorization inputs resolved by the server:
  account_id + space-42 membership + profile-7 owner + requested action
```

The following is not sufficient authorization evidence:

```json
{
  "accountId": "account-1",
  "activeSpaceId": "space-42",
  "role": "admin"
}
```

Even when signed, these mutable claims do not prove that the account still holds that role in that space.

## Exceptions and trade-offs

Self-contained signed sessions may be acceptable for a deliberately constrained system where per-session revocation and immediate authorization freshness are not required. Such a repository must document the accepted staleness window, include and verify an internal expiry, protect cookie transport, and avoid treating mutable embedded claims as indefinitely authoritative.

External APIs and native applications may use access tokens rather than browser cookies. They must still authenticate a stable principal and validate token issuer, audience, expiry, revocation strategy, and scopes at the resource server.

## Consequences

Authentication adapters can change without redefining profiles, spaces, or roles. Account disablement and membership revocation take effect predictably, and client-side context switching cannot itself grant access.
