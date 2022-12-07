import useDashboardContext from "../../../../hooks/useDashboardContext";
import {useEffect, useState} from "react";
import Select from "react-select";
import { motion } from 'framer-motion'
import {Modal, useModal} from "react-morphing-modal";
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import {AiOutlineEyeInvisible, AiOutlineEye, AiOutlineDelete} from "react-icons/ai";
import CourseEnrollmentPreview from "../CourseEnrollmentPreview";
import useAxios from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import CustomModal from "../../../elements/CustomModal";
import ConfirmationDialog from "../../../dialogs/ConfirmationDialog";

const CourseOptionsPanel = ({ course }) => {
    const [change, setChange] = useState(false)
    // unfortunately due to poor structure, this modal is called from a function meaning that the course prop
    // cannot be updated, so we must have a copy of the state and update both simultaneously to cope
    const [courseObj, setCourseObj] = useState({ ...course })
    const [modal, setModal] = useState(false)
    const [confirmText, setConfirmText] = useState("")
    const { setPublished, updateFields, lockCourseCreation, setLockCourseCreation, courses, selectedCourse, deleteCourse, updateCourse } = useDashboardContext()
    const axios = useAxios()

    const addRemoveAccount = (account, add=true) => {
        setCourseObj((prevState) => {
            if (add) {
                return {
                    ...prevState,
                    accounts: [...prevState.accounts, account]
                }
            }
            return {
                ...prevState,
                accounts: prevState.accounts.filter(c => c.id !== account.id)
            }
        })
    }

    // {name, code, studentCount, tags, id, pcId, published, role, active, subject, dateCreated, lastModified, license, visibility}

    const handlePublish = () => {
        const id = toast.loading(`${course.published ? "Un-publishing" : "publishing"} course...`)
        const controller = new AbortController()
        axios.put(`/course/publish/${course.id}`, {
            publish: !courseObj.published
        }, {signal: controller.signal})
            .then(r => {
                toast.success(`${courseObj.published ? "Un-published" : "Published"} course!`, { id })
                // this propagates changes back up to the dashboard context
                setPublished(courseObj.id, !courseObj.published)
                // this sets changes for the current view
                setCourseObj((prev) => {
                    return {
                        ...prev,
                        published: !prev.published
                    }
                })
            })
            .catch(err => {
                toast.error(`Couldn't ${courseObj.published ? "un-publish": "publish"} course at this time.`, { id })
            })
    }

    const handleChangeVisibility = () => {
        // TODO implement
        const id = toast.loading("Updating Course...")
        const controller = new AbortController()
        axios.put(`/course/visibility/${course.id}`, {
            publish: !courseObj.published
        }, {signal: controller.signal})
            .then(r => {
                toast.success("Updated Course!", { id })
                // this sets changes for the current view
                // TODO FIXME
                const obj = { ...course, published: !courseObj.visibility}
                // this propagates changes back up to the dashboard context
                updateCourse(obj)
                setCourseObj(obj)
            })
            .catch(err => {
                toast.error(`Couldn't update the course at this time.`, { id })
            })
    }

    const handleDelete = () => {
        // TODO implement confirmation dialog
    }

    const options = [
        { value: 'private', label: 'private' },
        { value: 'public', label: 'public' }
    ]

    const handleVisibilityChange = (value) => {
        if (value.value === course.visibility) return
        setConfirmText("Are you sure you would like to change the course visibility?")
        // setCourseObj((p) => {
        //     return { ...p, visibility: value.value}
        // })
        setModal(true)
    }

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

                    <CourseEnrollmentPreview edit allOptions handleAddRemoveAccount={ addRemoveAccount } course={ courseObj } />

                    <div className={"rounded-lg"}>
                        <div>
                            <h2 className={"text-2xl font-thin"}>Visibility</h2>
                        </div>
                        <Select
                            isSearchable={false}
                            options={options}
                            value={{ value: courseObj.visibility, label: courseObj.visibility }}
                            onChange={(value) => {
                                handleVisibilityChange(value)
                            }}
                        />
                    </div>
                    <div className={"flex gap-2 items-center justify-center"}>
                        {
                            courseObj.published ? <AiOutlineEye className="rounded-full" size={20}/> : <AiOutlineEyeInvisible className="rounded-full shadow-xl text-black" size={30}/>
                        }
                        <button
                            onClick={ handlePublish }
                            className={`button published-button inline-block text-white ${ courseObj.published ? "bg-red-900": "bg-indigo-500"}`}>{ courseObj.published ? "un-publish" : "publish"}</button>
                        <AiOutlineDelete size={20}/>
                        <button
                            onClick={ handleDelete }
                            className={`delete-button button published-button inline-block text-white ${ courseObj.published ? "bg-red-900": "bg-indigo-500"}`}>{"delete"}</button>
                    </div>
                    {
                        modal &&
                        <ConfirmationDialog handleClose={() => setModal(false)} confirmText={ confirmText } onCancel={ () => {} } onConfirm={ () => {} }/>
                    }
                </>
            }

        </section>
    )
}

export default CourseOptionsPanel;