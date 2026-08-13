# Next.js conventions

Next.js is treated as a specialization of the React + TypeScript stack in this repository.

Rules in this directory use the `NEXT-*` prefix and apply to Next.js-specific routing, rendering, server/client boundaries, data access, caching, framework entry points, and deployment behavior.

Do not repeat TypeScript or React rules here. A Next.js rule should exist only when the framework adds or changes a constraint.

Applicable technology scope is mechanically derived from the path:

```text
technologies/typescript/react/nextjs/
        -> technologies/typescript/react/
        -> technologies/typescript/
        -> general conventions
        -> principles
```

When Next.js imposes a framework requirement that conflicts with a broader convention, the more specific rule wins according to `REPO-002`.
