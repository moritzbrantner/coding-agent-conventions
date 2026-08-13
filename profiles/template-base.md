# Profile — Template repository base

**Status:** Accepted  
**Purpose:** Shared baseline for repositories whose primary purpose is to generate or seed new projects.

## Includes

### Repository conventions

- `REPO-003` — Template decisions are executable.
- `REPO-004` — Validate template changes from a fresh instance.
- `REPO-005` — Include one small vertical slice.
- `REPO-006` — Dogfood the template workflow.
- `REPO-007` — Do not preinstall speculative architecture.
- `REPO-008` — Expose a canonical validation interface.

### Testing and agent workflow

The normal accepted testing and agent conventions remain applicable. In particular, generated projects should make their focused-to-broad validation path mechanically discoverable and completion should be determined by executable gates rather than agent confidence.

## Conditional conventions

Apply environment conventions when the generated project uses the corresponding mechanism:

- `ENV-002` when local infrastructure is represented with Docker Compose.
- `ENV-003` when environment variables are part of the generated project contract.

Do not add Docker Compose or environment-variable scaffolding solely because this profile exists.

## Profile rule

A template profile should compose this base with the technology branches that the generated project actually uses. Do not duplicate technology convention text into the template profile.

A template is opinionated by what it ships. Dependencies, configuration, scripts, example code, and validation gates should therefore represent deliberate defaults rather than speculative future needs.
