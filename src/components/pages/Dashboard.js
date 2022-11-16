import React, { useState, useEffect } from "react";
import CourseList from "../dashboard/CourseList";
import CoursePreview from "../dashboard/CoursePreview";
import ToolBar from "../dashboard/ToolBar";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast";
import DashboardNavBar from "../DashboardNavBar";
import DashboardContextProvider from "../../context/DashboardContext";

const Dashboard = (props) => {
    const [searchActive, setSearchActive] = useState(false);

    return (
        <DashboardContextProvider>
            <div className="dashboard-layout">
                <div className={"bg-blue-500 drop-shadow-lg p-3"}>
                    <CourseList />
                </div>
                <CoursePreview editActive={ true } />
                <div className="search bg-white drop-shadow-lg">
                    <ToolBar
                        key={1}
                        onClick={() => {
                            setSearchActive((prevState) => !prevState);
                        }}
                        searchActive={searchActive}
                        onSubmit={() => {
                            console.log("submission");
                        }}
                        onClick1={() => console.log("Submit Button.")}
                    />
                </div>
                <DashboardNavBar/>
            </div>
        </DashboardContextProvider>
    );
};

export default Dashboard;
