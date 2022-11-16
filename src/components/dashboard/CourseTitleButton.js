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
                className={`course-button box-border drop-shadow-xl rounded-md`}
                initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}  transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}>
                <h2 className={`flex justify-center items-center course-button-name text-2xl ${selected ? "text-blue-500": ""}`}>
                    {name}
                </h2>
                <p className={"course-button-code text-xl font-bold rounded-lg"}>
                    {code}
                </p>
                <div className={"tag-holder"}>
                    { tags.map((tag) => <h3 key={tag.id} className={"course-button-tag bg-blue-500"}>{tag.name}</h3>)}
                </div>
            </motion.button>
        </>
    );
}

export default CourseTitleButton;