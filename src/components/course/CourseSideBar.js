import {AnimatePresence, motion} from "framer-motion";
import {Item, Menu, Separator, Submenu, useContextMenu} from "react-contexify";
import "react-contexify/ReactContexify.css"


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
            transition={{ ease: "anticipate" }}
            exit={{ opacity: 0 }}
            className={open ? "course-side-bar bg-black": "fixed bg-black"}>
            <Menu id={"side-bar"}>
                <Item id="copy" data={"copy"} onClick={handleItemClick}>Copy</Item>
                <Item id="cut" data={"cut"} onClick={handleItemClick}>Cut</Item>
                <Separator />
                <Item disabled data={"cut"} >Disabled</Item>
                <Separator />
                <Submenu label="Foobar">
                    <Item id="reload" data={"cut"} onClick={handleItemClick}>Reload</Item>
                    <Item id="something" data={"cut"} onClick={handleItemClick}>Do something else</Item>
                </Submenu>
            </Menu>
        </motion.section>
    )
}

export default CourseSideBar;