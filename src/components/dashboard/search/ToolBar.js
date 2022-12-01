import {BsSearch, BsInbox} from "react-icons/bs";
import {AnimatePresence, motion} from "framer-motion";
import {AiOutlineArrowRight} from "react-icons/ai";
import {RiUser3Line} from "react-icons/ri";
import React, {useEffect, useState} from "react";
import useDashboardContext from "../../../hooks/useDashboardContext";
import InboxIcon from "../../InboxIcon";
import {dashboardModes} from "../../../constants";

function ToolBar({ onClick, onSubmit }) {
    const [inboxCount, setInboxCount] = useState(0)
    const { mode, setMode } = useDashboardContext()
    const [text, setText] = useState("")

    useEffect(() => {
        setInboxCount(getInboxCount())
    }, [])

    // TODO move to dashboard context
    const searchActive = () => {
        return mode === dashboardModes.SEARCH
    }

    const handleClick = () => {
        if (mode === dashboardModes.SEARCH) {
            setMode(dashboardModes.MESSAGE)
        } else {
            setMode(dashboardModes.SEARCH)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(text)
    }

    const getInboxCount = () => {
        return 8
    }
    return <div className="overflow-hidden w-full bg-white flex justify-between items-center">
        <motion.button whileTap={{ rotate: 180}} onClick={handleClick} className={"rounded-full bg-white p-2 m-2"}>
            {searchActive() ? <InboxIcon count={ inboxCount }/> : <BsSearch className="text-indigo-500" size={30}/> }
        </motion.button>
        <AnimatePresence>
            {searchActive() &&
                    <motion.input
                        key={0}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit(e)
                            }
                        }}
                        value={text}
                        initial={{opacity: 0, width: 0}}
                        animate={{opacity: 1, width: "100%"}}
                        transition={{ease: "backOut", duration: 1}}
                        exit={{opacity: 0, width: 0}}
                        type={"text"}
                        placeholder={"Search for courses or users"}
                        className={"font drop-shadow-2xl text-indigo-500  rounded-full bg-white m-2 p-2 outline-0 w-full"}/>
            }
            {searchActive() &&
                <motion.button
                    key={1}
                    initial={{opacity: 0, scale: 0, y: "-1vh"}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    transition={{ease: "anticipate", duration: 1}}
                    exit={{opacity: 0, scale: 0}}
                    className="rounded-full bg-white m-2" onClick={ handleSubmit }><AiOutlineArrowRight
                    className="text-indigo-500" size={30}/></motion.button>
            }
        </AnimatePresence>
    </div>;
}

export default ToolBar;