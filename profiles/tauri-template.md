# Profile — tauri-template

**Status:** Accepted  
**Extends:** `template-base`

## Stack

- TypeScript
- React
- Rust
- Tauri
- Bun
- Tailwind CSS where practical for the web UI

## Convention branches

Frontend:

- `technologies/typescript/`
- `technologies/typescript/react/`

Native/backend:

- `technologies/rust/`

Tooling decisions:

- `BUN-001`
- `TAILWIND-001` for the web UI where practical

React and Rust are independent branches composed by this profile. Neither is nested under the other.

## Tauri-specific conventions

Tauri identifies the integration boundary of this profile, but no Tauri-specific convention branch is defined yet. Add one when real cross-boundary decisions emerge, for example command boundaries, serialization, permissions, or ownership between frontend and Rust.

## Optional React branches

Apply React library branches only when the template actually includes those libraries. Do not add them speculatively.

## Template intent

The generated project should contain one small vertical slice crossing the React-to-Rust boundary so the intended placement, command boundary, error flow, and validation strategy are visible in executable code.
