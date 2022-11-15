import {useEffect, useState} from "react";
import CourseTitleButton from "./CourseTitleButton";
import {FaSadCry} from "react-icons/fa";
import { AiOutlineSmallDash } from "react-icons/ai"
import toast from "react-hot-toast";
import {axiosPrivate} from "../../api/axios";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";
import useDashboardContext from "../../hooks/useDashboardContext";

const CourseList = () => {
    const { selectedCourse, setSelectedCourse } = useDashboardContext()
    const [courses, setCourses] = useState([]);
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
            // if the component unmounts before fulfilling the request,
            // our state will try to set, and we'll get an error
            controller.abort()
        };
    }, []);

    useEffect(() => {
        if (selectedCourse === "" && courses.length > 0) {
            setSelectedCourse(courses[0].id)
        }
    }, [courses])

    return (
        loading ?
            <Loading spinner inverted/>
            :
            courses.length !== 0 ?
            <div className={"course-grid bg-white"}>
                    { courses.map((course, i) => {
                        return <CourseTitleButton selected={course.id === selectedCourse} key={i} course={course}/>
                    })
                }
            </div>
                :
                <h3 className={"text-gray-700 inline-block w-full text-center text-2xl"}>No active courses <FaSadCry className={"inline"}/></h3>
    );
}

export default CourseList;