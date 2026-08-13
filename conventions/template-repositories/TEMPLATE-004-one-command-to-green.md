# TEMPLATE-004 — A template should have one canonical path to green

**Status:** Accepted  
**Category:** Template repositories

## Principles

- PRINCIPLE-001 — Prefer determinism over inference
- PRINCIPLE-004 — Make completion observable

## Rule

After documented external prerequisites are available, a freshly instantiated template should expose one canonical, repository-owned path that brings the project to a known-green development state.

The canonical path may delegate to several scripts internally, but a developer or agent should not need to reconstruct an undocumented sequence of install, generate, migrate, seed, build, and test commands from memory.

## Rationale

A deterministic entry point reduces setup ambiguity and makes template validation, agent onboarding, CI adaptation, and dogfooding all exercise the same workflow.

## Agent behavior

Prefer invoking the repository's canonical bootstrap/check entry point over inventing alternative setup procedures. If setup requires a new durable step, integrate it into the canonical path or make the prerequisite explicit.

## Exceptions and trade-offs

Platform-specific templates such as mobile or desktop applications may require external SDKs or signing infrastructure. Those prerequisites may remain external, but the repository-owned portion of setup should still be deterministic.