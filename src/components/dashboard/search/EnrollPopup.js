import { motion } from 'framer-motion'
import {parseDateTime} from "../../../regex/regex";

const EnrollPopup = ({ course, handleCloseModal }) => {

    const handleCreateCourse = () => {
        handleCloseModal()
    }

    const created = parseDateTime(course.dateCreated)
    const modified = parseDateTime(course.lastModified)

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            exit={{ opacity: 0 }}
            className={"dark-text flex flex-col justify-center items-center gap-2"}>
            <h1 className={"text-2xl"}>Would you like to start a section?</h1>
            <hr />
            <div className={"flex flex-col w-full gap-5 rounded-lg"}>
                <div className={"p-2 flex gap-2 font-thin items-center"}>
                    <h2 className={"text-3xl bg-white p-2 rounded-lg shadow-lg"}>{ course.name }</h2>
                    <h2 className={"text-3xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white p-2 rounded-lg shadow-lg"}>{ course.code }</h2>
                </div>
                <div className={"p-2 text-xl bg-white drop-shadow-lg rounded-lg"}>
                    <h2>Author: { course.firstName } { course.lastName }</h2>
                    <h2>Subject: { course.subject }</h2>
                    <div className={"flex gap-2 flex-wrap"}>
                        {
                            course.tags?.map(t => <p key={t} className={"course-button-tag bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}>{t}</p>)
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
                    onClick={ handleCreateCourse }
                    whileHover={{ scale: 1.1, x: -5 }}
                    className={"bg-blue-500 rounded-lg p-2"}>
                    Start
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