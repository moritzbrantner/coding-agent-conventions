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

## Technology composition profiles

- [React Three Fiber](react-three-fiber.md) — composes the React, Three.js, and R3F convention branches without mandating optional 3D dependencies.

Repository-specific rules may refine a profile according to `REPO-002`.
