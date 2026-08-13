# Technology conventions

Technology conventions contain stack-specific coding rules that are too narrow for the general `conventions/` catalog.

They still follow the same design goals: rules should be explicit, normative, mechanically discoverable, and automatable where practical.

## Structure

```text
technologies/
  typescript/
  react/
  nextjs/
  rust/
```

Each technology owns a stable ID prefix:

- TypeScript: `TS-*`
- React: `REACT-*`
- Next.js: `NEXT-*`
- Rust: `RUST-*`

Use [`../templates/technology-convention.md`](../templates/technology-convention.md) for new rules.

## Inheritance

Do not duplicate a broader rule in a more specific technology.

For example, a TypeScript rule used by React and Next.js belongs under `typescript/`, not in all three directories. React rules add React-specific behavior. Next.js rules add framework-specific behavior on top of the relevant TypeScript and React rules.

When rules conflict, use the specificity order defined by `REPO-002`.
