# GIT-002 — Separate implementation from publishing

**Status:** Accepted  
**Category:** Git

## Rule

Implementation agents produce candidate changes. Integrating, pushing, merging, or otherwise publishing those changes is a separate workflow step.

## Rationale

An implementation agent should be able to experiment and repair within an isolated task scope without automatically affecting shared branches. Separating publication creates a clear control boundary for review, integration, and final validation.

## Agent behavior

Prefer:

```text
implementation worktree
→ candidate commit/change
→ integration
→ validation
→ explicit publish
```

Do not default to:

```text
implementation agent
→ push directly to shared main
```

The publishing step may be automatic, but it must be explicit in the orchestration design.

## Exceptions and trade-offs

Small personal repositories may intentionally combine implementation and publication. That should be a configured workflow policy rather than an implicit capability of every implementation agent.

## Consequences

Publishing permissions can be narrower than implementation permissions, and failed or partial work remains isolated from shared branches.
