# STORYBOOK-002 — Build and audit Storybook in automation

**Status:** Accepted  
**Technology:** Storybook  
**Applies to:** Repositories that ship Storybook stories

## Principles

- `PRINCIPLE-003` — Validate progressively.
- `PRINCIPLE-004` — Make completion observable.

## Rule

Treat the static Storybook build as the deterministic component-system gate and audit every included story for accessibility in automation.

## Rationale

The development server proves little about reproducibility. A static build catches configuration and bundling failures, while a story-index-driven accessibility pass verifies all declared states instead of a hand-picked subset.

## Agent behavior

1. Build Storybook non-interactively.
2. Enumerate stories from the generated story index.
3. Audit each story root with the repository's accessibility engine.
4. Fail on accessibility violations according to committed policy.
5. Preserve the static build and audit report as failure artifacts.
6. Remove generated output after successful local validation.

## Preferred pattern

Expose a single `test:storybook` script that builds Storybook and runs its accessibility audit. Use `test:storybook:a11y` when the audit is independently runnable.

## Anti-pattern

Do not treat a successfully started development server, a manually opened story, or a partial sample as the automated gate.

## Automatable check

`coding-tooling` discovers `storybook:build`, `test:storybook`, and `test:storybook:a11y`. CI uploads `storybook-static` and audit output when the check fails.

## Exceptions and trade-offs

Visual regression checks require an explicit reviewed baseline and may be a separate, more expensive gate. Accessibility checks remain required when the story set is part of the repository's validation contract.

## Consequences

Storybook becomes test infrastructure rather than documentation that silently drifts.
