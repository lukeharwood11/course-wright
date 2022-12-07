import {BsBoxArrowDownLeft} from "react-icons/bs";
import {AiOutlineMore} from 'react-icons/ai'
import { motion } from 'framer-motion'
import useDashboardContext from "../../../hooks/useDashboardContext";
import EnrollPopup from "./EnrollPopup";
const SearchResult = ({ result }) => {
    const {name, code, firstName, lastName, lastModified, dateCreated } = result

    const { displayFullModal, handleCloseFullModal } = useDashboardContext()

    const handleMoreOptions = () => {

    }

    const handleEnroll = () => {
        displayFullModal(<EnrollPopup handleCloseModal={ handleCloseFullModal } course={ result }/>)
    }

    return (
        <div className={"no-select search-result dark-text course-preview-container"}>
            <h1 className={"text-sm bg-white rounded-lg p-2 text-center"}>{ result.name }</h1>
            <h2 className={"text-center"}>{ result.code }</h2>
            <h2>{ `${lastName}, ${firstName}`}</h2>
            <div className={"flex justify-around items-center gap-2"}>
                <motion.button
                    onClick={ handleEnroll }
                whileHover={{ scale: 1.1 }}>
                    <BsBoxArrowDownLeft size={ 20 }/>
                </motion.button>
            </div>
        </div>
    )
}

export default SearchResult