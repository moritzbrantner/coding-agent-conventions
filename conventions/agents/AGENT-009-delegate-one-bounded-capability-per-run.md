# AGENT-009 — Delegate one bounded capability per implementation run

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`, `PRINCIPLE-004`

## Rule

Each delegated implementation run owns exactly one independently verifiable capability slice.

Before implementation starts, the outer orchestrator or harness must provide a task packet containing:

- an explicit baseline,
- one slice ID and one primary convention ID,
- the slice stage and target surfaces or workflows,
- the owned behavioral scope,
- an exclusive write scope,
- protected behavior that must remain unchanged,
- explicit non-goals and excluded capabilities,
- known dependencies and prerequisites,
- executable acceptance checks and expected evidence,
- the required candidate handoff,
- the expected capability state after the slice: `absent`, `partial`, `satisfied`, or `opted-out`.

Only one active implementation run may own a path or behavioral scope. Potentially overlapping slices must execute sequentially even when separate worktrees would make concurrent writes mechanically possible.

Slice completion and convention satisfaction are different claims. A foundation or adoption slice may finish while the capability remains `partial`; only an explicit completion audit may mark the referenced convention `satisfied`.

## Rationale

Worktree isolation prevents filesystem races but not semantic overlap. Theme providers, locale routing, command registries, responsive shells, and browser-test configuration can be changed incompatibly by agents that appear to own different files.

Bounded capability ownership makes delegation reviewable, keeps completion falsifiable, and prevents an agent from turning one feature into a broad frontend rewrite.

## Agent behavior

1. Mechanically inspect the baseline and classify the capability as `absent`, `partial`, `satisfied`, or `opted-out`.
2. Verify the task packet before modifying code. Stop if the baseline drifted, a prerequisite is missing, or ownership overlaps another active writer.
3. Read outside the declared scope when necessary, but write only within the assigned write and behavioral scopes.
4. Implement only the named capability and target surfaces. Do not opportunistically adopt adjacent conventions or perform unrelated cleanup.
5. If an undeclared prerequisite or additional affected surface is discovered, report it to the outer orchestrator instead of widening the task.
6. Produce the smallest executable evidence required by the primary convention and repository harness.
7. Return a candidate change and structured evidence. Do not integrate, publish, or mark the broader convention satisfied unless the task packet explicitly assigns a completion audit.

Read-only discovery, dependency analysis, test planning, and review agents may overlap an implementation run. Nested implementation delegation requires the outer orchestrator to allocate a new non-overlapping task packet; an implementation worker must not create additional writers implicitly.

## Example

The packet is a contract between the outer orchestrator and one implementation worker, not an orchestration script:

```yaml
slice_id: product-ui.commands.foundation
primary_convention: UI-005
stage: foundation
baseline: main@abc123
target_surfaces:
  - apps/web/app-shell
behavioral_scope:
  - central command registry
  - command palette
  - keyboard completion of the named primary flow
write_scope:
  - apps/web/**
protected_behavior:
  - existing pointer and touch invocation paths
excluded_capabilities:
  - UI-003
  - UI-006
dependencies:
  - UI-004 localization foundation
acceptance:
  - command-registry conflict check
  - editable-field shortcut test
  - keyboard-only critical-flow test
expected_capability_state: partial
handoff:
  - candidate commit
  - changed paths
  - command results
  - evidence artifact paths
  - unresolved dependencies
```

A normal sequential rollout for the accepted product-interface capabilities is:

1. `UI-004` localization foundation and bounded workflow adoption,
2. `UI-003` theme support,
3. `UI-005` commands, hotkeys, and keyboard flows,
4. `UI-007` mobile and touch workflows,
5. `UI-006` interactive data views only where a chart materially improves a decision.

Each step receives its own packet and implementation worker. Read-only mapping or review may run concurrently, but shared application foundations default to sequential writers.

## Automatable check

The outer orchestrator or `coding-tooling` can validate required task-packet fields, baseline identity, dependency ordering, write-scope overlap, capability-state transitions, acceptance results, and handoff completeness. This repository defines the contract; it does not own process spawning, worktree lifecycle, retries, or integration mechanics.

## Exceptions and trade-offs

A small strictly sequential change may be implemented directly by the parent agent, but it should retain the same bounded capability contract when scope drift would be costly.

An unavoidable prerequisite should become an earlier slice or cause the packet to be replanned. It must not be silently absorbed into the current implementation run. A capability that is already `satisfied` should produce audit evidence rather than a no-op rewrite.

## Consequences

Sub-agents receive limited, measurable responsibilities; overlapping writers are prevented; partial adoption remains visible; and the integration harness can accept or reject each candidate without interpreting agent confidence.
