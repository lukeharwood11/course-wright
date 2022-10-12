import React, {createContext} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import {BuildCoursePage} from "./pages/BuildCoursePage"
import {NavBar} from "./components/NavBar";

export const AppContext = createContext(undefined)

export const StateContainer = ({children}) => {
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<BuildCoursePage/>}></Route>
            <Route path='/signup' element={<div>Sign Up </div>}></Route>
        </Routes>
    );
}

function App() {
  return (
    <div className="h-full w-full">
      <NavBar/>
      <main className="w-full h-full">
            <Router/>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;