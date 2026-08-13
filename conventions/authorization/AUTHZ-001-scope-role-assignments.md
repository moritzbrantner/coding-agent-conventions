# AUTHZ-001 — Every role assignment has an explicit authority scope

**Status:** Proposed  
**Category:** Authorization  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`, `PRINCIPLE-005`

## Rule

When using role-based access control, every role assignment must state the authority scope in which it is valid.

Keep system roles separate from space roles:

```text
system role assignment = account + system role
space role assignment  = account + space + membership + space role
```

A space role must never authorize a resource outside its space. A system role must not silently imply space membership, ownership, or access to every personal resource. Any platform-wide support or administration override must be an explicit policy capability, narrowly applied and audited.

Use scope-qualified vocabulary such as `system administrator`, `space owner`, and `space member`. Do not rely on an unqualified role name such as `admin` when more than one authority domain exists.

## Rationale

Flat RBAC works while all protected resources share one boundary. Personal profiles and multiple spaces introduce horizontal access-control questions that a global role hierarchy cannot answer:

- Which space grants the role?
- Does the resource belong to that space?
- Is the membership still active?
- Is the actor operating on their own profile or another account's profile?

Explicit scope prevents a manager in one space from becoming a manager everywhere and prevents system roles from accidentally bypassing personal-resource policies.

## Agent behavior

```text
1. Classify the operation as system-scoped, space-scoped, or resource-scoped.
2. Resolve the target resource and its containing space, if any.
3. Load the account's current assignment in that exact scope.
4. Map the scoped role to capabilities.
5. Evaluate resource relationships and contextual constraints in addition to the role.
6. Deny when the scope, membership, role, resource, or mapping is missing or unknown.
```

Do not add a new role merely to encode ownership of one resource or a transient condition. Represent ownership and membership as relationships and environmental conditions as policy inputs.

## Example

```text
account-7:
  system role: none
  membership(space-a): OWNER
  membership(space-b): VIEWER

decision: edit document in space-a -> role may grant capability
decision: edit document in space-b -> denied unless another policy grants it
decision: edit document in space-c -> denied; no membership
decision: inspect all accounts     -> denied; no system capability
```

Anti-pattern:

```ts
if (session.user.role === "ADMIN") {
  return updateAnyProfileOrSpace(input);
}
```

Preferred decision shape:

```ts
authorize({
  actor: account,
  action: "space.document.update",
  resource: document,
  relationships: { membership },
  context: { authenticationAge },
});
```

## Exceptions and trade-offs

A single-account or single-space application may have only one meaningful role scope. It may use a simpler representation, but it must not present that representation as safely multi-space. Introduce explicit scope before adding a second independently administered space.

Some domains intentionally grant system operators cross-space access. Model that as a named system capability with explicit resource policy, audit requirements, and any required step-up authentication rather than as an undocumented consequence of role rank.

## Consequences

Role names remain understandable as spaces multiply. Permission revocation has a precise target, horizontal privilege escalation becomes testable, and space-level administration no longer conflates with platform administration.
