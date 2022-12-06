import React, {createContext, useEffect, useMemo, useState} from "react";
import useMemoryState from "../hooks/useMemoryState";
import { dashboardModes } from "../constants";
import toast from "react-hot-toast";
import DashboardSaveChangesPopup from "../components/dashboard/DashboardSaveChangesPopup";
import useAuth from "../hooks/useAuth";

export const DashboardContext = createContext({})

const DashboardContextProvider = ({ children }) => {

    const { auth } = useAuth()
    const [change, setChange] = useState(false)
    const [selectedCourse, setCourse] = useState({})
    const [courses, setCourses] = useState([])
    const [mode, setMode] = useMemoryState(dashboardModes.MESSAGE)
    const [lockCourseCreation, setLockCourseCreation] = useState(false)
    const [fullModal, setFullModal] = useState(false)
    const [fullModalContent, setFullModalContent] = useState(<div></div>)
    const [fullModalFullHeight, setFullModalFullHeight] = useState(false)


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

    const addMember = (member, courseId, section=true) => {

    }


    const addNewSection = (course) => {
        const newCourse = {
            name: course.name,
            code: course.code,
            id: course.id,
            pcId: course.pcId,
            subject: course.subject,
            dateCreated: course.dateCreated,
            lastModified: course.lastModified,
            license: course.license,
            visibility: course.visibility,
            published: true,
            tags: course.tags,
            type: "pc",
            accounts: [{
                ...auth.user,
                role: 20, // teacher/creator of section
                status: "confirmed"
            }]
        }
        setCourses((prevState) => {
            const c = [...prevState]
            c.push(newCourse)
            if (!change) {
                setSelectedCourse(course.pcId, 'pc')
            }
            return c
        })
    }

    const updateCourse = (course) => {
        setCourses((prevState) => {
            let courseCopy = [...prevState]
            courseCopy = courseCopy.map((c) => {
                if (c.id === "new") {
                    return course
                } else if (c.id === course.id) {
                    // only update the fields that might have changed.
                    return {
                        ...c,
                        name: course.name,
                        code: course.code,
                        tags: course.tags,
                        accounts: course.accounts,
                        published: course.published
                    }
                }
                return c
            })
            return courseCopy
        })
    }

    const addRemoveEditor = (courseId, account, add=true) => {
        setCourses((prevState) => {
            let courseCopy = [...prevState]
            courseCopy = courseCopy.map((c) => {
                if (c.id === courseId) {
                    if (add) {
                        return {
                            ...c,
                            accounts: [...c, account]
                        }
                    } else {
                        return {
                            ...c,
                            accounts: c.accounts.filter(c => c.id !== account.id)
                        }
                    }

                }
                return c
            })
            return courseCopy
        })
    }


    const addRemoveAccount = (courseId, account, add=true) => {
        setCourses((prevState) => {
            let courseCopy = [...prevState]
            courseCopy = courseCopy.map((c) => {
                if (c.pcId === courseId) {
                    if (add) {
                        return {
                            ...c,
                            accounts: [...c.accounts, account]
                        }
                    } else {
                        return {
                            ...c,
                            accounts: c.accounts.filter(c => c.id !== account.id)
                        }
                    }

                }
                return c
            })
            return courseCopy
        })
    }

    const setPublished = (courseId, published) => {
        setCourses((prevState) => {
            let courseCopy = [...prevState]
            courseCopy = courseCopy.map((c) => {
                if (c.id === courseId) {
                    return {
                        ...c,
                        published
                    }
                }
                return c
            })
            return courseCopy
        })
    }

    const updateFields = (id, obj) => {
        setCourses((prevState) => {
            let courseCopy = [...prevState]
            courseCopy = courseCopy.map((c) => {
                if (c.id === id) {
                    // only update the fields that might have changed.
                    const newCourse = {
                        ...c,
                        ...obj
                    }
                    return newCourse
                }
                return c
            })
            return courseCopy
        })
    }

    // debug
    // useEffect(() => {
    //     console.log("courses:", courses)
    // }, [courses])

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
            displayFullModal(<DashboardSaveChangesPopup handleClose={ handleCloseFullModal }/>)
        } else {
            setCourse({ id, type })
        }
    }

    const displayFullModal = (content, fullHeight=false) => {
        setFullModalContent(content)
        setFullModalFullHeight(fullHeight)
        setFullModal(true)
    }

    const handleCloseFullModal = () => {
        setFullModal(false)
    }

    return (
        <DashboardContext.Provider
            value={{setPublished, addRemoveAccount, addRemoveEditor, updateFields, addNewSection, handleCloseFullModal, displayFullModal, fullModalFullHeight, fullModal, fullModalContent, lockCourseCreation, setLockCourseCreation, addCourse,
                updateCourse, deleteCourse, change, setChange, selectedCourse,
                setSelectedCourse, mode, setMode, courses, setCourses}}>
            {children}
        </DashboardContext.Provider>
    );
}

export default DashboardContextProvider;