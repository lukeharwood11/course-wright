import React, {createContext, useState} from "react";

export const DashboardContext = createContext({})

const DashboardContextProvider = ({ children }) => {

    const [selectedCourse, setSelectedCourse] = useState("")

    return (
        <DashboardContext.Provider
            value={{selectedCourse, setSelectedCourse}}>
            {children}
        </DashboardContext.Provider>
    );
}

export default DashboardContextProvider;