import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // The useState hook uses a lazy initializer function to read the value from local storage only once during the initial render.
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    // The 'value' state is set to the parsed local storage value if it exists, or to the initial state otherwise.
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  // syncronize the 'watched' state with local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
}
// [value, setValue] are destructured in App as [watched, setWatched]
