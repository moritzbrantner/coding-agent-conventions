# Authentication and Authorization Convention Language

This glossary fixes the terms used by the authentication and authorization conventions. It keeps identity, presentation, and resource scope separate so that similarly named roles or client-selected contexts do not acquire unintended authority.

## Language

**Account**:
The security principal to which authenticators, sessions, and account status are bound. Authentication establishes control of an account.
_Avoid_: User profile, active profile, active space

**Profile**:
A presentation resource associated with an account and governed by authorization policy. A profile is not an authenticator or security principal.
_Avoid_: Account, identity

**Space**:
A resource boundary that contains data and defines a scope for memberships and space roles. A space may be personal or shared.
_Avoid_: Tenant when no tenancy boundary exists, account

**Personal space**:
A space with an explicit ownership relationship to one account. It follows the same resource-authorization model as other spaces even when provisioned automatically.
_Avoid_: Account data, implicit self scope

**Membership**:
The current relationship between an account and a space. A membership may carry one or more space roles.
_Avoid_: Login, session

**System role**:
A role whose documented authority applies across the application rather than within one space.
_Avoid_: Global role, admin when the scope is ambiguous

**Space role**:
A role assignment attached to a membership and valid only within that membership's space.
_Avoid_: Role without an explicit scope

**Session**:
Continuity of an authentication event for one account. It is distinct from mutable roles and resource relationships.
_Avoid_: Profile, membership

**Active profile**:
The profile currently selected for presentation. Selecting a profile does not authenticate its owner or establish authority over it.
_Avoid_: Acting account, authenticated profile

**Active space**:
The space currently selected for navigation or presentation. Selecting a space does not establish membership or authority within it.
_Avoid_: Authorized space, current tenant
