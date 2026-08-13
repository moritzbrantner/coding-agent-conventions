# AGENT-003 — Separate execution from orchestration

**Status:** Accepted  
**Category:** Agents

## Rule

Define the agent development loop independently of the environment that orchestrates it. Local worktrees and GitHub branches/PRs should be adapters around the same core workflow.

## Rationale

A useful development loop should not have to be redesigned when execution moves from a local machine to GitHub automation or another orchestration layer. The invariant workflow is the valuable part; transport, branch creation, review surfaces, and scheduling are environment concerns.

## Agent behavior

Model the core loop as:

```text
receive task
→ inspect
→ implement
→ validate
→ produce candidate change
→ integrate/publish
```

Keep environment-specific operations behind adapters, for example:

```text
local:  worktree + shell + local integration
GitHub: branch + checks + PR + merge
```

Do not embed GitHub-only assumptions into implementation logic unless the task explicitly concerns GitHub.

## Exceptions and trade-offs

Some environments expose unique capabilities, such as PR review threads or local debugger access. Those may enrich an adapter without redefining the core loop.

## Consequences

The same conventions and deterministic checks can be reused across local development, CI, and hosted agent systems.
