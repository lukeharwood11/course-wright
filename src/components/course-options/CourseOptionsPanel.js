import useDashboardContext from "../../hooks/useDashboardContext";
import {useState} from "react";
import Select from "react-select";
import { motion } from 'framer-motion'

const CourseOptionsPanel = () => {
    const [change, setChange] = useState(false)
    const { lockCourseCreation, setLockCourseCreation, courses, selectedCourse, deleteCourse, updateCourse } = useDashboardContext()
    const course = courses.find(c => c.pcId === selectedCourse)
    const [courseObj, setCourseObj] = useState({ ...course })

    // {name, code, studentCount, tags, id, pcId, published, role, active, subject, dateCreated, lastModified, license, visibility}

    const handlePublish = (publish) => {

    }

    const options = [
        { value: 'private', label: 'private' },
        { value: 'public', label: 'public' }
    ]

    return (
        <section className={"course-options-panel"}>
            <div className={"course-options-header"}>
                <h1 className={"text-3xl"}>{ courseObj.name }</h1>
                <h2 className={"rounded-md p-1 text-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}>{ courseObj.code }</h2>
                <div className={"mt-2 flex gap-2 flex-wrap"}>
                    {
                        courseObj.tags.map(t => <p key={t.value} className={"course-button-tag bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}>{t.value}</p>)
                    }
                </div>
            </div>

            <div className={"rounded-lg"}>
                <div>
                    <h2 className={"text-2xl font-thin"}>Visibility</h2>

                </div>
                <Select
                    isSearchable={false}
                    options={options}
                    value={{ value: courseObj.visibility, label: courseObj.visibility }}
                    onChange={(value) => {
                        setCourseObj((prevState) => {
                            return {
                                ...prevState,
                                visibility: value.value
                            }
                        })
                    }}
               />
            </div>
            <div>
                <motion.button className={`button inline-block text-white ${ courseObj.published ? "bg-red-900": "bg-indigo-500"}`}>{ courseObj.published ? "un-publish" : "publish"}</motion.button>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </section>
    )
}

export default CourseOptionsPanel;