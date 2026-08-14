# BENCH-001 — Benchmark named representative scenarios

**Status:** Accepted  
**Category:** Benchmarking

## Rule

Every benchmark must define a named representative scenario, workload fixture, measured unit, optimization direction, warm-up/sampling method, and relevant environment fingerprint.

## Rationale

A number without a stable scenario cannot be compared or used as an engineering goal. Explicit workload and units distinguish performance evidence from timing anecdotes.

## Agent behavior

1. Place focused benchmark code at the lowest owning scope, for example \`*.bench.ts\` or a Rust Criterion bench target.
2. Keep fixtures deterministic and representative of expected production scale.
3. Record unit and whether lower or higher is better.
4. Use harness-controlled warm-up and multiple samples.
5. Emit machine-readable results for automation.
6. Keep expensive benchmarks opt-in unless the repository explicitly promotes them to a gate.

## Example

A route resolver benchmark names the route-set size and reports operations per second. A parser benchmark names input size and reports time per operation.

## Exceptions and trade-offs

End-to-end latency and Lighthouse audits may live in dedicated tool folders but still inherit this scenario contract.

## Consequences

Benchmark results can be reproduced, compared, and interpreted by humans and agents.
