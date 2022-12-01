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
import {parseCourseCode} from "../../../regex/regex";

const CourseTitleButton = ({selected, course, tags}) => {
    const {type, name, code, accounts, studentCount, id, pcId, published, role, active, subject, dateCreated, lastModified, license, visibility} = course
    const { setSelectedCourse } = useDashboardContext()
    const formattedCode = parseCourseCode(name, code)
    const [modal, setModal] = useState(false)
    const [tooltip, setTooltip] = useState(false)
    const navigate = useNavigate()

    const handleMore = (e) => {
        e.stopPropagation()
        openModel()
    }

    const closeModel = () => {
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
        return type === 'c' && (role === 1010 || role === 1011)
    }

    return (
        <>
            <AnimatePresence>
                { modal && <CustomModal key={"modal"} handleClose={ closeModel }>
                    <div>
                        <h1 className={"font-thin"}>
                            Course Options... Coming Soon
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
                    navigate(`/course/${id}`)
                }}
                onClick={() => {
                    const courseId = type === "c" ? id : pcId
                    setSelectedCourse(courseId, type)
                }}
                className={`course-button box-border drop-shadow-xl`}
                initial={{ opacity: 0, y: "-1vh" }}
                animate={{ opacity: 1, y:0 }}
                transition={{ ease: "anticipate", duration: .5 }}
                exit={{opacity: 0, borderRadius: "50%"}}>
                {
                    !published &&
                    <div
                        onMouseEnter={() => setTooltip(true)}
                        onMouseLeave={() => setTooltip(false)}
                        className={"course-button-icon"}>
                        {
                            tooltip && <p className={"tooltip"}>Not yet published</p>
                        }
                        <AiOutlineEyeInvisible size={ 20 }/>
                    </div>
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