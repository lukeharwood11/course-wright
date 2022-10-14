import React, {useState} from 'react'
import {IoIosMenu} from 'react-icons/io'
import {motion} from "framer-motion";

const NavBar = () => {

    return (
        <>
        <nav className="flex items-center justify-between bg-blue-500">
            <div className={"flex justify-between"}>
                <a className="rounded-md px-2 text-white font-bold text-2xl m-2" href="#">Course Builder</a>
            </div>
            <div
                id={"main-nav"}
                className={`w-full h-full h-min w-min`}>
                <ul className="flex justify-around w-full">
                    <li className="p-1 rounded-md transition-colors m-2 text-white font-bold text-1xl"><a className="whitespace-nowrap" aria-current="page" href="#">Log In</a></li>
                </ul>
            </div>
        </nav>
    </>);
}

export default NavBar;