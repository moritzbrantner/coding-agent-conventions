import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const outputDirectory = join(repositoryRoot, "dist");
const routeRoots = ["principles", "conventions", "technologies", "profiles", "skills"];
const pagesBaseUrl = "https://moritzbrantner.github.io/coding-agent-conventions/";

async function findMarkdownFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return findMarkdownFiles(path);
      return entry.isFile() && entry.name.endsWith(".md") && entry.name !== "AGENTS.md"
        ? [path]
        : [];
    }),
  );
  return files.flat();
}

function sourcePathToRoute(sourcePath) {
  if (sourcePath === "README.md") return "/";
  const segments = sourcePath.replace(/\.md$/, "").split("/");
  const filename = segments.at(-1)?.toLowerCase();
  if (filename === "readme" || filename === "skill") segments.pop();
  return `/${segments.join("/")}/`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageTitle(source) {
  return source.match(/^#\s+(.+)$/m)?.[1].replace(/[`*_]/g, "") ?? "Coding Agent Conventions";
}

function extractRules(source, sourcePath, modules) {
  const rules = [];
  const pattern = /^##\s+([A-Z][A-Z0-9]*-\d+)\s+[—-]\s+(.+)$/gm;
  for (const match of source.matchAll(pattern)) {
    rules.push({
      id: match[1],
      title: match[2].trim(),
      source: sourcePath,
      route: sourcePathToRoute(sourcePath),
      modules,
    });
  }
  return rules;
}

const sourceFiles = [
  join(repositoryRoot, "README.md"),
  ...(await Promise.all(routeRoots.map((root) => findMarkdownFiles(join(repositoryRoot, root))))).flat(),
];
const template = await readFile(join(outputDirectory, "index.html"), "utf8");
const registry = JSON.parse(await readFile(join(repositoryRoot, "registry", "registry.json"), "utf8"));
const sourceModules = new Map();
for (const [moduleName, module] of Object.entries(registry.modules ?? {})) {
  for (const source of module.sources ?? []) {
    const modules = sourceModules.get(source) ?? [];
    modules.push(moduleName);
    sourceModules.set(source, modules);
  }
}

const routes = [];
const rules = [];
for (const sourceFile of sourceFiles) {
  const sourcePath = relative(repositoryRoot, sourceFile).replaceAll("\\", "/");
  const route = sourcePathToRoute(sourcePath);
  routes.push(route);
  const source = await readFile(sourceFile, "utf8");
  rules.push(...extractRules(source, sourcePath, (sourceModules.get(sourcePath) ?? []).toSorted()));
  if (route === "/") continue;

  const title = `${pageTitle(source)} · Coding Agent Conventions`;
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  const destination = join(outputDirectory, route, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const documentRoutes = new Set(routes);
for (const route of [...documentRoutes]) {
  const segments = route.split("/").filter(Boolean);
  for (let depth = 1; depth < segments.length; depth += 1) {
    const directoryRoute = `/${segments.slice(0, depth).join("/")}/`;
    if (documentRoutes.has(directoryRoute)) continue;

    const label = segments[depth - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const html = template.replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(label)} · Coding Agent Conventions</title>`,
    );
    const destination = join(outputDirectory, directoryRoute, "index.html");
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, html);
    documentRoutes.add(directoryRoute);
    routes.push(directoryRoute);
  }
}

const sortedRoutes = routes.toSorted();
const sortedRules = rules.toSorted((left, right) => left.id.localeCompare(right.id));
const agentTool = {
  schemaVersion: 1,
  id: "coding-agent-conventions",
  kind: "static-policy-catalog",
  baseUrl: pagesBaseUrl,
  description: "Machine-readable shared engineering conventions for coding agents.",
  operations: [
    {
      id: "registry",
      transport: "static-json",
      href: `${pagesBaseUrl}registry.json`,
      description: "Installable modules, dependencies, profiles, assets, and generators.",
    },
    {
      id: "rules",
      transport: "static-json",
      href: `${pagesBaseUrl}rules.json`,
      description: "Stable convention rule IDs with titles, source paths, routes, and module ownership.",
    },
    {
      id: "routes",
      transport: "static-json",
      href: `${pagesBaseUrl}routes.json`,
      description: "Human-readable documentation routes available on GitHub Pages.",
    },
  ],
  localFallback: [
    "coding-tooling conventions init [module...] --json",
    "coding-tooling conventions add <module...> --json",
    "coding-tooling conventions check --json",
  ],
};

await cp(join(outputDirectory, "index.html"), join(outputDirectory, "404.html"));
await writeFile(join(outputDirectory, ".nojekyll"), "");
await writeFile(join(outputDirectory, "routes.json"), `${JSON.stringify(sortedRoutes, null, 2)}\n`);
await writeFile(join(outputDirectory, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
await writeFile(
  join(outputDirectory, "rules.json"),
  `${JSON.stringify({ schemaVersion: 1, rules: sortedRules }, null, 2)}\n`,
);
await writeFile(join(outputDirectory, "agent-tool.json"), `${JSON.stringify(agentTool, null, 2)}\n`);

console.log(`Created ${routes.length} static catalog routes and ${rules.length} machine-readable rules.`);
