# Dependency development conventions

## DEP-001 — Keep publication out of ordinary development

- Develop cross-repository changes against source revisions rather than publishing packages to unblock feature work.
- Prefer the repository's declared source-development mechanism and pin exact revisions.
- Do not start a crates.io, npm, or other registry release train unless the task is explicitly a release task.

## DEP-002 — Version bumps belong to release work

- Keep package versions compatible during source-development work when possible.
- Put version bumps, changelogs, tags, registry publication, and registry-only consumer updates in a dedicated release change.
- Do not treat a missing published version as a feature blocker when an exact source dependency can prove the change.

## DEP-003 — Bound cross-repository expansion

- A normal application task may modify the target repository and at most two upstream repositories unless broader migration scope is explicitly authorized.
- If the required dependency closure exceeds that budget, stop expanding the implementation and report the boundary as an architectural problem.
- Do not recursively repair or release unrelated transitive packages merely because they appear in the dependency graph.

## DEP-004 — Require a reason for a new independently versioned package

- Add functionality to an existing coherent package by default.
- Create a new package or crate only when there is a second independent consumer, a hard dependency/isolation boundary, or another concrete reason for independent versioning.
- Conceptual separability alone is not sufficient.

## DEP-005 — Separate development proof from release proof

- Source-mode checks prove that the working source graph is correct.
- Registry-only resolution in a clean checkout is a release/distribution gate, not an inner-loop development gate.
- Before release, remove or deactivate source overrides and prove the published dependency graph independently.

## DEP-006 — Publish frontend packages only for real external consumers

- Keep application-local JavaScript or TypeScript packages source-local.
- Do not publish to npm solely because a workspace package boundary exists.
- Publish only when another independently versioned consumer requires the package or distribution itself is the product.
