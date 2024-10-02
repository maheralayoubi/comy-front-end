import { useMemo } from "react";

const useLocalStorage = () => {
  const getValue = (key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return value;
  };

  const setValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const clearAll = () => {
    localStorage.clear();
  };

  return useMemo(
    () => ({
      getValue,
      setValue,
      clearAll,
    }),
    [],
  );
};

export default useLocalStorage;
