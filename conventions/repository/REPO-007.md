# REPO-007 — Do not preinstall speculative architecture

**Status:** Accepted

## Rule
A template should include dependencies, abstractions, services, and architectural layers only when they are intentional defaults for the projects created from it.

Do not add packages or abstraction layers merely because they are commonly useful or might be needed later.

## Rationale
Every preinstalled choice becomes inherited complexity and agent context in every downstream project. Templates should be opinionated where a decision has been made, not comprehensive about hypothetical future needs.

## Agent behavior
Before adding a dependency or abstraction to a template, require a concrete use in the template's vertical slice or an explicit template-level decision that downstream projects should inherit.

## Principles
- PRINCIPLE-005 — Document decisions, not defaults