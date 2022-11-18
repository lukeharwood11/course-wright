import useDashboardContext from "../hooks/useDashboardContext";
import {dashboardModes} from "../constants";
import SearchPanel from "./SearchPanel";
import MessagesPanel from "./MessagesPanel";
import {AnimatePresence} from "framer-motion";

const DashboardMainView = () => {
    const { mode } = useDashboardContext()
    return (
        <AnimatePresence>
            { mode === dashboardModes.SEARCH ? <SearchPanel key={"search"}/> : <MessagesPanel key={"messages"}/> }
        </AnimatePresence>
    )
}

export default DashboardMainView;