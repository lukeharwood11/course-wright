import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import TagsDisplay from "../TagsDisplay";
import {BsFillSdCardFill} from "react-icons/bs";
import {FaBars} from 'react-icons/fa'
import useDashboardContext from "../../hooks/useDashboardContext";
import Modal from "../elements/Modal";
import toast from "react-hot-toast";
import {MdCancel} from "react-icons/md";
import MaskedInput from "react-text-mask/dist/reactTextMask";


const CoursePreview = ({ editActive }) => {
    const [modal, setModal] = useState(false)
    const [courseObj, setCourseObj] = useState({})
    const { courses, selectedCourse, change, setChange, deleteCourse, updateCourse } = useDashboardContext()
    const course = selectedCourse >= 0 ? courses[selectedCourse] : undefined

    const validateChanges = () => {
        // todo implement
        return true
    }

    const handleSaveChanges = () => {
        const id = toast.loading("Saving Course...")
        if (courseObj.id === "new") {
            // todo post request, remove change status if failed.
       } else {
            // todo do something else, remove change status if failed
        }
        updateCourse(courseObj)
        setCourseObj(course)
        setChange(false)
        toast.success("Course Saved.", { id: id })
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

    const editMode = () =>  {
        return (
            <>
                <AnimatePresence>

                {
                    modal &&
                        <Modal handleClose={() => setModal(false)} key={"modal"}>

                        </Modal>
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
                                value={courseObj ? courseObj.name : ""}
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
                                    value={courseObj ? courseObj.code : ""}
                                    placeholder={"Code (XX-XXXX)"}
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
                                    className={`left-button-pill drop-shadow-lg save-button ${change ? "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500" : "bg-gray-300"}`}>
                                    Save Changes
                                </motion.button>
                                <motion.button
                                    onClick={ handleCancelChanges }
                                    whileHover={{
                                        scale: change? 1.1: 1,
                                        x: change ? 3: 0
                                    }}
                                    disabled={!change}
                                    className={`right-button-pill drop-shadow-lg cancel-button ${change ? "bg-purple-500" : "bg-gray-300"}`}>
                                    <MdCancel/>

                                </motion.button>
                            </div>
                            <motion.button onClick={() => setModal(true)} className={"button bg-white flex justify-center items-center drop-shadow-md"}>
                                <FaBars size={15}/>
                            </motion.button>
                        </div>
                        <TagsDisplay tags={["educational", "stem", "comp-sci"]}/>
                        <motion.div
                        key={"course-structure"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ease: "backOut", duration: 1}}
                        exit={{opacity: 0, width: 0}}
                        type={"text"}
                        className={"course-structure drop-shadow-xl text-indigo-500  bg-white p-2 outline-0"}>
                        </motion.div>

                        <motion.div
                        key={"course-students"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ease: "backOut", duration: 1}}
                        exit={{opacity: 0, width: 0}}
                        type={"text"}
                        className={"course-enrollment drop-shadow-xl text-indigo-500  bg-white p-2 outline-0"}>
                        </motion.div>
                    </>  : <motion.h3
                            key={"empty-tag"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{ease: "backOut", duration: 1}}
                            exit={{opacity: 0, width: 0}}
                            className={"text-2xl"}>Select a course to preview</motion.h3>
                }
            </>
        );
    }

    const viewMode = () => {
        return (
            <>

            </>
        )
    }

    return (
        <div className={course ? "preview" : "preview preview-empty"}>
            {editActive ? editMode() : viewMode()}
        </div>
    );
}

export default CoursePreview;