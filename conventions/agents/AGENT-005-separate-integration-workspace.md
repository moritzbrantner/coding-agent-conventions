# AGENT-005 — Integration is its own workspace

**Status:** Accepted  
**Category:** Agents

## Rule

Keep implementation workspaces separate from the workspace used to combine and validate multiple candidate changes.

## Rationale

A change can be correct in isolation and still conflict semantically or mechanically with another change. If integration happens inside one implementation agent's workspace, ownership becomes unclear and the integrated state can accidentally inherit task-specific uncommitted state.

## Agent behavior

1. Produce candidate changes in task-specific worktrees.
2. Apply or merge those candidates into a dedicated integration worktree.
3. Run cross-change and broader validation in the integration workspace.
4. Resolve integration failures without treating either implementation workspace as the canonical combined state.

## Example

```text
/worktrees/
  agents/
    task-a/       # A passes independently
    task-b/       # B passes independently
  integration/    # A + B must pass together
```

## Exceptions and trade-offs

For a single strictly sequential task, a separate integration workspace may add little value. It becomes important when changes are produced independently or concurrently.

## Consequences

The system gets an explicit place where compatibility between candidate changes is proven before publication.
