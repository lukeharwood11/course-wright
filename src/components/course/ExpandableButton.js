import {Item, Menu, Separator, Submenu, useContextMenu,} from "react-contexify";
import {useEffect, useState} from "react";
import {AnimatePresence, motion } from "framer-motion";
import CourseComponent from "./CourseComponent";

const ExpandableButton = ({ selected, title, id, menuOptions, handleMenuClick, children }) => {

    const [expanded, setExpanded] = useState(false)

    const { show } = useContextMenu({
        id: id,
    });

    const handleContextMenu = (e) => {
        if (menuOptions) {
            show({ event: e })
        }
    }

    const handleExpand = () => {
        setExpanded(prevState => !prevState)
    }

    return (
        <motion.div className={"expandable-button"} layout onContextMenu={ (e) => {
            handleContextMenu(e)
            e.preventDefault()
            e.stopPropagation()
        } }>
            <Menu id={ id }>
                { menuOptions && menuOptions.map((o) => <Item key={ o.text.toLowerCase() } id={o.text.toLowerCase()} data={o.text} onClick={ handleMenuClick }>{o.text}</Item>)}
            </Menu>
            <CourseComponent icon={expanded ? "expand-less" : "expand-more"} handleClick={ handleExpand } name={ title }/>
            <AnimatePresence>
                {
                    expanded &&
                    <motion.div
                        className={"expandable-button-children"}
                        // initial={{ opacity: 0, scale: 0, y: "-50px" }}
                        // animate={{ opacity: 1, scale: 1, y: 0 }}
                        // exit={{ opacity: 0, scale: 0, y: "-50px" }}
                        layout key={"items"}>
                        { children }
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default ExpandableButton