# AGENT-010 — Apply progressive composition to agent execution

**Status:** Accepted
**Category:** Agents
**Derived from:** `PRINCIPLE-003`, `PRINCIPLE-006`

## Rule

Use `PRINCIPLE-006 — Escalate complexity only when the workload requires it` as the single normative source when choosing between deterministic tooling, direct repository work, reusable skills, iterative agent loops, environment-backed debugging, work items, and orchestration. Use `PRINCIPLE-003` for the corresponding progressive verification behavior.

This convention introduces no additional execution-layer policy. Its purpose is to give agent-focused documents and tooling a stable convention identifier that points to the repository-level principles without duplicating them.

## Agent behavior

Apply `PRINCIPLE-006` through the reusable [execution/escalation procedure in coding-agent-skills](https://github.com/moritzbrantner/coding-agent-skills/blob/main/docs/execution-escalation.md). Evidence collection and recording mechanics belong in `coding-tooling`; durable history belongs to the caller or orchestrator. This pointer does not require either machinery for direct work.

## Automatable check

Agent documentation may reference `AGENT-010` as the agent-category pointer, but checks should resolve the normative rules to `PRINCIPLE-003` and `PRINCIPLE-006` rather than maintaining a second copy of the escalation or verification criteria.
