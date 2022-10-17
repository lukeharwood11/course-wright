import {motion} from "framer-motion";

const CourseTitleButton = ({course}) => {
    const {name, code, date} = course
    return (
        <li>
            <motion.button whileHover={ {scale: 1.2, x: 50 } } className={"mb-4 drop-shadow-lg flex items-center justify-between text-left w-full text-2xl text-gray-800 bg-white rounded-lg p-2"}>{name}<p className={"bg-gray-100 text-gray-700 rounded-lg p-2 w-1/4 ml-5"}>{code}</p></motion.button>
        </li>
    );
}

export default CourseTitleButton;