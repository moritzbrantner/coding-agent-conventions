import { Renderer, marked } from "marked";
import { slugify } from "./catalog";

function resolveCatalogLink(href: string, pageRoute: string) {
  if (/^(?:https?:\/\/|mailto:|#)/.test(href)) return href;

  const url = new URL(href, `https://catalog.local${pageRoute}`);
  const route = url.pathname
    .replace(/\/(?:README|SKILL)\.md$/i, "/")
    .replace(/\.md$/i, "/");
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${route}${url.hash}`;
}

export function renderMarkdown(source: string, pageRoute: string) {
  const renderer = new Renderer();

  renderer.heading = function ({ depth, text, tokens }) {
    const id = slugify(text);
    const content = this.parser.parseInline(tokens);
    return `<h${depth} id="${id}">${content}<a class="heading-anchor" href="#${id}" aria-label="Link to this heading">#</a></h${depth}>`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const content = this.parser.parseInline(tokens);
    const titleAttribute = title ? ` title="${title.replaceAll('"', "&quot;")}"` : "";
    const externalAttributes = /^https?:\/\//.test(href)
      ? ' target="_blank" rel="noreferrer"'
      : "";
    const resolvedHref = resolveCatalogLink(href, pageRoute);
    return `<a href="${resolvedHref}"${titleAttribute}${externalAttributes}>${content}</a>`;
  };

  return marked.parse(source, { async: false, gfm: true, renderer });
}
