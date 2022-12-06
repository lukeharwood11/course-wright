import {motion} from "framer-motion";
import React from "react";

const AuthorsDisplay = ({ authors }) => {

    return (
        <motion.div
            key={"course-tags"}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: 1}}
            exit={{opacity: 0, width: 0}}
            type={"text"}
            className={"course-authors font drop-shadow-2xl text-indigo-500  rounded-full bg-white p-2 outline-0"}>
            {authors.map((tag) => <p className={"text-white course-button-tag bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500"}>{ tag }</p>)}
            <button
                key={"course-name"}
                type={"text"}
                className={"rounded-full font-sm drop-shadow-xl text-indigo-500  pl-1 pr-2 bg-white"}>
                Add Contributor
            </button>
        </motion.div>
    );
}

export default AuthorsDisplay;