import { describe, expect, it } from "vitest";
import type { CatalogPage } from "./catalog";
import { searchCatalog } from "./search";

const page: CatalogPage = {
  headings: [],
  route: "/technologies/typescript/react/",
  rules: [
    {
      body: "Put durable, shareable view state in query parameters.",
      headingId: "react-003-put-important-navigational-state-in-url-query-parameters",
      id: "REACT-003",
      title: "Put important navigational state in URL query parameters",
    },
    {
      body: "Own state in the smallest subtree that needs it.",
      headingId: "react-002-keep-react-state-local-by-default",
      id: "REACT-002",
      title: "Keep React state local by default",
    },
  ],
  source: "# React conventions",
  sourcePath: "technologies/typescript/react/README.md",
  title: "React conventions",
};

describe("searchCatalog", () => {
  it("finds a rule by exact ID and ranks it first", () => {
    expect(searchCatalog([page], "REACT-003")[0]).toMatchObject({ id: "REACT-003" });
  });

  it("finds a rule by words from its body", () => {
    expect(searchCatalog([page], "shareable query")).toEqual([
      expect.objectContaining({ id: "REACT-003", route: page.route }),
    ]);
  });

  it("returns no results unless every query term matches", () => {
    expect(searchCatalog([page], "shareable database")).toEqual([]);
  });

  it("does not return example rules from fenced code blocks", () => {
    const guide = {
      ...page,
      route: "/",
      rules: [],
      source: "# Guide\n\n```md\n## REACT-003 — Example only\n```",
      sourcePath: "README.md",
      title: "Guide",
    };

    expect(searchCatalog([guide], "REACT-003")).toEqual([]);
  });
});
