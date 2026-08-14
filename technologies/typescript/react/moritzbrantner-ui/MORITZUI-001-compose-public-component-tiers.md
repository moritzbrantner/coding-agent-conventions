# MORITZUI-001 — Compose applications from public component tiers

**Status:** Accepted  
**Technology:** @moritzbrantner/ui  
**Applies to:** Moritz-owned React applications that consume the package

## Principles

- \`UI-001\` — Use surfaces to communicate structure.
- \`UI-002\` — Show information where it changes a decision.
- \`REACT-007\` — Reuse shared UI before creating local primitives.

## Rule

Select components from the package's public support tiers by semantic responsibility:

- \`stable\` for primitives and low-level controls,
- \`patterns\` for state-light composed workflows,
- \`data\` for lists, grids, filters, search, and selection,
- \`shell\` for application chrome and page layout,
- focused \`social\`, \`media\`, and explicit \`labs\` paths only when needed.

Use the [component-selection reference](component-selection.md) before creating a local alternative.

## Rationale

The tiers encode stability and ownership. Selecting a purpose-built list, description, state, or workbench pattern prevents card-shaped local abstractions from replacing real information structures.

## Agent behavior

1. Search the generated component catalog and existing stories.
2. Prefer stable and patterns exports for ordinary composition.
3. Import focused tiers deliberately through documented package paths.
4. Keep routing, server state, authorization, product copy, and side effects in the app.
5. Accept \`className\` and named variants as the intended extension points.
6. Do not add arbitrary visual props such as \`rounded\`, \`shadow\`, \`color\`, or custom spacing knobs.

## Preferred pattern

Use \`DescriptionList\` for facts, \`ItemGroup\` or \`ResourceList\` for repeated objects, \`DataGrid\` for comparison, and \`MetricStrip\` only for contextual comparable measures.

## Anti-pattern

Choose \`Card\` first and then force every information shape into it, or import a private implementation file because the public API seems less convenient.

## Automatable check

Package export tests, consumer builds, API snapshots, Storybook, and import-boundary rules validate public usage. Visual review validates semantic component selection.

## Exceptions and trade-offs

\`labs\` components intentionally have weaker stability. An application must import them explicitly and own the upgrade risk.

## Consequences

The shared package becomes a reusable vocabulary rather than a bag of optional decorations.
