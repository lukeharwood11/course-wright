import {motion} from "framer-motion";
import React from "react";
import CoursePreviewActionButton from "../../CoursePreviewActionButton";

const CoursePreviewActions = ({ actions }) => {
    return (
        <motion.div
            key={"course-structure"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: 1}}
            exit={{opacity: 0, width: 0}}
            className={"course-structure drop-shadow-xl text-indigo-500  bg-white p-2 outline-0"}>
            {
                actions && actions.map((a) => {
                    return <CoursePreviewActionButton key={a.text} onClick={a.action} disabled={a.disabled} icon={a.icon} text={a.text}/>
                })
            }

            { (!actions || actions.length === 0) && <h1 className={"text-center text-gray-300"}>No course actions available.</h1>}
        </motion.div>
    )
}

export default CoursePreviewActions