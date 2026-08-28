import { Link } from "react-router-dom";
import type { NavigationNode } from "../app/catalog";
import type { Copy } from "../app/copy";
import { ArrowIcon } from "./Icons";

export function DirectoryPage({ copy, node }: { copy: Copy; node: NavigationNode }) {
  return (
    <main className="directory-page" id="main-content">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">{copy.catalog}</Link>
        <span><span aria-hidden="true">/</span><span>{node.label}</span></span>
      </nav>
      <p className="directory-kicker">{copy.directory} · {node.children.length} {copy.entries}</p>
      <h1>{node.label}</h1>
      <p>{copy.hierarchyDescription}</p>
      <ul className="directory-list">
        {node.children.map((child) => (
          <li key={child.route}>
            <Link to={child.route}>
              <span>
                <strong>{child.label}</strong>
                <small>{child.page?.sourcePath ?? `${child.children.length} ${copy.entries}`}</small>
              </span>
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
