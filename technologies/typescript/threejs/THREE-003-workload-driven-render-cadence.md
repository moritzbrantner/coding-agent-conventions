# THREE-003 — Match render cadence to scene behavior

**Status:** Accepted  
**Technology:** Three.js  
**Applies to:** Render loops, invalidation, animation, interaction, resizing, and asynchronous asset updates

## Principles

- `PRINCIPLE-001` — Prefer determinism over inference.
- `PRINCIPLE-004` — Make completion observable.

## Inherits

- `technologies/typescript/`

## Rule

Choose render cadence from actual scene behavior. Use invalidation-driven rendering for static or interaction-driven scenes, and use a continuous frame loop only while time-dependent animation or simulation requires it.

## Rationale

A permanent render loop wastes CPU, GPU, and battery for unchanged scenes. An on-demand renderer cannot display animation or asynchronous changes unless every relevant mutation invalidates a frame. Making the cadence explicit prevents both failure modes.

## Agent behavior

```text
1. Classify the scene as static, interaction-driven, continuously animated, or mixed.
2. Use one render owner for the scene.
3. Schedule a frame after resize, input, asset completion, or state changes in an on-demand scene.
4. Run continuously only for the duration of time-dependent work.
5. Coalesce redundant invalidations and cancel owned pending frames during teardown.
6. Measure before changing cadence as a performance fix.
```

## Preferred pattern

A map-like scene schedules one render after view, size, or tile changes. An animated scene updates transient object state from one frame callback. A mixed scene switches continuous rendering off when animation becomes idle.

## Anti-pattern

Starting independent `requestAnimationFrame` loops in several components, or rendering continuously because invalidation ownership is unclear.

## Automatable check

Tests can verify frame scheduling and cancellation around known events. Runtime instrumentation can track frame count while idle. Static analysis cannot reliably infer whether a scene truly needs continuous rendering.

## Exceptions and trade-offs

Some renderer integrations deliberately own a continuous loop. Keep that default when the scene is continuously animated or when changing it would violate the integration contract. Very small prototypes may accept the simpler loop temporarily.

## Consequences

Rendering work is proportional to visible behavior, lifecycle ownership is clearer, and performance investigations have an explicit cadence model to inspect.
