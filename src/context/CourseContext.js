import {createContext, useState} from "react";
import useChangeHandler from "../hooks/useChangeHandler";

export const CourseContext = createContext({})

const CourseContextProvider = ({ children }) => {
    const [
        course, courseObj,
        setCourse, setCourseObj,
        changeDetected, setChangeDetected
    ] = useChangeHandler({})

    const [focus, setFocus] = useState({})



    return (
        <CourseContext.Provider value={{
            focus, setFocus,
            course, courseObj, setCourse,
            setCourseObj, changeDetected, setChangeDetected
        }}>
            { children }
        </CourseContext.Provider>
    );
}

export default CourseContextProvider;