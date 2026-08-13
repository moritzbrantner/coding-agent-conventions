# AGENTS.md

This repository documents principles and conventions for coding-agent-friendly software development.

## First classify the idea

Before adding a document, decide whether it is a **principle** or a **convention**.

A principle is a durable design goal that can justify several concrete rules. A convention is a normative rule that agents, repositories, harnesses, CI, or orchestration systems can follow.

Do not create a principle and convention that merely repeat the same statement.

## When adding a principle

1. Start from `templates/principle.md`.
2. Give it the next stable `PRINCIPLE-<NNN>` ID.
3. State the principle independently of a specific stack when possible.
4. Explain the implications rather than duplicating detailed convention procedures.
5. Link conventions that operationalize the principle.
6. Add it to the catalog in `README.md`.

## When adding a convention

1. Start from `templates/convention.md`.
2. Give the convention a stable category ID such as `TEST-004` or `AGENT-009`.
3. State the rule normatively and unambiguously.
4. Link the principle it derives from when one exists.
5. Describe deterministic agent behavior where possible.
6. Include at least one concrete example.
7. Document exceptions instead of weakening the main rule with vague language.
8. Add the convention to the catalog in `README.md`.

## Editing principles

- Prefer precise rules over general advice.
- Prefer deterministic checks and mappings over semantic guesswork.
- Use repository structure to encode real scope, ownership, and dependency relationships when practical.
- Separate repository structure from runtime semantics.
- Keep orchestration-specific concerns out of general agent workflow rules where possible.
- Do not introduce stack-specific requirements unless the rule itself is stack-specific.
- Preserve existing principle and convention IDs when changing wording.
- When a new rule overlaps an existing one, extend or reference the existing rule instead of creating near-duplicates.
