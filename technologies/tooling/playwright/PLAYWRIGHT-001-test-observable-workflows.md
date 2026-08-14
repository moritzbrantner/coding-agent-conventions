# PLAYWRIGHT-001 — Test critical observable workflows

**Status:** Accepted  
**Technology:** Playwright  
**Applies to:** Browser-accessible user journeys and browser/platform integration boundaries

## Principles

- \`PRINCIPLE-003\` — Validate progressively.
- \`PRINCIPLE-004\` — Make completion observable.

## Rule

Use Playwright for critical user-visible workflows and browser integration behavior that focused tests cannot prove. Assert through accessible roles, labels, URLs, and observable outcomes.

## Rationale

Browser tests are expensive and broad. They provide the most value when they verify real boundaries without duplicating every lower-level case or coupling to internal component structure.

## Agent behavior

1. Cover the happy path and materially different permission, failure, or recovery paths.
2. Prefer \`getByRole\`, \`getByLabel\`, and visible text over CSS or implementation selectors.
3. Assert the resulting user-visible state, persisted effect, navigation, or API boundary.
4. Keep detailed combinatorics in unit or integration tests.
5. Run affected focused tests before \`test:e2e\`.

## Preferred pattern

Name tests by the behavior they prove. Keep browser specs at the lowest deterministic scope supported by the framework, using suffixes such as \`*.e2e.spec.ts\` or \`*.playwright.test.ts\`.

## Anti-pattern

Do not use Playwright as a replacement for component or domain tests, assert internal React structure, or encode long journeys that fail without identifying the broken capability.

## Automatable check

Expose \`test:e2e\` as the canonical non-interactive script. An optional \`playwright\` script may open UI mode for humans but is not the CI gate.

## Exceptions and trade-offs

Framework-imposed E2E directories are acceptable when workflow ownership and affected-scope mapping remain explicit.

## Consequences

Browser automation remains high-signal and can serve as a broad gate after cheaper checks pass.
