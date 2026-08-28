import { useEffect, useRef, useState } from "react";
import type { Copy } from "../app/copy";
import type { SearchResult } from "../app/search";
import { CloseIcon, SearchIcon } from "./Icons";

type SearchDialogProps = {
  copy: Copy;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (result: SearchResult) => void;
  onQueryChange: (query: string) => void;
  query: string;
  results: SearchResult[];
};

function Highlight({ query, text }: { query: string; text: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return text;

  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    terms.some((term) => term.toLowerCase() === part.toLowerCase())
      ? <mark key={`${part}-${index}`}>{part}</mark>
      : part,
  );
}

export function SearchDialog({
  copy,
  isOpen,
  onClose,
  onNavigate,
  onQueryChange,
  query,
  results,
}: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => setActiveIndex(0), [query]);

  if (!isOpen) return null;

  const activeResult = results[activeIndex];

  return (
    <div className="search-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        aria-label={copy.search}
        aria-modal="true"
        className="search-dialog"
        role="dialog"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((index) => Math.min(index + 1, results.length - 1));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          }
          if (event.key === "Enter" && activeResult) onNavigate(activeResult);
        }}
      >
        <div className="search-input-row">
          <SearchIcon />
          <input
            ref={inputRef}
            aria-controls="search-results"
            aria-label={copy.search}
            autoComplete="off"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={copy.searchHint}
            type="search"
            value={query}
          />
          <button className="icon-button" onClick={onClose} aria-label={copy.close}><CloseIcon /></button>
        </div>

        <div className="search-results-header">
          {query ? <span>{results.length} {copy.results}</span> : <span>{copy.searchHint}</span>}
          <span className="search-key-hint">↑↓ {copy.navigate} · ↵ {copy.open}</span>
        </div>

        <div className="search-results" id="search-results" role="listbox">
          {query && results.length === 0 && <p className="empty-results">{copy.noResults}</p>}
          {results.map((result, index) => (
            <button
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "search-result search-result-active" : "search-result"}
              key={`${result.route}-${result.headingId ?? result.title}`}
              onClick={() => onNavigate(result)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              type="button"
            >
              <span className="search-result-copy">
                <span className="search-result-title">
                  {result.id && <code>{result.id}</code>}
                  <strong><Highlight query={query} text={result.title} /></strong>
                </span>
                <span className="search-result-description">{result.description}</span>
              </span>
              <span className="search-result-path">{result.sourcePath}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
