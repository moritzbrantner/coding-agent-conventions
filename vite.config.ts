import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isAccountSite = repositoryName?.endsWith(".github.io") ?? false;
const githubPagesBase =
  process.env.GITHUB_ACTIONS === "true" && repositoryName && !isAccountSite
    ? `/${repositoryName}/`
    : "/";

export default defineConfig({
  base: process.env.SITE_BASE ?? githubPagesBase,
  plugins: [react()],
});
