import {createContext} from "react";
import useChangeHandler from "../hooks/useChangeHandler";

export const CourseContext = createContext({})

const CourseContextProvider = ({ children }) => {
    const [
        course, courseObj,
        setCourse, setCourseObj,
        changeDetected, setChangeDetected
    ] = useChangeHandler({})

    return (
        <CourseContext.Provider value={{
            course, courseObj, setCourse,
            setCourseObj, changeDetected, setChangeDetected
        }}>
            { children }
        </CourseContext.Provider>
    );
}

export default CourseContextProvider;