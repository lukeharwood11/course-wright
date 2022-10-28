import React, {useEffect} from "react";
import {motion} from "framer-motion";

const AccountTypeButton = ({ onClick, children, selected, target, ignore, disabled}) => {

    const whileHover = {
        scale:1.1
    }

    const whileTap = {
        scale:.95
    }

    const className = {
        reg: `${selected === target && !ignore ? "border border-gray-600 bg-blue-300 text-gray-200" : "bg-white text-blue-500"} flex justify-center items-center logo m-2 p-5 rounded-lg text-3xl`,
        disable: "bg-gray-200 text-gray-300 flex justify-center items-center logo m-2 p-5 rounded-lg text-3xl"
    }

    return <motion.button
        disabled={disabled}
        onClick={ !disabled ? onClick : ()=>{} }
        whileHover={ !disabled ? whileHover : {}}
        whileTap={ !disabled ? whileTap : {}}
        className={ disabled ? className.disable : className.reg}>{children}</motion.button>

}

export default AccountTypeButton