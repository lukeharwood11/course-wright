import React, {useState} from "react";
import Textarea from "react-expanding-textarea";
import ReactMarkdown from 'react-markdown'
import {AnimatePresence, motion} from "framer-motion";
import {BsKey, BsListNested} from "react-icons/bs";
import {BiMessageAltDetail} from 'react-icons/bi'

const TextElement = ({onChange, onDelete, onSave, onTextTypeChange, section}) => {
    const {textType, editMode, text} = section

    const getTypeStyle = () => {

        if (textType === "instructions") {
            return "bg-gray-300 rounded-lg p-2"
        }

        if (textType === "key") {
            return "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white rounded-lg p-5"
        }
        return ""
    }

    const renderValue = (value, t) => {
        return t === textType ? value : ""
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "anticipate", duration: .5, layout: { duration: .2 } }}
            exit={{opacity: 0}}
            className="flex items-center flex-col w-full">

            {!editMode &&
                <motion.div
                layout
                transition={{layout: {duration: .2, ease: "linear"}}}
                className={`mt-3 mb-3 w-full ${getTypeStyle()} markdown`} onClick={() => onSave(section.id, false)}>
                <ReactMarkdown>{text}</ReactMarkdown>
            </motion.div> }
                {editMode &&
                    <>
                        <Textarea defaultValue={text} onChange={(event) => onChange(section.id, event)} className={`p-4 border-box resize-none mx-3 rounded-md bg-gray-100 ${renderValue("italic", "instructions")} w-full border border-black ${renderValue("font-bold bg-blue-100 text-indigo-500", "key")}`}/>
                        <motion.div
                            layout
                            className={"flex justify-between items-center"}>
                            <div>
                                <motion.button whileTap={{scale:.8}} whileHover={{scale: 1.2}} className={`rounded-lg w-30 mr-2 ${textType === "key" ? "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white" : "bg-white text-indigo-500"}`} onClick={(event) => onTextTypeChange(section.id, "key")} id="key" ><BsKey size={"2em"}/></motion.button>
                                <motion.button whileTap={{scale:.8}} whileHover={{scale: 1.2}} className={`rounded-lg w-30 mr-2 ${textType === "normal" ? "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white" : "bg-white text-indigo-500"}`} onClick={(event) => onTextTypeChange(section.id, "normal")} id="normal"><BiMessageAltDetail size={"2em"}/></motion.button>
                                <motion.button whileTap={{scale:.8}} whileHover={{scale: 1.2}} className={`rounded-lg w-30 mr-2 ${textType === "instructions" ? "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white" : "bg-white text-indigo-500"}`} onClick={(event) => onTextTypeChange(section.id, "instructions")} id="instructions"><BsListNested size={"2em"}/></motion.button>
                            </div>
                            <div>
                                <motion.button whileTap={{scale:.8}} onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-min h-min rounded-md m-2 px-4 py-2 bg-red-300 text-white">Delete</motion.button>
                                <motion.button whileTap={{scale:.8}} onClick={() => {
                                    onSave(section.id, text.trim() !== "")
                                }} className="font-semibold border border-black transition-colors hover:bg-white hover:text-indigo-500 w-min h-min rounded-md m-2 px-4 py-2 bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white">Save</motion.button>
                            </div>
                        </motion.div>
                    </>
                }
        </motion.div>
    );

}

export default TextElement;