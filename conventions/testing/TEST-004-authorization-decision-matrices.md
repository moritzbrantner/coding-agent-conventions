# TEST-004 — Test authorization as a decision matrix

**Status:** Proposed  
**Category:** Testing  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-003`, `PRINCIPLE-004`

## Rule

For each protected operation, test the authorization decision across the relevant combinations of authentication state, role scope, resource relationship, and context.

Every matrix must include denial cases, not only one representative allowed role. Where profiles or spaces exist, cover horizontal boundaries such as another account's profile, another space with the same role name, inactive membership, and a resource whose claimed space differs from its authoritative space.

Tests must assert both the outcome and the absence of protected disclosure or side effects on denial.

## Rationale

Authorization errors usually occur at boundaries between otherwise valid states: an owner in the wrong space, a stale role in an active session, a public profile with private fields, or an authenticated account accessing a guessed identifier. A list of happy-path role tests does not exercise those boundaries.

A decision matrix makes the policy reviewable and gives coding agents a mechanical checklist when a new role, resource, relationship, or entry point is added.

## Agent behavior

```text
1. Identify the operation's authorization inputs.
2. Enumerate equivalence classes for each input rather than every raw value.
3. Build a table containing allowed and denied combinations.
4. Exercise the shared policy at unit scope.
5. Exercise each server entry point at integration scope.
6. Assert status/result, returned field set, audit behavior when applicable,
   and that denied mutations leave persistent state unchanged.
7. Add an end-to-end case for the highest-risk user journey.
```

## Example

For `space.document.update`:

| Session | Membership | Resource space | Role | Expected |
|---|---|---|---|---|
| none | — | requested space | — | authentication required |
| valid | active | requested space | editor | allowed |
| valid | active | requested space | viewer | forbidden |
| valid | inactive | requested space | editor | forbidden |
| valid | active in another space | requested space | editor | forbidden |
| valid | active | different authoritative space | editor | forbidden or not found |
| revoked | active | requested space | editor | authentication required |

For a profile update, add owner, non-owner, delegated manager, public reader, disabled account, and stale-session cases as applicable.

## Exceptions and trade-offs

Do not generate the full Cartesian product when several combinations are semantically equivalent. Record equivalence classes and boundary cases so omissions are intentional and reviewable.

Pure policy tests are not sufficient when routing, serialization, caching, or persistence can bypass the policy. Preserve at least one integration test per distinct server entry-point pattern.

## Consequences

Authorization changes become visible as matrix changes. Horizontal escalation, stale authority, data leakage, and denied-write side effects are caught before broad end-to-end validation.
