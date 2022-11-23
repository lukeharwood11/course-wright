import { BsHouseDoor, BsGearWideConnected, BsCalendar3 } from 'react-icons/bs'
import {motion} from "framer-motion";
import {RiUser3Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";

import React from "react";
import {MiniLogo} from "./Logo";
const NavBar = (props) => {
    const navigate = useNavigate()
    const handleNav = (to) => {
        navigate(to)
    }
    const hover = {
        scale: 1.1,
    }
    return (
        <div className={"nav-bar bg-white flex items-center justify-center gap-5"}>
            <motion.button onClick={() => {
                handleNav("/dashboard")
            }} whileHover={hover}> <BsHouseDoor className="text-indigo-500" size={40}/></motion.button>
            <motion.button whileHover={hover} onClick={() => {
                handleNav("/sign-in")
            }}><RiUser3Line className="text-indigo-500" size={40}/></motion.button>
            <motion.button whileHover={{
                ...hover,
                rotate: 180
            }} onClick={() => {
                handleNav("#")
            }}><BsGearWideConnected className="text-indigo-500" size={40}/></motion.button>
            <motion.button whileHover={{
                ...hover
            }} onClick={() => {
                handleNav("#")
            }}><BsCalendar3 className="text-indigo-500" size={40}/></motion.button>
            <motion.button whileHover={{
                ...hover
            }} onClick={() => {
                handleNav("/")
            }}><MiniLogo size={40} fontClass={"mini-logo"}/></motion.button>
        </div>
    );
}

export default NavBar;