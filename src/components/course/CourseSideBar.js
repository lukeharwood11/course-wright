import {AnimatePresence, motion} from "framer-motion";
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import "react-contexify/ReactContexify.css"
import CourseComponentView from "./CourseComponentView";


const CourseSideBar = ({ open }) => {

    function handleItemClick({ event, props, triggerEvent, data }){
        console.log( data );
    }

    const { show } = useContextMenu({
        id: "side-bar",
    });

    return (
        <motion.section
            onContextMenu={ (e) => show({ event: e }) }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "anticipate", duration: 1 }}
            exit={{ opacity: 0 }}
            className={"course-side-bar bg-gradient-to-tr from-indigo-500 via-blue-500 to-purple-500"}>
            <Menu id={"side-bar"}>
                <Item id="directory" data={"directory"} onClick={handleItemClick}>Add Directory</Item>
                <Item id="description" data={"description"} onClick={handleItemClick}>Add Description Page</Item>
                <Submenu label={"Upload"}>
                    <Item id="file" data={"file"} onClick={handleItemClick}>File</Item>
                </Submenu>
            </Menu>
            <CourseComponentView directories={[{name: "First", pages: ["Page 1", "Page 2"]}, {name: "Second", pages: ["Page 1", "Page 2"]}, {name: "Third", pages: ["Page 1", "Page 2"]}]}/>
        </motion.section>
    )
}

export default CourseSideBar;