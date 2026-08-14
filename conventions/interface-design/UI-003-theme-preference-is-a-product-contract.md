# UI-003 — Treat theme preference as a product contract

**Status:** Accepted  
**Category:** Interface design

## Rule

Every user-facing application must support light, dark, and system theme modes unless a repository-specific convention records an explicit opt-out.

System mode follows the operating-system preference. An explicit light or dark choice overrides the system and persists across sessions. All three modes must render the same information, actions, states, and hierarchy through semantic design tokens rather than mode-specific component forks.

## Rationale

Theme support affects tokens, persistence, startup rendering, native browser surfaces, charts, illustrations, focus states, and third-party components. Adding it after a light-only interface is complete creates scattered overrides and inconsistent intermediate states.

## Agent behavior

1. Discover the existing design-system theme provider and semantic color tokens before adding theme code.
2. Implement one resolver with the precedence `persisted light/dark override -> system preference -> light fallback`.
3. Expose a three-state light/dark/system control and make its current state available to assistive technology.
4. Apply the resolved mode before first meaningful paint where the platform permits it; avoid a flash of the wrong theme and hydration disagreement.
5. Theme native controls, focus indicators, syntax highlighting, charts, maps, illustrations, overlays, and transient states as part of the same contract.
6. Use semantic tokens such as background, surface, foreground, muted, border, accent, danger, and focus. Do not add raw light/dark palette branches inside feature components.
7. Preserve user data and current view state when switching modes.

## Completion evidence

- Focused tests prove mode resolution, persistence, and response to a changed system preference while system mode is active.
- Representative loading, empty, error, disabled, selected, focused, and overlay states are reviewed in light and dark modes.
- Text, icons, focus indicators, status colors, and data encodings remain distinguishable in both modes.

Visual-regression automation may strengthen this evidence, but it is not a universal completion gate.

## Example

A user selects dark mode, reloads the application, and remains in dark mode even when the operating system is light. After selecting system mode, later operating-system changes are reflected without overwriting the stored preference value `system`.

## Automatable check

Static analysis can report raw palette utilities in feature code. Focused tests can exercise the resolver and storage adapter. Storybook or browser matrices can render representative states under each resolved theme.

## Exceptions and trade-offs

A constrained embedded surface, branded campaign, or platform that cannot expose theme choice may opt out only through an explicit repository-specific rule that names the constraint. The opt-out does not permit unreadable contrast or an unthemed embedded component.

## Consequences

Theme behavior becomes a stable application capability rather than a late visual patch, and product code stays aligned with the shared design system.
