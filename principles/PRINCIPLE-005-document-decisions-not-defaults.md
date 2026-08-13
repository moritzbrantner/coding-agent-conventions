# PRINCIPLE-005 — Document decisions, not defaults

**Status:** Accepted

## Principle

Document engineering decisions that a competent developer or coding agent could reasonably make differently.

Do not spend convention-documentation budget on behavior that is already obvious from the codebase, enforced by deterministic tooling, or a broadly expected default with no meaningful project-specific choice behind it.

## Rationale

Convention files consume attention and context. A large catalog of obvious rules lowers signal-to-noise ratio and makes the genuinely important decisions harder for humans and agents to find.

Examples of high-signal documentation include architectural boundaries, ownership rules, state-placement decisions, technology preferences, validation strategy, and deliberate trade-offs.

Examples of low-signal documentation include formatter output, compiler settings that can be read directly from configuration, or lint rules already enforced mechanically.

## Implications

Before adding a convention, ask:

1. Is there a reasonable alternative a competent engineer might choose?
2. Would an agent fail to infer our choice reliably from repository structure, code, or configuration?
3. Does knowing this choice materially affect implementation or architecture?

If the answer is no, prefer executable configuration, linting, formatting, tests, or no additional documentation.

## Consequences

This principle keeps the convention set small enough to function as high-value context for coding agents rather than becoming a second, stale copy of tool configuration.