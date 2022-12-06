import {motion} from "framer-motion";
import MaskedInput from "react-text-mask";
import {MdCancel} from "react-icons/md";
import CourseOptionsPanel from "./course-options/CourseOptionsPanel";
import {FaBars, FaEdit} from "react-icons/fa";
import TagsDisplayEdit, {TagsDisplayView} from "../../TagsDisplay";
import CoursePreviewActions from "./CoursePreviewActions";
import CourseEnrollmentPreview from "./CourseEnrollmentPreview";
import React, {useEffect, useState} from "react";
import useDashboardContext from "../../../hooks/useDashboardContext";
import toast from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

export const CoursePreviewEditView = ({ course, setEditMode }) => {

    // create a copy of course to edit/change
    const [courseObj, setCourseObj] = useState({ ...course })
    const { fullModal, fullModalContent, fullModalFullHeight, displayFullModal, handleCloseFullModal, lockCourseCreation, setLockCourseCreation, courses, selectedCourse, change, setChange, deleteCourse, updateCourse } = useDashboardContext()
    const axios = useAxios()

    const handleSaveChanges = () => {
        const id = toast.loading("Saving Course...")
        setChange(false)
        const controller = new AbortController()
        courseObj.code = courseObj.code.toUpperCase()
        if (courseObj.id === "new") {
            setLockCourseCreation(true)
            axios.post("/courses", {
                name: courseObj.name,
                code: courseObj.code,
                subject: "none",
                tags: courseObj.tags.map(t => t.label.toLowerCase())
            }, { signal: controller.signal }).then((r) => {
                courseObj.id = r.data.courseId
                updateCourse(courseObj)
                setCourseObj(course)
                toast.success("New Course Created!", { id })
            }).catch(err => {
                setChange(true)
                console.log(err)
                toast.error("An error occurred, try again later.", { id })
            }).finally(() => {
                setLockCourseCreation(false)
            })
        } else {
            axios.put(`/course/${courseObj.id}`, {
                name: courseObj.name,
                code: courseObj.code,
                subject: "none",
                tags: courseObj.tags.map(t => t.label.toLowerCase())
            }, { signal: controller.signal }).then((r) => {
                updateCourse(courseObj)
                setCourseObj(course)
                toast.success("Course Updated!", { id })
            }).catch(err => {
                setChange(true)
                console.log(err)
                toast.error("An error occurred, try again later.", { id })
            })
        }
        setEditMode()
    }

    const handleCancelChanges = () => {
        setChange(false)
        if (courseObj.id === "new") deleteCourse(courseObj)
        setCourseObj({...course})
        setEditMode()
    }

    useEffect(() => {
        setChange(false)
        if (course) {
            if (course.id === "new") setChange(true)
            setCourseObj({...course})
        } else {
            setCourseObj({})
        }
    }, [course])

    const validateChanges = () => {
        // todo implement
        return true
    }

    return (
        <>
            <div className={"course-meta-edit"}>
                <motion.input
                    onFocus={(e) => e.preventDefault()}
                    key={"course-name"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: "backOut", duration: 1}}
                    exit={{opacity: 0, width: 0}}
                    type={"text"}
                    value={ courseObj.name }
                    onChange={(e) => {
                        setChange(true)
                        setCourseObj((prevState) => {
                            return {
                                ...prevState,
                                name: e.target.value
                            }
                        })
                    }}
                    placeholder={"Course Name"}
                    className={"course-name font drop-shadow-2xl text-indigo-500  rounded-full bg-white p-2 outline-0"}/>
                <motion.div
                    key={"course-code"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: "backOut", duration: 1}}
                    exit={{opacity: 0, width: 0}}
                >
                    <MaskedInput
                        className={"course-code drop-shadow-2xl text-indigo-500  rounded-full bg-white p-2 outline-0"}
                        value={ courseObj.code }
                        placeholder={"Course Code"}
                        onChange={(e) => {
                            setChange(true)
                            setCourseObj((prevState) => {
                                return {
                                    ...prevState,
                                    code: e.target.value
                                }
                            })
                        }}
                        mask={[/[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /\d/, /\d/, /\d/]}
                    />
                </motion.div>
                <div className={"course-save-button"}>
                    <motion.button
                        disabled={!change}
                        onClick={ handleSaveChanges }
                        whileHover={{
                            scale: change? 1.1: 1,
                            x: change ? -10: 0
                        }}
                        className={`left-button-pill drop-shadow-lg left-pill-button ${change ? "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500" : "bg-gray-300"}`}>
                        Save Changes
                    </motion.button>
                    <motion.button
                        onClick={ handleCancelChanges }
                        whileHover={{
                            scale: 1.1,
                            x: 3
                        }}
                        className={`right-button-pill drop-shadow-lg right-pill-button bg-purple-500`}>
                        <MdCancel/>

                    </motion.button>
                </div>
                <motion.button onClick={ () => displayFullModal(<CourseOptionsPanel course={ course }/>, true)} className={"button bg-white flex justify-center items-center drop-shadow-md"}>
                    <FaBars size={15}/>
                </motion.button>
            </div>
            <TagsDisplayEdit tags={ courseObj.tags }
                             setTags={(tags) => {
                             setChange(true)
                             setCourseObj((prevState) => {
                                 return {
                                     ...prevState,
                                     tags: tags
                                 }
                             })
                         }
                         }/>


            <CoursePreviewActions />

            <CourseEnrollmentPreview allowScroll course={ course }/>
        </>
    )
}

export const CoursePreviewView = ({ course, setEditMode }) => {

    const { fullModal, fullModalContent, fullModalFullHeight, displayFullModal, handleCloseFullModal, lockCourseCreation, setLockCourseCreation, courses, selectedCourse, change, setChange, deleteCourse, updateCourse } = useDashboardContext()

    return (
        <>
            <div className={"course-meta-edit"}>
                <motion.h1
                    onFocus={(e) => e.preventDefault()}
                    key={"course-name"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: "backOut", duration: 1}}
                    exit={{opacity: 0, width: 0}}
                    placeholder={"Course Name"}
                    className={"course-name shadow-lg text-xl text-indigo-500 rounded-full bg-white p-2 outline-0"}> { course.name }</motion.h1>
                <motion.div
                    key={"course-code"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: "backOut", duration: 1}}
                    exit={{opacity: 0, width: 0}}
                    className={"flex justify-center items-center"}
                >
                    <h2
                        className={"course-code text-indigo-500 bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white rounded-full bg-white p-2 outline-0"}
                    >{ course.code }</h2>
                </motion.div>
                <div className={"course-save-button justify-end"}>
                    <motion.button onClick={setEditMode} className={"flex hover:text-indigo-500 text-black transition-colors gap-3 justify-center items-center"}> <FaEdit size={20}/></motion.button>
                </div>
                <motion.button onClick={ () => displayFullModal(<CourseOptionsPanel course={ course }/>, true)} className={"button bg-white flex justify-center items-center drop-shadow-md"}>
                    <FaBars size={15}/>
                </motion.button>
            </div>
            <TagsDisplayView tags={ course.tags }/>


            <CoursePreviewActions />

            <CourseEnrollmentPreview allowScroll course={ course }/>
        </>
    )
}