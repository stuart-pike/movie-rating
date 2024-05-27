import { useState, useEffect } from "react";

import { NavbarLogo, Search, NumResults } from "./NavBar/Navbar";
import { MovieList } from "./MovieList/MovieList";
import { MovieDetails } from "./MovieDetails/MovieDetails";
import Spinner from "./spinner/spinner.component";
import { WatchedSummary } from "./WatchedSummary/WatchedSummary";
import { WatchedList } from "./WatchedList/WatchedList";
import { Button } from "./Button/Button";
import { HTTP_STATUS_MESSAGES } from "./Http";

// API key
const KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
  const [query, setQuery] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

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

  useEffect(() => {
    //abort search requests to avoid race conditions
    const controller = new AbortController();
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          let errorMessage = HTTP_STATUS_MESSAGES[response.status];
          throw new Error(errorMessage);
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("Movie not found!");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        //ignore error from controller abort
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    handleCloseMovie();
    fetchMovies();

    // each time there is a new key stroke the following clean function runs terminating the last search
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <NavbarLogo />
        <Search query={query} setQuery={setQuery} />
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
