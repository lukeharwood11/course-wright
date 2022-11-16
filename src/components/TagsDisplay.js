import {motion} from "framer-motion";
import React, {useRef, useState} from "react";
import CreatableSelect from "react-select/creatable";

const TagsDisplay = ({ tags }) => {

    const ref = useRef()
    const [text, setText] = useState("hi")
    const options = [
        { value:"stem", label:"stem", color: "#0000FF"},
        { value:"work", label:"work", color: "#FF00FF"},
        { value:"school", label:"school", color: "#FFFF00"}
    ]
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: 1}}
            exit={{opacity: 0, width: 0}}
            className={"course-tags"}
        >
            <CreatableSelect isMulti onvalue={options}/>
        </motion.div>
    );
}

export default TagsDisplay;