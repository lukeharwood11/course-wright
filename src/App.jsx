import React, {createContext, useContext, useState} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import BuildCoursePage from "./pages/BuildCoursePage"
import NavBar from "./components/NavBar";
import SignInPage from "./pages/SignInPage";
import {AnimatePresence} from "framer-motion";
import CreateAccountPage from "./pages/CreateAccountPage";
import Dashboard from "./pages/Dashboard";

export const AppContext = createContext(undefined)

export const StateContainer = ({children}) => {
    const initialPaths = [
        {path: "", page: <BuildCoursePage/>},
        {path: "sign-in", page: <SignInPage/>},
        {path: "create-account", page: <CreateAccountPage/>},
        {path: "dashboard", page: <Dashboard/>}
    ]
    const [paths, setPaths] = useState(initialPaths)
    const [activeUser, setActiveUser] = useState(null)

    return (
        <AppContext.Provider value={{paths, setPaths, activeUser, setActiveUser}}>
            {children}
        </AppContext.Provider>
    );
}

const Router = () => {
    const {paths} = useContext(AppContext)
    return (
        <Routes>
            {paths.map((path, i) => <Route path={`/${path.path}`} element={path.page} key={i}></Route>)}
        </Routes>
    );
}

function App() {
  return (
      <div className={"w-full h-full"}>
          <main className="w-full h-full">
              <NavBar/>
              <Router/>
          </main>
      </div>
  );
}

export default App;