import {motion} from "framer-motion";
import React from "react";
import {AiOutlineLogin, AiOutlineMail, AiOutlineUser} from "react-icons/ai";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import {BsLayerForward} from "react-icons/bs";
import Logo from "../Logo";

const SignInPage = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: "-1vh" }} animate={{ opacity: 1, y:0 }}  transition={{ ease: "anticipate", duration: 1}} exit={{opacity: 0, scale: 0}}
            className={"overflow-hidden drop-shadow-lg h-full dialog bg-blue-500 items-center flex justify-center"}>
            <Logo/>
            <div className={"h-4/5 drop-shadow-2xl w-1/3 box-border flex items-center flex-col justify-center rounded-lg"}>
                <div className={"flex "}>
                    <h1 className={"inline flex justify-center items-center border-b-2 border-gray-100 mb-2 p-2 text-white text-2xl"}>Create Account</h1></div>
                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineUser className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input type={"text"} className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"First Name"}/>
                </div>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineUser className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input type={"text"} className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"Last Name"}/>
                </div>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineMail className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <input type={"email"} className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"Email"}/>
                </div>

                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><RiLockPasswordLine className={"bg-white text-blue-500 p-2 rounded-full"} size={ 45 }/></div>
                    <input className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"Password"} type={"password"}/>
                </div>

                <div className={"h-30 flex w-full  items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><RiLockPasswordFill className={"bg-white text-blue-500 p-2 rounded-full"} size={ 45 }/></div>
                    <input className={"text-blue-500 bg-white inline rounded-full p-3 w-5/6 text-2xl m-2"} placeholder={"Confirm Password"} type={"password"}/>
                </div>
                <div className={"h-30 flex w-full items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><BsLayerForward className={"bg-white p-2 text-blue-500 rounded-full"} size={ 45 }/></div>
                    <motion.button whileTap={{ scale: .9 }} className={"bg-white inline rounded-full text-blue-500 p-3 w-5/6 text-2xl m-2"}>Create Account</motion.button>
                </div>
                <p className={"text-right text-gray-200 p-2"}>Already have an account? <a className={"text-gray-700 underline"} href={"/sign-in"}>Sign in!</a></p>
            </div>
        </motion.div>
    );
}

export default SignInPage;