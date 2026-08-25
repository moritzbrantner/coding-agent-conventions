# AGENT-010 — Do not require higher-level execution machinery

**Status:** Accepted  
**Category:** Agents  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-002`, `PRINCIPLE-006`

## Rule

A lower-level coding capability must remain usable without instantiating a higher-level execution abstraction merely because that abstraction exists.

Direct human-to-agent work is a first-class mode. A reusable skill must be invokable without creating a task or work item. A development loop may compose skills without requiring an orchestrator. An orchestrator may compose direct runs or loops when coordination is actually needed.

The preferred escalation path is:

```text
direct run
  -> reusable skills
  -> iterative loop
  -> tasks/work items
  -> orchestration
```

A layer is introduced because the workload needs the capability it provides, not because it is the ecosystem default.

## Responsibility boundary

Lower layers own behavior that is meaningful in isolation:

- conventions define policy;
- skills define reusable procedures;
- deterministic tooling exposes mechanical facts and checks;
- a coding-agent run implements one bounded change;
- a loop automates iteration around one or more runs.

Higher layers may add coordination concerns such as durable task state, dependency ordering, concurrency, retries, multi-worker ownership, or integration. They must not make those concerns mandatory inputs to lower layers.

Contract records such as task packets are required only at boundaries that deliberately adopt those contracts. Their existence does not imply that every direct run must first become an orchestrated work item.

## Rationale

Small work becomes expensive when every change must be translated into orchestration state before an agent can act. The reverse problem appears on large work when one prompt is forced to carry coordination that deserves explicit tasks and ownership.

Progressive composition preserves both modes: simple work stays cheap while larger work can opt into stronger coordination without creating a second set of coding capabilities.

## Agent behavior

1. Start with the least powerful execution layer that can safely satisfy the request.
2. Use independently invokable skills and deterministic tooling directly when they are sufficient.
3. Add an iterative loop when repeated inspect/implement/verify cycles should be automated.
4. Add task/work-item state when the work benefits from durable decomposition, dependencies, ownership, or resumability.
5. Add orchestration when multiple runs, workers, or dependent work items need coordination.
6. Do not require lower layers to know task IDs, orchestrator state, worker identities, GitHub issues, or lifecycle states unless those values are intrinsic to the specific boundary being exercised.
7. Preserve the semantics of a lower-level capability when it is wrapped by a higher-level layer.

## Example

A one-file bug fix may be completed by a direct agent using repository conventions and deterministic checks. A subsystem refactor may use the same implementation and verification skills inside an iterative loop. A multi-repository migration may place those same runs or loops behind work items with dependencies and an orchestrator.

The implementation and verification procedures should not be rewritten for each scale.

## Automatable check

Repository architecture tests or documentation checks may flag lower-level packages, skills, or tooling that import or require orchestrator-specific state without an explicit integration boundary.

A derived dependency graph should point predominantly downward from orchestration to loops, skills, conventions, and tooling. Reverse dependencies require an explicit reason.

## Exceptions and trade-offs

A capability that exists solely as an orchestrator adapter may depend on orchestrator interfaces; its name and location should make that integration-specific purpose explicit.

A safety-critical or organization-mandated workflow may require a higher-level gate for all mutations. That policy is a property of the consuming environment, not a reason to make the underlying skill or tool intrinsically orchestrator-dependent.

## Consequences

The ecosystem supports small direct changes, reusable agent procedures, automated loops, and coordinated multi-worker projects without forcing one operating model onto all workloads. Higher-level orchestration remains available where it provides real value, and lower-level capabilities remain reusable by humans, Claude, Codex, loops, CI, and future runtimes.
