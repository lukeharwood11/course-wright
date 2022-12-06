import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import TagsDisplayEdit from "../../TagsDisplay";
import {BsFillSdCardFill} from "react-icons/bs";
import {FaBars} from 'react-icons/fa'
import useDashboardContext from "../../../hooks/useDashboardContext";
import CustomModal from "../../elements/CustomModal";
import toast from "react-hot-toast";
import {MdCancel} from "react-icons/md";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import useAxios from "../../../hooks/useAxios";
import CourseOptionsPanel from "./course-options/CourseOptionsPanel";
import CourseEnrollmentPreview from "./CourseEnrollmentPreview";
import CoursePreviewActions from "./CoursePreviewActions";
import {CoursePreviewEditView, CoursePreviewView} from "./CoursePreviewView";
import {isSection} from "../../utils/courseUtils";

const CoursePreview = ({ }) => {
    const [course, setCourse] = useState(undefined)
    const { fullModal, fullModalContent, fullModalFullHeight, displayFullModal, handleCloseFullModal, courses, selectedCourse } = useDashboardContext()
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        const newCourse = selectedCourse.id ? findCourse() : undefined
        setCourse(newCourse)
        if (selectedCourse.id === "new") setEdit(true)
        else setEdit(false)
    }, [selectedCourse, courses])

    const findCourse = () => {
        return isSection(selectedCourse) ? courses.find((c) => c.pcId === selectedCourse.id) : courses.find((c) => c.id === selectedCourse.id && !c.pcId)
    }

    return (
        <div className={course ? "preview no-select" : "preview no-select preview-empty"}>
                <AnimatePresence>

                    {
                        fullModal &&
                        <CustomModal fullHeight={fullModalFullHeight} handleClose={ handleCloseFullModal } key={"modal"}>
                            { fullModalContent }
                        </CustomModal>
                    }
                </AnimatePresence>
                {
                    course ?

                        edit ?
                        <CoursePreviewEditView
                            course={ course }
                            setEditMode={ () => setEdit(false) }
                        />
                            : <CoursePreviewView course={ course } setEditMode={ () => setEdit(true)}/>

                        : <motion.h3
                            key={"empty-tag"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{ease: "backOut", duration: 1}}
                            exit={{opacity: 0, width: 0}}
                            className={"text-2xl"}>Select a course to preview</motion.h3>
                }
        </div>
    );
}

export default CoursePreview;