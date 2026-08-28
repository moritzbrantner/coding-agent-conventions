import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { catalog, findNavigationNode } from "./catalog";
import { getCopy, locales, type Locale } from "./copy";
import { searchCatalog, type SearchResult } from "./search";
import { DocumentPage } from "../components/DocumentPage";
import { DirectoryPage } from "../components/DirectoryPage";
import { Header, type Theme } from "../components/Header";
import { SearchDialog } from "../components/SearchDialog";
import { Sidebar } from "../components/Sidebar";

function normalizeRoute(pathname: string) {
  return pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
}

function isLocale(value: string | null): value is Locale {
  return locales.some((locale) => locale === value);
}

function getInitialLocale(): Locale {
  const storedLocale = window.localStorage.getItem("catalog-locale");
  if (isLocale(storedLocale)) return storedLocale;
  const browserLocale = window.navigator.language.slice(0, 2);
  return isLocale(browserLocale) ? browserLocale : "en";
}

function getInitialTheme(): Theme {
  const storedTheme = window.localStorage.getItem("catalog-theme");
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : "system";
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(query));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const copy = getCopy(locale);
  const route = normalizeRoute(location.pathname);
  const page = catalog.find((candidate) => candidate.route === route);
  const directory = page ? undefined : findNavigationNode(route);
  const results = useMemo(() => searchCatalog(catalog, query), [query]);

  useEffect(() => {
    window.localStorage.setItem("catalog-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem("catalog-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.title = page
      ? `${page.title} · Coding Agent Conventions`
      : directory
        ? `${directory.label} · Coding Agent Conventions`
        : "Not found · Coding Agent Conventions";
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      } else {
        window.scrollTo({ top: 0 });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [directory, location.hash, location.pathname, page]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const searchShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slashShortcut = event.key === "/" && !isTypingTarget(event.target);
      if (searchShortcut || slashShortcut) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateQuery = (nextQuery: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextQuery) nextParams.set("q", nextQuery);
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    updateQuery("");
  };

  const navigateToResult = (result: SearchResult) => {
    setIsSearchOpen(false);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    const hash = result.headingId ? `#${result.headingId}` : "";
    navigate({ pathname: result.route, hash, search: nextParams.toString() });
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header
        copy={copy}
        locale={locale}
        onLocaleChange={setLocale}
        onMenuOpen={() => setIsSidebarOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onThemeChange={setTheme}
        theme={theme}
      />
      <Sidebar copy={copy} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {page ? (
        <DocumentPage copy={copy} page={page} />
      ) : directory ? (
        <DirectoryPage copy={copy} node={directory} />
      ) : (
        <main className="not-found" id="main-content">
          <span>404</span>
          <h1>{copy.notFoundTitle}</h1>
          <p>{copy.notFoundDescription}</p>
          <Link to="/">{copy.returnOverview}</Link>
        </main>
      )}

      <SearchDialog
        copy={copy}
        isOpen={isSearchOpen}
        onClose={closeSearch}
        onNavigate={navigateToResult}
        onQueryChange={updateQuery}
        query={query}
        results={results}
      />
    </div>
  );
}
