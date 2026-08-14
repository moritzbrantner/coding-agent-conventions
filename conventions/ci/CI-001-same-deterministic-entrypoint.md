# CI-001 — CI uses the same deterministic entrypoint as local development

**Status:** Accepted  
**Category:** CI  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-004`

## Rule

Continuous integration must execute the same repository-owned semantic checks that humans, coding
agents, and local orchestration execute. CI-specific workflow YAML must not become a second
implementation of validation behavior.

## Rationale

Duplicating check selection and commands in CI creates drift: an agent can pass locally while the
remote workflow runs different checks, versions, or ordering. A shared deterministic entrypoint
makes the validation plan reproducible and allows every execution environment to produce comparable
evidence.

## Agent behavior

1. Discover the repository's deterministic tooling and validation configuration.
2. Run the relevant semantic validation tier locally before handoff.
3. Treat CI as another adapter for that same tier, not as a separate source of truth.
4. Compare machine-readable reports when local and CI results differ.

## Example

```text
local orchestrator ─┐
coding agent ───────┼─> coding-tooling run --tier fast
GitHub Actions ─────┘
```

## Exceptions and trade-offs

CI may provide infrastructure unavailable locally, such as protected credentials or a platform
matrix. Those differences should be explicit execution parameters around the shared semantic check,
not silently different validation policy.

## Consequences

Local and remote completion gates remain comparable, workflow YAML stays smaller, and failures can
be traced to a versioned validation plan and report.
