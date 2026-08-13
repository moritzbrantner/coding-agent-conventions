# Database conventions

This directory contains conventions that arise specifically from relational or other database technologies.

General database rules that are independent of a specific engine use the `DB-*` prefix and live directly in this directory. Engine-specific rules live in child scopes and inherit applicable database-wide rules.

Current child scopes:

```text
databases/
  postgres/   # POSTGRES-*
```

Do not place application ORM conventions here unless the rule is fundamentally a database rule. ORM- or framework-specific behavior should live at its own appropriate technology scope.
