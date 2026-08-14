# LIGHTHOUSE-002 — Stabilize baselines before blocking

**Status:** Accepted  
**Technology:** Lighthouse or compatible Lighthouse runner  
**Applies to:** CI performance regression gates

## Principles

- `PRINCIPLE-003` — Validate progressively.
- `PRINCIPLE-004` — Make completion observable.

## Rule

Collect controlled baseline data before making Lighthouse results blocking. Compare baseline and candidate on equivalent runners and gate only regressions that exceed both the committed relative threshold and the metric's absolute noise floor.

## Rationale

Synthetic browser measurements are noisy. A single score or universal threshold creates false failures and encourages agents to weaken the gate.

## Agent behavior

1. Record runner, browser, build mode, route, throttling, and sample count.
2. Use at least three runs and compare medians unless the repository declares a stronger method.
3. Establish the initial budget from a reviewed healthy baseline.
4. Run baseline and candidate on equivalent infrastructure when evaluating a change.
5. Fail only when both relative and absolute regression limits are exceeded.
6. Update budgets only in an explicit reviewed change with before/after evidence.

## Preferred pattern

Introduce the audit in report-only mode, observe representative runs, commit route budgets, then enable the blocking gate.

## Anti-pattern

Do not block on the first observed score, compare unrelated CI machines, or automatically bless the candidate as the new baseline.

## Automatable check

`coding-tooling` validates budget and report schemas and exposes `audit:lighthouse`; higher-level CI decides whether the result is report-only or blocking.

## Exceptions and trade-offs

Deterministic bundle-size checks may block immediately because they do not share runtime measurement noise. They should remain a distinct capability.

## Consequences

Performance gates remain strict without being flaky, and budget changes remain auditable.
