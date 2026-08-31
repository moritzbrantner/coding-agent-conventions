# Git conventions

## GIT-001 — Every agent run has an explicit baseline

- Define the source-of-truth starting point; do not assume a local or remote ref is current.

## GIT-002 — Separate implementation from publishing

- Implementation produces candidate changes; integration, pushing, merging, and publishing are separate steps.

## GIT-003 — Use tiered local hooks without duplicating validation logic

- Pre-commit runs only very fast deterministic checks such as format checks, linting, schema/config validation, forbidden-pattern checks, and secret scanning.
- Pre-push runs broader affected-scope checks such as typechecking and focused unit/integration tests.
- Full-repository, E2E, benchmark, compatibility, and release verification remain explicit broader tiers rather than making every commit expensive.
- Hooks invoke the same canonical repository capabilities used by humans, agents, and CI; do not implement a second copy of validation logic inside hook scripts.
