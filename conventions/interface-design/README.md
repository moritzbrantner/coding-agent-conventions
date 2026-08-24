# Interface design conventions

## UI-001 — Use surfaces to communicate structure, not to decorate every section

- Use raised surfaces for meaningful semantic units; otherwise use hierarchy, spacing, headings, separators, lists, tables, or rows.

## UI-002 — Show information where it changes a decision

- Give prominence only to information that changes understanding or next action; do not repeat facts already visible.

## UI-003 — Treat theme preference as a product contract

- Support light, dark, and system modes unless explicitly opted out.
- Persist explicit choices and render the same hierarchy and states through semantic tokens.

## UI-004 — Treat localization as an application contract

- Ship en, de, and es unless explicitly opted out; English is the fallback.
- Localize all user-visible content and formatting; never concatenate translated fragments or use display text as keys.

## UI-005 — Make primary workflows keyboard-first and commands discoverable

- Make every primary workflow keyboard-completable.
- Use a central, discoverable command registry; shortcuts accelerate commands but are never their only access.

## UI-006 — Make interactive data views accessible and shareable

- Use charts only when interaction adds understanding; provide equivalent structured values.
- Make durable non-sensitive view state deep-linkable on shareable platforms.

## UI-007 — Make primary workflows work on touch and mobile

- Preserve primary tasks, hierarchy, state, and required actions on representative mobile and touch input.

## UI-008 — Respect reduced-motion preferences everywhere

- Non-essential animation must respect the application's reduced-motion preference.
- Apply the preference consistently to CSS animation, transitions, page entrances, hover choreography, ambient motion, and motion libraries.
- Reduced motion should remove or substantially simplify continuous and decorative motion rather than only shortening it.

## UI-009 — Put durable navigational state in the URL

- Store shareable or reload-persistent view state in URL path, query, or fragment state when the platform supports it.
- This includes filters, search, sorting, pagination, tabs, and meaningful selections.
- Keep ephemeral UI state and sensitive values out of URLs.

## UI-010 — Reuse established UI primitives before creating local ones

- Inspect and reuse the project's established UI package or component system before creating local buttons, dialogs, menus, form controls, and other primitives.
- Keep app-specific workflows and stateful composition local; promote reusable state-light primitives only when ownership is genuinely shared.
