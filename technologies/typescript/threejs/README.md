# Three.js conventions

Three.js is treated as a TypeScript rendering technology in this convention stack. These rules apply to imperative Three.js runtimes and to adapters such as React Three Fiber when the corresponding profile composes both branches.

## Accepted conventions

| ID | Convention |
|---|---|
| THREE-001 | [Keep scene semantics renderer-independent](THREE-001-renderer-independent-scene-semantics.md) |
| THREE-002 | [Make GPU resource ownership explicit](THREE-002-explicit-gpu-resource-ownership.md) |
| THREE-003 | [Match render cadence to scene behavior](THREE-003-workload-driven-render-cadence.md) |
| THREE-004 | [Validate pure scene logic before GPU integration](THREE-004-validate-pure-logic-before-gpu.md) |

React Three Fiber conventions live under [React](../react/react-three-fiber/) and are composed with this branch through the [React Three Fiber profile](../../../profiles/react-three-fiber.md).
