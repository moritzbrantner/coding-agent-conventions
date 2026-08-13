# AGENT-008 — Revalidate downward after broader-scope fixes

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-003`

## Rule

If a broader validation layer fails and the agent changes production code to fix it, restart validation from the narrowest affected layer before climbing upward again.

## Rationale

A code change made in response to a system-level failure can invalidate previously green unit or module checks. Those lower layers are no longer trustworthy merely because they passed before the latest edit.

## Agent behavior

Given:

```text
unit ✓
module ✓
system ✗
```

and a production-code edit, do not run only `system` again. Instead run:

```text
affected unit
→ affected module
→ system
```

Only unaffected lower layers may retain their previous result.

## Exceptions and trade-offs

If the repair changes only test infrastructure or configuration that provably cannot affect lower-level behavior, the harness may preserve lower-layer results. That preservation should be deterministic rather than guessed.

## Consequences

The validation ladder remains sound: no green result is reused after a change that could have invalidated it.
