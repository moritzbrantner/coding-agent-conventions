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

  rust/                       # RUST-*
    performance/              # performance-sensitive Rust specialization

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

TanStack Query, React Hook Form, Zustand, React Testing Library, and Next.js are sibling specializations of the React scope. A project may apply several sibling branches at once.

Rust performance conventions similarly specialize the Rust scope and compose it with the independent benchmarking conventions through the registry.

PostgreSQL similarly inherits database-wide conventions, and Dockerfile conventions inherit Docker-wide conventions.

This tree represents the engineering stack documented by this repository; it is not intended as a universal taxonomy of what each ecosystem technically supports.

## Placement rule

Put a rule at the highest scope where it is true. Do not duplicate a broader rule in a child directory.

- TypeScript rules stay under `typescript/`.
- React adds only React-specific rules.
- React libraries/frameworks add only rules specific to that library/framework.
- Rust performance rules add only decisions specific to performance-sensitive Rust code; general benchmark policy stays under `conventions/benchmarking/`.
- General database rules stay under `databases/`; PostgreSQL adds only engine-specific rules.
- Docker-wide rules stay under `docker/`; Dockerfile authoring rules go under `docker/dockerfile/`.
- Orthogonal tooling such as Vite stays outside the React inheritance path.

Orthogonal technologies should remain separate branches and be composed with profiles rather than forced into an artificial parent/child relationship.

Docker Compose development/test orchestration remains a general environment concern under `ENV-002`, while Dockerfile authoring belongs in the Docker technology tree.

Add new rules to the README in their narrowest applicable scope. When rules conflict, use the specificity order defined by `REPO-002`.
