# Profile — next-template

**Status:** Accepted  
**Extends:** `template-base`

## Stack

- TypeScript
- React
- Next.js
- Bun
- Tailwind CSS where practical

## Convention branches

- `technologies/typescript/`
- `technologies/typescript/react/`
- `technologies/typescript/react/nextjs/`

Tooling decisions:

- `BUN-001`
- `TAILWIND-001`

## Optional branches

Apply these only if the template actually includes the library:

- `technologies/typescript/react/tanstack-query/`
- `technologies/typescript/react/react-hook-form/`
- `technologies/typescript/react/zustand/`
- `technologies/typescript/react/testing-library/`

Do not add a dependency merely because a convention branch exists.

## Template intent

The generated project should contain one small vertical slice that demonstrates the intended Next.js structure and placement conventions without becoming a demo application.
