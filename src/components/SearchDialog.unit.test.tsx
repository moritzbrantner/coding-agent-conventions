// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getCopy } from "../app/copy";
import type { SearchResult } from "../app/search";
import { SearchDialog } from "./SearchDialog";

const result: SearchResult = {
  description: "Put durable, shareable view state in query parameters.",
  headingId: "react-003-put-important-navigational-state-in-url-query-parameters",
  id: "REACT-003",
  route: "/technologies/typescript/react/",
  score: 100,
  sourcePath: "technologies/typescript/react/README.md",
  title: "Put important navigational state in URL query parameters",
};

describe("SearchDialog", () => {
  it("exposes search results as keyboard-accessible options", async () => {
    const onNavigate = vi.fn();
    const user = userEvent.setup();

    render(
      <SearchDialog
        copy={getCopy("en")}
        isOpen
        onClose={vi.fn()}
        onNavigate={onNavigate}
        onQueryChange={vi.fn()}
        query="REACT-003"
        results={[result]}
      />,
    );

    const option = screen.getByRole("option", { name: /REACT-003/i });
    expect(option).toHaveAttribute("aria-selected", "true");

    await user.click(option);
    expect(onNavigate).toHaveBeenCalledWith(result);
  });
});
