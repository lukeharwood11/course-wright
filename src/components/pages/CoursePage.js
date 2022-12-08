import {useParams} from "react-router";
import { useEffect, useState } from "react";
import CourseContextProvider from "../../context/CourseContext";
import {AnimatePresence, LayoutGroup, motion} from "framer-motion";
import CourseSideBar from "../course/CourseSideBar";
import PageView from "../course/page/PageView";
import NavBar from "../NavBar";
import CourseHeader from "../CourseHeader";

const CoursePage = () => {
    const [sideBarActive, setSideBarActive] = useState(true)
    const {type, id} = useParams()
    console.log(type, id)
    useEffect(() => {
        // TODO send a get request for this course
    }, [])

    return (
        <CourseContextProvider>
            <LayoutGroup>
                <motion.section className={`course-view ${sideBarActive ? "course-view-side-bar" : "course-view-no-side-bar"}`}>
                    { sideBarActive && <CourseSideBar open={ sideBarActive } key={"side-bar"} handleToggle={() => setSideBarActive((prevState) => !prevState)}/> }
                    <PageView key={"page-view"}/>
                    <CourseHeader menuOpen={ sideBarActive } title={ "Course Name"} handleToggle={() => setSideBarActive(prevState => !prevState)} />
                    <NavBar/>
                </motion.section>
            </LayoutGroup>
        </CourseContextProvider>
    );
}

export default CoursePage;
