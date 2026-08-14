# UI-001 — Use surfaces to communicate structure, not to decorate every section

**Status:** Accepted  
**Category:** Interface design

## Rule

Use a card or raised surface only when its boundary communicates a real semantic unit: an independently actionable object, selectable item, movable module, temporary overlay, or intentionally contrasted region.

Do not wrap every page section, heading, count, navigation destination, or short piece of information in its own rounded card. Prefer page hierarchy, whitespace, headings, separators, lists, tables, and aligned rows when they express the structure without another container.

## Rationale

Container-per-section layouts flatten hierarchy because every block receives the same visual weight. Repeated rounded rectangles consume space, hide relationships between nearby information, and make generated interfaces look like interchangeable dashboards.

## Agent behavior

Before adding a card, answer:

1. What semantic boundary does this surface express?
2. Does the user interact with, select, move, compare, or independently scan it?
3. Would removing the background, border, radius, and shadow lose meaningful structure?

If the third answer is no, use ordinary layout instead.

Prefer:

- a page header followed by content,
- sections separated by rhythm or dividers,
- rows for repeated objects,
- tables for comparable records,
- description lists for label/value facts,
- one shared boundary around a coherent collection.

Avoid nested cards and grids whose only purpose is linking to other pages.

## Example

A movable admin workspace module may be a card because drag, focus, and independent action belong to the module. Four labels showing basic record counts should not become four cards; keep them near the list they summarize or use one compact metric strip when comparison is genuinely useful.

## Automatable check

A repository heuristic may report nested card components, repeated large-radius utilities, and high card-to-heading density. The semantic decision remains reviewable and should not be auto-fixed.

## Exceptions and trade-offs

Mobile touch targets, kanban items, commerce/catalog objects, and intentionally modular dashboards may need repeated surfaces. Use the design system's existing surface primitive and tokenized radius rather than inventing a new decorative treatment for each occurrence.

## Consequences

Interfaces become denser, calmer, and easier to scan, and meaningful surfaces regain visual significance.
