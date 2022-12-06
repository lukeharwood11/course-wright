import useAuth from "../../../hooks/useAuth";
import {AiOutlinePlus} from "react-icons/ai";
import { motion } from 'framer-motion'
import {useState} from "react";
import CustomModal from "../../elements/CustomModal";
import useDashboardContext from "../../../hooks/useDashboardContext";
import {IoCreateOutline} from "react-icons/io5";
import {FaRecycle} from 'react-icons/fa'
import {account} from "../../utils/defaults";
const NewCourseButton = ({ handleCloseModal, displayModal, handleAddCourse, lockCourseCreation }) => {

    const { auth } = useAuth()

    const handleUse = () => {
        displayModal(
            <motion.div
                layout
                className={"flex flex-col justify-center items-center"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"handle-use"}>
                <button>Hello World!</button>
            </motion.div>
        )
    }

    const handleAdd = () => {
        displayModal(
            <motion.div
                className={"flex flex-col justify-center items-center"}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={"handle-add"}>
                <h1 className={"text-2xl mb-2"}>Add Course</h1>
                <div className={"create-new-course-grid"}>
                    <motion.button
                        onClick={() => {
                            if (!lockCourseCreation) {
                                handleAddCourse(account(auth.user))
                                handleCloseModal()
                            }
                        }}
                        className={"button create-button bg-white shadow-lg"}>
                        Create New
                        <IoCreateOutline size={30}/>
                    </motion.button>
                    <motion.button
                        onClick={ handleUse }
                        className={"button create-button bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white shadow-lg"}>
                        Use Existing
                        <FaRecycle size={30}/>
                    </motion.button>
                </div>
            </motion.div>
        )
    }
    return (
        <>
            <motion.button
                layout
                className={!lockCourseCreation ? "add-course-button": "bg-gray-200"}
                onClick={ handleAdd }>
                <p className={"inline-block"}>Add</p>
                <AiOutlinePlus size={ 30 }/>
            </motion.button>
        </>
    )
}

export default NewCourseButton