import {useEffect, useState} from "react";
import CourseTitleButton from "./CourseTitleButton";
import {FaSadCry} from "react-icons/fa";

const CourseList = () => {
    const [courses, setCourses] = useState([
        // testing only
        {name: "Intro to Computer Science", code: "CS-101", date: "today"},
        {name: "History", code: "HS-105", date: "today"},
        {name: "Literature", code: "LI-102", date: "today"}
    ])
    useEffect(() => {

        return () => {
            // api call to build course list
        }
    }, [])

    return (
        <div className={"box-border bg-white flex items-center rounded-lg w-full min-h-full drop-shadow-lg"}>
            {courses.length === 0 ?
                <h3 className={"text-gray-700 inline-block w-full text-center text-2xl"}>No active courses <FaSadCry className={"inline"}/></h3>
                :<ul className={""}>
                {courses.map((course, i) => {
                    return <CourseTitleButton key={i} course={course}/>
                })}
                    <li><a href={"/dashboard/all-courses"} className={"p-2 underline text-blue-500"}>View All</a></li>
            </ul>}
        </div>
    );
}

export default CourseList;