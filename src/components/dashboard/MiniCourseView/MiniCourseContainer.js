import useDashboardContext from "../../../hooks/useDashboardContext";
import MiniCourseViewDraggable from "./MiniCourseViewDraggable";
import {Reorder, useDragControls} from "framer-motion";
import {useEffect, useState} from "react";

const MiniCourseContainer = ({ handleClose }) => {
    const { courses, setCourses } = useDashboardContext()
    // return (
    //     <section className={"mini-course-container"}>
    //         { courses.map((c, i) => <MiniCourseViewDraggable handleClose={ handleClose } index={ i } key={ i } course={ c } color={i % 2 === 0 ? "purple": "darker-purple"}/>)}
    //     </section>
    // )
    //

    return (
        <Reorder.Group className={"w-full h-full"} axis="y" values={courses} onReorder={setCourses}>
            {courses.map((item, i) => (
                <MiniCourseViewDraggable key={ item.pcId } handleClose={ handleClose } course={ item } color={i % 2 === 0 ? "light-gray": "dark-gray"} />
            ))}
        </Reorder.Group>
    )
}

export default MiniCourseContainer