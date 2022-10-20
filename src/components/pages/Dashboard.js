import React, {useState} from "react";
import { SideBar } from "../coursebuilder/SideBar";
import CourseBuilder from "../coursebuilder/CourseBuilder";
import {AnimatePresence, motion} from "framer-motion";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import CourseList from "../CourseList";
import CourseOptionPanel from "../CourseOptionPanel";
import { MdManageSearch } from "react-icons/md";
import DashboardLowerPanel from "../DashboardLowerPanel";
import {BiUserCircle} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineArrowRight} from 'react-icons/ai'
import * as PropTypes from "prop-types";
import ToolBar from "../ToolBar";

const Dashboard = (props) => {
    const [searchActive, setSearchActive] = useState(false)
    return (
        <div className="flex justify-between w-full h-full bg-blue-500">
            <div className="border-box w-1/2 bg-white">
                <div className="border-box h-1/2 rounded-lg bg-gray-200">
                    
                </div>
                <div className="border-box h-1/2 b-white"></div>
            </div>
            <div className="border-box w-1/2 bg-white">
                <ToolBar key={1} onClick={() => {
                    setSearchActive((prevState) => !prevState)
                }} searchActive={searchActive} onSubmit={() => {
                    console.log("submission")
                }} onClick1={() => console.log("Submit Button.")}/>
            </div>
        </div>
    );
};

export default Dashboard;
