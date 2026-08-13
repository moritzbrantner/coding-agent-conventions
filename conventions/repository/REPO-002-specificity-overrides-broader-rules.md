# REPO-002 — More specific conventions override broader conventions

**Status:** Accepted  
**Category:** Repository

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-002 — Structure should encode agent-relevant information

## Rule

When two applicable conventions conflict, the rule with the narrower, more specific scope takes precedence.

Within the technology tree, directory nesting represents inheritance and specificity. A rule in a deeper applicable technology directory overrides only conflicting portions of rules inherited from its parent directories.

Use this precedence model unless a repository explicitly defines a different one:

```text
repository-specific rule
        ↓
deepest applicable technology scope
        ↓
parent technology scopes, nearest first
        ↓
general convention
        ↓
principle
```

A more specific rule overrides only the conflicting part. Non-conflicting broader rules continue to apply.

## Rationale

Projects need reusable defaults without losing the ability to express framework, engine, or repository-specific requirements. Encoding inheritance in directory paths gives agents a deterministic way to discover both applicable rules and their precedence.

## Agent behavior

1. Determine the deepest applicable technology scope for the current file or task.
2. Walk from that directory upward through its technology parents and collect applicable conventions.
3. Add applicable general conventions and principles.
4. Apply broader rules by default.
5. Where rules conflict, apply the narrowest applicable rule.
6. Apply repository-specific overrides last.
7. Do not treat an override as disabling unrelated broader conventions.

## Examples

For a Next.js project in this convention stack:

```text
general -> TypeScript -> React -> Next.js -> repository override
```

Filesystem representation:

```text
technologies/typescript/react/nextjs/
```

For PostgreSQL:

```text
general -> database -> PostgreSQL -> repository override
```

For Dockerfile authoring:

```text
general -> Docker -> Dockerfile -> repository override
```

A TypeScript convention may prefer named exports. A Next.js convention may require a default export for a framework entry point. The Next.js rule wins only for that entry point.

## Exceptions and trade-offs

Not every technology combination implies inheritance. Orthogonal technologies should remain separate branches and be composed through a profile or repository configuration rather than arbitrary directory nesting.

Security, legal, or explicitly non-overridable constraints may define their own precedence. Such exceptions must be stated explicitly rather than inferred.

## Consequences

Technology paths become mechanically discoverable convention stacks. Agents can derive inherited rules by walking parent directories, while profiles remain available for composing orthogonal technology branches.
