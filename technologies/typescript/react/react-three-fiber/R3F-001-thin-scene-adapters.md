# R3F-001 — Keep React Three Fiber components as thin scene adapters

**Status:** Accepted  
**Technology:** React Three Fiber  
**Applies to:** Reusable components, scene registries, geometry and material adapters, and package entrypoints

## Principles

- `PRINCIPLE-002` — Structure should encode agent-relevant information.
- `PRINCIPLE-003` — Validate progressively.

## Inherits

- `technologies/typescript/react/`
- Compose `technologies/typescript/threejs/` through the React Three Fiber profile.

## Rule

Use React Three Fiber components to declaratively compose scenes and adapt typed inputs to stable Three.js resources. Keep reusable geometry, material construction, normalization, and domain calculations in framework-independent helpers, and expose renderer adapters through explicit entrypoints when building a reusable package.

## Rationale

Thin adapters preserve React composition without coupling reusable scene logic to React reconciliation, browser-only imports, or one rendering surface. Stable helpers are easier to test, benchmark, reuse, and expose to non-React consumers.

## Agent behavior

```text
1. Define a typed prop or renderer contract.
2. Put deterministic construction and normalization in plain TypeScript helpers.
3. Memoize resources whose identity should survive renders.
4. Update mutable resource data or uniforms without replacing the resource unnecessarily.
5. Apply THREE-002 ownership rules to cleanup and borrowed resources.
6. Keep Three/R3F adapters out of server-safe or headless entrypoints.
```

## Preferred pattern

```text
headless core / geometry / materials
                 ↓
      explicit R3F adapter entrypoint
                 ↓
        small declarative component
```

Existing package patterns use separate core, geometry, material, React, or Three subpath exports and keep optional scene helpers out of the headless dependency surface.

## Anti-pattern

A reusable component that performs input cleanup, geometry algorithms, material creation, domain decisions, and scene composition inline on every React render.

## Automatable check

Import-boundary tests can keep core entrypoints free of React and R3F. Public-API tests can verify subpath exports. Unit tests can call construction helpers without mounting a canvas.

## Exceptions and trade-offs

Application-local visual components can keep small one-off calculations nearby when extraction would obscure rather than clarify ownership. Do not create package boundaries until a real reuse or server-safety requirement exists.

## Consequences

R3F scenes remain declarative while the expensive and reusable work stays deterministic, testable, and portable.
