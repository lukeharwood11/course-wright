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
import Modal from "../elements/Modal";

const CourseList = () => {
    const [modal, setModal] = useState(false)
    const { courses, setCourses, addCourse, selectedCourse, setSelectedCourse } = useDashboardContext()
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
                .catch(err => console.log(err))
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
        if (selectedCourse === -1 && courses.length > 0) {
            setSelectedCourse(0)
        }
    }, [courses, selectedCourse, setSelectedCourse])

    return (
        loading ?
            <Loading spinner inverted/>
            :
            (!courses || courses?.length === 0) ?
                <h3 className={"text-gray-700 inline-block w-full text-center text-2xl"}>No active courses <FaSadCry className={"inline"}/></h3>
                :
                <div className={"course-grid no-select"}>
                    <AnimatePresence>
                        { modal &&
                            <Modal key={"modal"} handleClose={() => setModal(false)}>
                                <h1>Be patient...</h1>
                            </Modal>
                        }
                    </AnimatePresence>
                        <AnimatePresence mode={"sync"}>
                    { courses.slice(0, 8).map((course, i) => {
                        return <CourseTitleButton index={i} selected={i === selectedCourse} key={i} course={course}/>
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
                                className={"add-course-button"}
                                onClick={() => {
                                    addCourse({ name: "My Course", id: "new", code: "", studentCount: 0})
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