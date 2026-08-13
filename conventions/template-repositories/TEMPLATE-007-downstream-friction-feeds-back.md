# TEMPLATE-007 — Downstream friction feeds back into the template

**Status:** Accepted  
**Category:** Template repositories

## Principles

- PRINCIPLE-003 — Validate progressively
- PRINCIPLE-005 — Document decisions, not defaults

## Rule

Repeated setup fixes, structural corrections, missing scripts, and agent workarounds discovered in real projects created from a template should be evaluated for promotion back into the template.

Do not allow every downstream repository to independently rediscover and repair the same baseline problem.

## Rationale

Real projects are the strongest dogfood environment for a template. They expose friction that isolated template maintenance cannot predict. Feeding reusable lessons back into the source template compounds improvements across future projects.

## Agent behavior

When the same class of change appears across downstream projects, determine whether it represents a reusable baseline improvement. If so, fix and validate it in the template rather than only patching consumers.

Do not promote domain-specific requirements merely because one downstream project needed them.

## Consequences

Template repositories become continuously improving baselines rather than one-time scaffolding snapshots.