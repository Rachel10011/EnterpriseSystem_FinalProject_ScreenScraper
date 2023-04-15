import { useState, useEffect } from "react";

var key = "email";

// get current session if there is one
function getUserSession() {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || "";
}

// use the session in a page and set to browser storage
export const useSession = () => {
  const [value, setValue] = useState(() => {
    return getUserSession();
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, setValue]);

  return [value, setValue];
};
