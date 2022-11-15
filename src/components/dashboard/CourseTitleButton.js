import {motion} from "framer-motion";
import useDashboardContext from "../../hooks/useDashboardContext";

const CourseTitleButton = ({selected, course, tags}) => {
    const {name, code, date} = course
    const { setSelectedCourse } = useDashboardContext()
    tags = [{id: "1", name: "school"}, {id: "2", name:"science"}]
    return (
        <>
            <motion.button
                onClick={() => {
                    setSelectedCourse(course.id)
                }}
                className={`course-button box-border border-2 drop-shadow-lg  ${selected ? "border-blue-500": "border-transparent"}`}
                initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}  transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}
                whileTap={{scale: .90}}
                whileHover={{scale: 1.1}}>
                <h2 className={`flex justify-center items-center course-button-name text-2xl`}>
                    {name}
                </h2>
                <p className={"course-button-code text-xl font-bold rounded-lg"}>
                    {code}
                </p>
                <div className={"tag-holder bg-gray-200"}>
                    { tags.map((tag) => <h3 key={tag.id} className={"course-button-tag bg-blue-500"}>{tag.name}</h3>)}
                </div>
            </motion.button>
        </>
    );
}

export default CourseTitleButton;