import Logo from "../Logo";
import {motion} from "framer-motion";
import React from "react";
import TagsDisplay from "../TagsDisplay";
import AuthorsDisplay from "../AuthorsDisplay";


const CoursePreview = ({ editActive }) => {

    const editMode = () =>  {
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
                        autoComplete={false}
                        placeholder={"Course Name"}
                        className={"course-name font drop-shadow-2xl text-blue-500  rounded-full bg-white p-2 outline-0"}/>
                    <motion.input
                        key={"course-code"}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{ease: "backOut", duration: 1}}
                        exit={{opacity: 0, width: 0}}
                        type={"text"}
                        placeholder={"Course Code"}
                        className={"course-code font drop-shadow-2xl text-blue-500  rounded-full bg-white p-2 outline-0"}/>
                    <motion.button className={"button course-save-button save-button bg-blue-500"}>Save Changes</motion.button>
                    <motion.button className={"button course-delete-button delete-button"}>Delete</motion.button>
                </div>
                <TagsDisplay tags={["educational", "stem", "comp-sci"]}/>
                <motion.div
                    key={"course-structure"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: "backOut", duration: 1}}
                    exit={{opacity: 0, width: 0}}
                    type={"text"}
                    className={"course-structure font drop-shadow-2xl text-blue-500  bg-white p-2 outline-0"}>
                </motion.div>

                <motion.div
                    key={"course-students"}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: "backOut", duration: 1}}
                    exit={{opacity: 0, width: 0}}
                    type={"text"}
                    className={"course-enrollment font drop-shadow-2xl text-blue-500  bg-white p-2 outline-0"}>
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