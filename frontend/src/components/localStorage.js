import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    console.log("saved: ", saved);
    const initial = saved !== null ? saved : defaultValue;
    console.log(initial);
    return initial;
  }
}

export const useLocalStorage = (key, defaultValue) => {
  console.log(key, defaultValue);

  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, value);
  }, [key, value]);

  console.log(value, setValue);
  return [value, setValue];
};
