import {BsSearch} from "react-icons/bs";
import {AnimatePresence, motion} from "framer-motion";
import {AiOutlineArrowRight} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import React from "react";

function ToolBar(props) {
    return <div className="overflow-hidden w-full bg-white flex justify-between items-center">
        <button onClick={props.onClick} className={"rounded-full bg-white p-2 m-2"}><BsSearch className="text-blue-500"
                                                                                              size={30}/></button>
        <AnimatePresence>
            {props.searchActive &&
                <motion.input
                    key={0}
                    initial={{opacity: 0, width: 0}}
                    animate={{opacity: 1, width: "100%"}}
                    transition={{ease: "anticipate", duration: 1.5}}
                    exit={{opacity: 0, width: 0}}
                    onSubmit={props.onSubmit}
                    type={"text"}
                    placeholder={"Search for courses or users"}
                    className={"font drop-shadow-2xl text-blue-500 roboto rounded-full bg-white m-2 p-2 outline-0 w-full"}/>
            }
            {props.searchActive &&
                <motion.button
                    key={1}
                    initial={{opacity: 0, scale: 0, y: "-1vh"}}
                    animate={{opacity: 1, scale: 1, y: 0}}
                    transition={{ease: "anticipate", duration: 1}}
                    exit={{opacity: 0, scale: 0}}
                    className="rounded-full bg-white m-2" onClick={props.onClick1}><AiOutlineArrowRight
                    className="text-blue-500" size={45}/></motion.button>
            }
        </AnimatePresence>
        <a href={"/sign-in"}>
            <button className="rounded-full bg-white m-2"><BiUserCircle className="text-blue-500" size={40}/></button>
        </a>
    </div>;
}

export default ToolBar;