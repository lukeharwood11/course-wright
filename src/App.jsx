import React, {createContext} from 'react';
import './App.css';
import { Route, Routes } from "react-router";
import {CourseBuilder} from "./pages/CourseBuilder";
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
            <Route path='/' element={<CourseBuilder/>}></Route>
            <Route path='/signup' element={<div>Sign Up </div>}></Route>
        </Routes>
    );
}

function App() {
  return (
    <div className="App">
      <NavBar/>
      <main className="flex justify-center w-full">
            <Router/>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;