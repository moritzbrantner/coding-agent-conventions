# TAILWIND-001 — Prefer Tailwind CSS when practical

**Status:** Accepted  
**Technology:** Tailwind CSS

## Rule

Prefer Tailwind CSS for application styling when practical because utility classes keep styling close to the markup and component that owns it.

## Rationale

Style colocation reduces cross-file navigation, makes component changes more self-contained, and gives coding agents direct access to structure and styling in the same local context.

## Agent behavior

When implementing ordinary component styling in a Tailwind-enabled project, prefer utilities over creating a separate component stylesheet. Reuse design tokens and extract repeated component structure rather than scattering duplicated custom CSS.

## Preferred pattern

Keep component-specific layout, spacing, typography, responsive, and state styling alongside the JSX through Tailwind utilities.

## Anti-pattern

Create a new CSS file for simple component-local styling that can be expressed clearly with existing Tailwind utilities.

## Automatable check

Formatter and Tailwind-aware linting can enforce class consistency; the decision that Tailwind remains readable requires review.

## Exceptions and trade-offs

Use CSS, CSS modules, or another appropriate mechanism when global styles, complex selectors, third-party overrides, unusual animations, or readability make utilities a worse fit.
