import React, {createContext, useContext, useState} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import BuildCoursePage from "./components/pages/BuildCoursePage"
import NavBar from "./components/NavBar";
import SignInPage from "./components/pages/SignInPage";
import { AnimatePresence } from "framer-motion";
import CreateAccountPage from "./components/pages/CreateAccountPage";
import Dashboard from "./components/pages/Dashboard";

export const AuthContext = createContext({})

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
        <AuthContext.Provider value={{paths, setPaths, activeUser, setActiveUser}}>
            {children}
        </AuthContext.Provider>
    );
}

const Router = () => {
    const {paths} = useContext(AuthContext)
    return (
        <Routes>
            {paths.map((path, i) => <Route path={`/${path.path}`} element={path.page} key={i}></Route>)}
        </Routes>
    );
}

function App() {
  return (
          <main className="w-full h-full">
              <Router/>
          </main>
  );
}

export default App;