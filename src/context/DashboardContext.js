import React, {createContext, useMemo, useState} from "react";
import useMemoryState from "../hooks/useMemoryState";
import { dashboardModes } from "../constants";
import toast from "react-hot-toast";

export const DashboardContext = createContext({})

const DashboardContextProvider = ({ children }) => {

    const addCourse = (course) => {
        setCourses((prevState) => {
            const c = [...prevState]
            if (c.filter((i) => i.id === "new").length > 0) {
                toast.error("Finish your course...")
                return prevState
            }
            c.push(course)
            setSelectedCourse(prevState.length)
            return c
        })
    }

    const [selectedCourse, setSelectedCourse] = useState(-1)
    const [courses, setCourses] = useState([])
    const [mode, setMode] = useMemoryState(dashboardModes.MESSAGE)

    return (
        <DashboardContext.Provider
            value={{addCourse, selectedCourse, setSelectedCourse, mode, setMode, courses, setCourses}}>
            {children}
        </DashboardContext.Provider>
    );
}

export default DashboardContextProvider;