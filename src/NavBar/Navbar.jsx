import { ReactComponent as SearchIcon } from "./search.svg";
import { useRef } from "react";
import { useKey } from "../useKey";

export function NavbarLogo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Popcorn</h1>
    </div>
  );
}

export function Search({ query, setQuery, setSelectedId }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery(""); //Clear the search field
  });

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
        autoFocus
      />
      <SearchIcon />
    </div>
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
