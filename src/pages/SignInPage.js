import React, {useContext, useState} from 'react'
import {motion} from "framer-motion";
import {AppContext} from "../App";
import {AiOutlineUser} from 'react-icons/ai'
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail, AiOutlineLogin } from 'react-icons/ai'

const SignInPage = (props) => {
    const {setActiveUser} = useContext(AppContext)
    const handleSignIn = () => {

    }
    return (
        <motion.div
            initial={{ opacity: 0, y: "-1vh" }}
            animate={{ opacity: 1, y:0 }}
            transition={{ ease: "anticipate", duration: 1}}
            exit={{opacity: 0, scale: 0}}
            className={"dialog w-full h-full bg-blue-500"}>
            <div className={"drop-shadow-lg rounded-lg flex justify-center flex-col h-1/2 w-1/2 mt-5 self-start"}>
                <div><h1 className={"border-b-2 border-gray-100 mb-2 p-2 text-white text-2xl"}>Sign In</h1></div>
                <div className={"h-30 flex items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineMail className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input type={"email"} className={"bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"Email"}/>
                </div>

                <div className={"h-30 flex items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><RiLockPasswordLine className={"bg-white text-blue-500 p-2 rounded-full"} size={ 45 }/></div>
                    <input className={"bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"Password"} type={"password"}/>
                </div>
                <div className={"h-30 flex items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineLogin className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <motion.button whileTap={{ scale: .9 }} onClick={handleSignIn} className={"bg-white inline rounded-full text-blue-500 p-3 w-5/6 text-2xl m-2"}>Log In</motion.button>
                </div>
                <p className={"text-right text-gray-200 p-2"}>Don't have an account? <a className={"text-gray-700 underline"} href={"/create-account"}>Create one!</a></p>
            </div>
        </motion.div>
    );
}

export default SignInPage;