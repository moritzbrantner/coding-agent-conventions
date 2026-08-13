# TS-004 — Use semicolons

**Status:** Accepted  
**Technology:** TypeScript

## Rule

Terminate TypeScript and JavaScript statements with semicolons.

## Rationale

A single formatting convention removes ambiguity and avoids style churn between humans and agents.

## Agent behavior

Preserve semicolon usage in edited files and do not introduce semicolon-free formatting.

## Preferred pattern

```ts
const value = calculate();
return value;
```

## Anti-pattern

```ts
const value = calculate()
return value
```

## Automatable check

Configure the repository formatter or linter to require semicolons, for example Prettier with `semi: true`.

## Exceptions and trade-offs

Generated or vendored code follows its generator or upstream formatting rules.
