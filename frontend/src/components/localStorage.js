import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? saved : defaultValue;
    return initial;
  }
}

export const useLocalStorage = (key, defaultValue) => {

  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
