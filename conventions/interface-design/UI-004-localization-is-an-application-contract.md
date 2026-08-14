# UI-004 — Treat localization as an application contract

**Status:** Accepted  
**Category:** Interface design

## Rule

Every user-facing application must be localization-ready and ship English (`en`), German (`de`), and Spanish (`es`) unless a repository-specific convention records an explicit opt-out.

English is the default fallback locale. User-visible copy, accessible names, validation and error messages, metadata, chart labels, dates, numbers, currencies, units, and plural forms must pass through the localization boundary. Do not concatenate translated fragments or use display text as a translation key.

## Rationale

Localization changes routing, message structure, formatting, layout, fixtures, tests, and content ownership. Literal strings and language-dependent composition create hidden coupling that becomes expensive to remove after features accumulate.

## Agent behavior

1. Discover the repository's locale routing, catalogs, and formatting adapter before editing user-visible text.
2. Resolve locale in this order when the platform supports each input: explicit route or request locale, persisted user choice, browser or operating-system preference, then `en`.
3. Provide a language control using language names rather than national flags and keep the equivalent page or workflow active after switching.
4. Use stable semantic keys and complete messages with named interpolation and plural/select rules.
5. Use locale-aware formatters for dates, times, numbers, currencies, relative time, lists, and units; do not hand-build localized output.
6. Include accessible labels, alternative text, notifications, document metadata, empty states, and backend-originated user-facing errors in the translation inventory.
7. Preserve the locale in shareable navigation and deep links. Do not encode secrets or private user data to achieve this.
8. Remove keys only after their final usage and all locale entries are removed together.

## Completion evidence

Pseudo-localization and long-text layouts are blocking checks for changed user-facing interfaces. They must expose clipped text, fixed-width assumptions, untranslated literals, concatenated grammar, and controls whose accessible name diverges from the visible locale.

Focused tests must also cover fallback behavior and representative plural and locale-formatting differences. A missing non-fallback entry must fail a deterministic catalog check rather than silently shipping mixed-language UI.

## Example

An English message such as `3 files deleted` is represented as one plural-aware message, not as translated fragments around the number. German and Spanish provide complete grammatical messages, while an unknown locale resolves deterministically to English.

## Automatable check

Repository tooling can compare locale key sets, reject user-facing literals in declared UI scopes, identify unused keys, and run pseudo-localized Storybook or browser scenarios.

## Exceptions and trade-offs

User-provided content, legal quotations, logs, source code, and external data may remain in their source language. A product legally or contractually limited to another locale set may override the shipped locales and fallback explicitly; it must still retain the localization boundary and locale-aware formatting.

## Consequences

Language support is testable from the first feature, and new interfaces do not accumulate English-only assumptions that coding agents must later infer and unwind.
