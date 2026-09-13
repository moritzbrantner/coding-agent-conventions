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
- `technologies/typescript/react/expo/`

Tooling decisions:

- `BUN-001`
- `EXPO-001`
- `technologies/tooling/playwright/` for the declared web E2E workflow

## Expo-specific conventions

Use the Expo technology branch only for decisions that are genuinely Expo-specific. Do not copy generic React, TypeScript, or benchmarking rules into it.

## Optional branches

React library branches apply only when the template actually includes those libraries. Do not preinstall state, form, data-fetching, or testing libraries solely because convention branches exist for them.

## Styling

Prefer colocated styling where practical. Do not claim the existing Tailwind CSS tooling rule applies to native Expo code until the chosen Expo styling approach is explicitly defined.

## Template intent

The generated project should contain one small vertical slice demonstrating the intended Expo project structure, navigation boundary, platform-aware code placement, and validation workflow without becoming a showcase application.
