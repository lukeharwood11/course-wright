import {motion} from "framer-motion";
import Logo from "../Logo";
import React from "react";
import {FaSadCry} from "react-icons/fa";

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: "-1vh" }}
            animate={{ opacity: 1, y:0 }}
            transition={{ ease: "anticipate", duration: 1}}
            exit={{opacity: 0, scale: 0}}
            className={"overflow-hidden h-full dialog bg-blue-500 items-center flex justify-center flex-wrap"}>
            <Logo/>
            <div className={"w-max-100"}>
                <h1
                    className={"text-5xl text-gray-300 logo"}
                >I'm sorry... <br/> we couldn't find that resource <FaSadCry className={"inline"}/></h1>
            </div>
        </motion.div>
    )
}

export default NotFound;