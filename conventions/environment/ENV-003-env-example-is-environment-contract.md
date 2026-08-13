# ENV-003 — `.env.example` is the committed environment contract

**Status:** Accepted  
**Category:** Environment

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-002 — Structure should encode agent-relevant information

## Rule

Treat `.env` as developer-local concrete configuration and `.env.example` as the committed contract describing the environment variables required or supported for normal local development and testing.

`.env` must not be committed. It may contain machine-local values and secrets.

`.env.example` must be committed, must not contain real secrets, and should list every environment variable needed to understand or bootstrap the supported local setup. Use safe example values or explicit placeholders and add short comments where the meaning is not obvious.

Whenever a change adds, removes, or renames an environment variable, update `.env.example` in the same change.

## Rationale

Environment variables are otherwise hidden dependencies. A checked-in contract lets humans, coding agents, CI configuration, and environment tooling discover configuration requirements mechanically without inspecting personal files or relying on setup instructions that can drift.

Separating the concrete file from the contract also prevents secrets and machine-specific values from becoming repository state.

## Agent behavior

1. Read `.env.example` to discover the expected local environment contract.
2. Never read secret values from an existing `.env` unless the task explicitly requires using local configuration and the tooling permits it.
3. Never commit `.env` or copy concrete secret values into `.env.example`.
4. When introducing or changing an environment variable, update `.env.example` in the same change.
5. If `.env` is absent and local execution requires one, it may be bootstrapped from `.env.example`; never overwrite an existing `.env` automatically.
6. Leave values that require credentials or user-specific choices as safe placeholders rather than inventing secrets.

## Example

Committed:

```dotenv
# Database used by the local Compose stack
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=app
DATABASE_USER=app
DATABASE_PASSWORD=<set-locally>

# Optional local API endpoint
EXTERNAL_API_URL=http://localhost:8081
```

Local and ignored:

```dotenv
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=app
DATABASE_USER=app
DATABASE_PASSWORD=my-local-secret
EXTERNAL_API_URL=http://localhost:8081
```

Typical repository state:

```text
.env              # ignored, local concrete values
.env.example      # committed configuration contract
compose.yaml
```

## Exceptions and trade-offs

Frameworks may use variants such as `.env.local`, `.env.development`, or `.env.test`. The same separation still applies: files containing concrete private or machine-local values are not the shared contract; checked-in example or documented configuration files must describe the variables required by the supported workflow.

A non-secret deterministic environment file may be committed when it intentionally represents shared configuration rather than developer-local state. That choice should be explicit.

## Consequences

The local configuration surface becomes discoverable and reviewable. Agents can update configuration dependencies safely, onboarding requires less tribal knowledge, and Compose/CI workflows can share a documented variable contract without exposing secrets.
