import { AiOutlineProfile } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { MdExpandMore, MdExpandLess, MdOutlineGppMaybe, MdOutlineAssignmentLate, MdOutlineAssignment } from 'react-icons/md'

const pageIcon = () => {
    return <AiOutlineProfile size={30}/>
}

const expandMoreIcon = () => {
    return <MdExpandMore size={30} />
}

const expandLessIcon = () => {
    return <MdExpandLess size={30} />
}

const assignmentIcon = () => {
    return <MdOutlineAssignment size={30} />
}

const suggestion = () => {
    return <MdOutlineGppMaybe size={30} />
}

const getIcon = (id) => {
    switch (id) {
        case ("page"):
            return pageIcon()
        case ("expand-more"):
            return expandMoreIcon()
        case ("expand-less"):
            return expandLessIcon()
        case ("assignment"):
            return assignmentIcon()
        default:
            return suggestion()
    }
}

const CourseComponent = ({ disableLayout=false, icon, name, handleClick }) => {

    return (
        <motion.div
            layout={ !disableLayout }
            onClick={ handleClick }
            whileTap={{ scale: .95 }}
            className={"course-component no-select"}>
            { getIcon(icon) }
            <h1>{ name }</h1>
        </motion.div>
    )
}

export default CourseComponent;