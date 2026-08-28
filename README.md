# Coding Agent Conventions

A small, high-signal collection of software-development conventions for coding agents.

The repository records **decisions an agent should not have to infer**.

It does not duplicate defaults that are already obvious from source code, configuration, formatters, linters, compilers, or executable tooling.

## Website

The repository includes a searchable React catalog that mirrors the Markdown folder structure with directory-style static pages.

```sh
bun install
bun run dev
```

Run `bun run check` to type-check, test, and build the site. The GitHub Pages workflow deploys `dist/` after pushes to `main`; configure the repository's Pages source as **GitHub Actions** before the first deployment.

## Structure

```text
principles/
    durable cross-cutting ideas

conventions/
    technology-independent rules

technologies/
    technology-specific rules

profiles/
    compositions of independent convention branches
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

A Next.js repository therefore inherits:

```text
TypeScript
    ↓
React
    ↓
Next.js
```

Rules should live at the highest scope where they are actually true.

Do not repeat inherited rules in child scopes.

## Applying conventions

An agent determines its applicable convention stack from the repository's technologies and profile.

For a Next.js application, for example:

```text
principles/
conventions/
technologies/typescript/README.md
technologies/typescript/react/README.md
technologies/typescript/react/nextjs/README.md
repository-local rules
```

Independent branches are composed rather than nested artificially.

For example:

```text
Next.js
+
PostgreSQL
+
Playwright
```

may be combined through a profile.

### Live consumption contract

This repository is the live source of shared policy. Consumer repositories should not copy its rule text or pin a convention revision merely to receive normal policy updates.

For local coding-agent work, use `coding-tooling conventions resolve` against the target repository. The resolver discovers the current registered conventions checkout, infers applicable technology branches, resolves any explicitly referenced stable IDs, and reports repository-local instructions separately.

Cloud-hosted agents that cannot access the local machine registry should retrieve this repository live through their connected source-control integration and apply the same stack and precedence rules.

When reproducibility matters, a run, review, or evidence record may store the observed Git revision of this repository. That revision records which policy was seen; it does not become a required dependency pin in every consumer repository.

Repository-local files remain responsible for project-specific semantics, commands, architecture boundaries, and deliberate exceptions. They should not become generated mirrors of this repository.

## Precedence

More specific rules override broader rules only where they conflict.

```text
repository-specific rule
        ↓
deepest applicable technology scope
        ↓
parent technology scopes
        ↓
general convention
        ↓
principle
```

Unrelated broader rules continue to apply.

## What belongs here

Document a rule when:

* a competent engineer could reasonably choose differently;
* the choice materially affects implementation, architecture, testing, validation, or agent behavior;
* the repository does not already make the choice mechanically obvious;
* deterministic tooling does not already completely express the rule.

Prefer executable enforcement over prose.

Examples of useful conventions:

* tests live near the narrowest dependency scope they validate;
* important navigational state belongs in the URL;
* production Rust code should not use `unwrap()` as normal control flow;
* primary application workflows must work without a mouse;
* agents validate narrow scopes before broad scopes.

Examples that usually do **not** belong here:

* formatter output;
* compiler settings already committed to configuration;
* lint rules already enforced in CI;
* generic ecosystem best practices that have not been deliberately adopted.

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

Changing wording does not change an ID.

Removing a rule does not cause later IDs to be renumbered.

## Profiles

Profiles compose independent convention branches.

They contain references, not copies of rules.

Example:

```text
next-template
├── TypeScript
├── React
├── Next.js
├── Bun
├── Playwright
└── Lighthouse
```

Do not create profiles merely to reproduce inheritance already encoded by the directory tree.

## Relationship to coding-agent-skills

Conventions answer:

> What rules should the agent follow?

`coding-agent-skills` answers:

> What reusable reasoning procedure or executable flow should the agent execute?

This repository does not own procedural skills. General development, debugging, review, planning, refactoring, and similar procedures belong in `coding-agent-skills`. Those capabilities may reference stable convention IDs from this repository rather than copying policy or rationale.

Deterministic mechanics belong in `coding-tooling`; a convention should not grow into a procedural wrapper around an operation that tooling can perform directly.

## Repository-local conventions

Projects consuming this repository may define additional rules locally.

Repository-local rules are authoritative for that repository and may intentionally override these conventions.

The goal of this repository is not to make every project identical.

The goal is to make deliberate engineering decisions **explicit, composable, mechanically discoverable, and cheap for agents to load**.