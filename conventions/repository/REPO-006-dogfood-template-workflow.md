# REPO-006 — Dogfood the template workflow

**Status:** Accepted

## Rule
Maintain a template using the same generated structure, commands, tests, and agent-facing workflow that downstream projects receive.

## Rationale
This exposes friction that static template review misses: awkward commands, missing files, brittle setup, and poor agent discoverability.

## Agent behavior
Use the canonical generated workflow while maintaining the example slice. Convert recurring dogfood friction into deterministic configuration, tests, or a high-signal convention where practical.