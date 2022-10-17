import React from "react";
import {SideBar} from "../components/SideBar";
import CourseBuilder from "../components/CourseBuilder";
import {motion} from "framer-motion";
import {BsFillFileEarmarkPlusFill} from 'react-icons/bs'
import CourseList from "../components/CourseList";
import CourseOptionPanel from "../components/CourseOptionPanel";
import DashboardLowerPanel from "../components/DashboardLowerPanel";

const Dashboard = (props) => {
    return (
        <div className="w-full h-full bg-gray-200">
            <div className={"w-full h-1/2 flex justify-around"}>
                <div className={"flex flex-col bg-white"}>
                    <motion.button whileTap={{scale: .95}} className={"m-5 text-3xl text-gray-700 bg-gray-300 rounded-lg p-2"}>Create New Course <BsFillFileEarmarkPlusFill size={30} className={"inline"}/></motion.button>
                    <CourseList/>
                </div>
                <CourseOptionPanel/>
            </div>
        </div>
    );
}

export default Dashboard;