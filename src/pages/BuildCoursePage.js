import React from 'react'
import CourseBuilder from "../components/CourseBuilder";
import {SideBar} from "../components/SideBar";


const BuildCoursePage = (props) => {
    return (
        <div className="w-full h-full">
            <SideBar/>
            <div className="flex justify-center">
                <CourseBuilder/>
            </div>
        </div>
    );
}

export default BuildCoursePage;