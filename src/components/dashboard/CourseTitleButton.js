import {AnimatePresence, motion} from "framer-motion";
import useDashboardContext from "../../hooks/useDashboardContext";
import {BsThreeDotsVertical} from "react-icons/bs";
import toast from "react-hot-toast";
import {useState} from "react";
import Modal from "../elements/Modal";

const CourseTitleButton = ({index, selected, course, tags}) => {
    const {name, code, date, studentCount} = course
    const { setSelectedCourse } = useDashboardContext()
    tags = [{id: "1", name: "school"}, {id: "2", name:"science"}]
    const r = /([A-Z]+)-/
    const regexRes = r.exec(code)
    const firstTwo = name.split(" ").slice(0, 2)
    const backup = firstTwo.length === 1 ? firstTwo[0][0] : firstTwo[0][0] + firstTwo[1][0]
    const formattedCode = regexRes ? regexRes[1] : backup
    const colors = ["sky", "red", "orange", "amber", "green", "emerald", "purple"]
    const color = colors[Math.round(Math.random() * colors.length)]
    const [modal, setModal] = useState(false)

    const handleMore = (e) => {
        e.stopPropagation()
        openModel()
    }

    const closeModel = () => {
        setModal(false)
    }

    const openModel = () => {
        setModal(true)
    }

    return (
        <AnimatePresence>
            { modal && <Modal key={"modal"} handleClose={ closeModel }>
                <div>
                    <h1 className={"font-thin"}>
                        Course Options... Coming Soon
                    </h1>
                </div>
            </Modal> }
            <motion.div
                onDoubleClick={() => {
                    toast.success(`${code === "" ? backup: code}: ${name}`)
                }}
                onClick={() => {
                    setSelectedCourse(index)
                }}
                className={`course-button box-border drop-shadow-xl`}
                initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}
                transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}>
                <h3 className={"course-button-name"}>{ name }</h3>
                <h4 className={`course-button-code ${selected ? "bg-purple-500": "bg-indigo-500"}`}>{ formattedCode }</h4>
                <div className={"course-button-more"}>
                    <motion.button onClick={ handleMore } className={"w-full h-full"}><BsThreeDotsVertical size={15}/></motion.button>
                </div>
                <p className={"course-student-count"}>{ studentCount } students</p>
            </motion.div>
        </AnimatePresence>
    );
}

export default CourseTitleButton;