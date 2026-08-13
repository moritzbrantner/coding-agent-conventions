# BUN-001 — Use Bun as the default JavaScript toolchain

**Status:** Accepted  
**Technology:** Bun

## Rule

Use Bun as the default package manager, script runner, and JavaScript/TypeScript toolchain where the project and required tooling support it.

## Rationale

One default toolchain reduces duplicated lockfiles, command variants, and environment assumptions for humans and agents.

## Agent behavior

Prefer `bun install`, `bun run`, and `bunx`. Do not introduce npm, pnpm, yarn, or `npx` commands merely out of habit when an equivalent Bun workflow exists.

## Preferred pattern

```text
bun install
bun run test
bunx <tool>
```

## Anti-pattern

Mix package managers and produce multiple competing lockfiles in one repository.

## Automatable check

Commit the Bun lockfile and validate that repository scripts/documentation use the chosen package manager consistently.

## Exceptions and trade-offs

Use another runtime or package-manager command when a dependency, deployment environment, or framework integration genuinely requires it; document that exception locally.
