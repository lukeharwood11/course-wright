import {motion} from "framer-motion";
import React, {useContext} from "react";
import CourseEnrollmentPreviewButton from "./CourseEnrollmentPreviewButton";
import "react-contexify/ReactContexify.css"
import {Item, Menu, Submenu, useContextMenu} from "react-contexify";

const CourseEnrollmentPreview = ({ course, allOptions=false, edit=false }) => {

    return (
        <motion.div
            key={"course-students"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: 1}}
            exit={{opacity: 0, width: 0}}
            type={"text"}
            className={"course-enrollment drop-shadow-xl text-indigo-500  bg-white p-2 outline-0 flex flex-col gap-1"}>
            <h1 className={"text-xl"}>Members</h1>
            <ul>
                {
                    course && course.accounts.length > 0 &&
                    course.accounts.map((account, i) => {
                        return <CourseEnrollmentPreviewButton key={ i } account={ account } />
                    })
                }
            </ul>
            {
                edit &&
                <div className={"flex p-2 gap-2"}>
                    <motion.button
                        whileHover={{ scale: 1.1, borderRadius: 0 }}
                        className={"button text-gray-100 bg-indigo-500"}>Add Student</motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, borderRadius: 0 }}
                        className={"button bg-white shadow-lg"}>Add Teacher</motion.button>
                </div>
            }
        </motion.div>
    )
}

export default CourseEnrollmentPreview