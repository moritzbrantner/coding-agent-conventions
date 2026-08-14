# UI-006 — Make interactive data views accessible and shareable

**Status:** Accepted  
**Category:** Interface design

## Rule

Use an interactive chart when interaction materially helps the user compare, inspect, filter, navigate, or understand a trend. Do not add a chart merely to decorate a count or restate a visible table.

Every chart must provide the same underlying values through a semantic table or equivalent structured data view. Durable, non-sensitive view state—including filters, date ranges, metrics, grouping, visible series, and meaningful selections—must be deep-linkable when the platform has shareable URLs.

## Rationale

Charts often hide exact values behind hover, encode meaning only by color, and lose analytical context on refresh or sharing. A structured fallback and URL-backed state make the view usable by keyboard, touch, assistive technology, tests, collaborators, and future agent tooling.

## Agent behavior

1. State the question or decision the chart answers, following `UI-002`.
2. Prefer the simplest representation that preserves comparison; keep a table as the primary surface when exact record lookup is the task.
3. Give the chart a title, concise description, units, time range, and source or freshness where relevant.
4. Encode series and status with labels, shapes, or patterns in addition to color.
5. Make data points, series controls, legends, filters, tooltips, zoom, and drill-down operable by keyboard when present. Preserve visible focus and announce changing values meaningfully.
6. Provide touch interactions that do not depend on hover or pixel-perfect gestures.
7. Keep the structured data view synchronized with chart filters and selection. It may be collapsible visually but must remain discoverable and accessible.
8. Read durable view state from the URL and update it deterministically. Use history entries for discrete navigational choices and replace or debounce continuous interactions such as brushing.
9. Keep transient hover, animation frames, large payloads, secrets, personal data, and authorization state out of the URL.

## Completion evidence

Chart keyboard-navigation and data-table fallback tests are blocking. Tests must prove that a keyboard user can reach meaningful chart controls or data, that the same filtered values are available in the structured view, and that a copied deep link restores durable filters and selections.

Representative mobile tests must also prove that essential values and controls remain available without hover.

## Example

A latency chart exposes a date range, percentile, and service filter in the URL. Arrow keys move through focusable points or the synchronized data table, each value includes its timestamp and unit, and selecting a service updates both representations. Hover position and an open tooltip are not serialized.

## Automatable check

Component contracts can require a structured dataset and accessible label alongside chart configuration. Browser tests can compare the filtered chart model with table rows and reload a serialized view URL.

## Exceptions and trade-offs

Tiny decorative sparklines embedded beside already-visible values may omit a separate table when they are hidden from assistive technology and convey no additional information. Real-time operational views may avoid frequent URL writes, but stable filters and time windows remain shareable. Native applications without URLs must use an equivalent serializable view-state or share-link mechanism where sharing is a product capability.

## Consequences

Data visualization remains purposeful, exact values stay available, and analytical context survives refreshes, collaboration, and automated verification.
