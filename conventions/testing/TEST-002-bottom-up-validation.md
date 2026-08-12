# TEST-002 — Validate tests bottom-up

**Status:** Accepted  
**Category:** Testing

## Rule

A coding agent must validate an affected change from the **narrowest relevant test scope to the broadest relevant test scope**.

The agent may advance to a broader level only after all affected narrower tests are green.

If production code changes while fixing a broader-scope failure, validation restarts at the narrowest affected scope.

## Rationale

Running the broadest suite immediately produces noisy and expensive feedback. Progressive validation localizes failures and gives their position in the hierarchy diagnostic meaning.

A failure in the narrowest test suggests a local implementation problem. A failure only at a broader level suggests an integration, contract, or system assumption problem.

## Agent behavior

```text
implement change
      |
      v
run narrowest affected tests
      |
      +-- fail --> modify --> rerun narrow tests
      |
      v
run parent-scope tests
      |
      +-- fail --> modify --> restart from narrowest affected tests
      |
      v
run next broader scope
      |
     ...
      |
      v
run system / E2E validation
      |
      v
done
```

Normative loop:

1. Identify the narrowest affected validation scope.
2. Run all tests at that scope.
3. Do not move upward while any test at the current or narrower affected scopes is failing.
4. Advance one scope level.
5. If a fix changes production code, restart from the narrowest scope affected by that new change.
6. Finish only after all required scopes are green.

## Example

```text
src/
  backend.test.ts

  orders/
    orders.test.ts

    pricing/
      calculate.ts
      calculate.test.ts
```

After changing `calculate.ts`:

```text
calculate.test.ts  -> green
orders.test.ts     -> green
backend.test.ts    -> green
DONE
```

If `orders.test.ts` fails and the agent modifies `calculate.ts`:

```text
calculate.test.ts  -> run again
orders.test.ts     -> run again
backend.test.ts    -> only after both are green
```

## Exceptions and trade-offs

Independent static checks such as formatting or type checking may run in parallel with the test ladder if they do not obscure the progressive test result.

CI may still execute suites in parallel for throughput. This convention primarily governs the **development feedback loop and agent decision process**, not necessarily the physical CI scheduler.

## Consequences

- Fast failures are surfaced first.
- Agents receive better-localized feedback.
- Expensive test suites run less often during iteration.
- The repository hierarchy becomes directly usable by an agent orchestrator.
