import React from 'react'
import LessonBuilder from "../lessonBuilder/LessonBuilder";
import {SideBar} from "../lessonBuilder/SideBar";


const BuildCoursePage = (props) => {
    return (
        <div className="w-full h-full">
            <SideBar/>
            <div className="flex justify-center">
                <LessonBuilder/>
            </div>
        </div>
    );
}

export default BuildCoursePage;