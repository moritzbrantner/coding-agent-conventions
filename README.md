# Coding Agent Conventions

A living collection of repository, testing, workflow, and implementation conventions designed to make software projects easier for coding agents to understand, modify, and validate reliably.

The goal is not to prescribe one technology stack. The goal is to make important project rules **explicit, local, deterministic, and mechanically discoverable**.

## Core idea

A good convention for agentic development should reduce semantic guesswork.

Prefer rules that let an agent answer questions such as these from repository structure or deterministic commands:

- What code is affected by this change?
- Which tests are relevant?
- In what order should validation run?
- Which instructions apply in this directory?
- What is the smallest safe change?
- When may the agent consider the task complete?

## Convention format

Each convention lives in:

```text
conventions/<category>/<ID>-<slug>.md
```

Every convention should contain:

1. **Rule** — the normative statement.
2. **Rationale** — why the rule exists.
3. **Agent behavior** — what a coding agent should do mechanically.
4. **Examples** — concrete repository examples.
5. **Exceptions / trade-offs** — when the rule should not be applied blindly.
6. **Consequences** — what the convention enables elsewhere in the toolchain.

Use [`templates/convention.md`](templates/convention.md) for new rules.

## Current conventions

### Testing

| ID | Convention | Status |
|---|---|---|
| TEST-001 | [Test location follows dependency scope](conventions/testing/TEST-001-test-location-follows-scope.md) | Accepted |
| TEST-002 | [Validate tests bottom-up](conventions/testing/TEST-002-bottom-up-validation.md) | Accepted |
| TEST-003 | [Keep test scope separate from test kind](conventions/testing/TEST-003-scope-vs-kind.md) | Accepted |

## Suggested future categories

```text
conventions/
  agents/
  architecture/
  git/
  implementation/
  repository-structure/
  testing/
  tooling/
```

Categories should emerge from actual rules rather than being populated with speculative boilerplate.

## Design principles

### Prefer determinism over inference

If a rule can be encoded in file layout, naming, scripts, or machine-readable metadata, prefer that over asking an agent to infer intent from the entire codebase.

### Keep instructions close to their scope

Rules that apply only to one subsystem should live close to that subsystem. Repository-wide rules belong at the repository root.

### Make validation progressive

Cheap, narrow feedback should come before expensive, broad feedback. Agents should prove correctness locally before moving outward.

### Make completion observable

"Done" should correspond to explicit validation conditions, not the agent's confidence.
