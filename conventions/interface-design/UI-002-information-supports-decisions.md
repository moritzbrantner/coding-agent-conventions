# UI-002 — Show information where it changes a decision

**Status:** Accepted  
**Category:** Interface design

## Rule

Give prominent space only to information that changes what the user understands or does next.

Do not create standalone count, statistic, or information tiles for facts already implicit in the visible list, table, navigation label, status, or surrounding content. Do not repeat the same number in a summary card and again in the primary data surface.

## Rationale

Basic counts often look measurable without helping a decision. Prominent but context-free statistics displace the actual work, create redundant UI, and encourage dashboard-first layouts even when the user came to inspect or change records.

## Agent behavior

For each proposed metric or informational block:

1. Identify the decision, threshold, comparison, trend, or action it supports.
2. Place the information beside the object or action it qualifies.
3. Prefer an inline badge, tab label, table summary, progress indicator, or section heading when that context is sufficient.
4. Use a grouped metric strip only when several measures must be compared at a glance.
5. Include direction, delta, target, severity, or next action when prominence is justified.
6. Remove duplicate summaries whose detail surface is already visible.

Lead a work page with the primary task, current state, and relevant records rather than a row of generic totals.

## Example

"5 open risks, 2 critical, needs review" supports prioritization. A large card containing only "5 risks" does not. A result count may live beside the filtered table heading instead of occupying a separate dashboard tile.

## Automatable check

No reliable general check can determine decision relevance. Storybook and visual review can flag isolated metric-card grids, duplicated values, and information blocks without actions or comparison context.

## Exceptions and trade-offs

Operational monitoring and executive reporting may legitimately center on metrics. Even there, metrics require declared targets, trends, alerts, or drill-down behavior rather than decoration by number.

## Consequences

Screens prioritize work and meaning over superficial information density.
