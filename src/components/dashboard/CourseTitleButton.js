import {motion} from "framer-motion";

const CourseTitleButton = ({course}) => {
    const {name, code, date} = course
    return (
        <>
            <motion.button whileTap={{scale: .95}} whileHover={ {scale: 1.05, x: 2, y: 2 } } className={"w-1/4 text-center shadow-2xl p-2 rounded-lg m-1 bg-white font-semibold"}>
                {name}
                <p className={"text-xl font-bold"}>
                {code}
                </p>
            </motion.button>
        </>
    );
}

export default CourseTitleButton;