# MORITZUI-002 — Select one concrete theme contract

**Status:** Accepted  
**Technology:** @moritzbrantner/ui  
**Applies to:** Applications using package themes or package-rendered components

## Principles

- \`PRINCIPLE-001\` — Prefer determinism over inference.
- \`TAILWIND-002\` — Use semantic tokens and named variants.

## Rule

Import exactly one concrete \`@moritzbrantner/ui\` theme stylesheet for an application surface. When the app renders package components, also import \`@moritzbrantner/ui/component-sources.css\`.

Use \`theme-scopes.css\` only when multiple built-in themes intentionally coexist in one document.

## Rationale

A concrete stylesheet is a product-surface contract, not a casual skin. Selecting one theme keeps tokens, radii, density, typography, and motion coherent and avoids ad hoc per-page Tailwind restyling.

## Agent behavior

1. Determine the product surface before selecting a theme.
2. Import its one concrete stylesheet at the application boundary.
3. Add \`component-sources.css\` for package component rendering.
4. Use semantic utilities and component variants inside pages.
5. Do not combine concrete theme stylesheets to cherry-pick appearances.
6. Do not import only \`base.css\` for an ordinary app.

## Preferred pattern

Use Atlas for dense analytics, Paper or Scholia for research and reference work, Studio for creative production, Zleek for polished glass shells, Pop for public Studio-adjacent creator surfaces, and Pulse for kinetic interaction choreography. Use the default/Bobba contract for ordinary platform apps.

## Anti-pattern

Mix theme files, override package primitives page by page with raw palette colors, or reproduce a theme through copied utility strings.

## Automatable check

A repository script can verify concrete stylesheet count, component-source inclusion, and forbidden theme combinations.

## Exceptions and trade-offs

An embedded themed preview may intentionally use scoped themes. Keep the boundary explicit and prevent scoped tokens from leaking into the application shell.

## Consequences

Applications gain consistent visual character while remaining configurable through stable theme contracts.
