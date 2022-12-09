import {useParams} from "react-router";
import { useEffect, useState } from "react";
import CourseContextProvider from "../../context/CourseContext";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import CourseSideBar from "../course/CourseSideBar";
import PageView from "../course/page/PageView";
import NavBar from "../NavBar";
import { Drawer } from "@mui/material";
import CourseHeader from "../CourseHeader";
import InstructionsElement from "../course/page/elements/InstructionsElement";

const CoursePage = () => {
    const [sideBarActive, setSideBarActive] = useState(true)
    const {type, id} = useParams()
    const [drawerOpen, setDrawerOpen] = useState(true)
    console.log(type, id)
    useEffect(() => {
        // TODO send a get request for this course
    }, [])

    return (
        <CourseContextProvider>
            <LayoutGroup>
                <Drawer anchor={"left"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <div className={"flex justify-center items-center p-10"}>
                        <InstructionsElement noStart />
                    </div>
                </Drawer>
                <motion.section className={`course-view ${sideBarActive ? "course-view-side-bar" : "course-view-no-side-bar"}`}>
                    { sideBarActive && <CourseSideBar open={ sideBarActive } key={"side-bar"} handleToggle={() => setSideBarActive((prevState) => !prevState)}/> }
                    <PageView key={"page-view"}/>
                    <CourseHeader handleHelpOpen={ () => setDrawerOpen(true)} menuOpen={ sideBarActive } title={ "Course Name"} handleToggle={() => setSideBarActive(prevState => !prevState)} />
                    <NavBar/>
                </motion.section>
            </LayoutGroup>
        </CourseContextProvider>
    );
}

export default CoursePage;
