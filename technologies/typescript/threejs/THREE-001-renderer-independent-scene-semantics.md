# THREE-001 — Keep scene semantics renderer-independent

**Status:** Accepted  
**Technology:** Three.js  
**Applies to:** Scene data, domain state, spatial calculations, geometry generation, and renderer integration

## Principles

- `PRINCIPLE-001` — Prefer determinism over inference.
- `PRINCIPLE-002` — Structure should encode agent-relevant information.
- `PRINCIPLE-003` — Validate progressively.

## Inherits

- `technologies/typescript/`

## Rule

Keep domain state, progression, coordinate transforms, sampling, normalization, and reusable geometry construction in typed renderer-independent modules. Keep the Three.js boundary responsible for translating those results into scenes, objects, buffers, materials, and interactions.

## Rationale

Renderer-independent semantics can run in Node, server, editor, and test environments without a browser or GPU. The boundary also makes it explicit whether a change belongs to the domain model, a reusable rendering primitive, or one concrete scene.

## Agent behavior

```text
1. Identify the data or calculation that drives the scene.
2. Place deterministic calculations in pure typed functions or a headless core.
3. Give the Three.js adapter an explicit input contract.
4. Translate the contract into Three.js objects at the rendering boundary.
5. Do not move domain behavior into JSX, shaders, or frame callbacks merely because the result is visual.
```

## Preferred pattern

```text
serializable domain data
        ↓
pure projection / sampling / geometry helpers
        ↓
typed render contract
        ↓
Three.js or React Three Fiber adapter
```

Existing examples include the serializable story model with a Three renderer registry, the server-safe maps core with a separate WebGL runtime, and framework-independent geometry builders consumed by React Three Fiber components.

## Anti-pattern

A scene component that owns business rules, data normalization, coordinate conversion, resource creation, animation, and UI state in one renderer-specific module.

## Automatable check

Package-boundary or forbidden-import checks can keep headless entrypoints free of `three`, React, DOM, and renderer imports. Unit tests can exercise the pure contracts without constructing a renderer.

## Exceptions and trade-offs

Calculations that are inherently renderer-specific, such as shader code, material feature detection, or GPU picking, may remain at the rendering boundary. Small disposable prototypes do not need premature package extraction, but reusable semantics should still be isolated before they spread.

## Consequences

Agents can change scene semantics with narrow deterministic tests, reuse the same model across web, video, editor, or alternate renderer adapters, and avoid loading Three.js in server-safe entrypoints.
