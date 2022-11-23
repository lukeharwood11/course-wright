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

    const updateCourse = (course) => {
        setCourses((prevState) => {
            let c = [...prevState]
            c = c.map((c) => {
                if (c.id === course.id) {
                    if (course.id === "new") course.id = "awaiting-id"
                    return course
                }
                return c
            })
            return c
        })
    }

    const deleteCourse = (course) => {
        setCourses((prevState) => {
            const courses = [...prevState]
            return courses.filter((c) => c.id !== course.id)
        })
    }

    const setSelectedCourse = (course) => {
        if (change) {
            toast("Unsaved changes.\nPlease save/cancel.")
        } else {
            setCourse(course)
        }
    }

    const [change, setChange] = useState(false)
    const [selectedCourse, setCourse] = useState(-1)
    const [courses, setCourses] = useState([])
    const [mode, setMode] = useMemoryState(dashboardModes.MESSAGE)

    return (
        <DashboardContext.Provider
            value={{addCourse, updateCourse, deleteCourse, change, setChange, selectedCourse, setSelectedCourse, mode, setMode, courses, setCourses}}>
            {children}
        </DashboardContext.Provider>
    );
}

export default DashboardContextProvider;