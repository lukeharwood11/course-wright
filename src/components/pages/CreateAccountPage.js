import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import {AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import {BsLayerForward} from "react-icons/bs";
import Logo from "../Logo";
import useMemoryState from "../../hooks/useMemoryState";
import emailValidator from 'email-validator'
import axios from "../../api/axios";

import {AccountTypeSlide} from "../CreateAccountSlideBox";

import { useNavigate } from "react-router-dom";

const passwordRegex = /^[a-zA-Z0-9!@#*$%^&.,';()/\\-]{8,}$/

const CreateAccountPage = (props) => {

    const nameRef = useRef()
    const emailRef = useRef()
    const [accountType, setAccountType] = useState("")
    const [firstName, setFirstName] = useMemoryState("", "formFirstName")
    const [lastName, setLastName] = useMemoryState("", "formLastName")
    const [email, setEmail] = useMemoryState("", "formEmail")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [emailMsg, setEmailMsg] = useState("")
    const [pwdMsg, setPwdMsg] = useState("")
    const [repeatPwdMsg, setRepeatPwdMsg] = useState("")
    const navigate = useNavigate()

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        if (validInput()) {
            try {
                await axios.post(
                    "/create-account", JSON.stringify({
                        firstName, lastName, email, password, type: "teacher"
                    }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                )
                setEmail("")
                setFirstName("")
                setLastName("")
                setPassword("")
                setRepeatPassword("")
                navigate("/sign-in")
            } catch (e) {
                if (!e?.response) {
                    setMsg("No Server Response.")
                } else if (e?.response.status === 409) {
                    setEmail("")
                    emailRef.current.focus()
                    setEmailMsg("Email already exists.")
                } else if (e?.response.status === 403) {
                    setMsg(e?.message)
                } else {
                    setMsg("Failed to create account... please try again.")
                }
            }
        } else {
            setMsg("Check to see that all required fields are filled out.")
        }
    }

    const validPassword = () => {
        return passwordRegex.test(password)
    }

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setPwdMsg(
            password === "" || validPassword() ?
                    "" :
                    "Password must have 8 or more characters."
        )
    }, [password])

    useEffect(() => {
        setRepeatPwdMsg(
            repeatPassword === "" || validMatchPassword()?
                    ("") :
                    ("Passwords must match."))
    }, [repeatPassword])

    const validMatchPassword = () => {
        return passwordRegex.test(repeatPassword) && password === repeatPassword
    }

    const validName = () => {
        return firstName.trim() !== "" && lastName.trim() !== ""
    }

    const validEmail = () => {
        return emailValidator.validate(email)
    }

    const handleEmailChange = (e) => {
        if (emailMsg !== "") {
            setEmailMsg("")
        }
        setEmail(e.target.value)
    }

    const handleEmailBlur = () => {
        if (!validEmail()) {
            setEmailMsg("Please enter a valid email address.")
        }
    }

    const validInput = () => {
        return validName() && validEmail() && validMatchPassword() && validPassword()
    }

    const typeOptions = [
        { value: "student", label: "Student" },
        { value: "teacher", label: "Teacher" }
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: "-1vh" }}
            animate={{ opacity: 1, y:0 }}
            transition={{ ease: "anticipate", duration: 1}}
            exit={{opacity: 0, scale: 0}}
            className={"overflow-hidden drop-shadow-lg h-full dialog bg-blue-500 items-center flex justify-center"}>
            <Logo/>
            <form
                onSubmit={ handleCreateAccount }
                className={"h-4/5 drop-shadow-2xl w-1/3 box-border flex items-center flex-col justify-center rounded-lg"}>
                <div className={"flex "}>
                    <h1 className={"inline flex justify-center items-center border-b-2 border-gray-100 mb-2 p-2 text-white text-2xl"}>Create Account</h1></div>
                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineUser className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input
                        onChange={ (e) => setFirstName(e.target.value) }
                        value={ firstName }
                        ref={ nameRef }
                        type={"text"}
                        className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"}
                        placeholder={"First Name"}/>
                </div>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineUser className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input
                        onChange={ (e) => setLastName(e.target.value) }
                        value={ lastName }
                        type={"text"}
                        className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"}
                        placeholder={"Last Name"}/>
                </div>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineMail className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input
                        onChange={ handleEmailChange }
                        value={ email }
                        ref={ emailRef }
                        type={"email"}
                        onBlur={ handleEmailBlur }
                        className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"}
                        placeholder={"Email"}/>
                </div>

                <AnimatePresence>
                    {
                        emailMsg === "" ||
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, scale: 0}}
                            className={"logo inline-block text-center text-xl"}> { emailMsg }</motion.p>
                    }
                </AnimatePresence>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><RiLockPasswordLine className={"bg-white text-blue-500 p-2 rounded-full"} size={ 45 }/></div>
                    <input
                        onChange={ (e) => setPassword(e.target.value) }
                        value={ password }
                        className={`${validPassword() ? "text-blue-500" : "text-red-400"} text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2`}
                        placeholder={"Password"}
                        type={"password"}/>
                </div>
                <AnimatePresence>
                    {
                        pwdMsg === "" ||
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, scale: 0}}
                            className={"logo inline-block text-center text-xl"}> { pwdMsg }</motion.p>
                    }
                </AnimatePresence>


                <div className={"h-30 flex w-full  items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><RiLockPasswordFill className={"bg-white text-blue-500 p-2 rounded-full"} size={ 45 }/></div>
                    <input
                        onChange={ (e) => setRepeatPassword(e.target.value) }
                        value={ repeatPassword }
                        className={`${validMatchPassword() ? "text-blue-500" : "text-red-400"} text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2`}
                        placeholder={"Confirm Password"}
                        type={"password"}/>
                </div>
                <AnimatePresence>
                    {
                        repeatPwdMsg  === "" ||
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0, scale: 0}}
                            className={"logo inline-block text-center text-xl"}>{ repeatPwdMsg }</motion.p>
                    }
                </AnimatePresence>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><BsLayerForward className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <motion.button
                        whileTap={ validInput() && { scale: .9 } }
                        disabled={ !validInput() }
                        className={`${ validInput() ? "bg-white" : "bg-gray-500 opacity-50"} transition-opacity inline rounded-full text-blue-500 p-3 w-5/6 text-2xl m-2`}>Create Account</motion.button>
                </div>
                <p
                    className={"text-right text-gray-200 p-2"}>Already have an account? <a className={"text-gray-700 underline"} href={"/sign-in"}>Sign in!</a></p>
                <h1 className={"text-2xl text-white"}>{msg}</h1>
            </form>
        </motion.div>
    );
}

export default CreateAccountPage;