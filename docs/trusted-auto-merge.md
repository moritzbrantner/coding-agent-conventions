# Trusted auto-merge policy

Automated merging is the payoff for deterministic verification. A repository may opt into unattended pull-request merging only after its merge eligibility can be established mechanically and fail closed.

## Rule

A pull request may be merged without a redundant human verification pass when the repository is in the **trusted auto-merge** tier and the pull request satisfies every current merge gate.

Green CI by itself is not sufficient for general pull requests. A repository must first earn the trusted tier.

Renovate dependency-update pull requests are a narrow exception: the shared Renovate policy may automerge them after Renovate observes successful repository checks. This exception does not graduate the repository to trusted auto-merge for human- or agent-authored pull requests.

## Trusted repository bar

A repository is trusted for auto-merge only when all of the following are true:

1. **Protected integration branch** — the target branch is protected by GitHub branch protection or an equivalent active ruleset. Direct pushes and administrative bypass are not part of the normal integration path.
2. **Deterministic validation contract** — the repository has a machine-readable `coding-tooling` validation contract with explicit required capabilities. Formatting, lint/static analysis, type or compile checks, build/package checks where applicable, and real tests are required rather than advisory.
3. **Hosted merge gate is authoritative** — every check needed for unattended integration runs against the pull-request head in hosted CI. Repositories whose authoritative gate depends on local-only source graphs, hardware, unpublished packages, or other unavailable evidence stay outside unattended auto-merge until that evidence is represented by a trustworthy merge gate.
4. **Required checks are actually required** — the protected branch requires the repository-owned validation checks. A pull request with zero attached checks is never considered green.
5. **Current GitHub status** — use GitHub's current required-check and mergeability state. A merge precondition may prevent a concurrent head change; it does not trigger another validation pass.
6. **No review blocker** — requested changes, unresolved blocking review threads, conflicts, or a non-mergeable GitHub state prevent automatic merge.
7. **No unresolved dependency ordering** — stacked pull requests, explicit `Depends on` / merge-order requirements, or other declared prerequisites are not merged ahead of their dependencies merely because GitHub reports them mergeable.
8. **No policy self-approval** — a pull request that changes its own merge-trust policy, required validation wiring, branch-protection expectations, or the automation that decides merge eligibility is not allowed to grant itself unattended eligibility. Those changes require the stronger integration path.
9. **No bypass** — automation never uses administrator privileges to bypass branch protection, reviews, checks, or repository-specific gates.

## Pull-request decision

For a trusted repository, automation may merge a pull request when it is open, ready for review, targets an allowed protected branch, is mergeable, has no dependency/review blocker, and GitHub reports the required checks successful. The automation may guard the merge against a concurrent head change without rerunning checks.

If any required fact cannot be established, the decision is **do not merge**. Missing evidence is not success.

## Relationship to `coding-tooling pr integrate`

`coding-tooling pr integrate` remains available when a repository explicitly needs local synthetic-merge verification. Ordinary hosted integration uses GitHub's required checks, mergeability, review gates, and no administrative bypass. Do not introduce another exact-head verification gate by default.

The goal is not to replace verification with optimism. The goal is to make verification strong enough that a human does not need to repeat it.

## Rollout

Repositories graduate individually for general unattended pull-request merging. Foundation/validation rollout can happen broadly, but general auto-merge is enabled only after the repository satisfies the trusted bar. Critical infrastructure and repositories with unusual release, hardware, local-source, or stacked-PR boundaries may deliberately remain on guarded/manual integration even when ordinary repositories have graduated.

Renovate is governed separately by the shared dependency-update policy. With tests required and platform-native automerge disabled, Renovate may merge its dependency-update pull requests only after it observes successful repository checks; major updates still require the configured explicit approval.

## Renovate merge latency and GitHub-native pilot

The shared `default.json` uses `platformAutomerge: false`. Renovate merges eligible PRs on a subsequent bot run; the inherited weekly schedule restricts **branch creation**, not automerging. The Mend-hosted app typically revisits inactive repositories roughly every three hours, and Renovate normally merges only one PR per base branch per run. See [issue #96](https://github.com/moritzbrantner/coding-agent-conventions/issues/96) for measured final-head CI-completion-to-merge delays across patch and digest updates. A PR's creation-to-merge time is not a measure of the post-CI delay.

Prefer a **per-repository GitHub-native pilot**, not a fleet-wide switch or another merge service. Before changing that repository's Renovate configuration:

1. A repository administrator verifies that the target branch has active branch protection or a ruleset with **named, meaningful required CI checks**. All required checks must run for PRs and block on missing, pending, or failing results. Require branches to be **up to date before merging**, so passing checks cannot be reused against an older base. Seeing successful optional checks in the PR is not proof that GitHub requires them. Preserve review protections and never configure a bypass.
2. The administrator enables **Settings → General → Pull Requests → Allow auto-merge** for the pilot repository.
3. Only after those gates are verified, override the shared setting in that repository's existing `renovate.json`:

   ```json
   {
     "extends": ["github>moritzbrantner/coding-agent-conventions"],
     "platformAutomerge": true,
     "rebaseWhen": "behind-base-branch"
   }
   ```

   Keep the inherited `prConcurrentLimit: 3` and `major.dependencyDashboardApproval: true`; do not enable `ignoreTests`, weaken branch protection, or override a repository-specific restriction. The shared default remains `platformAutomerge: false` for repositories not individually verified.

Validate the pilot on a **new** eligible patch or digest PR: record its final head, required-check completion time, auto-merge enrollment, and actual merge time. Also verify that a major without Dependency Dashboard approval, a failed or missing required check, and a review-blocked PR remain unmerged. Inability to observe any of those gates is a failed pilot, not evidence of safety. If the expected improvement is not measured, keep the issue open and revert that repository's override.

GitHub's required-check configuration is a repository-administrator responsibility when the connected integration cannot read branch-protection details. Changing `schedule` or `automergeSchedule` cannot make a completed PR merge between Renovate's own runs when `platformAutomerge` is disabled.
