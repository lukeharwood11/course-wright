import {motion} from "framer-motion";
import React, {useContext} from "react";
import CourseEnrollmentPreviewButton from "./CourseEnrollmentPreviewButton";
import "react-contexify/ReactContexify.css"
import {Item, Menu, Submenu, useContextMenu} from "react-contexify";
import NewAccountEntry from "./NewAccountEntry";
import useDashboardContext from "../../../hooks/useDashboardContext";
import useAxios from "../../../hooks/useAxios";
import {permissions, verifyRole} from "../../../utils/permissions";
import useAuth from "../../../hooks/useAuth";

const CourseEnrollmentPreview = ({ handleAddRemoveAccount, course, allowScroll=false, allOptions=false, edit=false }) => {

    const { addRemoveAccount, updateCourse } = useDashboardContext()
    const axios = useAxios()
    const { auth } = useAuth()

    const handleAddNewAccount = (account, callback) => {
        // TODO send post request to enrollment and add setCourseObj to then()
        axios.post('/enroll', {
            pcId: course.pcId,
            account: account
        })
            .then(r => {
                account.id = r.data.id
                // propagate changes to the context
                addRemoveAccount(course.pcId, account)
                // propagate changes to the modal
                handleAddRemoveAccount(account)
                callback("Added user to section!")
            })
            .catch(err => {
                if (err?.response?.status === 409) {
                    callback(undefined, "Account already enrolled.")
                } else {
                    callback(undefined, "Failed to add new account")
                }
            })
    }

    const canEnroll = () => {
        return course.accounts.filter(a => {
            return a.email === auth.user.email && verifyRole(a.role, permissions.sectionModification)
        }).length > 0
    }

    return (
        <div
            key={"course-students"}
            className={`course-enrollment drop-shadow-xl text-indigo-500  bg-white p-2 outline-0 flex flex-col gap-1 ${allowScroll ? "overflow-y-auto": ""}`}>
            <h1 className={"text-xl"}>Members</h1>
            {
                edit && canEnroll() &&
                <NewAccountEntry handleAddNewAccount={ handleAddNewAccount }/>
            }
            <ul className={"flex flex-col gap-1"}>
                {
                    course && course.accounts.length > 0 &&
                    course.accounts.map((account, i) => {
                        return <CourseEnrollmentPreviewButton key={ i } account={ account } />
                    })
                }
            </ul>
        </div>
    )
}

export default CourseEnrollmentPreview