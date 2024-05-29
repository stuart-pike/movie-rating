import { useState } from "react";

import { NavbarLogo, Search, NumResults } from "./NavBar/Navbar";
import { MovieList } from "./MovieList/MovieList";
import { MovieDetails } from "./MovieDetails/MovieDetails";
import Spinner from "./spinner/spinner.component";
import { WatchedSummary } from "./WatchedSummary/WatchedSummary";
import { WatchedList } from "./WatchedList/WatchedList";
import { Button } from "./Button/Button";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // custom hooks
  const { movies, loading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <NavbarLogo />
        <Search
          query={query}
          setQuery={setQuery}
          setSelectedId={setSelectedId}
        />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <p>😣</p>
      {message}
    </div>
  );
}

function Navbar({ children }) {
  return (
    <>
      <nav className="nav-bar">{children}</nav>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} onIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}
