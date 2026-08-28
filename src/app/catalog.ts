type MarkdownModules = Record<string, string>;

const markdownModules = import.meta.glob(
  [
    "../../README.md",
    "../../principles/**/*.md",
    "../../conventions/**/*.md",
    "../../technologies/**/*.md",
    "../../profiles/**/*.md",
    "../../skills/**/*.md",
    "!../../**/AGENTS.md",
  ],
  { eager: true, import: "default", query: "?raw" },
) as MarkdownModules;

export type Heading = {
  depth: number;
  id: string;
  text: string;
};

export type Rule = {
  body: string;
  headingId: string;
  id: string;
  title: string;
};

export type CatalogPage = {
  headings: Heading[];
  route: string;
  rules: Rule[];
  source: string;
  sourcePath: string;
  title: string;
};

export type NavigationNode = {
  children: NavigationNode[];
  label: string;
  page?: CatalogPage;
  route: string;
  segment: string;
};

const ruleHeadingPattern = /^([A-Z][A-Z0-9-]*-\d+)\s+(?:—|-)\s+(.+)$/;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sourcePathToRoute(sourcePath: string) {
  if (sourcePath === "README.md") return "/";

  const withoutExtension = sourcePath.replace(/\.md$/, "");
  const segments = withoutExtension.split("/");
  const filename = segments.at(-1)?.toLowerCase();

  if (filename === "readme" || filename === "skill") {
    segments.pop();
  }

  return `/${segments.join("/")}/`;
}

function normalizeModulePath(modulePath: string) {
  return modulePath.replace(/^\.\.\/\.\.\//, "");
}

function extractTitle(source: string, sourcePath: string) {
  const title = source.match(/^#\s+(.+)$/m)?.[1];
  return title ?? sourcePath.split("/").at(-2) ?? "Untitled";
}

function withoutFencedCodeBlocks(source: string) {
  let activeFence: string | undefined;

  return source
    .split("\n")
    .map((line) => {
      const fence = line.match(/^\s*(`{3,}|~{3,})/)?.[1];
      if (fence && !activeFence) {
        activeFence = fence[0];
        return "";
      }
      if (fence && activeFence === fence[0]) {
        activeFence = undefined;
        return "";
      }
      return activeFence ? "" : line;
    })
    .join("\n");
}

export function extractHeadings(source: string): Heading[] {
  return [...withoutFencedCodeBlocks(source).matchAll(/^(#{1,3})\s+(.+)$/gm)].map((match) => ({
    depth: match[1].length,
    id: slugify(match[2]),
    text: match[2].replace(/[`*_]/g, ""),
  }));
}

export function extractRules(source: string): Rule[] {
  const sections = withoutFencedCodeBlocks(source).split(/^##\s+/gm).slice(1);

  return sections.flatMap((section) => {
    const [rawHeading = "", ...bodyLines] = section.split("\n");
    const match = rawHeading.trim().match(ruleHeadingPattern);
    if (!match) return [];

    return [
      {
        body: bodyLines.join("\n").split(/^##?\s+/m)[0].trim(),
        headingId: slugify(rawHeading),
        id: match[1],
        title: match[2].replace(/[`*_]/g, ""),
      },
    ];
  });
}

export function createCatalog(modules: MarkdownModules): CatalogPage[] {
  return Object.entries(modules)
    .map(([modulePath, source]) => {
      const sourcePath = normalizeModulePath(modulePath);
      return {
        headings: extractHeadings(source),
        route: sourcePathToRoute(sourcePath),
        rules: extractRules(source),
        source,
        sourcePath,
        title: extractTitle(source, sourcePath),
      } satisfies CatalogPage;
    })
    .sort((left, right) => left.route.localeCompare(right.route));
}

function labelFromSegment(segment: string) {
  const labels: Record<string, string> = {
    conventions: "Conventions",
    principles: "Principles",
    profiles: "Profiles",
    skills: "Skills",
    technologies: "Technologies",
    tooling: "Tooling",
    typescript: "TypeScript",
  };

  return (
    labels[segment] ??
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function navigationLabel(page: CatalogPage) {
  if (page.sourcePath === "conventions/scripts/README.md") return "Scripts";

  return page.title
    .replace(/^Profile\s+—\s+/i, "")
    .replace(/\s+conventions$/i, "")
    .replace(/^Technology conventions$/i, "Technologies");
}

export function createNavigation(pages: CatalogPage[]): NavigationNode[] {
  const roots: NavigationNode[] = [];

  for (const page of pages.filter((candidate) => candidate.route !== "/")) {
    const segments = page.route.split("/").filter(Boolean);
    let siblings = roots;
    let route = "/";

    segments.forEach((segment, index) => {
      route += `${segment}/`;
      let node = siblings.find((candidate) => candidate.segment === segment);

      if (!node) {
        node = {
          children: [],
          label: labelFromSegment(segment),
          route,
          segment,
        };
        siblings.push(node);
      }

      if (index === segments.length - 1) {
        node.page = page;
        node.label = navigationLabel(page);
      }

      siblings = node.children;
    });
  }

  const sortNodes = (nodes: NavigationNode[]) => {
    nodes.sort((left, right) => left.label.localeCompare(right.label));
    nodes.forEach((node) => sortNodes(node.children));
  };

  sortNodes(roots);
  return roots;
}

export const catalog = createCatalog(markdownModules);
export const navigation = createNavigation(catalog);

export function findNavigationNode(route: string, nodes = navigation): NavigationNode | undefined {
  for (const node of nodes) {
    if (node.route === route) return node;
    const child = findNavigationNode(route, node.children);
    if (child) return child;
  }
  return undefined;
}

export const catalogStats = {
  documents: catalog.length,
  rules: catalog.reduce((total, page) => total + page.rules.length, 0),
};
