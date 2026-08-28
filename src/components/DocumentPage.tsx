import { useMemo } from "react";
import { Link } from "react-router-dom";
import { catalog, type CatalogPage } from "../app/catalog";
import type { Copy } from "../app/copy";
import { renderMarkdown } from "../app/markdown";
import { ArrowIcon, GitHubIcon } from "./Icons";

type DocumentPageProps = {
  copy: Copy;
  page: CatalogPage;
};

function Breadcrumbs({ copy, page }: { copy: Copy; page: CatalogPage }) {
  const segments = page.route.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">{copy.catalog}</Link>
      {segments.map((segment, index) => {
        const route = `/${segments.slice(0, index + 1).join("/")}/`;
        const linkedPage = catalog.find((candidate) => candidate.route === route);
        const label = linkedPage?.title
          .replace(/\s+conventions$/i, "")
          .replace(/^Profile\s+—\s+/i, "") ?? segment;
        const isLast = index === segments.length - 1;

        return (
          <span key={route}>
            <span aria-hidden="true">/</span>
            {linkedPage && !isLast ? <Link to={route}>{label}</Link> : <span>{label}</span>}
          </span>
        );
      })}
    </nav>
  );
}

export function DocumentPage({ copy, page }: DocumentPageProps) {
  const html = useMemo(() => renderMarkdown(page.source, page.route), [page]);
  const pageIndex = catalog.findIndex((candidate) => candidate.route === page.route);
  const previousPage = pageIndex > 0 ? catalog[pageIndex - 1] : undefined;
  const nextPage = pageIndex < catalog.length - 1 ? catalog[pageIndex + 1] : undefined;
  const outline = page.headings.filter((heading) => heading.depth === 2);
  const editUrl = `https://github.com/moritzbrantner/coding-agent-conventions/edit/main/${page.sourcePath}`;

  return (
    <>
      <main className="document-shell" id="main-content">
        <div className="document-column">
          {page.route !== "/" && <Breadcrumbs copy={copy} page={page} />}

          <div className="document-meta">
            <span>{copy.source}: <code>{page.sourcePath}</code></span>
            {page.rules.length > 0 && <span className="rule-count">{page.rules.length} {copy.rules}</span>}
          </div>

          <article className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />

          <a className="edit-link" href={editUrl} target="_blank" rel="noreferrer">
            <GitHubIcon />
            {copy.edit}
          </a>

          <nav className="page-pagination" aria-label="Document pagination">
            {previousPage ? (
              <Link className="pagination-link pagination-previous" to={previousPage.route}>
                <ArrowIcon direction="left" />
                <span><small>{copy.previous}</small><strong>{previousPage.title}</strong></span>
              </Link>
            ) : <span />}
            {nextPage && (
              <Link className="pagination-link pagination-next" to={nextPage.route}>
                <span><small>{copy.next}</small><strong>{nextPage.title}</strong></span>
                <ArrowIcon />
              </Link>
            )}
          </nav>
        </div>

        {outline.length > 1 && (
          <aside className="page-outline" aria-label={copy.outline}>
            <span>{copy.outline}</span>
            <ul>
              {outline.map((heading) => (
                <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>
              ))}
            </ul>
          </aside>
        )}
      </main>
    </>
  );
}
