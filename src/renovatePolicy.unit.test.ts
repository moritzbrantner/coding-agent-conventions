import { describe, expect, it } from "vitest";
import policy from "../default.json";

describe("shared Renovate merge policy", () => {
  it("requires owner approval and manual merging for every major manager", () => {
    expect(policy.major).toEqual({
      dependencyDashboardApproval: true,
      automerge: false,
    });
    expect(
      policy.packageRules.filter(
        (rule) =>
          (!rule.matchUpdateTypes || rule.matchUpdateTypes.includes("major")) &&
          (("automerge" in rule && rule.automerge === true) ||
            ("dependencyDashboardApproval" in rule && rule.dependencyDashboardApproval === false)),
      ),
    ).toEqual([]);
  });

  it("keeps ordinary updates eligible without opting unprotected consumers into native merging", () => {
    expect(policy.automerge).toBe(true);
    expect(policy.automergeType).toBe("pr");
    expect(policy.platformAutomerge).toBe(false);
    expect(policy.prConcurrentLimit).toBe(3);
    expect(policy.vulnerabilityAlerts.enabled).toBe(true);
  });
});
