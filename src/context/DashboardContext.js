import React, {createContext, useEffect, useMemo, useState} from "react";
import useMemoryState from "../hooks/useMemoryState";
import { dashboardModes } from "../constants";
import toast from "react-hot-toast";

export const DashboardContext = createContext({})

const DashboardContextProvider = ({ children }) => {

    const [change, setChange] = useState(false)
    const [selectedCourse, setCourse] = useState({})
    const [courses, setCourses] = useState([])
    const [mode, setMode] = useMemoryState(dashboardModes.MESSAGE)
    const [lockCourseCreation, setLockCourseCreation] = useState(false)


    const addCourse = (course) => {
        setCourses((prevState) => {
            const c = [...prevState]
            if (lockCourseCreation) {
                return prevState
            }
            if (c.filter((i) => i.id === "new").length > 0) {
                toast.error("Finish your course...")
                return prevState
            }
            c.push(course)
            setSelectedCourse("new", "c")
            return c
        })
    }

    const updateCourse = (course) => {
        setCourses((prevState) => {
            let courseCopy = [...prevState]
            courseCopy = courseCopy.map((c) => {
                if (c.id === course.id || c.id === "new") {
                    return course
                }
                return c
            })
            return courseCopy
        })
    }

    const deleteCourse = (course) => {
        setCourses((prevState) => {
            const courses = [...prevState]
            const id = course.type === 'c' ? course.id : course.pcId
            return courses.filter((c) => c.id !== id)
        })
    }

    const setSelectedCourse = (id, type) => {
        if (selectedCourse.id === id && selectedCourse.type === type) return
        if (change) {
            toast("Unsaved changes.\nPlease save/cancel.")
        } else {
            setCourse({ id, type })
        }
    }

    return (
        <DashboardContext.Provider
            value={{lockCourseCreation, setLockCourseCreation, addCourse, updateCourse, deleteCourse, change, setChange, selectedCourse, setSelectedCourse, mode, setMode, courses, setCourses}}>
            {children}
        </DashboardContext.Provider>
    );
}

export default DashboardContextProvider;