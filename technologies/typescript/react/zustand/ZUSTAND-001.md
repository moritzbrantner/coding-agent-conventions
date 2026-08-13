# ZUSTAND-001 — Use Zustand for shared client values

**Status:** Accepted

Use Zustand when client-side values must be shared across distant React consumers. Prefer ordinary local React ownership when the value is only needed in a small subtree. Do not duplicate values already owned by another data-management layer.
