import {useEffect, useState} from "react";

const useChangeHandler = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const [valueObj, setValueObj] = useState(initialValue)
    const [changeDetected, setChangeDetected] = useState(false)
    useEffect(() => {
        setChangeDetected(false)
    }, [value])

    useEffect(() => {
        setChangeDetected(true)
    }, [valueObj])
    return [value, valueObj, setValue, setValueObj, changeDetected, setChangeDetected]
}

export default useChangeHandler;