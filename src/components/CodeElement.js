import React from 'react'
import Textarea from "react-expanding-textarea";
import {motion} from "framer-motion";
import CopyButton from "./CopyButton";

const CodeElement = ({section, onSave, onDelete, onChange}) => {
    const {text, editMode, id} = section

    const renderEditMode = () => {
        return (
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}  transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}
                    className={"mb-2 flex flex-col w-full items-center justify-center"}>
                    <h1>Code Block</h1>
                    <Textarea
                        onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault()
                                onChange(id, e)
                            }
                        }}
                        defaultValue={text} onChange={(event) => {
                        onChange(id, event)
                    }} className={`p-4 code-area border-box resize-none mx-3 rounded-md bg-gray-400 w-3/4 border border-black`}/>
                    <div className={"flex justify-center align-center"}>
                        <button onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-min h-min rounded-md m-2 px-4 py-2 bg-red-300 text-white">Delete</button>
                        <button onClick={() => {
                            onSave(section.id, text.trim() !== "")
                        }} className="font-semibold border border-black transition-colors hover:bg-white hover:text-blue-500 w-min h-min rounded-md m-2 px-4 py-2 bg-blue-500 text-white">Save</button>
                    </div>
                </motion.div>
        );
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text).catch((reason) => {console.log(reason)})
    }

    const renderViewMode = () => {
        return (
         <div onClick={(e) => {
             onSave(id, false)
         }} className="flex justify-between mb-2 rounded-md p-3 bg-gray-500 w-full text-white">
             <pre>
                 <code>
                     {text}
                 </code>
             </pre>
             <CopyButton style="" onClick={handleCopy} size={"2em"}/>
         </div>);
    }

    return editMode ? renderEditMode() : renderViewMode()
}


export default CodeElement;
