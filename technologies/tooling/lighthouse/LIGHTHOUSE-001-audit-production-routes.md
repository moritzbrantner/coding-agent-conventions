# LIGHTHOUSE-001 — Audit production-shaped routes against budgets

**Status:** Accepted  
**Technology:** Lighthouse or compatible Lighthouse runner  
**Applies to:** Browser-delivered applications with performance, accessibility, SEO, or best-practice goals

## Principles

- \`PRINCIPLE-001\` — Prefer determinism over inference.
- \`PRINCIPLE-004\` — Make completion observable.

## Rule

Run Lighthouse-compatible audits against a production-shaped build and a committed representative route set. Store absolute category floors and metric ceilings as repository-owned budgets.

## Rationale

Auditing a development server or a single convenient page produces misleading results. Route-specific budgets make performance requirements executable and reviewable.

## Agent behavior

1. Build the same artifact shape used for deployment.
2. Start it with deterministic test configuration.
3. Audit explicitly declared public and critical routes.
4. Evaluate category scores and user-facing metrics against committed route budgets.
5. Emit machine-readable results and a human-readable report.
6. Preserve reports as CI artifacts on failure.

## Preferred pattern

Expose \`audit:lighthouse\`. A repository using Unlighthouse may map \`test:unlighthouse\` or \`bench:unlighthouse\` to the same semantic capability.

## Anti-pattern

Do not audit a hot development server, discover routes nondeterministically during the gate, or rely on an unversioned dashboard threshold.

## Automatable check

\`coding-tooling\` validates the committed performance-budget document and maps declared Lighthouse or Unlighthouse scripts to \`audit:lighthouse\`.

## Exceptions and trade-offs

Authenticated routes may use deterministic seeded sessions. Routes dominated by third-party variability require separate budgets or an explicit non-blocking classification.

## Consequences

Web quality goals become reproducible repository contracts rather than occasional manual observations.
