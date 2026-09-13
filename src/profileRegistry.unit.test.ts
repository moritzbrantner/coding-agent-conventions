import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import registry from "../registry/registry.json";

const profilesRoot = join(process.cwd(), "profiles");

function acceptedProfileIds(): string[] {
  return readdirSync(profilesRoot)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .filter((name) =>
      readFileSync(join(profilesRoot, name), "utf8").includes("**Status:** Accepted"),
    )
    .map((name) => basename(name, ".md"))
    .sort();
}

describe("convention profile registry", () => {
  it("registers every accepted human-readable profile", () => {
    const registeredProfiles = new Set(Object.keys(registry.profiles));

    expect(acceptedProfileIds().filter((id) => !registeredProfiles.has(id))).toEqual([]);
  });

  it("only composes registered modules", () => {
    const knownModules = new Set(Object.keys(registry.modules));
    const unknownReferences = Object.entries(registry.profiles).flatMap(([profile, modules]) =>
      modules
        .filter((moduleId) => !knownModules.has(moduleId))
        .map((moduleId) => `${profile}:${moduleId}`),
    );

    expect(unknownReferences).toEqual([]);
  });
});
