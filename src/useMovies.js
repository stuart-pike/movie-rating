import { useState, useEffect } from "react";
import { HTTP_STATUS_MESSAGES } from "./Http";

// API key
const KEY = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //callback?.();
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

    fetchMovies();

    // each time there is a new key stroke the following clean function runs terminating the last search
    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, loading, error };
}
