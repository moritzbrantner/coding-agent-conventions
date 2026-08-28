import { describe, expect, it } from "vitest";
import { catalog, createCatalog, createNavigation, extractRules, sourcePathToRoute } from "./catalog";

describe("catalog", () => {
  it("maps source files to directory-style routes", () => {
    expect(sourcePathToRoute("README.md")).toBe("/");
    expect(sourcePathToRoute("technologies/typescript/react/README.md")).toBe("/technologies/typescript/react/");
    expect(sourcePathToRoute("profiles/next-template.md")).toBe("/profiles/next-template/");
    expect(sourcePathToRoute("skills/development-loop/SKILL.md")).toBe("/skills/development-loop/");
  });

  it("extracts stable rule IDs and their searchable body", () => {
    const rules = extractRules(`# Example\n\n## REACT-003 — Put navigational state in the URL\n\n- Store search in query parameters.\n\n## Notes\n\nMore text.`);

    expect(rules).toEqual([
      {
        body: "- Store search in query parameters.",
        headingId: "react-003-put-navigational-state-in-the-url",
        id: "REACT-003",
        title: "Put navigational state in the URL",
      },
    ]);
  });

  it("does not index example headings inside fenced code", () => {
    const source = "# Guide\n\n```md\n## EXAMPLE-001 — Not a catalog rule\n```";

    expect(extractRules(source)).toEqual([]);
  });

  it("derives nested navigation from the source hierarchy", () => {
    const pages = createCatalog({
      "../../technologies/README.md": "# Technology conventions",
      "../../technologies/typescript/README.md": "# TypeScript conventions",
      "../../technologies/typescript/react/README.md": "# React conventions",
    });
    const tree = createNavigation(pages);

    expect(tree[0].route).toBe("/technologies/");
    expect(tree[0].children[0].route).toBe("/technologies/typescript/");
    expect(tree[0].children[0].children[0].route).toBe("/technologies/typescript/react/");
  });

  it("loads the repository's convention documents", () => {
    expect(catalog.find((page) => page.route === "/conventions/interface-design/")?.rules)
      .toContainEqual(expect.objectContaining({ id: "UI-005" }));
  });
});
