# AUTHZ-003 — Personal profiles and spaces are authorization resources

**Status:** Proposed  
**Category:** Authorization  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-005`

## Rule

Model profiles, personal spaces, shared spaces, and the objects they contain as resources with explicit relationships to accounts.

“Own” is a relationship established from authoritative identifiers, not a special trust mode. A personal profile or personal space may receive convenient default policy, but its reads and mutations must use the same authorization mechanism as other resources.

At minimum:

- bind a profile to its account using an immutable account identifier,
- represent personal-space ownership explicitly,
- represent shared-space access through current memberships,
- derive a contained resource's space from authoritative server data rather than a client claim, and
- treat the active profile or active space as untrusted selection state until authorization succeeds.

Public visibility grants only the explicitly documented read capability. It does not imply mutation, enumeration of private fields, or access to sibling resources.

## Rationale

Personal resources often begin as an implicit extension of an account and later gain sharing, delegation, multiple profiles, imports, or administration. Special-case checks such as `requestedUserId === session.user.id` become scattered and fail when ownership and access are no longer identical.

Using the normal resource model makes personal-to-shared evolution explicit and keeps authentication independent from which profile or space the interface currently displays.

## Agent behavior

```text
1. Obtain account_id only from the validated session or trusted job identity.
2. Parse the requested profile_id, space_id, or resource_id as untrusted input.
3. Load the target and its owner, membership, and containing-space relationships.
4. Determine whether the requested action is public, owner-only, membership-based, or privileged.
5. Apply the same policy engine or decision function used for non-personal resources.
6. Return only fields allowed by the resulting capability and visibility policy.
```

## Example

```text
Account account-1
  owns Profile profile-1
  owns PersonalSpace space-personal-1
  is MEMBER of SharedSpace space-team-9

PATCH /profiles/profile-1
  allowed because owner(account-1, profile-1) grants profile.updateOwn

PATCH /profiles/profile-2
  denied even though the client marks profile-2 as "active"

GET /spaces/space-team-9/documents/document-4
  allowed only if document-4 belongs to space-team-9 and the current
  membership grants document.read
```

## Exceptions and trade-offs

A public, non-personal display projection may be readable without authentication. Keep that projection separate from private account or profile fields and authorize all mutations normally.

Applications that deliberately support several profiles per account should model which account owns or controls each profile and whether actions apply to the account or the selected profile. They must not make profile selection equivalent to authenticating as another principal.

## Consequences

Personal and collaborative features share one policy vocabulary. Multiple profiles, space switching, sharing, and delegation can be added without changing what authentication means.
