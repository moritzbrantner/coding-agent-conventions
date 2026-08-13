# TanStack Query conventions

TanStack Query (React Query) is treated as a React-specific specialization in this convention stack.

Rules in this directory use the `QUERY-*` prefix and apply to server-state fetching, query keys, cache policy, invalidation, mutations, stale data, error handling, and related TanStack Query behavior.

Rules here inherit the conventions from:

```text
technologies/typescript/react/tanstack-query/
        -> technologies/typescript/react/
        -> technologies/typescript/
        -> general conventions
        -> principles
```

Do not place general React state rules here unless they are specifically about TanStack Query. Likewise, Next.js-specific integration rules belong in a profile or a more specific repository rule unless a real dependency relationship justifies a nested scope.
