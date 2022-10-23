import useMemoryState from "../hooks/useMemoryState";
import React, {useEffect, useRef, useState} from 'react'
import {AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {AnimatePresence, motion} from "framer-motion";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import {BsLayerForward} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios";
import emailValidator from "email-validator";

import { GiTeacher } from 'react-icons/gi'
import { FaBookReader } from 'react-icons/fa'
import { VscOrganization } from 'react-icons/vsc'

const accountType = {
    STUDENT: "student",
    TEACHER: "teacher",
    ORGANIZATION: "organization"
}

const AccountTypeButton = ({ onClick, children, selected, target, ignore, disabled}) => {

    const whileHover = {
        scale:1.1
    }

    const whileTap = {
        scale:.95
    }

    const className = {
        reg: `${selected === target && !ignore ? "bg-blue-300 text-gray-200" : "bg-white text-blue-500"} flex justify-center items-center logo m-2 p-5 rounded-lg text-3xl`,
        disable: "bg-gray-200 text-gray-300 flex justify-center items-center logo m-2 p-5 rounded-lg text-3xl"
    }

    useEffect(() => {
        console.log(selected)
    })

    return <motion.button
        disabled={disabled}
        onClick={ !disabled ? onClick : {} }
        whileHover={ !disabled ? whileHover : {}}
        whileTap={ !disabled ? whileTap : {}}
        className={ disabled ? className.disable : className.reg}>{children}</motion.button>

}

export const AccountTypeSlide = ({onBack, onNext}) => {
    const [type, setType] = useState("")
    const [valid, setValid] = useState(false)
    const validate = () => {

    }

    const compareType = (t) => {
        return type === t
    }

    const validInput = () => {
        return type === ""
    }

    return (
        <div className={"h-4/5 drop-shadow-2xl w-1/3 box-border flex items-center flex-col justify-center rounded-lg"}>
            <h1 className={"logo text-white text-5xl"}>Select an Account Type</h1>
            <div className={"flex flex-col flex-wrap justify-around rounded-lg p-4"}>
                <div className={"flex"}>
                    <AccountTypeButton onClick={() => setType(accountType.STUDENT)} selected={type} target={accountType.STUDENT}><FaBookReader className={"mr-1"}/>Student</AccountTypeButton>
                    <AccountTypeButton onClick={() => setType(accountType.TEACHER)} selected={type} target={accountType.TEACHER}><GiTeacher className={"mr-1"}/>Teacher</AccountTypeButton>
                </div>
                <AccountTypeButton onClick={() => setType(accountType.ORGANIZATION)} selected={type} target={accountType.ORGANIZATION}><VscOrganization className={"mr-1"}/>Organization</AccountTypeButton>
            </div>
            { /* back and forward button */ }
            <div className={"flex mt-3"}>
                <AccountTypeButton onClick={ onNext } disabled={validInput()} ignore>Next</AccountTypeButton>
            </div>
        </div>
    )
}

const CreateAccountSlideBox = ({slides, handleSubmit}) => {
    const [index, setIndex] = useMemoryState(0, "slide-index")
    const [validState, setValidState] = useState(false)
    // display every slide one at a time with a next and back button to toggle
    const handleNext = () => {
        if (index + 1 === slides.length) {
            handleSubmit()
        } else {
            setIndex(prev => prev + 1)
        }
    }

    const handleBack = () => {
        // note, this assumes that a back arrow
        // will only be placed if one can go back
        setIndex(prev => prev - 1)
    }
    return (
        <>

        </>
    )
}

export default CreateAccountSlideBox
