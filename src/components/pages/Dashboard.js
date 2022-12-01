import React, { useState, useEffect } from "react";
import CourseList from "../dashboard/course-list/CourseList";
import CoursePreview from "../dashboard/course-preview/CoursePreview";
import ToolBar from "../dashboard/search/ToolBar";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast";
import NavBar from "../NavBar";
import DashboardContextProvider from "../../context/DashboardContext";
import useDashboardContext from "../../hooks/useDashboardContext";
import {dashboardModes} from "../../constants";
import MessagesPanel from "../MessagesPanel";
import SearchPanel from "../dashboard/search/SearchPanel";
import DashboardMainView from "../DashboardMainView";
import CustomModal from "../elements/CustomModal";

const Dashboard = (props) => {

    // undefined means haven't searched, empty list means no results
    const [searchResults, setSearchResults] = useState(undefined)
    const [searchLoading, setSearchLoading] = useState(false)
    const axios = useAxios()
    const controller = new AbortController()

    const handleSearch = (inputText) => {
        setSearchLoading(true)
        axios.get(`/search`, { params: { text: inputText }, signal: controller.signal })
            .then(r => {
                setSearchResults(r.data.results)
            })
            .catch(err => {
                toast.error("An error occurred while searching.")
            })
            .finally(() => setSearchLoading(false))
    }

    useEffect(() => {
        return () => {
            controller.abort()
        }
    }, [])

    return (
        <DashboardContextProvider>
            <div className="dashboard-layout">
                <div className={"drop-shadow-lg p-3"}>
                    <CourseList />
                </div>
                <CoursePreview editActive={ true } />
                <div className="search bg-white drop-shadow-lg z-0">
                    <ToolBar
                        key={1}
                        onSubmit={ handleSearch }
                    />
                    <DashboardMainView searchLoading={ searchLoading } searchResults={ searchResults }/>
                </div>
                <NavBar/>
            </div>
        </DashboardContextProvider>
    );
};

export default Dashboard;
