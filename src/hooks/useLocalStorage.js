
const useLocalStorage = () => {

    const getValue = (key) => {
        const value = localStorage.getItem(key)
        if (!value) return ""
        return value
    }

    const setValue = (key, value) => {
        localStorage.setItem(key, value)
    }

    const clearAll = () => {
        localStorage.clear()
    }


    return [getValue, setValue, clearAll]
}

export default useLocalStorage