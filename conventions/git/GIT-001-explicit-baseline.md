# GIT-001 — Every agent run has an explicit baseline

**Status:** Accepted  
**Category:** Git  
**Derived from:** `PRINCIPLE-001`

## Rule

Every implementation run must have an explicitly defined source-of-truth baseline. Do not implicitly assume that the newest remote branch, local branch, or fetched ref is the intended starting point.

## Rationale

Local `main`, remote `main`, an integration branch, and a pinned commit can legitimately differ. Automatic pulls or rebases can silently change the problem the agent was asked to solve.

## Agent behavior

1. Resolve the configured baseline before creating a task workspace.
2. Record it as a branch/ref and, where useful, the exact commit SHA.
3. Create the task worktree/branch from that baseline.
4. Do not `pull`, rebase, or switch to a newer remote state unless the workflow explicitly requires it.

## Example

```text
baseline = local main @ abc123
agent/task-a starts from abc123
origin/main @ def456 does not replace it implicitly
```

## Exceptions and trade-offs

A workflow may explicitly define `origin/main` after fetch as the baseline. The important property is that this choice is configured, not inferred opportunistically.

## Consequences

Agent runs become reproducible and cannot silently change scope because a remote branch moved.
