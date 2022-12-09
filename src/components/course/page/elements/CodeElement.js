import React from 'react'
import Textarea from "react-expanding-textarea";
import {motion} from "framer-motion";
import CopyButton from "../../../CopyButton";

const CodeElement = ({section, onSave, onDelete, onChange}) => {
    const {text, editMode, id} = section

    const renderEditMode = () => {
        return (
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "anticipate", duration: .5}}
                    exit={{opacity: 0, scale: 0}}
                    className="w-full flex items-center flex-col">
                    <Textarea
                        onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault()
                                onChange(id, e)
                            }
                        }}
                        defaultValue={text} onChange={(event) => {
                        onChange(id, event)
                    }} className={`w-full p-4 code-area border-box resize-none mx-3 rounded-md bg-gray-400 border border-black`}/>
                    <div className={"flex justify-center align-center"}>
                        <button onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-min h-min rounded-md m-2 px-4 py-2 bg-red-300 text-white">Delete</button>
                        <button onClick={() => {
                            onSave(section.id, text.trim() !== "")
                        }} className="font-semibold border border-black transition-colors hover:bg-white hover:text-indigo-500 w-min h-min rounded-md m-2 px-4 py-2 bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white">Save</button>
                    </div>
                </motion.div>
        );
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text).catch((reason) => {console.log(reason)})
    }

    const renderViewMode = () => {
        return (
         <motion.div
             layout
             onClick={(e) => {
             onSave(id, false)
         }} className="flex justify-between mb-2 rounded-md p-3 bg-gray-500 w-full text-white">
             <pre>
                 <code>
                     {text}
                 </code>
             </pre>
             <CopyButton onClick={handleCopy} size={"2em"}/>
         </motion.div>);
    }

    return editMode ? renderEditMode() : renderViewMode()
}


export default CodeElement;
