import { FaUser } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import "react-contexify/ReactContexify.css"
import useAuth from "../../../hooks/useAuth";

const CourseEnrollmentPreviewButton = ({ account }) => {
    const { auth } = useAuth()

    const getUserName = () => {
        if (!account) return undefined
        return `${account.lastName}, ${account.firstName}`
    }

    const isTeacher = () => {
        // section creator/admin | teacher/admin | teacher
        return account.role === 20 || account.role === 21 || account.role === 22;

    }

    const isMe = () => {
        return auth.user.email === account.email
    }

    const handleItemClick = ({ data }) => {

    }

    const { show } = useContextMenu({
        id: "enrollment-button",
    });

    return (
        <motion.li layout onContextMenu={ (e) => e.preventDefault() }
            className={`relative no-select course-enrollment-preview-button ${isTeacher() ? "teacher" : "student"}`}>
            {
                isMe() && <p className={"me-tag"}>me</p>
            }
            { getUserName() }
            <Menu id={"enrollment-button"}>
                <Item id="message" data={"message"} onClick={handleItemClick}>Message</Item>
                <Item id="email" data={"email"} onClick={handleItemClick}>Email</Item>

                <Submenu label={"Copy"}>
                    <Item id="copy-name" data={"copy-name"} onClick={handleItemClick}>Name</Item>
                    <Item id="copy-email" data={"copy-email"} onClick={handleItemClick}>Email</Item>
                </Submenu>
            </Menu>

            {
                isTeacher() && <FaUser size={ 20 }/>
            }
        </motion.li>
    )
}

export default CourseEnrollmentPreviewButton