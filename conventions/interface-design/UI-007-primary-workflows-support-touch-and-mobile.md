# UI-007 — Make primary workflows work on touch and mobile

**Status:** Accepted  
**Category:** Interface design

## Rule

Every user-facing application must support its primary workflows on representative mobile viewports and coarse-pointer touch input unless a repository-specific convention records an explicit opt-out.

Responsive behavior must preserve the task, information hierarchy, state, and required actions rather than merely shrink the desktop layout or hide essential controls.

## Rationale

A page can fit a narrow viewport while remaining unusable because targets are too small, actions depend on hover, virtual keyboards cover controls, dense data overflows, or desktop-only navigation removes the path to a task. Mobile and touch support therefore require behavioral evidence, not only responsive CSS.

## Agent behavior

1. Identify the primary tasks and test them at the repository's representative mobile widths from the start of implementation.
2. Use one semantic structure where practical and adapt arrangement, density, and progressive disclosure by available space.
3. Provide visible alternatives for hover actions and keyboard shortcuts.
4. Use the design system's touch-target token, defaulting to at least 44 by 44 CSS pixels for primary interactive targets. A visually smaller control may use a non-overlapping expanded hit area.
5. Avoid horizontal page scrolling. Give wide tables, timelines, canvases, and code their own intentional overflow, summary, or alternate view.
6. Keep focused fields and validation visible when the virtual keyboard opens; preserve input values and scroll position through responsive transitions.
7. Support touch cancellation, coarse pointers, safe areas, zoom, and platform text sizing. Do not disable browser zoom to make a layout fit.
8. Keep destructive and high-frequency actions separated enough to avoid accidental activation.

## Completion evidence

Mobile viewport and touch-target tests are blocking for changed primary workflows. They must cover navigation, input, validation, overlays, the virtual-keyboard-sensitive portion of a form where applicable, and the final observable result.

Tests or deterministic audits must also detect unintended page-level horizontal overflow, inaccessible hover-only controls, and primary targets below the declared minimum.

## Example

A desktop data grid becomes a task-focused mobile list with the same filters, selection state, and record actions. Secondary columns move into an expandable detail region; they are not silently discarded. Row actions have visible touch affordances and remain available without hover.

## Automatable check

Playwright projects can exercise representative mobile viewport and touch configurations. Repository scripts can inspect target geometry, page overflow, focus visibility, and critical-flow completion.

## Exceptions and trade-offs

Specialized desktop workbenches may declare a documented minimum viewport and a mobile read-only or handoff workflow. The exception must name which tasks are unavailable and why; it must not be inferred from a broken narrow layout.

## Consequences

Responsive design is measured by retained capability, and mobile users receive a deliberate workflow rather than a compressed desktop afterthought.
