# React conventions

## REACT-001 — Colocate components and directly related artifacts

- Keep a component and its focused tests, styles, hooks, and types in their smallest shared directory.

## REACT-002 — Keep React state local by default

- Own state in the smallest subtree that needs it; widen only for real shared ownership.

## REACT-003 — Put important navigational state in URL query parameters

- Put durable, shareable view state in query parameters; keep ephemeral and sensitive state out of URLs.

## REACT-004 — Use effects for external synchronization

- Use effects for systems outside React, not derived values or ordinary control flow.

## REACT-005 — Prefer composition over highly configurable mega-components

- Prefer focused composition over unrelated flags and modes.

## REACT-007 — Reuse shared UI before creating local primitives

- Inspect and reuse the established UI package before creating local primitives.
- Keep workflows and stateful page composition in the app; keep reusable state-light primitives and patterns shared.

## REACT-008 — Separate update domains by frequency

- Keep fast-changing state in the smallest component, subscription, or renderer boundary that actually consumes it; do not make broad parents or providers rerender at animation-frame, pointer-hover, streaming, or simulation-tick cadence without a concrete need.
- In render loops such as React Three Fiber, prefer frame callbacks, refs, or an imperative renderer adapter for per-frame transforms. Use React state when the changed value should affect React-rendered UI.
- Split contexts or external-store subscriptions when consumers need different update frequencies; a convenient global provider is not sufficient reason to couple their rerenders.

## REACT-009 — Avoid redundant state and synchronization

- Derive values from current props, state, URL state, or authoritative external data when practical instead of copying them into additional React state.
- Do not use effects to mirror one React value into another. Effects synchronize React with systems outside React and must clean up subscriptions, timers, requests, and other external work.
- For mutable external sources, expose focused subscriptions such as `useSyncExternalStore` or selector-based stores rather than polling or forcing unrelated component trees to rerender.

## REACT-010 — Optimize boundaries before memoization

- Reduce work first through ownership boundaries, focused subscriptions, virtualization, and data shaping. Do not blanket a component tree with `memo`, `useMemo`, or `useCallback`.
- Add memoization when profiling or a clear identity/compute cost shows that it prevents meaningful work, and keep dependency semantics correct.
- Use stable semantic keys for mutable collections and virtualize large repeated views instead of rendering every row or item merely because React can express it.
- When making a material React performance optimization, add a representative deterministic benchmark or render-count regression check when practical; keep correctness tests separate from performance evidence.

## Child scopes

- [`nextjs/`](nextjs/)
- [`moritzbrantner-ui/`](moritzbrantner-ui/)
- [`tanstack-query/`](tanstack-query/)
- [`react-hook-form/`](react-hook-form/)
- [`zustand/`](zustand/)
- [`testing-library/`](testing-library/)

These are sibling specializations of React and may be composed together when a project uses several of them.
