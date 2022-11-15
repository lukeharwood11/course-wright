import {useContext} from "react";
import {DashboardContext} from "../context/DashboardContext";


const useDashboardContext = () => {
    return useContext(DashboardContext)
}

export default useDashboardContext;