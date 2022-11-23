import {useContext} from "react";
import {CourseContext} from "../context/CourseContext";

const useCourseContext = () => {
    return useContext(CourseContext)
}

export default useCourseContext;