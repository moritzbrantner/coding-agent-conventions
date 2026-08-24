# Nuxt conventions

## NUXT-001 — Prefer Nuxt server and SSR data primitives for initial data

- Prefer Nuxt-native server/SSR data flows such as `useAsyncData`, `useFetch`, server routes, and Nuxt Content for initial page data.
- Do not turn server-renderable pages into client-fetching SPAs without a concrete interaction or freshness requirement.

## NUXT-002 — Keep browser-only behavior behind focused client boundaries

- Use mounted lifecycle hooks and browser APIs only for behavior that actually requires the browser, such as observers, live subscriptions, timers, or local device capabilities.
- Keep the rest of the page renderable without those client-only effects.

## NUXT-003 — Keep server side effects under the server boundary

- Persistence, email delivery, privileged integrations, rate limiting, and similar server-side effects belong under `server/` or an equivalent Nitro-owned boundary.
- UI code crosses that boundary through server routes or shared contracts rather than importing persistence or privileged infrastructure directly.

## NUXT-004 — Share contracts and validate again at the server boundary

- Put request/response contracts that are reused by browser and server code in a shared scope.
- Validate untrusted input at the server boundary even when the client already validates the same shape.
- Prefer schema-backed contracts when the data crosses process, network, persistence, or trust boundaries.

## NUXT-005 — Prefer Nuxt-native capabilities before custom abstractions

- Prefer framework primitives such as `useRuntimeConfig`, `useSeoMeta`, `useHead`, route composables, Nuxt Content, and Nuxt modules before introducing custom wrappers that only restate framework behavior.
- Add an abstraction when it expresses application policy or creates a real ownership seam, not merely to hide a Nuxt API.

## NUXT-006 — Keep static and runtime modes as one application when practical

- When a project supports both static generation and runtime-backed deployment, prefer shared routes, components, and contracts with explicit feature seams over separate implementations.
- Treat runtime-only examples and services as opt-in capabilities rather than making them mandatory for content-first or static deployments unless the product requires them.

## NUXT-007 — Keep route-local code local

- Keep components, data shaping, and helpers used by one route close to that route until reuse broadens their ownership.
- Promote code into shared composables, shared contracts, or reusable components only after a second owner or a clear cross-route contract exists.

## NUXT-008 — Put durable view state in Nuxt routing

- Use route params or query parameters for shareable filters, search, sorting, pagination, tabs, and meaningful selections.
- Read and update that state through Nuxt/Vue Router primitives rather than maintaining a second disconnected local copy.
- Keep transient and sensitive state out of URLs.

## NUXT-009 — Make motion and theme preferences application contracts

- Theme and reduced-motion preferences must be reflected consistently across Nuxt UI, CSS, Vue transitions, and motion libraries.
- Non-essential page entrances, hover motion, ambient animation, and continuous effects must degrade or stop under reduced motion.
