import { motion } from 'framer-motion'
import {parseDateTime} from "../../utils/regex/regex";
import toast from "react-hot-toast";
import {CgMore } from "react-icons/cg";
import { AiOutlineLoading } from "react-icons/ai";
import useAxios from "../../../hooks/useAxios";
import {useEffect, useState} from "react";
import useDashboardContext from "../../../hooks/useDashboardContext";

const EnrollPopup = ({ course, handleCloseModal }) => {

    const axios = useAxios()
    const controller = new AbortController()
    const [loading, setLoading] = useState(false)
    const { addNewSection } = useDashboardContext()

    const handleCreateSection = () => {
        setLoading(true)
        axios.post('/enroll/create', {
            courseId: course.id
        }, { signal: controller.signal })
            .then((r) => {
                course.pcId = r.data.pcId
                addNewSection(course)
                handleCloseModal()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const created = parseDateTime(course.dateCreated)
    const modified = parseDateTime(course.lastModified)

    const handleMoreOptions = () => {

    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            className={"no-select dark-text flex flex-col justify-center items-center gap-2"}>
            <div className={"flex flex-col w-full gap-5 rounded-lg"}>
                <div className={"flex gap-3 font-thin items-center justify-start"}>
                    <h2 className={"text-3xl bg-white p-2 rounded-lg shadow-lg"}>{ course.name }</h2>
                    <h2 className={"text-3xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white p-2 rounded-lg shadow-lg"}>{ course.code }</h2>
                    <motion.button
                        className={`rounded-full transition-colors shadow-lg hover:bg-gray-200 p-1`}
                        onClick={ handleMoreOptions }
                        disabled={loading}>
                        {
                            loading ? <AiOutlineLoading className={"animate-spin"} size={ 30 }/>: <CgMore size={ 30 }/>
                        }
                    </motion.button>
                </div>
                <div className={"p-2 text-xl bg-white drop-shadow-lg rounded-lg"}>
                    <h2>Author: <a onClick={() => {
                        // TODO: preview profile
                    }} className={"cursor-pointer hover:underline"}>{ course.firstName } { course.lastName }</a></h2>
                    <h2>Subject: { course.subject }</h2>
                    <div className={"flex gap-2 flex-wrap"}>
                        {
                            course.tags?.map(t => <p key={t.value} className={"course-button-tag bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}>{t.value}</p>)
                        }
                    </div>
                </div>
                <div className={"p-2 text-sm bg-white drop-shadow-lg rounded-lg"}>
                    <h2>Created: { created.date } - { created.time }</h2>
                    <h2>Modified: { modified.date } - { modified.time }</h2>
                </div>
            </div>

            <hr />

            <div className={"text-2xl w-full grid-cols-2 gap-2 justify-center items-center grid text-gray-200"}>
                <motion.button
                    onClick={ handleCreateSection }
                    whileHover={{ scale: 1.1, x: -5 }}
                    className={"bg-blue-500 rounded-lg p-2"}>
                    Create Section
                </motion.button>
                <motion.button
                    onClick={ () => handleCloseModal()}
                    whileHover={{ scale: 1.1, x: 7 }}
                    className={"bg-red-900 rounded-lg p-2"}>
                    Cancel
                </motion.button>
            </div>
        </motion.div>
    )
}

export default EnrollPopup