---
name: development-loop
description: Use for implementation, bug-fix, and refactoring tasks that modify code and require progressive validation. Apply agent judgment to the change itself and delegate deterministic repository operations to coding-tooling when available.
---

# Development Loop

## Purpose

Turn an implementation task into a repeatable development loop that keeps the smallest relevant validation green before moving to broader validation.

This skill operationalizes the repository's existing conventions for deterministic checks, mechanical discovery, bottom-up testing, cheap-first validation, and downward revalidation after broader failures.

## Responsibility boundary

This skill owns the workflow **inside one coding-agent run**.

It does not own outer orchestration. Creating or deleting worktrees, spawning agents, retrying crashed processes, scheduling work, integrating multiple candidates, publishing changes, and lifecycle cleanup belong to the outer orchestrator.

Use `coding-tooling` for deterministic inspection, affected-scope calculation, validation, and environment diagnostics whenever the required capability exists. Do not replace an available deterministic operation with repeated LLM inference.

## Inputs

- The implementation, bug-fix, or refactoring task.
- Repository-local instructions and conventions.
- The current repository/worktree state.
- An explicit baseline when the surrounding harness provides one.

## Workflow

### 1. Understand the task

Determine the required behavior, relevant constraints, and observable completion criteria. Separate requirements from implementation ideas.

Do not modify code until the intended behavior is sufficiently clear to choose a coherent first change.

### 2. Inspect mechanically first

Prefer deterministic discovery before semantic search.

When available, begin with:

```bash
coding-tooling inspect --json
```

Use repository structure, manifests, changed-file information, declared scripts, and existing tests to narrow the relevant area before broader code search.

### 3. Establish the smallest useful scope

Identify:

- the code that most directly owns the behavior,
- the smallest relevant existing tests,
- the nearest validation scope that can falsify the intended change quickly.

Do not begin with repository-wide validation unless the repository is too small for narrower scopes or no narrower deterministic check exists.

### 4. Implement the smallest coherent change

Make the smallest change that can satisfy the requirement without knowingly leaving the local design inconsistent.

Avoid unrelated cleanup. If a prerequisite refactor is necessary, keep it scoped to what enables the requested change.

### 5. Determine affected validation

When available, ask deterministic tooling rather than inferring affected checks repeatedly:

```bash
coding-tooling affected --json
```

Use the result to choose the narrowest applicable checks.

### 6. Run narrow and cheap validation

Run the cheapest relevant deterministic checks first. Typical order is:

1. formatting verification,
2. lint/static analysis,
3. type checking or compilation,
4. smallest relevant tests.

Use the repository's actual available capabilities rather than assuming every stack exposes every check.

### 7. Repair failures at their owning scope

If narrow validation fails:

1. diagnose the failure,
2. change the implementation or test only when justified by the task,
3. rerun the same failed scope,
4. do not broaden validation until the smaller scope is green.

Do not weaken tests, lint rules, compiler settings, or completion gates merely to make the run pass.

If the failure is environmental rather than behavioral, use deterministic diagnostics when available:

```bash
coding-tooling doctor --json
```

Do not modify product code to work around an environment failure.

### 8. Broaden validation progressively

After the smallest relevant scope is green, move outward through the next applicable scopes, for example:

```text
local/unit
    ↓
component/package
    ↓
integration
    ↓
system/e2e
    ↓
final repository gate
```

Skip a level only when it does not exist or is not relevant to the changed dependency scope.

### 9. Revalidate downward after broader-scope fixes

If a broader validation step exposes a defect and the fix changes code already covered by a narrower scope, return to the smallest affected validation and climb again.

Do not assume a fix made for an integration failure preserved previously passing unit behavior.

### 10. Run the final completion gate

Before reporting completion, run the repository's required final deterministic validation. When supported, prefer a single tooling entry point such as:

```bash
coding-tooling check --level final
```

If `coding-tooling` does not yet expose the required capability, use the repository's canonical deterministic command instead and report the gap rather than inventing a hidden substitute.

### 11. Report evidence

The final report should state:

- what behavior changed,
- the important implementation choices,
- which deterministic checks were run,
- which scopes passed,
- any validation that could not be run and why,
- remaining risks or follow-up work that is genuinely outside the task.

Do not claim completion when required validation is failing or was silently skipped.

## Failure loop

```text
implement
   ↓
narrow check ── fail ──► diagnose/fix ──┐
   │                                     │
  pass ◄─────────────────────────────────┘
   ↓
broader check ─ fail ─► fix
   │                    │
   │                    └─► return to smallest affected check
  pass
   ↓
final gate
   ↓
done
```

## Related conventions

- `PRINCIPLE-001` — Prefer determinism over inference.
- `PRINCIPLE-003` — Validate progressively.
- `PRINCIPLE-004` — Make completion observable.
- `AGENT-001` — Deterministic checks before agent judgment.
- `AGENT-006` — Prefer mechanical discovery before semantic search.
- `AGENT-007` — Run cheap validation before expensive validation.
- `AGENT-008` — Revalidate downward after broader-scope fixes.
- `TEST-002` — Validate tests bottom-up.
- `AGENT-004` — The harness defines completion.
