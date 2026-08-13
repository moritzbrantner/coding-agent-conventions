# AGENTS.md

This repository documents principles and conventions for coding-agent-friendly software development.

## First classify the idea

Before adding a document, decide whether it is a **principle**, **general convention**, **technology convention**, or **profile**.

- A **principle** is a durable design goal that can justify several concrete rules.
- A **general convention** is a normative cross-stack rule for agents, repositories, Git, testing, environments, CI, or orchestration.
- A **technology convention** is a normative coding rule that exists because of a particular language, library, or framework.
- A **profile** composes existing convention families for a stack and must not copy their rule text.

Do not create multiple documents that merely repeat the same statement at different levels.

## When adding a principle

1. Start from `templates/principle.md`.
2. Give it the next stable `PRINCIPLE-<NNN>` ID.
3. State the principle independently of a specific stack when possible.
4. Explain the implications rather than duplicating detailed convention procedures.
5. Link conventions that operationalize the principle.
6. Add it to the catalog in `README.md`.

## When adding a general convention

1. Start from `templates/convention.md`.
2. Give the convention a stable category ID such as `TEST-004`, `AGENT-009`, or `ENV-004`.
3. State the rule normatively and unambiguously.
4. Link the principle it derives from when one exists.
5. Describe deterministic agent behavior where possible.
6. Include at least one concrete example.
7. Document exceptions instead of weakening the main rule with vague language.
8. Add the convention to the catalog in `README.md`.

## When adding a technology convention

1. Start from `templates/technology-convention.md`.
2. Put the rule under the broadest technology where it is actually true.
3. Use the stable technology prefix: `TS-*`, `REACT-*`, `NEXT-*`, `RUST-*`, or a new documented prefix for a newly added technology.
4. Do not repeat a TypeScript rule under React or Next.js merely because those technologies use TypeScript.
5. State preferred and anti-pattern examples when they clarify the rule.
6. Identify a formatter, linter, compiler option, static analysis check, test, or repository script that can enforce the rule when one exists.
7. If the rule cannot be enforced reliably, say so explicitly instead of pretending it is deterministic.
8. Respect `REPO-002`: more specific framework or repository rules override only conflicting portions of broader rules.
9. Add concrete rules to the appropriate technology catalog rather than pre-populating generic best practices.

## When adding a profile

1. Reference existing general and technology convention families.
2. Do not copy convention text into the profile.
3. Keep precedence explicit and rely on `REPO-002` for conflicts.
4. Create profiles only when the referenced convention families contain meaningful rules.

## Editing principles

- Prefer precise rules over general advice.
- Prefer deterministic checks and mappings over semantic guesswork.
- Use repository structure to encode real scope, ownership, and dependency relationships when practical.
- Separate repository structure from runtime semantics.
- Keep orchestration-specific concerns out of general agent workflow rules where possible.
- Do not introduce stack-specific requirements unless the rule itself is stack-specific.
- Preserve existing principle and convention IDs when changing wording.
- When a new rule overlaps an existing one, extend or reference the existing rule instead of creating near-duplicates.
- Prefer documenting a developer's actual convention over importing generic industry "best practices" without an explicit decision.
