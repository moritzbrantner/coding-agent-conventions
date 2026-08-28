import type { CatalogPage } from "./catalog";

export type SearchResult = {
  description: string;
  headingId?: string;
  id?: string;
  route: string;
  score: number;
  sourcePath: string;
  title: string;
};

function plainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[`*_#[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function withoutFencedCodeBlocks(markdown: string) {
  return markdown.replace(/(?:^|\n)\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\s*\1(?=\n|$)/g, "\n");
}

function excerpt(value: string, limit = 150) {
  const text = plainText(value);
  return text.length > limit ? `${text.slice(0, limit).trimEnd()}…` : text;
}

function scoreResult(queryTerms: string[], fields: string[]) {
  const normalizedFields = fields.map((field) => field.toLowerCase());
  if (!queryTerms.every((term) => normalizedFields.some((field) => field.includes(term)))) {
    return 0;
  }

  return queryTerms.reduce((score, term) => {
    if (normalizedFields[0] === term) return score + 100;
    if (normalizedFields[0].startsWith(term)) return score + 60;
    if (normalizedFields[1]?.includes(term)) return score + 30;
    if (normalizedFields.some((field) => field.includes(term))) return score + 10;
    return score;
  }, 0);
}

export function searchCatalog(pages: CatalogPage[], query: string): SearchResult[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results = pages.flatMap<SearchResult>((page) => {
    if (page.rules.length === 0) {
      const searchableSource = withoutFencedCodeBlocks(page.source);
      const score = scoreResult(terms, [page.title, page.sourcePath, searchableSource]);
      return score
        ? [
            {
              description: excerpt(searchableSource.replace(/^#\s+.+$/m, "")),
              route: page.route,
              score,
              sourcePath: page.sourcePath,
              title: page.title,
            },
          ]
        : [];
    }

    return page.rules.flatMap((rule) => {
      const score = scoreResult(terms, [rule.id, rule.title, rule.body, page.sourcePath]);
      return score
        ? [
            {
              description: excerpt(rule.body),
              headingId: rule.headingId,
              id: rule.id,
              route: page.route,
              score,
              sourcePath: page.sourcePath,
              title: rule.title,
            },
          ]
        : [];
    });
  });

  return results
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 40);
}
