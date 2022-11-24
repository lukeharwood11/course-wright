import {motion} from "framer-motion";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";

const CourseHeader = ({ menuOpen, handleToggle, title}) => {
    return (
        <section className={"course-header"}>
            <motion.button
                whileHover={{rotate: 180, borderRadius: "50%"}}
                whileTap={{rotate: 90 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "anticipate" }}
                exit={{ opacity: 0 }}
                className={"rounded-lg p-1 bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500 text-white"}
                onClick={ handleToggle } >
                {
                    menuOpen ? <AiOutlineClose size={35}/> : <AiOutlineMenu size={35}/>
                }
            </motion.button>
            <h1>{ title }</h1>
        </section>
    );
}

export default CourseHeader;