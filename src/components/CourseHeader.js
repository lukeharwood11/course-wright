import {motion} from "framer-motion";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import {FcAbout} from 'react-icons/fc'
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import React from "react";

const CourseHeader = ({ menuOpen, handleToggle, title}) => {
    const actions = []
    return (
        <section className={"course-header"}>
            <div className={"flex items-center gap-3"}>
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
            </div>

            {/*<SpeedDial*/}
            {/*    ariaLabel="SpeedDial Open"*/}
            {/*    sx={{ right: 0, position: 'static', '& .MuiFab-primary': { backgroundColor: 'var(--blue)', color: 'white' } }}*/}
            {/*    icon={<FcAbout size={40}  />}*/}
            {/*    direction={"left"}*/}
            {/*>*/}
            {/*    {actions.map((action) => (*/}
            {/*        <SpeedDialAction*/}
            {/*            onClick={action.action}*/}
            {/*            key={action.name}*/}
            {/*            icon={action.icon}*/}
            {/*            tooltipTitle={action.name}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</SpeedDial>*/}
        </section>
    );
}

export default CourseHeader;