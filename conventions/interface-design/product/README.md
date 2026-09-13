# Product interface conventions

These defaults apply to user-facing applications that deliberately install the `product-ui` module. Diagnostic pages, generated reports, narrow developer tools, and reusable UI libraries do not inherit them merely because they render an interface.

## UI-003 — Treat theme preference as a product contract

- Support light, dark, and system modes unless the product explicitly opts out.
- Persist explicit choices and render the same hierarchy and states through semantic tokens.

## UI-004 — Treat localization as an application contract

- Ship en, de, and es unless the product explicitly opts out.
- English is the fallback.
- Localize all user-visible content and formatting; never concatenate translated fragments or use display text as keys.
