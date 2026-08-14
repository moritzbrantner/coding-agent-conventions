# STORYBOOK-001 — Stories are executable UI contracts

**Status:** Accepted  
**Technology:** Storybook  
**Applies to:** Reusable, shared, stateful, or interaction-rich UI components

## Principles

- `PRINCIPLE-002` — Structure should encode agent-relevant information.
- `PRINCIPLE-004` — Make completion observable.

## Rule

Represent every meaningful reusable UI state as a deterministic story close to the component it specifies.

Stories must use explicit fixtures or mocks, must not depend on a live backend, and must describe states that matter to users rather than exhaustively multiplying prop combinations.

## Rationale

A story provides a mechanically discoverable rendering contract for humans, browser checks, accessibility audits, and visual review. Deterministic fixtures make the same state reproducible locally and in CI.

## Agent behavior

1. When changing a reusable or stateful component, discover colocated `*.stories.tsx` files.
2. Add or update stories for changed user-visible states.
3. Prefer named fixtures for loading, empty, error, permission, and representative populated states.
4. Mock platform and network boundaries at the story boundary.
5. Run the repository's declared Storybook build or test capability before broader browser checks.

## Preferred pattern

Keep `Component.tsx`, `Component.stories.tsx`, and focused component tests at the component's owning scope. Use deterministic data and accessible story names.

## Anti-pattern

Do not create a showcase-only gallery, fetch production data from stories, or snapshot every possible prop permutation.

## Automatable check

The repository should expose `storybook:build` or an equivalent declared script. `coding-tooling` maps it to the stable `storybook:build` capability.

## Exceptions and trade-offs

Pure layout wrappers and trivial presentation-only leaves need a story only when the repository intentionally reviews them in isolation. Framework-imposed story locations may override colocation if the mapping remains deterministic.

## Consequences

Component states become executable inputs for accessibility, interaction, and visual automation without requiring the full application.
