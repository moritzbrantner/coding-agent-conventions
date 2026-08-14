# PLAYWRIGHT-002 — Own the environment and preserve failure evidence

**Status:** Accepted  
**Technology:** Playwright  
**Applies to:** Automated Playwright execution locally and in CI

## Principles

- \`PRINCIPLE-001\` — Prefer determinism over inference.
- \`PRINCIPLE-004\` — Make completion observable.

## Rule

Playwright automation must own or explicitly provision its application server, test data, services, ports, and teardown, and must retain enough failure evidence to reproduce a failed workflow.

## Rationale

Reusing an unknown local server or mutable shared data makes results order-dependent. Traces, screenshots, and reports turn browser failures into inspectable evidence.

## Agent behavior

1. Use a declared \`webServer\`, global setup/teardown, or explicit service scripts.
2. Bind test-only configuration and ports explicitly.
3. Disable reuse of existing servers in CI.
4. Use isolated, seeded test identities and data.
5. Keep CI concurrency explicit when the backend or fixtures are not parallel-safe.
6. Capture traces on first retry or failure and screenshots on failure.
7. Upload \`test-results\` and \`playwright-report\` when CI fails or is cancelled after execution.

## Preferred pattern

Install only the declared browser set in CI, start a production-shaped or explicitly test-shaped server, and use zero retries unless a retry is intentionally retained only to collect diagnostics.

## Anti-pattern

Do not depend on a developer's running server, production accounts, arbitrary sleeps, or retries that convert a reproducible first-attempt failure into a passing gate.

## Automatable check

\`coding-tooling\` exposes the stable \`test:e2e\` capability only from a repository-declared script and reports artifact paths from its capability catalog.

## Exceptions and trade-offs

Local UI mode may reuse an explicitly selected development server. That interactive convenience must not change the CI contract.

## Consequences

Browser results are repeatable, diagnosable, and safe for agent-driven execution.
