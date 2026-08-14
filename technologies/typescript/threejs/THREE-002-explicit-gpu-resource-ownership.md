# THREE-002 — Make GPU resource ownership explicit

**Status:** Accepted  
**Technology:** Three.js  
**Applies to:** Geometries, materials, textures, render targets, renderers, controls, loaders, and subscriptions

## Principles

- `PRINCIPLE-001` — Prefer determinism over inference.
- `PRINCIPLE-004` — Make completion observable.

## Inherits

- `technologies/typescript/`

## Rule

Every disposable Three.js resource must have an identifiable owner. The owner disposes the resource when it is replaced or its lifecycle ends; code that receives a borrowed caller-owned resource must not dispose it unless ownership transfer is explicit.

## Rationale

Three.js resources can outlive JavaScript references because they retain GPU allocations or external subscriptions. Ambiguous ownership causes leaks, double disposal, broken shared materials, and behavior that agents cannot infer safely.

## Agent behavior

```text
1. Inventory resources created or accepted by the changed code.
2. Mark each resource as internally owned, framework-managed, cached/shared, or caller-owned.
3. Reuse stable resources instead of recreating them during ordinary updates.
4. Dispose internally owned resources on replacement and teardown.
5. Never dispose caller-owned or shared resources without an explicit ownership contract.
6. Cancel animation frames, observers, listeners, and pending work owned by the runtime.
```

## Preferred pattern

A component creates one geometry and material for its lifecycle, updates their data or uniforms in place, and disposes both during cleanup. A component accepting a custom material documents that the caller retains ownership.

## Anti-pattern

Creating geometries, materials, or textures repeatedly without cleanup, or disposing a material supplied by a parent or shared cache.

## Automatable check

Lifecycle tests can spy on `dispose()`, cancellation, and unsubscribe calls. Browser smoke tests and renderer memory counters can catch regressions, but general ownership correctness still requires explicit APIs and review.

## Exceptions and trade-offs

Resources fully owned by a framework follow that framework's lifecycle. Shared caches need reference counting, eviction, or an application-lifetime owner instead of component-local disposal.

## Consequences

Scene teardown becomes deterministic, long-running sessions remain stable, shared resources are safe, and agents can modify lifecycle code without guessing who owns GPU state.
