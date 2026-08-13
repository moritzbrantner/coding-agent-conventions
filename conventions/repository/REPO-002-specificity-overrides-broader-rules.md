# REPO-002 — More specific conventions override broader conventions

**Status:** Accepted  
**Category:** Repository

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-002 — Structure should encode agent-relevant information

## Rule

When two applicable conventions conflict, the rule with the narrower, more specific scope takes precedence.

Use this precedence order unless a repository explicitly defines a different one:

```text
repository-specific rule
        ↓
framework-specific rule
        ↓
language-specific rule
        ↓
general convention
        ↓
principle
```

A more specific rule should override only the conflicting part. Non-conflicting broader rules continue to apply.

## Rationale

Projects need reusable defaults without losing the ability to express framework requirements or repository-specific choices. Explicit precedence prevents agents from guessing which instruction wins.

## Agent behavior

1. Collect all conventions that apply to the current file or task.
2. Order them by scope specificity.
3. Apply broader rules by default.
4. Where rules conflict, apply the narrowest applicable rule.
5. Do not treat an override as disabling unrelated broader conventions.

## Example

A TypeScript convention may prefer named exports. A Next.js convention may require a default export for a particular framework entry point. The Next.js rule wins only for that entry point.

```text
general -> TypeScript -> React -> Next.js -> repository override
```

## Exceptions and trade-offs

Security, legal, or explicitly non-overridable constraints may define their own precedence. Such exceptions must be stated explicitly rather than inferred.

## Consequences

This enables reusable technology convention families and profiles without copying or weakening broader rules.
