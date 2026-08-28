# Coding Agent Conventions

A small, high-signal collection of software-development conventions for coding agents.

The repository records **decisions an agent should not have to infer**.

It does not duplicate defaults that are already obvious from source code, configuration, formatters, linters, compilers, or executable tooling.

## Responsibility boundary

This repository answers:

> What shared engineering rules should the resulting code satisfy?

Related responsibilities stay separate:

- `coding-agent-skills`: **how** to perform reusable development procedures.
- repository `AGENTS.md`: repository-specific context, commands, architecture boundaries, and deliberate exceptions.
- deterministic tooling, analyzers, linters, tests, and CI: mechanical verification and enforcement.

Skills may reference convention modules or stable rule IDs, but should not copy their policy text.

## Website

The repository includes a searchable React catalog that mirrors the Markdown folder structure with directory-style static pages.

```sh
bun install
bun run dev
```

Run `bun run check` to type-check, test, and build the site. The GitHub Pages workflow deploys `dist/` after pushes to `main`; configure the repository's Pages source as **GitHub Actions** before the first deployment.

## Authoring structure

```text
principles/
    durable cross-cutting ideas

conventions/
    technology-independent rules

technologies/
    technology-specific rules

profiles/
    human-readable compositions

registry/
    installable module/profile metadata
```

Most rules live directly in the `README.md` of the narrowest applicable scope.

For example:

```text
technologies/
  typescript/
    README.md
    react/
      README.md
      nextjs/
        README.md
```

Rules should live at the highest scope where they are actually true. Do not repeat inherited rules in child scopes.

## Installable registry

`registry/registry.json` is the distribution view of this repository. It groups the authoring sources into coherent modules such as `base`, `typescript`, `react`, `nextjs`, `rust`, `postgres`, and `playwright` without duplicating rule text.

Consumer repositories explicitly install only what they need, similar to a source registry:

```sh
coding-tooling conventions init
coding-tooling conventions add react testing-library vitest
coding-tooling conventions check
```

The installer vendors managed snapshots into `.conventions/` and writes `conventions.json` plus `conventions.lock.json`. This makes the active policy available to humans and agents without requiring live access to this repository during ordinary work.

Normal policy changes are received deliberately through:

```sh
coding-tooling conventions diff
coding-tooling conventions update
```

That makes convention changes reviewable instead of silently changing every repository at runtime.

Installed `.conventions/` files are managed snapshots, not local forks. Repository-specific additions and exceptions belong in `AGENTS.md` or another explicit local policy file.

## Composition

Registry modules depend on broader modules rather than copying them. For example:

```text
base
  ↓
typescript
  ↓
react
  ↓
nextjs
```

Independent modules are composed explicitly:

```text
react
+
postgres
+
playwright
```

Profiles are convenience compositions only. They do not own copied rule text.

## Precedence

Repository-local instructions have the highest precedence for repository-specific decisions:

```text
repository-specific rule
        ↓
installed specific convention
        ↓
installed broader convention
```

An explicit local exception should state which shared rule it overrides and why. Unrelated shared rules continue to apply.

## What belongs here

Document a rule when:

- a competent engineer could reasonably choose differently;
- the choice materially affects implementation, architecture, testing, validation, or agent behavior;
- the repository does not already make the choice mechanically obvious;
- deterministic tooling does not already completely express the rule.

Prefer executable enforcement over prose.

Examples of useful conventions:

- tests live near the narrowest dependency scope they validate;
- important navigational state belongs in the URL;
- production Rust code should not use `unwrap()` as normal control flow;
- primary application workflows must work without a mouse;
- agents validate narrow scopes before broad scopes.

Examples that usually do **not** belong here:

- formatter output;
- compiler settings already committed to configuration;
- lint rules already enforced in CI;
- generic ecosystem best practices that have not been deliberately adopted.

## Rule format

Rules should be concise and normative.

Prefer:

```md
## REACT-003 — Put important navigational state in the URL

- Store shareable or reload-persistent view state in URL parameters.
- This includes filters, search, sorting, pagination, and meaningful selections.
- Do not put ephemeral UI state or sensitive values in the URL.
```

Avoid turning every convention into a design document.

Add supporting fields only when they provide useful information:

```md
- Exception:
- Enforcement:
- See also:
```

Examples and rationale should be included only when the rule would otherwise be ambiguous.

## Stable IDs

Rules use stable identifiers:

```text
AGENT-*
TEST-*
ENV-*
UI-*
TS-*
REACT-*
NEXT-*
RUST-*
DB-*
POSTGRES-*
...
```

Changing wording does not change an ID. Removing a rule does not cause later IDs to be renumbered.

## Relationship to coding-tooling

`coding-tooling` owns deterministic registry installation and verification mechanics. It may read `registry/registry.json`, resolve module dependencies, vendor snapshots, compute hashes, and detect drift.

It does not own or reinterpret convention semantics.

`coding-tooling conventions resolve` is retained as a migration compatibility path for repositories that still consume live conventions. New consumers should prefer explicit installed modules.

## Repository-local conventions

Projects may define additional rules locally.

Repository-local rules are authoritative for that repository and may intentionally override shared conventions. They should not modify managed `.conventions/` snapshots.

The goal is not to make every project identical. The goal is to make deliberate engineering decisions **explicit, composable, mechanically discoverable, cheap for agents to load, and reviewable when they change**.
