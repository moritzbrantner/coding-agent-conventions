# AGENT-002 — Agents work in isolated worktrees

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`

## Rule

Parallel implementation agents must not modify the same working tree. Give each independent task its own Git worktree or equivalent isolated checkout.

## Rationale

Shared working trees create ambiguous ownership, accidental staging, race conditions, and hidden interference between agents. Worktrees provide cheap isolation while retaining one repository object database.

## Agent behavior

1. Start each independent implementation task in its own worktree.
2. Keep task-specific edits, index state, and branch state inside that worktree.
3. Never assume uncommitted changes in another worktree belong to the current task.
4. Hand completed candidate changes to a separate integration step rather than editing another agent's workspace.

## Example

```text
/worktrees/
  agents/
    task-a/
    task-b/
  integration/
```

## Exceptions and trade-offs

Read-only analysis agents can share a checkout. Very small strictly sequential tasks do not require parallel worktrees. Isolation is required once concurrent modification is possible.

## Consequences

Worktree ownership becomes explicit, parallel agents cannot silently overwrite each other, and integration can be treated as a separate concern.
