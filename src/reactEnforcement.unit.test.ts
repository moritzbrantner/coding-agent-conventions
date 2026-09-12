import { describe, expect, it } from "vitest";

import repositoryLintConfig from "../.oxlintrc.json";
import reactEffectConvention from "../technologies/typescript/react/REACT-004.json";

const effectRules = reactEffectConvention.enforcement.config.rules;

describe("React effect enforcement", () => {
  it("disables synchronous effect state linting in the shared convention", () => {
    // An explicit off prevents category defaults from re-enabling the rule.
    expect(effectRules["react/set-state-in-effect"]).toBe("off");
  });

  it("disables the same rule in the repository lint configuration", () => {
    expect(repositoryLintConfig.rules["react/set-state-in-effect"]).toBe("off");
  });

  it("preserves the separate derived-state and hook-order rules", () => {
    expect(effectRules["react/no-deriving-state-in-effects"]).toBe("error");
    expect(repositoryLintConfig.rules["react/rules-of-hooks"]).toBe("error");
  });
});
