# PRINCIPLE-004 — Make completion observable

**Status:** Accepted

## Principle

A coding task is complete when explicit, externally observable completion conditions are satisfied, not when an agent reports confidence that it is done.

## Why

Agent confidence is not a reliable acceptance criterion. Completion should be defined by repository-owned checks and gates that can be rerun independently of the agent that produced the change.

## Implications

The development harness should own the definition of done, for example:

```text
required focused tests green
→ required broader tests green
→ lint/typecheck green
→ build green
→ repository-specific checks green
```

The agent proposes and repairs changes; the harness determines whether the configured acceptance conditions have been met.

This principle is implemented by `AGENT-004` and supported by `AGENT-001`.
