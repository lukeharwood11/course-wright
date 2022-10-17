import React, {useContext, useState} from 'react'
import {IoIosMenu} from 'react-icons/io'
import {motion} from "framer-motion";
import {AppContext} from "../App";
import {BiMessageDetail} from "react-icons/bi";

const NavBar = () => {
    const {activeUser} = useContext(AppContext)
    return (
        <>
        <nav className="flex items-center justify-between bg-blue-500">
            <div className={"flex justify-between"}>
                <a className="rounded-md px-2 text-white font-bold text-2xl m-2" href="/">Course Builder</a>
            </div>
            <div
                id={"main-nav"}
                className={`w-full h-full h-min w-min`}>
                <ul className="flex justify-around w-full">
                    <li className={"flex items-center"}>
                        <motion.button whileHover={{scale: 1.1, x: -5}} transition={{type: "tween"}} className="p-1 text-white">
                            <BiMessageDetail size={30}/>
                        </motion.button>
                    </li>
                    { activeUser ?
                        <li className="p-1 rounded-md transition-colors m-2 text-white font-bold text-1xl"><a className="whitespace-nowrap" aria-current="page" href="/">Hello, {activeUser.name}!</a></li> :
                        <li className="p-1 rounded-md transition-colors m-2 text-white font-bold text-1xl"><a className="whitespace-nowrap" aria-current="page" href="/sign-in">Log In</a></li>
                    }
                </ul>
            </div>
        </nav>
    </>);
}

export default NavBar;