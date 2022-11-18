import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegPaperPlane } from 'react-icons/fa'
import Textarea from "react-expanding-textarea";

const MessagesPanel = () => {
    useEffect(() => {
        console.log("Messages, mounted.")
    }, [])
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: "-1vh" }}
            animate={{ opacity: 1, scale: 1, y:0 }}
            transition={{ ease: "anticipate", duration: .5}}
            exit={{ opacity: 0 }}
            className={"messages-panel"}>
            <div className={"messaging-sidebar bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500"}></div>
            <div className={"messaging-display bg-gray-100"}></div>
            <div className={"messaging-control-panel bg-white"}>
                <div className={"flex items-center justify-center"}>
                    <Textarea
                        onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                e.preventDefault()
                            }
                        }}
                        defaultValue={""}
                        onChange={(event) => {

                        }}
                        className={"message-dialog"}/>
                    <button className={"p-1 rounded-sm text-indigo-500 bg-white drop-shadow-xl"}><FaRegPaperPlane size={20}/></button>
                </div>

            </div>
        </motion.div>
    );
}

export default MessagesPanel;