# Vue conventions

## VUE-001 — Prefer typed script setup SFCs

- Prefer `<script setup lang="ts">` for application single-file components unless a concrete framework or library constraint requires another component API.
- Keep props, emits, exposed state, and imported contracts typed.

## VUE-002 — Keep reactive state local by default

- Own mutable state in the smallest component or composable scope that needs it.
- Use `ref` or `reactive` for owned state and widen ownership only when multiple consumers genuinely share it.

## VUE-003 — Derive with computed; synchronize with watchers and lifecycle hooks

- Use `computed` for values derived from reactive state.
- Use `watch`, `watchEffect`, and lifecycle hooks for synchronization with external systems, not ordinary derivation or control flow.
- Clean up timers, subscriptions, observers, and browser resources when their owner is disposed.

## VUE-004 — Use composables as framework adapters, not dumping grounds

- Put reusable Vue-aware behavior in composables when it owns reactive state, lifecycle, dependency access, or framework integration.
- Keep calculations, transformations, validation, and policy that do not require Vue as plain functions or shared modules.
- Prefer a thin composable around testable pure logic over embedding all logic in the composable.

## VUE-005 — Keep component styling local; keep tokens global

- Prefer scoped component/page styles for styling owned by one SFC.
- Keep design tokens, resets, typography foundations, and genuinely reusable visual primitives in the shared stylesheet or UI package.

## VUE-006 — Prefer composition over configurable mega-components

- Prefer focused components and slots/composition over unrelated flags, modes, and conditional branches in one component.
- Split unrelated ownership boundaries rather than growing a component into a general-purpose feature container.

## VUE-007 — Put durable navigational state in the route

- Store shareable or reload-persistent view state in route params or query parameters.
- This includes filters, search, sorting, pagination, tabs, and meaningful selections when users should be able to refresh, navigate back, or share the same view.
- Keep ephemeral UI state and sensitive values out of the URL.

## VUE-008 — Reuse established UI primitives before creating local ones

- Inspect and reuse the project's established UI package or component system before creating local buttons, dialogs, menus, form controls, and other primitives.
- Keep application workflows and stateful composition local; promote reusable state-light primitives only when their ownership is genuinely shared.

## VUE-009 — Respect reduced-motion preferences

- All non-essential Vue transitions, CSS animations, and motion-library effects must respect the application's reduced-motion preference.
- Reduced motion must also cover continuous ambient animation and hover choreography, not only page transitions.

## Child scopes

- [`nuxt/`](nuxt/)
