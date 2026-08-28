import type { Copy, Locale } from "../app/copy";
import { locales } from "../app/copy";
import { catalogStats } from "../app/catalog";
import { GitHubIcon, MenuIcon, SearchIcon } from "./Icons";

export type Theme = "system" | "light" | "dark";

type HeaderProps = {
  copy: Copy;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onMenuOpen: () => void;
  onSearchOpen: () => void;
  onThemeChange: (theme: Theme) => void;
  theme: Theme;
};

export function Header({
  copy,
  locale,
  onLocaleChange,
  onMenuOpen,
  onSearchOpen,
  onThemeChange,
  theme,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <button className="icon-button mobile-menu-button" onClick={onMenuOpen} aria-label={copy.menu}>
          <MenuIcon />
        </button>
        <a className="brand-mark" href={import.meta.env.BASE_URL} aria-label="Coding Agent Conventions home">
          <span>CA</span>
        </a>
        <div className="brand-copy">
          <a href={import.meta.env.BASE_URL}>Coding Agent Conventions</a>
          <span>{catalogStats.rules} {copy.rules} · {catalogStats.documents} {copy.documents}</span>
        </div>
      </div>

      <div className="header-actions">
        <button className="search-trigger" type="button" onClick={onSearchOpen}>
          <SearchIcon />
          <span>{copy.search}</span>
          <kbd>⌘ K</kbd>
        </button>

        <label className="compact-select">
          <span className="visually-hidden">{copy.language}</span>
          <select value={locale} onChange={(event) => onLocaleChange(event.target.value as Locale)}>
            {locales.map((value) => (
              <option key={value} value={value}>{value.toUpperCase()}</option>
            ))}
          </select>
        </label>

        <label className="compact-select theme-select">
          <span className="visually-hidden">{copy.theme}</span>
          <select value={theme} onChange={(event) => onThemeChange(event.target.value as Theme)}>
            <option value="system">◐ {copy.system}</option>
            <option value="light">☀ {copy.light}</option>
            <option value="dark">☾ {copy.dark}</option>
          </select>
        </label>

        <a
          className="icon-button github-link"
          href="https://github.com/moritzbrantner/coding-agent-conventions"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
        >
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
}
