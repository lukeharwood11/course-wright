import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import TagsDisplay from "../../TagsDisplay";
import {BsFillSdCardFill} from "react-icons/bs";
import {FaBars} from 'react-icons/fa'
import useDashboardContext from "../../../hooks/useDashboardContext";
import CustomModal from "../../elements/CustomModal";
import toast from "react-hot-toast";
import {MdCancel} from "react-icons/md";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import useAxios from "../../../hooks/useAxios";
import CourseOptionsPanel from "./course-options/CourseOptionsPanel";
import CourseEnrollmentPreview from "./CourseEnrollmentPreview";

const CoursePreview = ({ }) => {
    const emptyCourse = { name: "", code: "", tags: [] }
    const [course, setCourse] = useState(undefined)
    const [courseObj, setCourseObj] = useState(emptyCourse)
    const { fullModal, fullModalContent, displayFullModal, handleCloseFullModal, lockCourseCreation, setLockCourseCreation, courses, selectedCourse, change, setChange, deleteCourse, updateCourse } = useDashboardContext()
    const axios = useAxios()

    useEffect(() => {
        let newCourse = selectedCourse.id ?
            (selectedCourse.type === "c" ? courses.find((c) => c.id === selectedCourse.id)
                : courses.find((c) => c.pcId === selectedCourse.id)) : undefined
        setCourse(newCourse)
    }, [selectedCourse, courses])

    const validateChanges = () => {
        // todo implement
        return true
    }

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
    }

    const handleCancelChanges = () => {
        setChange(false)
        if (courseObj.id === "new") deleteCourse(courseObj)
        setCourseObj({...course})
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

    return (
        <div className={course ? "preview" : "preview preview-empty"}>
                <AnimatePresence>

                    {
                        fullModal &&
                        <CustomModal handleClose={ handleCloseFullModal } key={"modal"}>
                            { fullModalContent }
                        </CustomModal>
                    }
                </AnimatePresence>
                {
                    course ?
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
                                            scale: change? 1.1: 1,
                                            x: change ? 3: 0
                                        }}
                                        disabled={!change}
                                        className={`right-button-pill drop-shadow-lg right-pill-button ${change ? "bg-purple-500" : "bg-gray-300"}`}>
                                        <MdCancel/>

                                    </motion.button>
                                </div>
                                <motion.button onClick={ () => displayFullModal(<CourseOptionsPanel course={ course }/>)} className={"button bg-white flex justify-center items-center drop-shadow-md"}>
                                    <FaBars size={15}/>
                                </motion.button>
                            </div>
                            <TagsDisplay tags={ courseObj.tags }
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
                            <motion.div
                                key={"course-structure"}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{ease: "backOut", duration: 1}}
                                exit={{opacity: 0, width: 0}}
                                type={"text"}
                                className={"course-structure drop-shadow-xl text-indigo-500  bg-white p-2 outline-0"}>
                            </motion.div>

                        <CourseEnrollmentPreview course={ course }/>
                        </>  : <motion.h3
                            key={"empty-tag"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{ease: "backOut", duration: 1}}
                            exit={{opacity: 0, width: 0}}
                            className={"text-2xl"}>Select a course to preview</motion.h3>
                }
        </div>
    );
}

export default CoursePreview;