import {useEffect, useState} from "react";
import CourseTitleButton from "./CourseTitleButton";
import {FaSadCry} from "react-icons/fa";
import {AiOutlineSmallDash, AiOutlinePlus, AiFillAppstore} from "react-icons/ai"
import toast from "react-hot-toast";
import {axiosPrivate} from "../../../api/axios";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading";
import useDashboardContext from "../../../hooks/useDashboardContext";
import {AnimatePresence, motion} from "framer-motion";
import CustomModal from "../../elements/CustomModal";
import MiniCourseContainer from "../mini-course-view/MiniCourseContainer";
import NewCourseButton from "./NewCourseButton";

const CourseList = () => {
    const [modal, setModal] = useState(false)
    const [content, setContent] = useState(<div></div>)
    const { courses, setCourses, addCourse, selectedCourse, setSelectedCourse, lockCourseCreation } = useDashboardContext()
    const [loading, setLoading] = useState(true)
    const axiosPrivate = useAxios();
    const { auth } = useAuth()

    const displayModal = (newContent) => {
        setContent(newContent)
        setModal(true)
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getCourses = async () => {
            axiosPrivate.get(`/courses`, {signal: controller.signal})
                .then(r => {
                    isMounted && setCourses([...r.data.courses, ...r.data.privateCourses])
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
        if (!selectedCourse.id && courses.length > 0) {
            const course = courses[0]
            let id = course.type === "c" ? course.id : course.pcId
            setSelectedCourse(id, course.type)
        }
    }, [courses, setSelectedCourse])

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
                            <AnimatePresence>
                                { content }
                            </AnimatePresence>
                        </CustomModal>
                    }
                </AnimatePresence>
                    <AnimatePresence mode={"sync"}>
                { courses.slice(0, 8)?.map((course, i) => {
                    const id = course.type === "c" ? course.id : course.pcId
                    return <CourseTitleButton index={i} selected={course.type === selectedCourse.type && selectedCourse.id === id} key={ id } course={ course }/>
                })
                }
                    <motion.div
                        layout
                        className={`course-button-extra-panel`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "anticipate", duration: .5 }}
                        exit={{ opacity: 0 }}>
                        <motion.button
                            layout
                            className={"view-all-button"}
                            onClick={() => {
                                displayModal(<MiniCourseContainer handleClose={ handleCloseModal }/>)
                            }}
                        >
                            <p className={"inline-block"}>View All</p>
                            <AiFillAppstore size={ 30 }/>
                        </motion.button>
                        <NewCourseButton handleCloseModal={() => setModal(false)} displayModal={ displayModal } handleAddCourse={ addCourse } lockCourseCreation={ lockCourseCreation }/>
                    </motion.div>
                </AnimatePresence>
            </div>
    );
}

export default CourseList;