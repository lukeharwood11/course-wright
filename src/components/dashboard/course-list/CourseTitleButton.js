import {AnimatePresence, motion} from "framer-motion";
import useDashboardContext from "../../../hooks/useDashboardContext";
import {BsThreeDotsVertical} from "react-icons/bs";
import { FaEdit } from 'react-icons/fa'
import toast from "react-hot-toast";
import {useState} from "react";
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import CustomModal from "../../elements/CustomModal";
import {useNavigate} from "react-router-dom";
import {Item, Menu, Submenu, useContextMenu} from "react-contexify";
import {parseCourseCode} from "../../../utils/regex/regex";
import { permissions, verifyRole} from "../../../utils/permissions";
import {isSection} from "../../../utils/courseUtils";
import useAuth from "../../../hooks/useAuth";

const CourseTitleButton = ({selected, course, tags}) => {
    const {type, name, code, accounts, studentCount, id, pcId, published, role, active, subject, dateCreated, lastModified, license, visibility} = course
    const { coursePairs, selectedCourse, setSelectedCourse } = useDashboardContext()
    const formattedCode = parseCourseCode(name, code)
    const [modal, setModal] = useState(false)
    const [tooltip, setTooltip] = useState(false)
    const navigate = useNavigate()
    const { auth } = useAuth()

    const handleMore = (e) => {
        e.stopPropagation()
        openModel()
    }

    const closeModal = () => {
        setModal(false)
    }

    const openModel = () => {
        setModal(true)
    }

    const handleItemClick = ({ data }) => {

    }

    const { show } = useContextMenu({
        id: "course-button",
    });

    const isEditable = () => {
        if (isSection(course)) {
            const c = coursePairs.find(obj => obj?.section?.pcId === course.pcId)?.course
            if (c) {
                return verifyRole(c.accounts.find(a => a.email === auth.user.email)?.role, permissions.courseEdit)
            }
            return false
        }
        return !isSection(course) && verifyRole(role, permissions.courseEdit)
    }

    /**
     * Return true if this is both a private course and a section
     */
    const isStacked = () => {
        return isSection(course) && coursePairs.find(obj => obj?.section?.pcId === course.pcId)?.course !== undefined
    }

    /**
     * Returns a boolean of whether the course under the private course is selected
     */
    const stackedCourseSelected = () => {
        // this will only be called if it is a section, so we can assume course.pcId exists
        return coursePairs.find(obj => obj?.section?.pcId === course.pcId).course.id === selectedCourse.id
    }

    /**
     * Get the style that corresponds to the state of the button
     * (In regard to whether this is a stacked button)
     */
    const getStackedStyleClass = () => {
        if (isStacked()) {
            return stackedCourseSelected() ? "stacked-course-selected" : "stacked-course"
        } else {
            return ""
        }
    }

    const setStackedCourse = () => {
        const c = coursePairs.find(obj => obj?.section?.pcId === course.pcId)?.course
        if (c) setSelectedCourse(c.id, 'c')
    }

    return (
        <>
            <AnimatePresence>
                { modal && <CustomModal key={"modal"} handleClose={ closeModal }>
                    <div>
                        <h1 className={"font-thin"}>
                            {
                                isStacked() &&
                                <button
                                    onClick={() => {
                                        setStackedCourse()
                                        closeModal()
                                    }}
                                >Select Editable Course</button>
                            }
                        </h1>
                    </div>
                </CustomModal> }
            </AnimatePresence>
            <motion.div
                layout
                onContextMenu={(e) => {
                    e.preventDefault()
                }}
                onDoubleClick={() => {
                    navigate(`/course/${type}/${id}`)
                }}
                onClick={() => {
                    const courseId = type === "c" ? id : pcId
                    console.log(type, courseId)
                    setSelectedCourse(courseId, type)
                }}
                className={`course-button box-border drop-shadow-xl ${getStackedStyleClass()}`}
                initial={{ opacity: 0, y: "-1vh" }}
                animate={{ opacity: 1, y:0 }}
                transition={{ ease: "anticipate", duration: .5 }}
                exit={{opacity: 0, borderRadius: "50%"}}>
                {
                    !published && type === 'c' &&
                    <motion.div
                        layout
                        id={"course-button-icon " + (!tooltip ? "rounded": "")}
                        onMouseEnter={() => {
                            setTooltip(true)
                        }}
                        onMouseLeave={() => setTooltip(false)}
                        className={"course-button-icon round"}>
                        {
                            tooltip && <p className={"tooltip"}>Not yet published</p>
                        }
                        {
                            !tooltip && <AiOutlineEyeInvisible size={ 20 }/>
                        }
                    </motion.div>
                }
                {
                    isEditable() && <FaEdit className={"course-button-editable-icon"} size={ 15 }/>
                }
                <h3 className={`course-button-name ${name.length > 25 ? "smaller" : "normal"}`}>{ name }</h3>
                <h4 className={`course-button-code ${selected ? "bg-purple-500": "bg-indigo-500"}`}>{ formattedCode }</h4>
                <div className={"course-button-more"}>
                    <motion.button onClick={ handleMore } className={"w-full h-full"}><BsThreeDotsVertical size={15}/></motion.button>
                </div>
                {
                    type === 'c' ? <p className={"course-student-count"}>Editable Course</p> : <p className={"course-student-count"}>{ accounts.length } member{ accounts.length === 1 ? "" : "s"}</p>
                }
            </motion.div>
        </>
    );
}

export default CourseTitleButton;