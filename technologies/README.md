# Technology conventions

Technology conventions contain stack-specific coding rules that are too narrow for the general `conventions/` catalog.

They follow the same design goals: rules should be explicit, normative, mechanically discoverable, and automatable where practical.

## Structure and inheritance

Directory nesting encodes convention inheritance when this repository intentionally treats one technology scope as a specialization of another:

```text
technologies/
  typescript/                 # TS-*
    react/                    # REACT-*
      nextjs/                 # NEXT-*
      tanstack-query/         # QUERY-*
      react-hook-form/        # RHF-*
      zustand/                # ZUSTAND-*
      testing-library/        # RTL-*
    vue/                      # VUE-*
      nuxt/                   # NUXT-*

  rust/                       # RUST-*

  databases/                  # DB-*
    postgres/                 # POSTGRES-*

  docker/                     # DOCKER-*
    dockerfile/               # DOCKERFILE-*

  tooling/
    vite/                     # VITE-*
```

For example, a Next.js project in this convention stack inherits rules by walking its path upward:

```text
Next.js -> React -> TypeScript -> general conventions -> principles
```

A Nuxt project follows the equivalent Vue path:

```text
Nuxt -> Vue -> TypeScript -> general conventions -> principles
```

TanStack Query, React Hook Form, Zustand, React Testing Library, and Next.js are sibling specializations of the React scope. Vue and React are sibling specializations of TypeScript, while Nuxt specializes Vue.

PostgreSQL similarly inherits database-wide conventions, and Dockerfile conventions inherit Docker-wide conventions.

This tree represents the engineering stack documented by this repository; it is not intended as a universal taxonomy of what each ecosystem technically supports.

## Placement rule

Put a rule at the highest scope where it is broadly true, but prefer discoverability over taxonomy purity when agents benefit from seeing the same short rule in a framework-local scope.

- TypeScript rules normally stay under `typescript/`.
- React and Vue add framework-specific rules and may repeat concise cross-framework defaults that are especially important to component work.
- React and Vue libraries/frameworks add their own rules and may repeat parent constraints when local discoverability is materially better.
- General database rules stay under `databases/`; PostgreSQL adds only engine-specific rules unless a repeated guardrail improves local clarity.
- Docker-wide rules stay under `docker/`; Dockerfile authoring rules go under `docker/dockerfile/`.
- Orthogonal tooling such as Vite stays outside the React/Vue inheritance paths.

When a rule is duplicated, keep the copies semantically aligned rather than creating subtly different versions of the same preference.

Orthogonal technologies should remain separate branches and be composed with profiles rather than forced into an artificial parent/child relationship.

Docker Compose development/test orchestration remains a general environment concern under `ENV-002`, while Dockerfile authoring belongs in the Docker technology tree.

Add new rules to the README in their narrowest useful scope. When rules conflict, use the specificity order defined by `REPO-002`.
