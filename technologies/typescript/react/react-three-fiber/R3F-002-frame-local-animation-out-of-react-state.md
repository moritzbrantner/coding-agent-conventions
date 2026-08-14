# R3F-002 — Keep frame-local animation out of React state

**Status:** Accepted  
**Technology:** React Three Fiber  
**Applies to:** Per-frame transforms, material uniforms, particles, trails, cameras, and transient simulation output

## Principles

- `PRINCIPLE-001` — Prefer determinism over inference.

## Inherits

- `REACT-002` — Keep state at the narrowest scope that needs it.
- `REACT-004` — Use effects for external synchronization.
- `technologies/typescript/react/`
- Compose `THREE-003` through the React Three Fiber profile.

## Rule

Update frame-local visual state through `useFrame` and stable Three.js refs or uniforms. Use React state for semantic state that affects the application or declarative scene structure, not for values that exist only to animate each frame.

## Rationale

Driving per-frame transforms through React state schedules reconciliation for transient values already owned by the scene graph. Direct frame-local mutation keeps the hot path narrow while React remains the owner of meaningful UI and scene configuration.

## Agent behavior

```text
1. Decide whether a value is semantic application state or transient frame state.
2. Keep semantic state in React or the headless model.
3. Read stable refs from one `useFrame` callback for transient animation.
4. Mutate object transforms or uniforms in place.
5. Throttle or batch any required bridge from frame state back to React.
6. Do not create nested or competing frame loops.
```

## Preferred pattern

A selected entity id and animation parameters live in React state. Its pulse scale, trail sample position, or shader time uniform is updated through `useFrame` on a stable ref.

## Anti-pattern

Calling a React state setter every frame solely to rotate a mesh, move a particle, or advance a shader time uniform.

## Automatable check

A targeted lint or review heuristic can flag state setters inside `useFrame`, but legitimate throttled bridges require review. Performance tests can detect reconciliation regressions.

## Exceptions and trade-offs

React state is appropriate when frame-derived information must become observable UI state, change scene composition, or cross a serialization boundary. Publish that information at a deliberate lower frequency or meaningful transition rather than mirroring every frame.

## Consequences

Animation paths avoid unnecessary reconciliation, ownership between React and Three.js stays explicit, and agents can reason separately about application state and frame-local mutation.
