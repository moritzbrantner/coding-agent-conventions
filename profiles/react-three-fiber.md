# Profile — React Three Fiber

**Status:** Accepted  
**Purpose:** Compose the independent React and Three.js convention branches for projects that use React Three Fiber.

## Stack

- TypeScript
- React
- Three.js
- React Three Fiber

## Convention branches

- `technologies/typescript/`
- `technologies/typescript/react/`
- `technologies/typescript/react/react-three-fiber/`
- `technologies/typescript/threejs/`

The React Three Fiber path already inherits TypeScript and React rules. This profile additionally applies the sibling Three.js branch so scene architecture, GPU ownership, render cadence, and validation rules are not copied into the R3F documents.

## Conditional conventions

Apply framework-specific branches such as Next.js only when the consuming project uses them. Keep optional helpers such as `@react-three/drei`, postprocessing, physics, or WebGPU adapters project-specific.

Do not install Three.js, React Three Fiber, or a standard 3D dependency bundle merely because this profile exists.

## Profile rule

Use React for declarative scene composition and semantic application state, Three.js for renderer resources and frame-local state, and headless typed modules for reusable domain and geometry logic. Repository-specific rules may refine this ownership split according to `REPO-002`.
