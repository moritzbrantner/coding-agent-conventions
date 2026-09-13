# Profile — Template repository base

**Status:** Accepted  
**Purpose:** Shared baseline for repositories whose primary purpose is to generate or seed new projects.

## Includes

### Template-authoring conventions

- `TEMPLATE-001` — Template repositories are executable golden paths.
- `TEMPLATE-002` — Templates must dogfood the conventions they prescribe.
- `TEMPLATE-003` — Fresh instantiation is the acceptance test.
- `TEMPLATE-004` — A template should have one canonical path to green.
- `TEMPLATE-005` — Only propagate intentional decisions.
- `TEMPLATE-006` — Prove the stack with a thin vertical slice.
- `TEMPLATE-007` — Downstream friction feeds back into the template.
- `TEMPLATE-008` — Templates declare their applicable convention stack.

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
