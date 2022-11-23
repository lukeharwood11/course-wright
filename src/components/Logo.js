import {motion} from "framer-motion";
import React from "react";
import fitty from "fitty";


const Logo = ({loading=false}) => {

    const transition = { 
        ease: "anticipate", 
        duration: loading? 2 : 1, 
        repeat: loading? Infinity: undefined, 
        repeatType: "reverse",
        repeatDelay: 1
    }

    return (
        <motion.div
            initial={{ rotate: loading ? 90: 20, opacity: 0}}
            animate={{ rotate: 0, opacity: 1}}
            transition={{ ...transition, delay: .5}}
            exit={{opacity: 0, scale: 0}}
            className={"overflow-hidden rounded-lg shadow-2xl border-gray-200 border p-10 m-10"}>
            <h1
                className={"logo text-9xl"}>
                <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ ...transition, delay: 1 }} 
                    exit={{opacity: 0, scale: 0}}
                    className={"inline-block text-white"}>
                    C
                </motion.span>
                <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ ...transition, delay: 1}} 
                    exit={{opacity: 0, scale: 0}}
                    className={"inline-block text-gray-300"}>W
                </motion.span></h1>
            <h2 className="logo text-2xl text-white">
                <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ ...transition, delay: 1}} 
                    exit={{opacity: 0, scale: 0}}
                >Course</motion.span>
                <motion.span
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y:0 }}
                    transition={{ ...transition, delay: loading ? 1 : 2}}
                    exit={{opacity: 0, scale: 0}}
                    className={"inline-block ml-1"}>W</motion.span>
                <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ ...transition, delay: 1}} 
                    exit={{opacity: 0, scale: 0}}
                    className={"inline-block text-gray-200 underline"}>right
                </motion.span>
            </h2>
        </motion.div>
    );
}

export const MiniLogo = ({ size, fontClass }) => {
    return (
        <div
            style={{ width: size, height: size}}
            className={"flex justify-center items-center rounded-lg bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500"}>
            <h1
                id={"plain-logo"}
                className={`logo ${fontClass}`}>
                <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x:0 }}
                    exit={{opacity: 0 }}
                    className={"inline-block text-white"}>
                    C
                </motion.span>
                <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ delay: .5}}
                    exit={{opacity: 0 }}
                    className={"inline-block text-gray-300"}>W
                </motion.span></h1>
        </div>
    );
}

export default Logo;