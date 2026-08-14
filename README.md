# Coding Agent Conventions

A living collection of principles, general conventions, and technology-specific coding conventions designed to make software projects easier for coding agents to understand, modify, validate, integrate, and publish reliably.

The goal is to make important project rules **explicit, local, deterministic, mechanically discoverable, and independently verifiable** without forcing every project into one technology stack.

## Model

```text
Principles
    ↓
General conventions + technology convention trees
    ↓
Profiles that compose independent technology branches
    ↓
Repository-specific implementations and overrides
```

### Principles

Principles describe durable design goals for agentic development and live in:

```text
principles/PRINCIPLE-<NNN>-<slug>.md
```

Use [`templates/principle.md`](templates/principle.md) for new principles.

### General conventions

General conventions are concrete normative rules for repositories, agents, harnesses, CI, Git, tests, or development environments:

```text
conventions/<category>/<ID>-<slug>.md
```

Use [`templates/convention.md`](templates/convention.md) for new general conventions.

### Technology conventions

Technology conventions capture rules specific to languages, libraries, frameworks, databases, or build technologies. Their **directory hierarchy encodes inheritance** when one scope is intentionally treated as a specialization of another in this convention stack.

```text
technologies/
  typescript/                 # TS-*
    react/                    # REACT-*
      nextjs/                 # NEXT-*
      moritzbrantner-ui/       # MORITZUI-*

  rust/                       # RUST-*

  tooling/
    storybook/                # STORYBOOK-*
    playwright/               # PLAYWRIGHT-*
    lighthouse/               # LIGHTHOUSE-*
    vitest/                   # VITEST-*

  databases/                  # DB-*
    postgres/                 # POSTGRES-*

  docker/                     # DOCKER-*
    dockerfile/               # DOCKERFILE-*
```

A Next.js rule therefore inherits React and TypeScript rules by path. PostgreSQL inherits database-wide rules. Dockerfile rules inherit Docker-wide rules.

Put each rule at the highest technology node where it is actually true and do not copy inherited rules into child scopes. The tree represents the engineering stack documented here, not a universal taxonomy of what each ecosystem supports.

Use [`templates/technology-convention.md`](templates/technology-convention.md) for new technology rules.

### Profiles

Profiles compose **independent technology branches** without copying their rule text. Nested inheritance such as TypeScript → React → Next.js does not need a profile because the path already expresses it. A profile becomes useful for combinations such as Next.js + PostgreSQL or Next.js + Rust.

Profiles live under [`profiles/`](profiles/README.md).

### Precedence

When applicable rules conflict, use `REPO-002`:

```text
repository-specific rule
        ↓
deepest applicable technology scope
        ↓
parent technology scopes, nearest first
        ↓
general convention
        ↓
principle
```

Only the conflicting part is overridden; unrelated broader rules continue to apply.

## Convention format

A convention should normally contain:

1. **Rule** — the normative statement.
2. **Rationale** — why the rule exists.
3. **Agent behavior** — what a coding agent should do mechanically.
4. **Example** — a concrete repository or workflow example.
5. **Exceptions / trade-offs** — when the rule should not be applied blindly.
6. **Consequences** — what the convention enables elsewhere in the toolchain.

Technology conventions additionally make preferred patterns, anti-patterns, and automatable checks explicit where useful.

## Core principles

| ID | Principle | Status |
|---|---|---|
| PRINCIPLE-001 | [Prefer determinism over inference](principles/PRINCIPLE-001-determinism-over-inference.md) | Accepted |
| PRINCIPLE-002 | [Structure should encode agent-relevant information](principles/PRINCIPLE-002-structure-encodes-agent-information.md) | Accepted |
| PRINCIPLE-003 | [Validate progressively](principles/PRINCIPLE-003-progressive-validation.md) | Accepted |
| PRINCIPLE-004 | [Make completion observable](principles/PRINCIPLE-004-observable-completion.md) | Accepted |
| PRINCIPLE-005 | [Document decisions, not defaults](principles/PRINCIPLE-005-document-decisions-not-defaults.md) | Accepted |

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

### Interface design

| ID | Convention | Status |
|---|---|---|
| UI-001 | [Use surfaces to communicate structure, not to decorate every section](conventions/interface-design/UI-001-surfaces-communicate-structure.md) | Accepted |
| UI-002 | [Show information where it changes a decision](conventions/interface-design/UI-002-information-supports-decisions.md) | Accepted |

### Testing

| ID | Convention | Status |
|---|---|---|
| TEST-001 | [Test location follows dependency scope](conventions/testing/TEST-001-test-location-follows-scope.md) | Accepted |
| TEST-002 | [Validate tests bottom-up](conventions/testing/TEST-002-bottom-up-validation.md) | Accepted |
| TEST-003 | [Keep test scope separate from test kind](conventions/testing/TEST-003-scope-vs-kind.md) | Accepted |
| TEST-004 | [Test authorization as a decision matrix](conventions/testing/TEST-004-authorization-decision-matrices.md) | Proposed |
| TEST-005 | [Behavior changes require executable evidence](conventions/testing/TEST-005-behavior-changes-require-executable-evidence.md) | Accepted |

### Benchmarking

| ID | Convention | Status |
|---|---|---|
| BENCH-001 | [Benchmark named representative scenarios](conventions/benchmarking/BENCH-001-representative-scenarios.md) | Accepted |
| BENCH-002 | [Compare candidates against versioned baselines](conventions/benchmarking/BENCH-002-versioned-baselines.md) | Accepted |

### Git

| ID | Convention | Status |
|---|---|---|
| GIT-001 | [Every agent run has an explicit baseline](conventions/git/GIT-001-explicit-baseline.md) | Accepted |
| GIT-002 | [Separate implementation from publishing](conventions/git/GIT-002-separate-publishing.md) | Accepted |

### Repository

| ID | Convention | Status |
|---|---|---|
| REPO-001 | [Repository structure encodes agent-relevant relationships](conventions/repository/REPO-001-structure-encodes-agent-information.md) | Accepted |
| REPO-002 | [More specific conventions override broader conventions](conventions/repository/REPO-002-specificity-overrides-broader-rules.md) | Accepted |

### Environment

| ID | Convention | Status |
|---|---|---|
| ENV-001 | [Keep irreplaceable development state outside disposable containers](conventions/environment/ENV-001-persistent-state-outside-containers.md) | Accepted |
| ENV-002 | [Use Docker Compose as the canonical local development and test topology](conventions/environment/ENV-002-docker-compose-for-development-and-testing.md) | Accepted |
| ENV-003 | [`.env.example` is the committed environment contract](conventions/environment/ENV-003-env-example-is-environment-contract.md) | Accepted |

### Authentication

Canonical account, profile, space, membership, role, and session terms are defined in [`CONTEXT.md`](CONTEXT.md).

| ID | Convention | Status |
|---|---|---|
| AUTHN-001 | [A session identifies an account, not an authorization context](conventions/authentication/AUTHN-001-session-identifies-account.md) | Proposed |
| AUTHN-002 | [One-time authentication secrets are non-recoverable credentials](conventions/authentication/AUTHN-002-one-time-secrets.md) | Proposed |

### Authorization

| ID | Convention | Status |
|---|---|---|
| AUTHZ-001 | [Every role assignment has an explicit authority scope](conventions/authorization/AUTHZ-001-scope-role-assignments.md) | Proposed |
| AUTHZ-002 | [Authorize every protected operation at the server boundary](conventions/authorization/AUTHZ-002-authorize-protected-operations.md) | Proposed |
| AUTHZ-003 | [Personal profiles and spaces are authorization resources](conventions/authorization/AUTHZ-003-profiles-and-spaces-are-resources.md) | Proposed |

## Technology convention families

| Scope | Prefix | Purpose |
|---|---|---|
| [TypeScript](technologies/typescript/) | `TS-*` | Types, modules, compiler behavior, TypeScript API design |
| [React](technologies/typescript/react/) | `REACT-*` | Components, rendering, state, hooks, effects, composition |
| [@moritzbrantner/ui](technologies/typescript/react/moritzbrantner-ui/) | `MORITZUI-*` | Shared component tiers, page-pattern selection, and theme contracts |
| [Next.js](technologies/typescript/react/nextjs/) | `NEXT-*` | Routing, server/client boundaries, data access, caching, framework entry points |
| [Rust](technologies/rust/) | `RUST-*` | Types, ownership, borrowing, errors, traits, modules, tooling |
| [Tooling](technologies/tooling/) | `BUN-*`, `TAILWIND-*`, `STORYBOOK-*`, `PLAYWRIGHT-*`, `LIGHTHOUSE-*`, `VITEST-*` | Cross-stack toolchain, UI workbench, browser, audit, and test-runner conventions |
| [Databases](technologies/databases/) | `DB-*` | Cross-database schema, query, transaction, and persistence conventions |
| [PostgreSQL](technologies/databases/postgres/) | `POSTGRES-*` | PostgreSQL-specific SQL, schema, indexes, types, extensions, and behavior |
| [Docker](technologies/docker/) | `DOCKER-*` | Docker-wide image and build conventions |
| [Dockerfile](technologies/docker/dockerfile/) | `DOCKERFILE-*` | Dockerfile authoring and image construction |

Concrete coding rules will be added as they are actually defined rather than pre-populating generic "best practices". Following `PRINCIPLE-005`, mechanically visible or enforceable defaults should remain in tooling/configuration rather than being duplicated here.

## How the conventions fit together

A typical local agent workflow implied by these rules is:

```text
explicit baseline
      ↓
isolated task worktree
      ↓
derive applicable convention stack from repository + technology paths
      ↓
read .env.example as the local configuration contract
      ↓
use Docker Compose for required local service topology
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

The same structural principle appears in the test hierarchy: a changed source file starts with its smallest relevant tests and climbs through broader ancestor scopes.

## Adding new ideas

Before adding a document, decide whether the idea is:

- a **principle**: a durable design goal that explains multiple rules,
- a **general convention**: a concrete cross-stack rule for repositories or workflows,
- a **technology convention**: a rule tied to a language, framework, database, or build technology, or
- a **profile**: a composition of independent convention branches.

Before adding it, also apply `PRINCIPLE-005`: if the rule is already obvious from configuration or fully enforced by deterministic tooling, keep it there instead of duplicating it as prose.

Avoid duplication. Nest a technology under another only when inheritance is intentional in this engineering stack; otherwise keep it as an independent branch and compose it through a profile.
