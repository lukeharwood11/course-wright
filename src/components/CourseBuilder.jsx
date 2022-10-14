import React from 'react'
import TextElement from "./TextElement";
import VideoElement from "./VideoElement";
import CodeElement from "./CodeElement";
import {useStickyState} from '../utils/io'
import {BsYoutube, BsFillNodePlusFill, BsCodeSlash} from "react-icons/bs";
import {AnimatePresence, motion} from "framer-motion";

const CourseBuilder = () => {
    const [sections, setSections] = useStickyState([], "activeSections")
    const [id, setId] = useStickyState(-1, "builderIds")

    const handleDelete = (id) => {
        const newSections = sections.filter((section)=> section.id !== id)
        setSections(newSections)
    }

    const handleNewText = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId, type: "text", text: "", textType: "normal", editMode: true}])
    }

    const handleNewVideo = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId, type: "video", src: "", text: "", title: "", editMode: true}])
    }

    const handleNewCode = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId, type: "code", text: "", editMode: true}])
    }

    const handleSave = (id, exitEditMode) => {
        const s = [...sections]
        s.find(section => section.id === id).editMode = !exitEditMode
        setSections(s)
    }

    const handleChange = (id, event) => {
        const s = [...sections]
        const section = s.find(section => section.id === id)
        section.text = event.target.value
        setSections(s)
    }

    const handleTextTypeChanged = (id, textType) => {
        const s = [...sections]
        s.find(section => section.id === id).textType = textType
        setSections(s)
    }

    const handleVideoTitleChanged = (id, event) => {
        const s = [...sections]
        s.find(section => section.id === id).title = event.target.value
        setSections(s)
    }

    const handleVideoUrlChanged = (id, event) => {
        const s = [...sections]
        s.find(section => section.id === id).src = event.target.value
        setSections(s)
    }

    const handleSaveAll = () => {
        const s = [...sections]
        s.map((section) => {
            if ((section.type == "code" || section.type == "text") && section.text.trim() !== "") {
                section.editMode = false
            } else if (section.type == "video") {
                const {text, title, src} = section
                if (text.trim() !== "" || title.trim() !== "" || src.trim() !== "") {
                    section.editMode = false
                }
            }
        })
        setSections(s)
    }

    return (
        <motion.div className="p-3 mt-3 rounded-md w-full sm:w-1/2 bg-gray-100 flex items-center justify-center flex-col h-min">
            <AnimatePresence>
                {sections.map((section) => {
                switch (section.type) {
                    case "code":
                        return <CodeElement onChange={handleChange} section={section} key={section.id} onSave={handleSave} onDelete={() => handleDelete(section.id)} id={section.id}/>
                    case "video":
                        return <VideoElement section={section} onChange={handleChange} onTitleChange={handleVideoTitleChanged} onUrlChange={handleVideoUrlChanged} key={section.id} onSave={handleSave} onDelete={() => handleDelete(section.id)} id={section.id}/>
                    case "text":
                        return <TextElement onTextTypeChange={handleTextTypeChanged} onChange={handleChange} section={section} key={section.id} onSave={handleSave} onDelete={() => handleDelete(section.id)} id={section.id}/>
                    default:
                        return
                }
            })}
            </AnimatePresence>
            <div>

                <motion.button whileHover={{scale: 1.2}} onClick={handleNewText} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500"><BsFillNodePlusFill/></motion.button>
                <motion.button whileHover={{scale: 1.2}}  onClick={handleNewVideo} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500"><BsYoutube/></motion.button>
                <motion.button whileHover={{scale: 1.2}}  onClick={handleNewCode} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500"><BsCodeSlash/></motion.button>
                <motion.button whileHover={{scale: 1.2}}  onClick={handleSaveAll} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-full px-4 py-2 m-2 bg-green text-blue-500">Save All</motion.button>
            </div>
        </motion.div>
    );
}

export default CourseBuilder;