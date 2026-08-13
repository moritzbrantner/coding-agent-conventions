# AUTHZ-002 — Authorize every protected operation at the server boundary

**Status:** Proposed  
**Category:** Authorization  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-004`

## Rule

Every protected server-side operation must make a deny-by-default authorization decision using the current actor, requested action, target resource, relevant relationships, and required context.

Place the authoritative check in a shared policy or protected data-operation boundary that every entry point must cross. Route middleware, navigation guards, layouts, hidden controls, and client-side permission checks may improve presentation or reject work early, but they are not the security boundary.

Distinguish failure outcomes deliberately:

- use an authentication-required outcome when no valid principal exists,
- use a forbidden outcome when the principal is known but lacks authority, and
- use not-found when policy intentionally conceals whether a target resource exists.

Authorization failure must occur before protected data is disclosed or a side effect begins.

## Rationale

Applications commonly expose the same behavior through pages, route handlers, server functions, background jobs, imports, or internal APIs. Checking only a visible route or button leaves alternate entry points unprotected.

A consistent decision shape also prevents role-only checks from overlooking ownership, membership, space boundaries, resource state, or recent-authentication requirements.

## Agent behavior

```text
1. Enumerate every entry point to the protected operation.
2. Authenticate the account where the execution environment supports a session.
3. Resolve the target resource without disclosing it to the caller.
4. Load current scoped roles and relationships.
5. Evaluate actor + action + resource + relationships + context.
6. Stop on deny before reading protected fields or producing side effects.
7. Return the repository's consistent authentication/authorization outcome.
8. Audit security-relevant denials without recording secrets or unnecessary personal data.
```

## Example

```text
UI page ─────────────┐
route handler ───────┼─> updateSpaceProfile(account, space, profile, input)
server function ─────┘       |
                              └─> authorize update before mutation
```

The UI may hide the edit control based on a cached capability. The update operation still reloads the current membership and profile relationship before writing.

## Exceptions and trade-offs

Public operations should be marked public explicitly rather than becoming public because no rule matched. An infrastructure boundary may enforce coarse service-to-service authentication, but resource authorization still belongs where the application has the domain facts required to decide.

Repeated authorization checks may be memoized within one request when the inputs and authoritative version are identical. Do not cache decisions beyond the freshness requirements of role, membership, or resource changes.

## Consequences

Adding a new transport does not require re-inventing policy. Optimistic UI and routing checks can evolve independently, while one enforceable server boundary remains authoritative.
