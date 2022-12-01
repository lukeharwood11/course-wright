import useDashboardContext from "../hooks/useDashboardContext";
import {dashboardModes} from "../constants";
import SearchPanel from "./dashboard/search/SearchPanel";
import MessagesPanel from "./MessagesPanel";
import {AnimatePresence} from "framer-motion";
import CustomModal from "./elements/CustomModal";
import React from "react";

const DashboardMainView = ({ searchLoading, searchResults }) => {
    const { mode } = useDashboardContext()
    return (
        <AnimatePresence>
            { mode === dashboardModes.SEARCH ? <SearchPanel searchLoading={ searchLoading } searchResults={ searchResults } key={"search"}/> : <MessagesPanel key={"messages"}/> }
        </AnimatePresence>
    )
}

export default DashboardMainView;