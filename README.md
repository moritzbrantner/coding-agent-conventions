# Coding Agent Conventions

A living collection of principles and concrete repository conventions designed to make software projects easier for coding agents to understand, modify, validate, integrate, and publish reliably.

The goal is not to prescribe one technology stack. The goal is to make important project rules **explicit, local, deterministic, mechanically discoverable, and independently verifiable**.

## Model

The repository distinguishes between three levels:

```text
Principles
    ↓
Conventions
    ↓
Repository-specific implementations and examples
```

### Principles

Principles describe durable design goals for agentic development. They explain **why** a family of conventions exists and should remain broadly applicable across languages, frameworks, and orchestration systems.

They live in:

```text
principles/PRINCIPLE-<NNN>-<slug>.md
```

Use [`templates/principle.md`](templates/principle.md) for new principles.

### Conventions

Conventions are concrete normative rules. They should describe behavior that repositories, agents, harnesses, CI, or orchestration systems can actually follow.

They live in:

```text
conventions/<category>/<ID>-<slug>.md
```

Use [`templates/convention.md`](templates/convention.md) for new conventions.

A convention should normally contain:

1. **Rule** — the normative statement.
2. **Rationale** — why the rule exists.
3. **Agent behavior** — what a coding agent should do mechanically.
4. **Example** — a concrete repository or workflow example.
5. **Exceptions / trade-offs** — when the rule should not be applied blindly.
6. **Consequences** — what the convention enables elsewhere in the toolchain.

Where useful, conventions reference the principles they operationalize.

## Core principles

| ID | Principle | Status |
|---|---|---|
| PRINCIPLE-001 | [Prefer determinism over inference](principles/PRINCIPLE-001-determinism-over-inference.md) | Accepted |
| PRINCIPLE-002 | [Structure should encode agent-relevant information](principles/PRINCIPLE-002-structure-encodes-agent-information.md) | Accepted |
| PRINCIPLE-003 | [Validate progressively](principles/PRINCIPLE-003-progressive-validation.md) | Accepted |
| PRINCIPLE-004 | [Make completion observable](principles/PRINCIPLE-004-observable-completion.md) | Accepted |

## Convention catalog

### Agents

| ID | Convention | Status |
|---|---|---|
| AGENT-001 | [Deterministic checks before agent judgment](conventions/agents/AGENT-001-deterministic-checks-before-judgment.md) | Accepted |
| AGENT-002 | [Agents work in isolated worktrees](conventions/agents/AGENT-002-isolated-worktrees.md) | Accepted |
| AGENT-003 | [Separate execution from orchestration](conventions/agents/AGENT-003-orchestration-independent-workflow.md) | Accepted |
| AGENT-004 | [The harness defines completion](conventions/agents/AGENT-004-harness-defines-completion.md) | Accepted |
| AGENT-005 | [Integration is its own workspace](conventions/agents/AGENT-005-separate-integration-workspace.md) | Accepted |
| AGENT-006 | [Prefer mechanical discovery before semantic search](conventions/agents/AGENT-006-mechanical-discovery-first.md) | Accepted |
| AGENT-007 | [Run cheap validation before expensive validation](conventions/agents/AGENT-007-cheap-validation-first.md) | Accepted |
| AGENT-008 | [Revalidate downward after broader-scope fixes](conventions/agents/AGENT-008-revalidate-downward-after-broad-failure.md) | Accepted |

### Testing

| ID | Convention | Status |
|---|---|---|
| TEST-001 | [Test location follows dependency scope](conventions/testing/TEST-001-test-location-follows-scope.md) | Accepted |
| TEST-002 | [Validate tests bottom-up](conventions/testing/TEST-002-bottom-up-validation.md) | Accepted |
| TEST-003 | [Keep test scope separate from test kind](conventions/testing/TEST-003-scope-vs-kind.md) | Accepted |

### Git

| ID | Convention | Status |
|---|---|---|
| GIT-001 | [Every agent run has an explicit baseline](conventions/git/GIT-001-explicit-baseline.md) | Accepted |
| GIT-002 | [Separate implementation from publishing](conventions/git/GIT-002-separate-publishing.md) | Accepted |

### Repository

| ID | Convention | Status |
|---|---|---|
| REPO-001 | [Repository structure encodes agent-relevant relationships](conventions/repository/REPO-001-structure-encodes-agent-information.md) | Accepted |

### Environment

| ID | Convention | Status |
|---|---|---|
| ENV-001 | [Keep irreplaceable development state outside disposable containers](conventions/environment/ENV-001-persistent-state-outside-containers.md) | Accepted |

## How the conventions fit together

A typical agent workflow implied by these rules is:

```text
explicit baseline
      ↓
isolated task worktree
      ↓
mechanically discover local instructions/checks
      ↓
implement
      ↓
cheap + narrow validation
      ↓
progressively broader validation
      ↓
candidate change
      ↓
dedicated integration workspace
      ↓
final harness-owned completion gates
      ↓
explicit publish step
```

The test hierarchy is one concrete application of the same model. A changed source file starts with its smallest relevant tests and climbs through broader ancestor scopes. A production-code edit made while repairing a broader failure invalidates affected lower results and causes validation to restart downward.

## Adding new ideas

Before adding a new document, decide whether the idea is:

- a **principle**: a durable design goal that explains multiple rules, or
- a **convention**: a concrete rule that can guide repository or agent behavior.

Avoid creating both when they would merely repeat the same statement. A principle should justify several concrete choices; a convention should operationalize a principle or stand independently when no broader principle is needed.

Categories should emerge from actual rules rather than being populated with speculative boilerplate.
