# AGENT-009 — Delegate one bounded capability per implementation run

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`, `PRINCIPLE-004`

## Rule

Each delegated implementation run owns exactly one independently verifiable capability slice.

Cross-repository delegation must use the versioned task-packet contract from `agent-contracts` (`agent.task-packet/v1`, or an explicitly pinned compatible successor). This convention defines how that packet is interpreted during implementation; it does not define or version the wire schema.

The delegated slice must identify an immutable baseline, one primary convention, its target surfaces, behavioral and write ownership, protected behavior, exclusions, dependencies, acceptance requirements, expected capability state, handoff requirements, and the authority granted to the worker.

Only one active implementation run may own a path or behavioral scope. Potentially overlapping slices must execute sequentially even when separate worktrees would make concurrent writes mechanically possible.

Slice completion and convention satisfaction are different claims. A foundation or adoption slice may finish while the capability remains `partial`; only an explicit completion audit may mark the referenced convention `satisfied`.

## Contract boundary

`agent-contracts` owns the machine-readable task-packet schema, compatibility rules, and version identity. `agent-loop-orchestrator` owns scheduling, process and worktree lifecycle, retries, overlap coordination, and candidate integration. `coding-tooling` may provide deterministic discovery, contract validation, affected-scope calculation, and acceptance checks.

This repository owns the coding policy applied to a valid packet: one bounded capability, one implementation writer for its owned scope, no silent widening, progressive validation, and evidence-backed completion.

A worker must not invent missing contract data or silently repair an invalid packet. Contract-invalid or semantically inconsistent input is returned to the outer orchestrator for replanning.

## Rationale

Worktree isolation prevents filesystem races but not semantic overlap. Theme providers, locale routing, command registries, responsive shells, and browser-test configuration can be changed incompatibly by agents that appear to own different files.

Bounded capability ownership makes delegation reviewable, keeps completion falsifiable, and prevents an agent from turning one feature into a broad rewrite. Keeping the packet schema in `agent-contracts` also prevents prose conventions from becoming a second interoperability protocol.

## Agent behavior

1. Confirm the packet was validated against its pinned `agent-contracts` task-packet version before implementation begins.
2. Mechanically inspect the declared baseline and classify the capability as `absent`, `partial`, `satisfied`, or `opted-out`.
3. Stop if the baseline drifted, a prerequisite is missing, the packet is semantically inconsistent, or ownership overlaps another active writer.
4. Read outside the declared scope when necessary, but write only within the assigned write and behavioral scopes.
5. Implement only the named capability and target surfaces. Do not opportunistically adopt adjacent conventions or perform unrelated cleanup.
6. If an undeclared prerequisite or additional affected surface is discovered, report it to the outer orchestrator instead of widening the task.
7. Produce the smallest executable evidence required by the primary convention and repository harness.
8. Return the candidate and structured evidence required by the packet. Do not integrate, publish, or mark the broader convention satisfied unless the packet explicitly assigns a completion audit.

Read-only discovery, dependency analysis, test planning, and review agents may overlap an implementation run. Nested implementation delegation requires the outer orchestrator to allocate another non-overlapping task packet; an implementation worker must not create additional writers implicitly.

## Example

A product-interface rollout can be decomposed into separate `agent.task-packet/v1` instances such as:

1. `UI-004` localization foundation and bounded workflow adoption,
2. `UI-003` theme support,
3. `UI-005` commands, hotkeys, and keyboard flows,
4. `UI-007` mobile and touch workflows,
5. `UI-006` interactive data views only where a chart materially improves a decision.

Each packet carries the exact baseline, scope, dependencies, acceptance requirements, authority, expected capability state, and handoff defined by `agent-contracts`. Each step gets its own implementation worker. Read-only mapping or review may run concurrently, but shared application foundations default to sequential writers.

## Automatable check

The pinned `agent-contracts` schema can validate packet shape and version compatibility. The outer orchestrator or `coding-tooling` can then validate baseline identity, dependency ordering, write-scope overlap, capability-state transitions, acceptance results, authority, and handoff completeness.

This convention remains the semantic policy layer; it does not own process spawning, worktree lifecycle, retries, protocol versioning, or integration mechanics.

## Exceptions and trade-offs

A small strictly sequential change may be implemented directly by the parent agent, but it should retain the same bounded-capability semantics when scope drift would be costly.

An unavoidable prerequisite should become an earlier slice or cause the packet to be replanned. It must not be silently absorbed into the current implementation run. A capability that is already `satisfied` should produce audit evidence rather than a no-op rewrite.

## Consequences

Sub-agents receive limited, measurable responsibilities; overlapping writers are prevented; partial adoption remains visible; and the integration harness can accept or reject each candidate without interpreting agent confidence. The cross-repository packet stays versioned in one neutral contract repository instead of being duplicated in coding-policy prose.
