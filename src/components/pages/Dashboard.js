import React, { useState, useEffect } from "react";
import CourseList from "../dashboard/CourseList";
import DashboardLowerPanel from "../dashboard/DashboardLowerPanel";
import ToolBar from "../dashboard/ToolBar";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth"

const Dashboard = (props) => {
    const [searchActive, setSearchActive] = useState(false);
    const [courses, setCourses] = useState([]);
    const axiosPrivate = useAxios();
    const { auth } = useAuth()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getCourses = async () => {
            axiosPrivate.get(`/courses/${auth.user.id}`, {signal: controller.signal})
                .then(r => {
                    isMounted && setCourses(r.data.courses)
                })
                .catch(err => console.log(err))
        }
        getCourses()
        return () => {
            isMounted = false;
            // if the component unmounts before fulfilling the request,
            // our state will try to set, and we'll get an error
            controller.abort()
        };
    }, []);

    return (
        <div className="flex justify-between w-full h-full">
            <div className="border-box w-1/2 bg-white">
                <div className="border-box h-1/2 rounded-lg bg-gray-100">
                    <CourseList courses={courses} />
                </div>
                <div className="border-box h-1/2">
                    <DashboardLowerPanel />
                </div>
            </div>
            <div className="border-box w-1/2 bg-white">
                <ToolBar
                    key={1}
                    onClick={() => {
                        setSearchActive((prevState) => !prevState);
                    }}
                    searchActive={searchActive}
                    onSubmit={() => {
                        console.log("submission");
                    }}
                    onClick1={() => console.log("Submit Button.")}
                />
            </div>
        </div>
    );
};

export default Dashboard;
