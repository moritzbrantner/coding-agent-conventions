# TAILWIND-002 — Use semantic tokens and named variants

**Status:** Accepted  
**Technology:** Tailwind CSS  
**Applies to:** Tailwind-enabled applications and component packages

## Principles

- `PRINCIPLE-001` — Prefer determinism over inference.
- `UI-001` — Use surfaces to communicate structure.

## Rule

Use semantic design tokens and named component variants for color, radius, elevation, density, and motion. Do not make arbitrary large radii, shadows, gradients, blur, or raw palette colors the default decoration of newly generated components.

## Rationale

Utilities colocate styling, but unconstrained utilities let every component invent a visual system. Semantic tokens keep themes coherent and make intentional variants reviewable.

## Agent behavior

1. Reuse the project's component or pattern before writing a new styled primitive.
2. Prefer semantic utilities such as `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, and `border-border`.
3. Use the design system's radius, shadow, spacing, and motion variables.
4. Use `cn` for class composition and `class-variance-authority` for meaningful reusable variants.
5. Add a named variant when a visual choice represents a recurring semantic state.
6. Keep one-off utilities for product-specific layout and content, not for forking shared primitives.

## Preferred pattern

Use an existing `Card`, `Item`, `Badge`, or `Surface` variant with semantic tokens and a small layout `className`.

## Anti-pattern

Copy a local wrapper using `rounded-3xl`, a raw zinc background, a bespoke gradient, backdrop blur, and a custom shadow merely to make basic text look designed.

## Automatable check

Tailwind-aware linting can flag disallowed raw colors and arbitrary values in shared components. Repository heuristics may report repeated large-radius, gradient, blur, and shadow utilities outside approved variants.

## Exceptions and trade-offs

Brand artwork, data visualization, media treatments, and explicitly chosen product themes may use bespoke values. Centralize them as tokens or named patterns once they recur.

## Consequences

Tailwind remains local and expressive without turning coding-agent output into visually inconsistent utility improvisation.
