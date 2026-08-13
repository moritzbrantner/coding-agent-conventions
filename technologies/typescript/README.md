# TypeScript conventions

Rules in this directory use the `TS-*` prefix and apply to TypeScript code in this convention stack.

Put a rule here when it is fundamentally about TypeScript types, modules, language constructs, compiler behavior, or TypeScript-level API design.

## Child scopes

```text
typescript/
  react/
    nextjs/
```

In this repository, directory nesting encodes convention inheritance: React inherits the TypeScript conventions, and Next.js inherits both React and TypeScript conventions.

Do not duplicate TypeScript rules in child framework directories. A child scope contains only additional or overriding rules specific to that framework.
