import { Link, useLocation } from "react-router-dom";
import type { Copy } from "../app/copy";
import type { NavigationNode } from "../app/catalog";
import { navigation } from "../app/catalog";
import { CloseIcon } from "./Icons";

type SidebarProps = {
  copy: Copy;
  isOpen: boolean;
  onClose: () => void;
};

function normalizePath(pathname: string) {
  return pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
}

function NavigationBranch({
  depth,
  node,
  onNavigate,
  pathname,
}: {
  depth: number;
  node: NavigationNode;
  onNavigate: () => void;
  pathname: string;
}) {
  const isCurrent = normalizePath(pathname) === node.route;
  const isAncestor = pathname.startsWith(node.route);

  return (
    <li className={isAncestor ? "nav-branch nav-branch-active" : "nav-branch"}>
      {node.page ? (
        <Link
          aria-current={isCurrent ? "page" : undefined}
          className="nav-link"
          style={{ "--nav-depth": depth } as React.CSSProperties}
          to={node.route}
          onClick={onNavigate}
        >
          <span>{node.label}</span>
          {node.page.rules.length > 0 && <small>{node.page.rules.length}</small>}
        </Link>
      ) : depth === 0 ? (
        <Link
          aria-current={isCurrent ? "page" : undefined}
          className="nav-group nav-group-link"
          style={{ "--nav-depth": depth } as React.CSSProperties}
          to={node.route}
          onClick={onNavigate}
        >
          {node.label}
        </Link>
      ) : (
        <span className="nav-group" style={{ "--nav-depth": depth } as React.CSSProperties}>{node.label}</span>
      )}

      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <NavigationBranch
              depth={depth + 1}
              key={child.route}
              node={child}
              onNavigate={onNavigate}
              pathname={pathname}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar({ copy, isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && <button className="sidebar-scrim" aria-label={copy.close} onClick={onClose} />}
      <aside className={isOpen ? "sidebar sidebar-open" : "sidebar"} aria-label={copy.menu}>
        <div className="sidebar-mobile-heading">
          <span>{copy.menu}</span>
          <button className="icon-button" onClick={onClose} aria-label={copy.close}><CloseIcon /></button>
        </div>
        <nav>
          <Link
            className="nav-link nav-overview"
            aria-current={location.pathname === "/" ? "page" : undefined}
            to="/"
            onClick={onClose}
          >
            {copy.overview}
          </Link>
          <ul className="navigation-tree">
            {navigation.map((node) => (
              <NavigationBranch
                depth={0}
                key={node.route}
                node={node}
                onNavigate={onClose}
                pathname={location.pathname}
              />
            ))}
          </ul>
        </nav>
        <p className="sidebar-language-note">{copy.contentLanguage}</p>
      </aside>
    </>
  );
}
