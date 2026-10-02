# AGENT-009 — Delegate one bounded capability per implementation run

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`, `PRINCIPLE-004`, `PRINCIPLE-006`

## Rule

Each delegated implementation run owns exactly one independently verifiable capability slice.

Only one active implementation run may own a path or behavioral scope. Potentially overlapping slices must execute sequentially even when separate worktrees would make concurrent writes mechanically possible.

Slice completion and convention satisfaction are different claims. A foundation or adoption slice may finish while the capability remains `partial`; only an explicit completion audit may mark the referenced convention `satisfied`.

## Boundary

This repository owns the coding policy applied to a delegated slice: one bounded capability, one implementation writer for its owned scope, no silent widening, progressive validation, and evidence-backed completion. The delegating caller owns task selection, worktree lifecycle and integration; `coding-tooling` may provide deterministic discovery, affected-scope calculation, and acceptance checks.

A worker must not invent missing task data or silently repair inconsistent delegated input. It returns such input to the delegating caller for replanning.

## Rationale

Worktree isolation prevents filesystem races but not semantic overlap. Theme providers, locale routing, command registries, responsive shells, and browser-test configuration can be changed incompatibly by agents that appear to own different files.

Bounded capability ownership makes delegation reviewable, keeps completion falsifiable, and prevents an agent from turning one feature into a broad rewrite. It needs no orchestrator or task-packet protocol: the delegating prompt, issue, or pull request states the slice.

## Agent behavior

1. Mechanically inspect the baseline and classify the capability as `absent`, `partial`, `satisfied`, or `opted-out` when that classification is relevant to the request.
2. Stop if the baseline drifted, a prerequisite is missing, delegated inputs are inconsistent, or ownership overlaps another active writer.
3. Read outside the assigned scope when necessary, but write only within it.
4. Implement only the named capability and target surfaces. Do not opportunistically adopt adjacent conventions or perform unrelated cleanup.
5. If an undeclared prerequisite or additional affected surface is discovered, report it to the delegating caller instead of silently widening the task.
6. Produce the smallest executable evidence required by the primary convention and repository harness.
7. Return the candidate and its evidence. Do not integrate, publish, or mark the broader convention satisfied unless the caller explicitly grants that authority.

Read-only discovery, dependency analysis, test planning, and review agents may overlap an implementation run. An implementation worker must not create additional writers for an overlapping scope.
