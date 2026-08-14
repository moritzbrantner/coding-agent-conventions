# BENCH-002 — Compare candidates against versioned baselines

**Status:** Accepted  
**Category:** Benchmarking

## Rule

Performance gates must compare baseline and candidate results produced by the same harness on equivalent infrastructure. A regression fails only when it exceeds both a committed relative threshold and an absolute noise floor.

## Rationale

Absolute timings vary between machines, while relative-only thresholds overreact to tiny fast measurements. Dual thresholds and equivalent runners make the decision measurable without rewarding flaky gates.

## Agent behavior

1. Select an explicit Git baseline.
2. Run baseline and candidate with the same runtime, runner, workload, and sampling policy.
3. Store raw results and environment metadata.
4. Compare the declared central statistic and direction.
5. Fail only when relative and absolute thresholds are both exceeded.
6. Never replace the baseline automatically after a failure.
7. Change thresholds only with reviewed evidence.

## Example

A benchmark with a 10% regression threshold and a 2 ms noise floor fails when the candidate is 14% and 5 ms slower, but not when it is 14% and 0.2 ms slower.

## Exceptions and trade-offs

Exact deterministic measures such as bundle bytes may use a single absolute budget. Exploratory benchmarks may remain report-only but must label that status.

## Consequences

Benchmarks become stable regression controls and can be used by CI, coding agents, and Moonlight without conflating noise with product regressions.
