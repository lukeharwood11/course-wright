import {useEffect, useState} from "react";
import CourseTitleButton from "./CourseTitleButton";
import {FaSadCry} from "react-icons/fa";
import { AiOutlineSmallDash } from "react-icons/ai"

const CourseList = ({ courses }) => {

    useEffect(() => {

        return () => {
            // api call to build course list
        }
    }, [])

    return (
        <div className={"w-full box-border"}>
            {courses.length === 0 ?
                <h3 className={"text-gray-700 inline-block w-full text-center text-2xl"}>No active courses <FaSadCry className={"inline"}/></h3>
                :
                <div className={"flex flex-wrap justify-around"}>
                { courses.map((course, i) => {
                    return <CourseTitleButton key={i} course={course}/>
                })}
                </div>
            }
        </div>
    );
}

export default CourseList;