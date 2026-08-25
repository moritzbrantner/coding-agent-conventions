# Source-development procedure

Use this procedure when a task in one repository needs unreleased changes from another repository.

1. Identify the target application's immediate upstream dependency closure before editing.
2. Keep the task within DEP-003's repository budget. If it exceeds the budget, report the boundary problem instead of recursively expanding the task.
3. Implement the required upstream source changes without publishing or starting a release workflow.
4. Keep upstream package versions compatible with existing consumer requirements unless a version change is intrinsically part of the source change.
5. Record exact upstream commit revisions in the consumer's source-dependency declaration.
6. Activate the deterministic source-development mechanism and validate the target workflow against those exact revisions.
7. Prefer vertical product evidence over broad package maintenance: prove the user-facing or application workflow that motivated the upstream change.
8. Leave registry publication, version bumps, tags, and registry-only dependency updates for a separate release task.
9. Before a later release, deactivate source overrides and independently prove registry-only resolution from a clean checkout.

Do not interpret a registry version mismatch as permission to publish. Do not create a new package simply to avoid changing an existing source boundary.
