import { describe, expect, it } from "vitest";

import registry from "../registry/registry.json";
import reactComponent from "../technologies/typescript/react/generators/react-component/generator.json";
import componentTemplate from "../technologies/typescript/react/generators/react-component/templates/Component.tsx.tmpl?raw";
import indexTemplate from "../technologies/typescript/react/generators/react-component/templates/index.ts.tmpl?raw";
import reactRules from "../technologies/typescript/react/README.md?raw";
import {
  type GeneratorDescriptor,
  type RegistryShape,
  validateGeneratorRegistry,
  validateTemplateExpressions,
} from "./registryValidation";

const descriptorPath =
  "technologies/typescript/react/generators/react-component/generator.json";
const descriptors = {
  [descriptorPath]: reactComponent as GeneratorDescriptor,
};
const knownReactRules = new Set(
  [...reactRules.matchAll(/^## (REACT-\d+) —/gm)].map((match) => match[1]!),
);

describe("generator registry", () => {
  it("registers the shared React component generator without contract errors", () => {
    expect(
      validateGeneratorRegistry(
        registry as unknown as RegistryShape,
        descriptors,
        knownReactRules,
      ),
    ).toEqual([]);

    expect(registry.modules.react.assets).toContain(descriptorPath);
    expect(registry.modules.react.generators).toEqual([
      { id: "react-component", path: descriptorPath },
    ]);
  });

  it("accepts only the closed interpolation syntax used by installed templates", () => {
    expect(validateTemplateExpressions(componentTemplate)).toEqual([]);
    expect(validateTemplateExpressions(indexTemplate)).toEqual([]);
    expect(validateTemplateExpressions("{{#each files}}{{name}}{{/each}}"))
      .toEqual([
        "unsupported-template-expression:#each files",
        "unsupported-template-expression:/each",
      ]);
  });

  it("rejects duplicate ids, invalid references, and composition cycles", () => {
    const invalidRegistry: RegistryShape = {
      modules: {
        first: {
          dependencies: ["missing"],
          generators: [
            { id: "one", path: "one.json" },
            { id: "one", path: "two.json" },
          ],
        },
      },
    };
    const invalidDescriptors: Record<string, GeneratorDescriptor> = {
      "one.json": {
        schemaVersion: 1,
        id: "one",
        rules: ["UNKNOWN-001"],
        technologies: [],
        compose: [{ generator: "one" }],
      },
      "two.json": {
        schemaVersion: 1,
        id: "two",
        rules: [],
        technologies: [],
        compose: [],
      },
    };

    expect(
      validateGeneratorRegistry(invalidRegistry, invalidDescriptors, new Set()),
    ).toEqual(
      expect.arrayContaining([
        "unknown-module-dependency:first:missing",
        "duplicate-generator-id:one",
        "generator-id-mismatch:one:two",
        "unknown-generator-rule:one:UNKNOWN-001",
        "generator-composition-cycle:one",
      ]),
    );
  });
});
