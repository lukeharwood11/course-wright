import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import TagsDisplay from "../TagsDisplay";
import {FaBars} from 'react-icons/fa'
import useDashboardContext from "../../hooks/useDashboardContext";
import Modal from "../elements/Modal";


const CoursePreview = ({ editActive }) => {
    const [modal, setModal] = useState(false)
    const [change, setChange] = useState(false)
    const [courseObj, setCourseObj] = useState({})
    const { courses, selectedCourse } = useDashboardContext()
    const course = selectedCourse >= 0 ? courses[selectedCourse] : undefined

    const validateChanges = () => {
        // todo implement
        return true
    }

    useEffect(() => {
        setChange(false)
        if (course) {
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
                    <motion.input
                        key={"course-code"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ease: "backOut", duration: 1}}
                        exit={{opacity: 0, width: 0}}
                        type={"text"}
                        onChange={(e) => {
                            setChange(true)
                            setCourseObj((prevState) => {
                                return {
                                    ...prevState,
                                    code: e.target.value
                                }
                            })
                        }}
                        value={courseObj ? courseObj.code : ""}
                        placeholder={"Course Code"}
                        className={"course-code drop-shadow-2xl text-indigo-500  rounded-full bg-white p-2 outline-0"}/>
                    <motion.button
                        className={`button drop-shadow-lg course-save-button save-button ${change ? "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500" : "bg-gray-300"}`}>
                        Save Changes</motion.button>
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
        <div className={"preview"}>
            {editActive ? editMode() : viewMode()}
        </div>
    );
}

export default CoursePreview;