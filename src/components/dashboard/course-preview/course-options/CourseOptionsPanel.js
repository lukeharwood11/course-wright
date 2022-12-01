import useDashboardContext from "../../../../hooks/useDashboardContext";
import {useEffect, useState} from "react";
import Select from "react-select";
import { motion } from 'framer-motion'
import {Modal, useModal} from "react-morphing-modal";
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import CourseEnrollmentPreview from "../CourseEnrollmentPreview";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";

const CourseOptionsPanel = ({ course }) => {
    const [change, setChange] = useState(false)
    const { lockCourseCreation, setLockCourseCreation, courses, selectedCourse, deleteCourse, updateCourse } = useDashboardContext()
    const [courseObj, setCourseObj] = useState({ ...course })
    const axios = useAxios()

    // {name, code, studentCount, tags, id, pcId, published, role, active, subject, dateCreated, lastModified, license, visibility}

    const handlePublish = () => {
        const id = toast.loading(`${courseObj.published ? "Un-publishing" : "publishing"} course...`)
        const controller = new AbortController()
        axios.put(`/course/publish/${courseObj.id}`, {
            publish: !courseObj.published
        }, {signal: controller.signal})
            .then(r => {
                toast.success(`${courseObj.published ? "Un-published" : "Published"} course!`, { id })
                // this sets changes for the current view
                const obj = { ...courseObj, published: !courseObj.published}
                setCourseObj(obj)
                // this propagates changes back up to the dashboard context
                updateCourse(obj)
            })
            .catch(err => {
                toast.error(`Couldn't ${courseObj.published ? "un-publish": "publish"} course at this time.`, { id })
            })
    }

    const options = [
        { value: 'private', label: 'private' },
        { value: 'public', label: 'public' }
    ]

    return (

        <section className={"course-options-panel"}>
            {
                courseObj.id &&
                <>
                    <div className={"flex gap-2 flex-col course-options-header"}>
                        <h1 className={"text-3xl"}>{ courseObj.name }</h1>
                        <h2 className={"rounded-md p-1 text-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}>{ courseObj.code }</h2>
                        <div className={"flex gap-2 flex-wrap"}>
                            {
                                courseObj.tags?.map(t => <p key={t.value} className={"course-button-tag bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}>{t.value}</p>)
                            }
                        </div>
                    </div>
                    <CourseEnrollmentPreview edit allOptions course={ courseObj } />


                    <div className={"rounded-lg"}>
                        <div>
                            <h2 className={"text-2xl font-thin"}>Visibility</h2>
                        </div>
                        <Select
                            isSearchable={false}
                            options={options}
                            value={{ value: courseObj.visibility, label: courseObj.visibility }}
                            onChange={(value) => {
                                setCourseObj((p) => {
                                    return { ...p, visibility: value.value}
                                })
                            }}
                        />
                    </div>
                    <div className={"flex gap-2 justify-center items-center"}>
                        {
                            courseObj.published ? <AiOutlineEye className="rounded-full" size={30}/> : <AiOutlineEyeInvisible className="rounded-full shadow-xl text-black" size={30}/>
                        }
                        <motion.button
                            onClick={ handlePublish }
                            whileTap={{ scale: .95 }}
                            className={`button published-button inline-block text-white ${ courseObj.published ? "bg-red-900": "bg-indigo-500"}`}>{ courseObj.published ? "un-publish" : "publish"}</motion.button>
                    </div>
                    <div className={"border border-black"}>

                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </>
            }

        </section>
    )
}

export default CourseOptionsPanel;