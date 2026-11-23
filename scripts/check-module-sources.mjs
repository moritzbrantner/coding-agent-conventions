// Consumers install every registry module source verbatim into `.conventions/` and run
// `git diff --check` and their formatter over it, so each source must already be clean.
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const registry = JSON.parse(await readFile(join(repositoryRoot, "registry/registry.json"), "utf8"));
const sources = [
  ...new Set(Object.values(registry.modules).flatMap((module) => module.sources)),
].sort();

const problems = [];
for (const source of sources) {
  const text = await readFile(join(repositoryRoot, source), "utf8");
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    if (/[ \t]$/.test(line)) problems.push(`${source}:${index + 1}: trailing whitespace`);
    if (line.endsWith("\r")) problems.push(`${source}:${index + 1}: carriage return`);
  });
  if (!text.endsWith("\n")) problems.push(`${source}: missing final newline`);
  else if (text.endsWith("\n\n")) problems.push(`${source}:${lines.length - 1}: blank line at EOF`);
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

// The formatter consumers run over the installed snapshot (`oxfmt --check .`), at its latest release.
const formatter = spawnSync("bunx", ["oxfmt@latest", "--check", ...sources], {
  cwd: repositoryRoot,
  stdio: "inherit",
});
if (formatter.error) throw formatter.error;
process.exit(formatter.status ?? 1);
