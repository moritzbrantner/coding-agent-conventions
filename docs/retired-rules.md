# Retired rule IDs

Rule IDs are never reused. When a rule is removed because a broader or narrower rule becomes its single source of truth, keep the retired ID here so old references remain understandable.

| Retired ID | Replacement | Reason |
| --- | --- | --- |
| `AGENT-001` | `PRINCIPLE-001`, `REP-002` | Deterministic checks before judgment is already owned by the determinism principle and mechanization policy. |
| `AGENT-007` | `PRINCIPLE-003` | Cheap-to-expensive validation is the progressive-validation principle. |
| `AGENT-008` | `PRINCIPLE-003` | Revalidation after broader fixes is the progressive-validation principle. |
| `BENCH-011` | `BENCH-003` | Controlled wall-clock history is part of the existing blocking wall-clock evidence contract. |
| `TEST-002` | `PRINCIPLE-003` | Bottom-up validation duplicated the general progressive-validation policy. |
| `TEST-018` | `TEST-006` | The verification-path guidance is now part of the stable public behavior seam rule. |
| `REPO-003` | `TEMPLATE-001`, `TEMPLATE-005` | Executable template defaults belong to the template-authoring scope. |
| `REPO-004` | `TEMPLATE-003` | Fresh-instance validation belongs to the template-authoring scope. |
| `REPO-005` | `TEMPLATE-006` | The thin vertical slice belongs to the template-authoring scope. |
| `REPO-006` | `TEMPLATE-002` | Template dogfooding belongs to the template-authoring scope. |
| `REPO-007` | `TEMPLATE-005` | Avoiding speculative template architecture belongs to the template-authoring scope. |
| `REPO-008` | `TEMPLATE-004` | Canonical template validation belongs to the template-authoring scope. |
| `REACT-006` | `DESIGN-001`, `DESIGN-002` | Structural clarity and ownership boundaries are general module/seam design concerns rather than React-specific policy. |

Retirement removes a rule from active profiles and generated rule catalogs. It does not make the ID available for a new rule.
