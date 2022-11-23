import React, { useState, useEffect } from "react";
import CourseList from "../dashboard/CourseList";
import CoursePreview from "../dashboard/CoursePreview";
import ToolBar from "../dashboard/ToolBar";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast";
import NavBar from "../NavBar";
import DashboardContextProvider from "../../context/DashboardContext";
import useDashboardContext from "../../hooks/useDashboardContext";
import {dashboardModes} from "../../constants";
import MessagesPanel from "../MessagesPanel";
import SearchPanel from "../SearchPanel";
import DashboardMainView from "../DashboardMainView";

const Dashboard = (props) => {

    return (
        <DashboardContextProvider>
            <div className="dashboard-layout">
                <div className={"drop-shadow-lg p-3"}>
                    <CourseList />
                </div>
                <CoursePreview editActive={ true } />
                <div className="search bg-white drop-shadow-lg">
                    <ToolBar
                        key={1}
                        onSubmit={() => {
                            console.log("submission");
                        }}
                        onClick1={() => console.log("Submit Button.")}
                    />
                    <DashboardMainView/>
                </div>
                <NavBar/>
            </div>
        </DashboardContextProvider>
    );
};

export default Dashboard;
