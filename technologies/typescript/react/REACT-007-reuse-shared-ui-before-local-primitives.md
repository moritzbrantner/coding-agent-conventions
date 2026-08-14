# REACT-007 — Reuse shared UI before creating local primitives

**Status:** Accepted  
**Technology:** React  
**Applies to:** Applications with an established component package or local design system

## Principles

- \`PRINCIPLE-001\` — Prefer determinism over inference.
- \`PRINCIPLE-002\` — Structure should encode agent-relevant information.

## Rule

Before creating a local button, card, badge, field, dialog, page header, data list, state panel, or layout primitive, inspect and reuse the repository's established UI package.

Keep product workflows and stateful page compositions in the application. Keep reusable state-light primitives and patterns in the shared package.

## Rationale

Local look-alikes drift in accessibility, tokens, behavior, responsive layout, and component API. Reuse also reduces the tendency of agents to generate a new card abstraction for every screen.

## Agent behavior

1. Inspect package exports, component catalogs, stories, and existing app imports.
2. Choose the component by semantic job and information shape, not by a desired decorative shell.
3. Import through a documented public entrypoint; do not deep-import internal implementation files.
4. Compose app-owned fetching, routing, permissions, mutations, and copy around the state-light component.
5. Create a local composite only when it represents application-specific workflow.
6. Propose a shared-package addition only after at least two real consumers or an explicit platform requirement justify it.

## Preferred pattern

Compose an app-owned data page from shared \`ViewHeader\`, \`FilterBar\`, \`ResourceList\`, \`DataGrid\`, and state components while the app owns queries and URL state.

## Anti-pattern

Add \`StatCard\`, \`SectionCard\`, \`PageCard\`, and a local \`Button\` even though the shared package already exposes the relevant primitives and denser patterns.

## Automatable check

Dependency rules can forbid internal package imports and duplicated local primitive names. Consumer builds, export snapshots, Storybook, and visual tests validate the shared contract.

## Exceptions and trade-offs

An application may temporarily own an experimental composite while its API is product-specific or unstable. Do not prematurely generalize it into the shared package.

## Consequences

Applications converge on one accessible design language while retaining ownership of their actual workflows.
