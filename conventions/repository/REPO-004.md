# REPO-004 — Validate templates from a fresh instance

**Status:** Accepted

## Rule
A template is complete only when a fresh generated or cloned project can install, start, test, and build without undeclared machine-local state.

## Rationale
Testing only the template source can hide missing generated files, stale lockfiles, ignored environment assumptions, or setup steps that consumers actually encounter.

## Agent behavior
After changing a template, create a clean downstream instance and run its canonical install, validation, and build workflow.

## Principles
- PRINCIPLE-004 — Make completion observable
- PRINCIPLE-005 — Document decisions, not defaults