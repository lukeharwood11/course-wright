import {useEffect, useState} from "react";
import CourseTitleButton from "./CourseTitleButton";

const CourseList = () => {
    const [courses, setCourses] = useState([
        {name: "Intro to Computer Science", code: "CS-101", date: "today"},
        {name: "History", code: "HS-105", date: "today"},
        {name: "Literature", code: "LI-102", date: "today"}
    ])
    useEffect(() => {

        return () => {

        }
    }, [])

    return (
        <div className={"flex items-center rounded-lg w-fit"}>
            <ul>
                {courses.map((course, i) => {
                    return <CourseTitleButton key={i} course={course}/>
                })}
            </ul>
        </div>
    );
}

export default CourseList;