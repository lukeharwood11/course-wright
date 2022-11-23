import React, { createContext, useContext, useState } from "react";
import "./App.css";
import SignInPage from "./components/pages/SignInPage";
import AuthProvider from "./context/AuthProvider";
import CreateAccountPage from "./components/pages/CreateAccountPage";
import PageView from "./components/course/page/PageView";
import BuildCoursePage from "./components/pages/BuildCoursePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Layout from "./Layout";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/pages/NotFound";
import AuthorizeUser from "./components/AuthorizeUser";
import RefreshHandler from "./components/RefreshHandler";
import CreateAccountProvider from "./context/CreateAccountContext";
import Loading from "./components/Loading";
import ProfilePage from "./components/pages/ProfilePage";
import CoursePage from "./components/pages/CoursePage";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route element={<RefreshHandler/>}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path={"sign-in"} element={<SignInPage />} />
                <Route path={"create-account"} element={<CreateAccountPage />}/>
                {/* protected routes here */}
                <Route element={<RefreshHandler />}>
                    <Route element={<AuthorizeUser />}>
                        <Route path={"profile"} element={<ProfilePage />}/>
                        <Route path={"dashboard"} element={<Dashboard />} />
                        <Route path={"course/:id"} element={<CoursePage/> } />
                    </Route>
                </Route>
                <Route path={"*"} element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
