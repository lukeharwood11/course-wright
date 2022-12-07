import {motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import CreatableSelect from "react-select/creatable";
import makeAnimated from 'react-select/animated';

export const TagsDisplayView = ({ tags }) => {
    return (
        <div className={"course-tags-container course-preview-container"}>
            {
                tags && tags.map(t => <h3 key={t.value} className={"text-xl course-button-tag font-bold bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 bg-clip-text bg-white text-transparent shadow-lg"}>{ t.value }</h3>)
            }
            {
                (!tags || tags.length === 0) && <h3 className={"text-gray-300 w-full text-center"}>No course tags.</h3>
            }
        </div>
    )
}

const TagsDisplayEdit = ({ tags, setTags }) => {
    const [input, setInput] = useState("")
    const animatedComponents = makeAnimated();

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: 1}}
            exit={{opacity: 0, width: 0}}
            className={"course-tags"}
        >
            <CreatableSelect
                components={animatedComponents}
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

export default TagsDisplayEdit;