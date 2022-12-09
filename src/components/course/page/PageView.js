import React, {useEffect, useState} from 'react'
import TextElement from "./elements/TextElement";
import VideoElement from "./elements/VideoElement";
import CodeElement from "./elements/CodeElement";
import useMemoryState from "../../../hooks/useMemoryState";
import {BsYoutube, BsFillNodePlusFill, BsCodeSlash} from "react-icons/bs";
import {AiOutlineFileText} from 'react-icons/ai'
import {AnimatePresence, motion} from "framer-motion";
import ElementWrapper from "./elements/ElementWrapper";
import {CodeElementModel, TextElementModel, VideoElementModel} from "../../../data/ElementModel";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {CheckmarkIcon} from "react-hot-toast";
import InstructionsElement from "./elements/InstructionsElement";

const PageView = () => {
    const [cells, setCells] = useMemoryState([], "activeSections")
    const [selected, setSelected] = useState(true)
    const handleDelete = (id) => {
        const newCells = cells.filter((cell)=> cell.id !== id)
        setCells(newCells)
    }

    /**
     * Add cell to the page
     * @param cell - cell to add
     * @param referenceCell - reference cell to add the cell after
     */
    const handleAdd = (cell, referenceCell) => {
        const cellsCopy = [...cells]
        let index
        if (referenceCell === undefined) {
            index = cells.length
        } else {
            index = cells.findIndex((cell) => cell.id === referenceCell.id)
        }
        cellsCopy.splice(index, 0, cell);
        setCells([...cells, cell])
    }


    const create = (type) => {
    }

    const handleNewText = (event) => {
        handleAdd(TextElementModel.new())
    }

    const handleNewVideo = (event) => {
        handleAdd(VideoElementModel.new())
    }

    const handleNewCode = (event) => {
        handleAdd(CodeElementModel.new())
    }

    const handleSave = (id, exitEditMode) => {
        const s = [...cells]
        s.find(section => section.id === id).editMode = !exitEditMode
        setCells(s)
    }

    const handleChange = (id, event) => {
        const s = [...cells]
        const section = s.find(section => section.id === id)
        section.text = event.target.value
        setCells(s)
        event.stopPropagation()
    }

    const handleTextTypeChanged = (id, textType) => {
        const s = [...cells]
        s.find(section => section.id === id).textType = textType
        setCells(s)
    }

    const handleVideoTitleChanged = (id, event) => {
        const s = [...cells]
        s.find(section => section.id === id).title = event.target.value
        setCells(s)
        event.stopPropagation()
    }

    const handleVideoUrlChanged = (id, event) => {
        const s = [...cells]
        s.find(section => section.id === id).src = event.target.value
        setCells(s)
        event.stopPropagation()
    }

    const handleSaveAll = () => {
        const s = [...cells]
        s.map((section) => {
            if ((section.type === "code" || section.type === "text") && section.text.trim() !== "") {
                section.editMode = false
            } else if (section.type === "video") {
                const {text, title, src} = section
                if (text.trim() !== "" || title.trim() !== "" || src.trim() !== "") {
                    section.editMode = false
                }
            }
            return section
        })
        setCells(s)
    }

    const cellActions = [
        {
            action: (e) => { handleNewText(e)},
            name: "New Text Cell",
            icon: <AiOutlineFileText size={30}/>
        },
        {
            action: (e) => { handleNewVideo(e)},
            name: "New Video Cell",
            icon: <BsYoutube size={30}/>
        },
        {
            action: (e) => { handleNewCode(e)},
            name: "New Code Cell",
            icon: <BsCodeSlash size={30}/>
        }
    ]

    const handleKeyPress = (e) => {
        if (!selected) return
        switch (e.key) {
            case "t":
                handleNewText(e)
                break
            case "v":
                handleNewVideo(e)
                break
            case "c":
                handleNewCode(e)
                break
            case "Enter":
                break
            case "Escape":
                console.log("Escape")
                break
            case "Delete":
                console.log("Delete")
                break
            default:
                break
        }
    }

    useEffect(() => {
        document.addEventListener("keyup", handleKeyPress)
        return () => {
            document.removeEventListener("keyup", handleKeyPress)
        }
    })

    return (
        <div onKeyUp={handleKeyPress } onMouseEnter={() => setSelected(true)} onClick={() => setSelected(true)} onMouseLeave={() => setSelected(false)} className={"flex justify-center items-start overflow-y-auto"}>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                end={{ opacity: 0 }}
                layout
                className={`page-view ${selected ? "selected": ""}`}>
                <AnimatePresence initial={false}>
                    {cells.map((cell) => {
                        switch (cell.type) {
                            case "code":
                                return <CodeElement onChange={handleChange} section={cell} key={cell.id} onSave={handleSave} onDelete={() => handleDelete(cell.id)} id={cell.id}/>
                            case "video":
                                return <VideoElement section={cell} onChange={handleChange} onTitleChange={handleVideoTitleChanged} onUrlChange={handleVideoUrlChanged} key={cell.id} onSave={handleSave} onDelete={() => handleDelete(cell.id)} id={cell.id}/>
                            case "text":
                                return <TextElement onTextTypeChange={handleTextTypeChanged} onChange={handleChange} section={cell} key={cell.id} onSave={handleSave} onDelete={() => handleDelete(cell.id)} id={cell.id}/>
                            default:
                                return
                        }
                    })}
                </AnimatePresence>


                {
                    cells.length === 0 ?
                    <motion.div layout="position" className={"flex items-center"}>
                        <InstructionsElement cellActions={cellActions}/>
                    </motion.div>
                    :
                    <motion.div layout={"position"}>
                    <motion.button whileHover={{scale: 1.2}} onClick={handleNewText} className="border border-black font-semibold transition-colors hover:bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-indigo-500"><AiOutlineFileText /></motion.button>
                    <motion.button whileHover={{scale: 1.2}}  onClick={handleNewVideo} className="border border-black font-semibold transition-colors hover:bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-indigo-500"><BsYoutube/></motion.button>
                    <motion.button whileHover={{scale: 1.2}}  onClick={handleNewCode} className="border border-black font-semibold transition-colors hover:bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-indigo-500"><BsCodeSlash/></motion.button>
                    <motion.button whileHover={{scale: 1.2}}  onClick={handleSaveAll} className="border border-black font-semibold transition-colors hover:bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 hover:text-white rounded-full px-4 py-2 m-2 bg-green text-indigo-500">Save All</motion.button>
                    </motion.div>
                }
            </motion.section>
        </div>
    );
}

export default PageView;