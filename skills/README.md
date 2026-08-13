# Skills

Skills operationalize the conventions in this repository into reusable agent-facing workflows.

A skill is appropriate when a task has a repeatable reasoning process that should remain consistent across repositories, but cannot be reduced to deterministic tooling alone.

## Boundary

- **Conventions** define normative behavior and engineering decisions.
- **Skills** compose those conventions into repeatable agent workflows.
- **`coding-tooling`** performs deterministic inspection, validation, diagnostics, and other mechanical operations.
- **Outer orchestration** such as creating worktrees, spawning agents, retrying crashed runs, and cleaning up agent processes belongs outside these skills.

Skills should reference conventions rather than copying their rationale or redefining their rules.

## Catalog

| Skill | Purpose |
|---|---|
| [`development-loop`](development-loop/SKILL.md) | Implement, fix, or refactor code using progressive validation and deterministic tooling. |
