# C# conventions

## CSHARP-001 — Order type members by kind, then accessibility

- Order member kinds as fields, constructors, finalizers, delegates, events, enums, interfaces, properties, indexers, operators/conversions, methods, structs, then classes/records.
- Within one member kind, order accessibility as public, internal, protected internal, protected, private protected, then private.
- Do not alphabetize members merely to satisfy this rule.
- Explicit interface implementations use the public ordering position.
- Generated source is outside this rule. Source containing conditional member declarations is not mechanically checked until active-branch-aware parsing is available.
- Deterministic enforcement: [`./CSHARP-001.json`](./CSHARP-001.json).

## CSHARP-002 — Use explicit blocks for control flow

- Use braces for `if`, `else`, `for`, `foreach`, `while`, `do`, `lock`, `fixed`, and statement-form `using` bodies.
- `else if` remains a canonical chain and does not require an extra wrapping block.
- `using` declarations such as `using var resource = ...;` are not statement bodies and are unaffected.
- Generated source is outside this rule. Source containing conditional compilation is not mechanically checked until active-branch-aware parsing is available.
- Deterministic enforcement: [`./CSHARP-002.json`](./CSHARP-002.json).
