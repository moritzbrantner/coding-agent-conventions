import { cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const outputDirectory = join(repositoryRoot, "dist");
const routeRoots = ["principles", "conventions", "technologies", "profiles", "skills"];

async function findMarkdownFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findMarkdownFiles(path);
    return entry.isFile() && entry.name.endsWith(".md") && entry.name !== "AGENTS.md" ? [path] : [];
  }));
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

const sourceFiles = [
  join(repositoryRoot, "README.md"),
  ...(await Promise.all(routeRoots.map((root) => findMarkdownFiles(join(repositoryRoot, root))))).flat(),
];
const template = await readFile(join(outputDirectory, "index.html"), "utf8");
const routes = [];

for (const sourceFile of sourceFiles) {
  const sourcePath = relative(repositoryRoot, sourceFile);
  const route = sourcePathToRoute(sourcePath);
  routes.push(route);
  if (route === "/") continue;

  const source = await readFile(sourceFile, "utf8");
  const title = `${pageTitle(source)} · Coding Agent Conventions`;
  const html = template.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`,
  );
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

await cp(join(outputDirectory, "index.html"), join(outputDirectory, "404.html"));
await writeFile(join(outputDirectory, ".nojekyll"), "");
await writeFile(join(outputDirectory, "routes.json"), `${JSON.stringify(routes.sort(), null, 2)}\n`);

console.log(`Created ${routes.length} static catalog routes.`);
