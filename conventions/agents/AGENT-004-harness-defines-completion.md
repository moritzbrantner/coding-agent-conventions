# AGENT-004 — The harness defines completion

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-004`

## Rule

The agent may propose that a task is complete, but the development harness owns the authoritative completion criteria.

## Rationale

Completion must survive model changes and be independently reproducible. Agent confidence is useful context but not an acceptance gate.

## Agent behavior

1. Discover the configured completion gates.
2. Work until the required gates pass or a genuine external blocker remains.
3. Report failing gates explicitly.
4. Do not mark a task complete merely because the implementation appears plausible.

A harness may define completion as:

```text
focused tests green
→ broader tests green
→ lint/typecheck green
→ build green
→ repository-specific checks green
```

## Exceptions and trade-offs

Exploratory spikes may intentionally have weaker gates, but that must be declared by the task or repository configuration rather than assumed by the agent.

## Consequences

Different agents can be evaluated against the same definition of done, and orchestration systems can decide completion without parsing subjective prose.
