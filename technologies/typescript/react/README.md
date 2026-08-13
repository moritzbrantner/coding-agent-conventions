# React conventions

React is treated as a specialization of the TypeScript conventions in this repository.

Rules in this directory use the `REACT-*` prefix and apply to React-specific component, state, rendering, hook, effect, and composition behavior.

A rule that is fundamentally about TypeScript belongs in the parent `technologies/typescript/` scope. React rules add React-specific constraints instead of copying broader language rules.

For projects in this stack, an agent applies conventions by walking outward through the technology path:

```text
technologies/typescript/react/
        -> technologies/typescript/
        -> general conventions
        -> principles
```

More specific rules take precedence according to `REPO-002`.
