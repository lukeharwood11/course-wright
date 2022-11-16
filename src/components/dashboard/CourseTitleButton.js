import {motion} from "framer-motion";
import useDashboardContext from "../../hooks/useDashboardContext";
import {BsThreeDotsVertical} from "react-icons/bs";

const CourseTitleButton = ({selected, course, tags}) => {
    const {name, code, date, studentCount} = course
    const { setSelectedCourse } = useDashboardContext()
    tags = [{id: "1", name: "school"}, {id: "2", name:"science"}]
    const r = /([A-Z]+)-/
    const formattedCode = r.exec(code)[1]
    const colors = ["sky", "red", "orange", "amber", "green", "emerald", "purple"]
    const color = colors[parseInt(Math.random() * colors.length)]
    return (
        <>
            <motion.button
                onClick={() => {
                    setSelectedCourse(course.id)
                }}
                className={`course-button box-border drop-shadow-xl`}
                initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}
                transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}>
                <h3 className={"course-button-name bg-"}>{ name }</h3>
                <h4 className={`course-button-code bg-amber-500`}>{ formattedCode }</h4>
                <p className={"course-student-count"}>{ studentCount } students</p>
                <motion.button className={"hover:bg-gray-100 course-button-more"}><BsThreeDotsVertical size={15}/></motion.button>
            </motion.button>
        </>
    );
}

export default CourseTitleButton;