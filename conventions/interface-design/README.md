# Interface design conventions

## UI-001 — Use surfaces to communicate structure, not to decorate every section

- Use raised surfaces for meaningful semantic units; otherwise use hierarchy, spacing, headings, separators, lists, tables, or rows.
- Do not turn ordinary counts, statuses, or metadata into decorative metric/KPI cards when the same information is clearer in context.

## UI-002 — Show information where it changes a decision

- Give prominence only to information that changes understanding or next action; do not repeat facts already visible.

## UI-005 — Make primary workflows keyboard-first and commands discoverable

- Make every primary workflow keyboard-completable.
- Use a central, discoverable command registry; shortcuts accelerate commands but are never their only access.

## UI-006 — Make interactive data views accessible and shareable

- Use charts only when interaction adds understanding; provide equivalent structured values.
- Make durable non-sensitive view state deep-linkable on shareable platforms.

## UI-007 — Make primary workflows work on touch and mobile

- Preserve primary tasks, hierarchy, state, and required actions on representative mobile and touch input.

## UI-008 — Make numeric editor controls precision-first

- Provide directly editable numeric values for precision-sensitive parameters, including dimensions, position, rotation, timing, cuts, simulation settings, and effect parameters. Do not use slider-only controls; a value label or tooltip is not exact entry.
- Sliders, dragging, handles, and scrubbers may supplement exact entry for coarse adjustment. Use professional-editor interactions, such as Unity, Kdenlive, and Adobe editors, as references rather than defaulting every number to a slider.
- Keep units visible and make keyboard entry and fine adjustment available. Choose domain-appropriate precision, bounds, and increments; a slider's coarse step must not silently quantize an exact typed value. Integer counts and frame-aligned time are explicit domain constraints, not accidental slider restrictions.
- Preserve incomplete editing drafts without committing an empty string as zero, NaN, or an unintended intermediate value. Validate finite values and bounds before committing, support cancel/revert, and keep all input methods synchronized with the same authoritative state.
- Test exact fractional and negative entry, invalid/empty drafts, boundaries, keyboard commits/cancellation, and synchronization after presets or external changes. Reuse the shared numeric control where available rather than duplicating parsing and commit policy in every editor.
- Exception: purely coarse preference controls may remain sliders when exact values do not affect the task. Timeline scrubbing remains a direct manipulation affordance, but editing cut points and selecting exact frames still require precise entry or frame-step commands.
