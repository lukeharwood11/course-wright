import {AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {AnimatePresence, motion} from "framer-motion";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import {BsLayerForward, BsArrowLeft} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import useCreateAccountContext from "../hooks/useCreateAccountContext";
import {passwordRegex} from "../regex/regex";
import { validate } from 'email-validator'

const StudentInfoSlide = ({handleCreateAccount, handleBack}) => {

    const { nameRef, emailRef,
        firstName, setFirstName, lastName, setLastName, emailMsg, setEmailMsg,
        email, setEmail, password, setPassword, repeatPassword, setRepeatPassword,
        msg, pwdMsg, repeatPwdMsg, accountType, lastNameRef, passwordRef } = useCreateAccountContext()

    const [validInput, setValidInput] = useState(false)

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (emailMsg !== "") {
            setEmailMsg("")
        }
    }

    useEffect(() => {
        if (firstName === "") {
            nameRef.current.focus()
        } else if (lastName === "") {
            lastNameRef.current.focus()
        }
        else if (!validEmail()) {
            emailRef.current.focus()
        } else {
            passwordRef.current.focus()
        }
    }, [])

    const validPassword = () => {
        return passwordRegex.test(password)
    }

    const validMatchPassword = () => {
        return passwordRegex.test(repeatPassword) && password === repeatPassword
    }

    const validEmail = () => {
        return validate(email)
    }

    useEffect(() => {
        setValidInput(
            firstName !== "" && lastName !== "" && validPassword() && validMatchPassword() && validEmail() && accountType !== ""
        )
    }, [firstName, lastName, email, password, repeatPassword])

    return (
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
                    onChange={ (e) => {
                        setLastName(e.target.value)
                    } }
                    value={ lastName }
                    ref={ lastNameRef }
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
                    onBlur={() => {
                        if (!validEmail()) {
                            setEmailMsg("Please enter a valid email.")
                        }
                    }}
                    type={"email"}
                    autoComplete={"username"}
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
                    ref={ passwordRef }
                    autoComplete={"new-password"}
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
                <motion.button
                    type={"button"}
                    onClick={ handleBack } whileHover={{ scale: 1.1 }} className={"flex justify-center items-center rounded-lg w-1/7"}><BsArrowLeft className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></motion.button>
                <motion.button
                    type={"submit"}
                    whileTap={ validInput ? { scale: .9 } : { } }
                    disabled={ !validInput}
                    className={`${ validInput ? "bg-white" : "bg-gray-500 opacity-50"} transition-opacity inline rounded-full text-blue-500 p-3 w-5/6 text-2xl m-2`}>Create Account</motion.button>
            </div>
            <p
                className={"text-right text-gray-200 p-2"}>Already have an account? <a className={"text-gray-700 underline"} href={"/sign-in"}>Sign in!</a></p>
            <h1 className={"text-2xl text-white"}>{msg}</h1>
        </form>
    )
}

export default StudentInfoSlide