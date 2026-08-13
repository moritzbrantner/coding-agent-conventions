# PRINCIPLE-003 — Validate progressively

**Status:** Accepted

## Principle

Validation should progress from the narrowest and cheapest relevant checks toward broader and more expensive checks.

## Why

Fast, local failures provide better diagnostic information than a large failing system suite. Progressive validation reduces wasted execution and tells the agent at what scope an assumption stops holding.

## Implications

A typical progression is:

```text
format/static checks
→ unit
→ module
→ integration
→ system
→ E2E
```

A broader layer is entered only when the narrower affected layer is green. If production code changes after a broader failure, invalidated lower layers are rerun before climbing again.

This principle is implemented by `TEST-002`, `AGENT-007`, and `AGENT-008`.
