# REPO-005 — Templates include one small vertical slice

**Status:** Accepted

## Rule
A template should contain one small but real end-to-end feature that demonstrates the intended architecture, file placement, state flow, testing style, and integration points.

The example should be thin enough to delete or replace, but complete enough to show how the chosen stack is meant to be used.

## Rationale
An empty scaffold forces humans and agents to infer architecture from folder names and configuration. A large demo application creates noise. One thin vertical slice provides executable architectural evidence with little baggage.

## Agent behavior
When evolving a template architecture, update the example slice and its tests so that the preferred pattern remains observable in working code.

## Principles
- PRINCIPLE-002 — Structure should encode agent-relevant information
- PRINCIPLE-005 — Document decisions, not defaults