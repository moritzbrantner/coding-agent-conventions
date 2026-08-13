# ENV-001 — Keep irreplaceable development state outside disposable containers

**Status:** Accepted  
**Category:** Environment

## Rule

Containers should provide reproducible execution environments, not own irreplaceable source, Git, worktree, credential, or agent-session state that must survive container recreation.

## Rationale

Development containers are often rebuilt, replaced, or removed. If task state exists only inside them, routine environment maintenance can destroy active work. Persisting important state on the host or in explicit volumes separates lifecycle concerns.

## Agent behavior

Prefer a layout such as:

```text
host / WSL
  repository
  .git
  worktrees
  persistent agent state
       ↓ mounted into
DevContainer
  compilers
  runtimes
  build tools
  services
```

Before creating long-lived state, determine whether its storage survives container replacement.

## Exceptions and trade-offs

Caches, generated artifacts, package installations, and intentionally ephemeral scratch data may live only in the container. Secrets may require dedicated secure storage rather than ordinary host mounts.

## Consequences

Containers can be rebuilt aggressively without losing work, and the execution environment becomes replaceable independently of development state.
