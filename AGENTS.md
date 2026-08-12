# AGENTS.md

This repository documents conventions for coding-agent-friendly software development.

## When adding a convention

1. Start from `templates/convention.md`.
2. Give the convention a stable category ID such as `TEST-004`.
3. State the rule normatively and unambiguously.
4. Describe deterministic agent behavior where possible.
5. Include at least one concrete example.
6. Document exceptions instead of weakening the main rule with vague language.
7. Add the convention to the catalog in `README.md`.

## Editing principles

- Prefer precise rules over general advice.
- Separate repository structure from runtime semantics.
- Prefer mechanically discoverable conventions.
- Do not introduce stack-specific requirements unless the convention itself is stack-specific.
- Preserve existing convention IDs when changing wording.
