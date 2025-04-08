import { useMemo } from "react";

const useLocalStorage = () => {
  const getValue = (key) => {
    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  };

  const setValue = (key, value) => {
    try {
      const valueToStore = typeof value === 'function' ? value(getValue(key)) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
    }
  };

  const clearAll = () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
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