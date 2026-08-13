# React conventions

React is treated as a specialization of the TypeScript conventions in this repository.

Rules in this directory use the `REACT-*` prefix and apply to React-specific component, state, rendering, hook, effect, and composition behavior.

A rule that is fundamentally about TypeScript belongs in the parent `technologies/typescript/` scope. React rules add React-specific constraints instead of copying broader language rules.

## Child technology scopes

React-specific libraries and frameworks live below this directory when they genuinely depend on the React scope:

```text
react/
  nextjs/             # NEXT-*
  tanstack-query/     # QUERY-*
  react-hook-form/    # RHF-*
  zustand/            # ZUSTAND-*
  testing-library/    # RTL-*
```

These child scopes are siblings. For example, TanStack Query is not nested below Next.js because it does not depend on Next.js. A project using both combines both applicable branches.

For projects in this stack, an agent applies inherited conventions by walking outward through the technology path. For Next.js:

```text
technologies/typescript/react/nextjs/
        -> technologies/typescript/react/
        -> technologies/typescript/
        -> general conventions
        -> principles
```

More specific rules take precedence according to `REPO-002`.
