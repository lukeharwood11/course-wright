import React from "react";
import {SideBar} from "../components/SideBar";
import CourseBuilder from "../components/CourseBuilder";
import {motion} from "framer-motion";
import {BsFillFileEarmarkPlusFill} from 'react-icons/bs'
import CourseList from "../components/CourseList";
import CourseOptionPanel from "../components/CourseOptionPanel";
import {MdManageSearch} from "react-icons/md"
import DashboardLowerPanel from "../components/DashboardLowerPanel";

const Dashboard = (props) => {
    return (
        <div className="w-full h-full bg-gray-200">
            <div className={"w-full h-1/2 flex justify-around bg-white p-10"}>
                <div className={"flex flex-col bg-white p-2"}>
                    <div className={"pt-2 pb-2 flex items-center justify-between"}>
                        <motion.button whileTap={{scale: .95}} className={"w-full mr-2 text-3xl text-gray-700 bg-white drop-shadow-lg rounded-lg p-2"}>Create New Course <BsFillFileEarmarkPlusFill size={30} className={"inline"}/></motion.button>
                        <motion.button whileHover={{scale: 1.1}} className={"rounded-lg bg-white drop-shadow-lg"}><MdManageSearch size={50}/></motion.button>
                    </div>
                    <CourseList/>
                </div>
                <CourseOptionPanel/>
            </div>
        </div>
    );
}

export default Dashboard;