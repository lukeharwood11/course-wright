import React, {useContext, useState} from 'react'
import {motion} from "framer-motion";
import {AppContext} from "../App";

const SignInPage = (props) => {
    const {setActiveUser} = useContext(AppContext)
    const handleSignIn = () => {

    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}  transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}
            className={"dialog w-full h-full bg-gray-100"}>
            <div className={"drop-shadow-lg rounded-lg flex justify-center flex-col w-1/3 mt-5 bg-white self-start"}>
                <div><h1 className={"rounded-lg mb-2 p-5 text-white text-3xl bg-blue-500"}>Sign In</h1></div>
                <input type={"email"} className={"p-3 text-2xl m-2"} placeholder={"Email"}/>
                <input className={"p-3 text-2xl m-2"} placeholder={"Password"} type={"password"}/>
                <div className={"flex items-end"}>
                    <motion.button onClick={handleSignIn} whileHover={{scale: 1.05, x: 10}} className={"w-full rounded-r-full bg-blue-500 text-white p-2"}>Log In</motion.button>
                </div>
                <p className={"text-right p-2"}>Don't have an account? <a className={"text-blue-500 underline"} href={"/create-account"}>Create one!</a></p>
            </div>
        </motion.div>
    );
}

export default SignInPage;