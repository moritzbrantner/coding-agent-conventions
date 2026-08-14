# CI-002 — Automation dependencies respect repository visibility

**Status:** Accepted  
**Category:** CI  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-005`

## Rule

Private repositories may consume account-approved private Actions. Public repositories must use
publicly accessible Actions or repository-local commands and must not depend on private automation
that their workflow runner cannot retrieve.

## Rationale

GitHub's sharing boundary permits private Actions to be shared with eligible private repositories,
but not with public consumers. Treating both repository classes as identical produces workflows
that appear reusable but fail during Action resolution.

## Agent behavior

1. Determine the Consumer Repository visibility before selecting an Action dependency.
2. Use the private deterministic tooling Action only for approved private consumers.
3. Preserve a public workflow path based on public Actions and repository-local commands.
4. Never copy private Action source into a public repository merely to bypass the visibility boundary.

## Example

```text
private consumer -> private coding-tooling Action -> semantic tier report
public consumer  -> public Actions/local commands -> public validation workflow
```

## Exceptions and trade-offs

If the private Action is intentionally published later, public consumers may migrate through a
normal version-pinned change. Publication is a separate product and security decision, not an
implicit consequence of reuse.

## Consequences

Private tooling can be dogfed before publication while public CI remains executable and honest about
its dependency boundary.
