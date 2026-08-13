# ENV-002 — Use Docker Compose as the canonical local development and test topology

**Status:** Accepted  
**Category:** Environment

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-002 — Structure should encode agent-relevant information
- PRINCIPLE-003 — Validate progressively

## Rule

Use Docker Compose as the canonical description and orchestration interface for local services required by development and tests.

Infrastructure dependencies such as databases, queues, caches, auxiliary services, and similar runtime dependencies should be represented in Compose rather than requiring developers or agents to reproduce undocumented machine-local setup.

Development and test workflows should reuse the same service definitions where practical. Differences should be expressed through configuration, Compose profiles, or explicit override files rather than duplicated manual setup procedures.

Unit tests that do not need external services do not need to run through Docker Compose.

## Rationale

Coding agents are more reliable when the environment can be created deterministically from repository configuration. Compose turns service topology, ports, volumes, dependencies, health checks, and runtime configuration into inspectable repository state instead of human memory.

Using the same topology for development and broader tests also reduces differences between the environment in which code is developed and the environment in which it is validated.

## Agent behavior

1. Inspect the repository's Compose configuration before installing or starting machine-local infrastructure manually.
2. Use Compose-managed services when a required dependency is already represented there.
3. Start only the services required for the current validation scope when practical.
4. Reuse existing service definitions for tests instead of creating ad-hoc alternatives.
5. Do not require Compose for narrow tests that have no infrastructure dependency.
6. Treat Compose configuration changes as part of the code change when the application's required local topology changes.

## Example

```text
repository/
  compose.yaml
  .env.example
  src/
  tests/
```

```yaml
services:
  app:
    build: .
    depends_on:
      database:
        condition: service_healthy

  database:
    image: postgres:18
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
```

A developer and an integration-test harness should derive the database service from the same Compose definition instead of separately documenting how to install and configure PostgreSQL on the host.

## Exceptions and trade-offs

Some tests may deliberately target externally managed infrastructure or environments that cannot reasonably be represented by local containers. Such tests should document that requirement explicitly.

Compose is the orchestration contract, not a requirement that every command or test process itself execute inside a container.

## Consequences

This gives humans and agents a single mechanically inspectable entry point for local infrastructure and makes development, integration testing, CI adaptation, and disposable development environments easier to align.
