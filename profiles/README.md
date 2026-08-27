# Convention profiles

Profiles compose independent convention branches without copying their rule text.

True inheritance stays encoded in the technology tree. Profiles are for combinations that span independent branches or define a reusable project stack.

## Template profiles

```text
template-base
   |
   +-- next-template
   +-- expo-template
   +-- tauri-template
```

- [template-base](template-base.md) — common conventions for template repositories.
- [next-template](next-template.md) — TypeScript, React, Next.js, Bun, and Tailwind CSS where practical.
- [expo-template](expo-template.md) — TypeScript, React, Expo, and Bun.
- [tauri-template](tauri-template.md) — TypeScript/React plus Rust/Tauri, Bun, and Tailwind CSS for the web UI where practical.

Repository-specific rules may refine a profile according to `REPO-002`.

## Library profiles

- [react-vite-library](react-vite-library.md) — reusable TypeScript/React libraries with their focused, Storybook, browser, and performance tooling.
- [react-ui-library](react-ui-library.md) — `react-vite-library` specialized for the `@moritzbrantner/ui` design-system package.

Machine-readable profile composition lives in `catalog.source.json`; `catalog.json` is its generated agent-facing profile index, while `convention-ids.json` is loaded only for stable refs or exceptions.
