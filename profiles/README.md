# Convention profiles

Profiles compose existing convention families for common project stacks. They do not copy rule text.

A profile should answer which convention sets apply to a project, for example:

```text
Next.js + TypeScript
  -> general conventions
  -> TypeScript conventions
  -> React conventions
  -> Next.js conventions
```

Repository-specific rules may then refine or override the profile according to `REPO-002`.

Create concrete profiles only when the referenced technology convention sets contain real rules. Until then, technology directories act as the canonical place to collect those rules.
