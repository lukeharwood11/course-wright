import React from "react";

const useMemoryState = (defaultValue, key) => {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.sessionStorage.getItem(key);
        return (stickyValue !== null || stickyValue === JSON.stringify(""))
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default useMemoryState;