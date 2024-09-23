import { useMemo } from 'react';

const useLocalStorage = () => {
    const getValue = (key) => {
        const value = localStorage.getItem(key);
        return value || "";
    };

    const setValue = (key, value) => {
        localStorage.setItem(key, value);
    };

    const clearAll = () => {
        localStorage.clear();
    };

    return useMemo(() => ({
        getValue,
        setValue,
        clearAll
    }), []);
};

export default useLocalStorage;