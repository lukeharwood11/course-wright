import useDashboardContext from "../../../hooks/useDashboardContext";
import MiniCourseViewDraggable from "./MiniCourseViewDraggable";
import {Reorder, useDragControls} from "framer-motion";
import {useEffect, useState} from "react";
import {isSection} from "../../utils/courseUtils";

const MiniCourseContainer = ({ handleClose }) => {
    const { courses, setCourses } = useDashboardContext()

    return (
        <Reorder.Group className={"w-full h-full"} axis="y" values={ courses } onReorder={ setCourses }>
            {courses.map((course, i) => (
                <MiniCourseViewDraggable key={ isSection(course) ? course.pcId : course.id } handleClose={ handleClose } course={ course } color={i % 2 === 0 ? "light-gray": "dark-gray"} />
            ))}
        </Reorder.Group>
    )
}

export default MiniCourseContainer