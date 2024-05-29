import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);
      // clean up event listener to prevent them from accumulating
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
