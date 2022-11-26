import {motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import CreatableSelect from "react-select/creatable";

const TagsDisplay = ({ tags, setTags }) => {
    const [input, setInput] = useState("")

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: 1}}
            exit={{opacity: 0, width: 0}}
            className={"course-tags"}
        >
            <CreatableSelect
                placeholder={"Add tags"}
                inputValue={input}
                onInputChange={(value) => setInput(value)}
                value={ tags }
                onChange={ (value) => setTags([...value].map(v => {
                    return {
                        value: v.value, label: v.label
                    }
                })) }
                isMulti />
        </motion.div>
    );
}

export default TagsDisplay;