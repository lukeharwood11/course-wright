import {motion} from "framer-motion";
import React from "react";

const SignInPage = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: "-1vh" }} animate={{ opacity: 1, scale: 1, y:0 }}  transition={{ ease: "anticipate", duration: .5}} exit={{opacity: 0, scale: 0}}
            className={"dialog w-full h-full bg-gray-100"}>
            <div className={"drop-shadow-lg rounded-lg flex justify-center flex-col w-1/3 mt-5 bg-white self-start"}>
                <div><h1 className={"border-b-2 border-gray-100 mb-2 p-2 text-gray-600 text-xl bg-gray-100"}>Create Account</h1></div>
                <input type={"email"} className={"p-3 text-2xl m-2"} placeholder={"Email"}/>
                <input className={"p-3 text-2xl m-2"} placeholder={"Password"} type={"password"}/>
                <input className={"p-3 text-2xl m-2"} placeholder={"Confirm Password"} type={"password"}/>
                <div className={"flex items-end"}>
                    <motion.button whileTap={{ scale: .9}}
                                   className={"w-full bg-blue-500 text-white p-2"}>Create Account
                    </motion.button>
                </div>
                <p className={"text-right text-gray-600 p-2"}>Already have an account? <a className={"text-blue-500 underline"}
                                                                          href={"/sign-in"}>Sign in!</a></p>
            </div>
        </motion.div>
    );
}

export default SignInPage;