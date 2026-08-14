# CI-003 — Automated dependency updates are qualified by repository evidence

**Status:** Accepted  
**Category:** CI  
**Derived from:** `PRINCIPLE-001`, `PRINCIPLE-003`, `PRINCIPLE-004`

## Rule

A dependency updater may detect and propose a version change, but the Consumer Repository owns the
evidence that qualifies it for merge. Bot-authored pull requests must pass the same required,
repository-owned validation gates as equivalent human or agent changes.

Updater metadata may select a declared dependency-update tier. It must not be treated as proof of
compatibility, performance, security, or semantic-version correctness.

## Rationale

Renovate and Dependabot can resolve versions, update manifests and lockfiles, and maintain pull
requests. They cannot know whether the affected application behavior, integration contracts,
resource usage, or performance budgets remain acceptable.

Keeping proposal and qualification separate makes the updater replaceable and keeps acceptance
deterministic. It also prevents a green updater status from bypassing the repository's actual
definition of done.

## Agent behavior

1. Identify a dependency update from trusted pull-request metadata or an explicitly selected
   dependency-update task.
2. Run the repository's declared dependency-update validation tier through the same deterministic
   entrypoint used locally and in CI.
3. Require the configured build, static, and test capabilities.
4. Run dependency audit, integration, end-to-end, and benchmark capabilities when the repository
   declares them.
5. Compare numerical evidence against the explicit base revision in the same controlled environment.
6. Let required status checks decide merge eligibility.
7. Invoke a coding agent only after deterministic evidence identifies a failure or migration need.

## Example

```text
Renovate or Dependabot pull request
  -> repository dependency-update tier
  -> build + required tests
  -> declared audit / integration / E2E / benchmark evidence
  -> required status checks
  -> merge, review, or agent-assisted repair
```

A private repository may express the tier as:

```json
{
  "tiers": {
    "dependency-update": [
      "lint",
      "typecheck",
      "build",
      "test:unit",
      "test:integration",
      "test:e2e",
      "dependencies:audit",
      "benchmark:smoke"
    ]
  },
  "optionalCapabilities": [
    "test:integration",
    "test:e2e",
    "dependencies:audit",
    "benchmark:smoke"
  ]
}
```

Required and optional evidence remains repository-specific. Optional means genuinely unavailable for
that repository, not optional after it fails.

## Exceptions and trade-offs

An urgent security update may shorten a release-age cooldown or review period. Any waived validation
must be an explicit, auditable emergency decision; the updater must not silently weaken the gate.

No test suite proves the absence of regressions. Major updates and changes to critical runtime
dependencies may still require changelog review, migration work, staged rollout, or manual approval
after all deterministic checks pass.

Performance results are meaningful only when the repository owns a stable fixture, metric, and
comparison procedure. Until variance is understood, a benchmark may report a warning instead of
blocking merge.

## Consequences

Dependency detection can move between Dependabot, hosted Renovate, or self-hosted Renovate without
changing the acceptance contract. Repositories get small auditable update pull requests, CI produces
comparable evidence, and agents spend tokens on diagnosed migration work rather than rediscovering
how to validate every update.
