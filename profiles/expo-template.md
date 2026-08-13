# Profile — expo-template

**Status:** Accepted  
**Extends:** `template-base`

## Stack

- TypeScript
- React
- Expo
- Bun

## Convention branches

- `technologies/typescript/`
- `technologies/typescript/react/`

Tooling decision:

- `BUN-001`

## Expo-specific conventions

Expo identifies this profile's framework, but no Expo-specific convention branch is defined yet. Add one only when there are real Expo decisions worth documenting under `PRINCIPLE-005`.

Do not copy generic React or TypeScript rules into future Expo conventions.

## Optional branches

React library branches apply only when the template actually includes those libraries. Do not preinstall state, form, data-fetching, or testing libraries solely because convention branches exist for them.

## Styling

Prefer colocated styling where practical. Do not claim the existing Tailwind CSS tooling rule applies to native Expo code until the chosen Expo styling approach is explicitly defined.

## Template intent

The generated project should contain one small vertical slice demonstrating the intended Expo project structure, navigation boundary, platform-aware code placement, and validation workflow without becoming a showcase application.
