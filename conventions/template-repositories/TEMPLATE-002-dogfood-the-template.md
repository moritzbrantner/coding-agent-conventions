# TEMPLATE-002 — Templates must dogfood the conventions they prescribe

**Status:** Accepted  
**Category:** Template repositories

## Principles

- PRINCIPLE-004 — Make completion observable
- PRINCIPLE-005 — Document decisions, not defaults

## Rule

A template repository should itself be developed, tested, and maintained using the same conventions and workflows that it expects downstream projects to follow.

If a template prescribes an agent workflow, validation ladder, environment setup, state-management approach, or repository structure, the template itself should exercise that approach during normal maintenance.

## Rationale

A convention that only works in generated projects but is not exercised while maintaining the template can drift unnoticed. Dogfooding turns maintenance friction into evidence about whether the template's defaults are actually usable.

## Agent behavior

When a repeated manual workaround is required while maintaining the template, treat it as feedback on the template or its conventions. Prefer fixing the reusable baseline or making the exception explicit rather than teaching every downstream project the same workaround.

## Consequences

Template maintenance becomes a continuous validation loop for the conventions it distributes.