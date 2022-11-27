import {useEffect, useState} from "react";
import CourseTitleButton from "./CourseTitleButton";
import {FaSadCry} from "react-icons/fa";
import {AiOutlineSmallDash, AiOutlinePlus, AiFillAppstore} from "react-icons/ai"
import toast from "react-hot-toast";
import {axiosPrivate} from "../../api/axios";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";
import useDashboardContext from "../../hooks/useDashboardContext";
import {AnimatePresence, motion} from "framer-motion";
import CustomModal from "../elements/CustomModal";
import MiniCourseContainer from "./MiniCourseView/MiniCourseContainer";

const CourseList = () => {
    const [modal, setModal] = useState(false)
    const { courses, setCourses, addCourse, selectedCourse, setSelectedCourse, lockCourseCreation } = useDashboardContext()
    const [loading, setLoading] = useState(true)
    const axiosPrivate = useAxios();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getCourses = async () => {
            axiosPrivate.get(`/courses`, {signal: controller.signal})
                .then(r => {
                    isMounted && setCourses(r.data.courses)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        getCourses().catch((err) => {
            toast.error(err)
        })
        return () => {
            isMounted = false;
            controller.abort()
        };
    }, []);

    useEffect(() => {
        if (selectedCourse === "" && courses.length > 0) {
            setSelectedCourse(courses[0].pcId)
        }
    }, [courses, selectedCourse, setSelectedCourse])

    const handleCloseModal = () => {
        setModal(false)
    }

    return (
        loading ?
            <Loading spinner inverted/>
            :
            <div className={"course-grid no-select"}>
                <AnimatePresence>
                    { modal &&
                        <CustomModal key={"modal"} handleClose={ handleCloseModal }>
                            <MiniCourseContainer handleClose={ handleCloseModal }/>
                        </CustomModal>
                    }
                </AnimatePresence>
                    <AnimatePresence mode={"sync"}>
                { courses.slice(0, 8)?.map((course, i) => {
                    return <CourseTitleButton index={i} selected={course.pcId === selectedCourse} key={course.pcId} course={course}/>
                })
                }
                    <motion.div
                        layout
                        className={`course-button-extra-panel`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "anticipate", duration: .5 }}
                        exit={{ opacity: 0 }}>
                        <button
                            className={"view-all-button"}
                            onClick={() => {
                                setModal(true)
                            }}
                        >
                            <p className={"inline-block"}>View All</p>
                            <AiFillAppstore size={ 30 }/>
                        </button>

                        <button
                            className={!lockCourseCreation ? "add-course-button": "bg-gray-200"}
                            onClick={() => {
                                if (!lockCourseCreation) {
                                    addCourse({
                                        name: "My Course",
                                        code: "MY-1010",
                                        studentCount: 0,
                                        id: "new",
                                        pcId: "new",
                                        role: 1010,
                                        active: false,
                                        subject: "",
                                        dateCreated: "",
                                        lastModified: "",
                                        license: "",
                                        visibility: "private",
                                        published: false,
                                        tags: []
                                    })
                                }
                            }}
                        >
                            <p className={"inline-block"}>Add</p>
                            <AiOutlinePlus size={ 30 }/>
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
    );
}

export default CourseList;