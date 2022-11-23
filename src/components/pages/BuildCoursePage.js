import React from 'react'
import PageView from "../course/page/PageView";
import {SideBar} from "../course/page/SideBar";


const BuildCoursePage = (props) => {
    return (
        <div className="w-full h-full">
            <SideBar/>
            <div className="flex justify-center">
                <PageView/>
            </div>
        </div>
    );
}

export default BuildCoursePage;