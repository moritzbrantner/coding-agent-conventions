# THREE-004 — Validate pure scene logic before GPU integration

**Status:** Accepted  
**Technology:** Three.js  
**Applies to:** Geometry, projections, sampling, materials, scene adapters, browser rendering, and performance

## Principles

- `PRINCIPLE-001` — Prefer determinism over inference.
- `PRINCIPLE-003` — Validate progressively.
- `PRINCIPLE-004` — Make completion observable.

## Inherits

- `TEST-001` — Test location follows dependency scope.
- `TEST-002` — Validate tests bottom-up.
- `TEST-003` — Keep test scope separate from test kind.
- `technologies/typescript/`

## Rule

Validate renderer-independent math, normalization, geometry contracts, and lifecycle behavior with deterministic tests before relying on a real browser or GPU. Keep real-renderer smoke tests, visual checks, and performance benchmarks as broader validation layers with explicit environments and metrics.

## Rationale

Most scene defects can be falsified faster and more reliably without WebGL. Real GPU tests are still necessary for shader compilation, renderer integration, visual output, and performance, but they are a poor first diagnostic layer.

## Agent behavior

```text
1. Test pure transforms, sampling, bounds, attributes, and invalid-input handling.
2. Test resource ownership and adapter contracts with mocks or spies where practical.
3. Run browser or real-renderer smoke tests for integration-sensitive behavior.
4. Run visual or performance validation only when the change can affect those qualities.
5. Record the renderer, browser, scenario, and metric for GPU-dependent results.
```

## Preferred pattern

```text
pure unit tests
      ↓
adapter and lifecycle tests
      ↓
browser / WebGL smoke tests
      ↓
visual regression or benchmark scenarios
```

Geometry tests should assert finite values, expected attributes, bounds, degeneracy handling, and stable contracts. Performance benchmarks should report useful measures such as frame time percentiles, FPS, draw calls, triangle count, and scene build time rather than a subjective impression of smoothness.

## Anti-pattern

Testing coordinate math only through screenshots, or claiming a rendering optimization from one unrecorded manual run.

## Automatable check

Repository scripts can enforce the cheap-to-expensive validation order and verify that benchmark scenarios build. GPU availability and visual correctness still require environment-specific gates.

## Exceptions and trade-offs

Shader compiler behavior, blending, depth interactions, color management, and device-specific performance cannot be proven by pure tests. Promote them to browser or GPU validation instead of simulating away the behavior under test.

## Consequences

Agents receive fast deterministic feedback, browser failures are narrowed to true integration concerns, and performance claims become reproducible.
