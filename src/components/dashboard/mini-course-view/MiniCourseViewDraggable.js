import { MdDragIndicator } from 'react-icons/md'
import {parseCourseCode} from "../../../utils/regex/regex";
import {useNavigate} from "react-router-dom";
import useDashboardContext from "../../../hooks/useDashboardContext";
import {Reorder, useDragControls} from "framer-motion";
import {selectOptions} from "@testing-library/user-event/dist/select-options";

const MiniCourseViewDraggable = ({ course, color, handleClose }) => {
    const { name, code, role, type } = course
    const { setSelectedCourse, coursePairs } = useDashboardContext()
    const navigate = useNavigate()
    const controls = useDragControls()

    return (
        <Reorder.Item
            dragListener={false}
            dragControls={controls}
            key={ type === 'c' ? course.id : course.pcId }
            value={course}>
            <div
                onDoubleClick={() => {
                    navigate(`/course/${ type === 'c' ? course.id : course.pcId }`)
                }}
                onDrag={(e) => {
                   e.stopPropagation()
                }}
                className={`mini-course-button ${ color }`}>
                <button
                    onClick={() => {
                        const id = type === 'c' ? course.id : course.pcId
                        setSelectedCourse(id, type)
                        handleClose()
                    }}
                    className={"mini-course-button-select text-white button bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500"}>select</button>
                <div>
                    <h2 className={"mini-course-button-code"}> { parseCourseCode(name, code) }</h2>
                </div>
                <h1 className={"mini-course-button-name text-center"}>{ name }</h1>
                <MdDragIndicator
                    onPointerDown={
                        (e) => {
                            e.stopPropagation()
                            controls.start(e)
                        }
                    }
                    className={"mini-course-button-drag"}/>
            </div>
        </Reorder.Item>

    )
}

export default MiniCourseViewDraggable;