import { BsHouseDoor, BsGearWideConnected, BsCalendar3 } from 'react-icons/bs'
import {motion} from "framer-motion";
import {RiUser3Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";

import React from "react";
const DashboardNavBar = (props) => {
    const navigate = useNavigate()
    const handleNav = (to) => {
        navigate(to)
    }
    const hover = {
        scale: 1.1,
    }
    return (
        <div className={"dashboard-nav-bar bg-white flex items-center justify-center gap-5"}>
            <motion.button onClick={() => {
                handleNav("/")
            }} whileHover={hover}> <BsHouseDoor className="text-blue-500" size={40}/></motion.button>
            <motion.button whileHover={hover} onClick={() => {
                handleNav("/sign-in")
            }}><RiUser3Line className="text-blue-500" size={40}/></motion.button>
            <motion.button whileHover={{
                ...hover,
                rotate: 180
            }} onClick={() => {
                handleNav("#")
            }}><BsGearWideConnected className="text-blue-500" size={40}/></motion.button>
            <motion.button whileHover={{
                ...hover
            }} onClick={() => {
                handleNav("#")
            }}><BsCalendar3 className="text-blue-500" size={40}/></motion.button>
        </div>
    );
}

export default DashboardNavBar;