# Agent conventions

## AGENT-001 — Deterministic checks before agent judgment

- Encode mechanically checkable properties as executable checks.

## AGENT-002 — Agents work in isolated worktrees

- Give concurrent implementation tasks separate worktrees or equivalent isolated checkouts.

## AGENT-003 — Separate execution from orchestration

- Keep the development loop independent of its local, CI, or hosted orchestration adapter.

## AGENT-004 — The harness defines completion

- The harness owns the completion gates; agents propose and repair changes.

## AGENT-005 — Integration is its own workspace

- Combine and validate independently produced changes in a dedicated integration workspace.

## AGENT-006 — Prefer mechanical discovery before semantic search

- Derive relationships from paths, names, metadata, or indexes before searching semantically.

## AGENT-007 — Run cheap validation before expensive validation

- Run required checks from narrowest and cheapest to broadest and most expensive; stop at the first failure.

## AGENT-008 — Revalidate downward after broader-scope fixes

- After fixing a broad validation failure with production-code changes, restart at the narrowest affected layer.

## AGENT-009 — Delegate one bounded capability per implementation run

- Give each delegated implementation run one independently verifiable capability slice.
- Use a validated, pinned task packet; do not invent missing contract data or widen the assigned scope.
- Only one active implementation run may own an overlapping path or behavioral scope.
- Report undeclared prerequisites, drift, overlap, or inconsistent packet inputs to the outer orchestrator for replanning.
- Distinguish completing a partial slice from satisfying the broader convention.
