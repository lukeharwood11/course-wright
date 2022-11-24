import CourseComponent from "./CourseComponent";
import ExpandableButton from "./ExpandableButton";
import React, {useState} from "react";

const CourseComponentView = ({ directories, coursePage }) => {

    const [filterText, setFilterText] = useState("")
    const handleFilter = (e) => {
        setFilterText(e.target.value)
    }
    return (
        <div className={"course-component-view"}>
            { coursePage ? <CourseComponent id={"page"} icon={"page"} name={ coursePage.title } /> : <CourseComponent id={"add-page"} name={"Add Description Page"}/> }
            <hr/>
            <input
                onChange={ handleFilter }
                value={filterText}
                type={"text"}
                className={"course-filter-input text-indigo-500 bg-white inline rounded-full w-full text-sm"}
                placeholder={"Search Course"}/>
            { directories.map((d, i) => <ExpandableButton title={d.name} key={i}>{ d.pages.map((p, i) => <CourseComponent key={i} id={i} icon={"page"} name={ p }/>)} </ExpandableButton>) }
        </div>
    );
}

export default CourseComponentView;