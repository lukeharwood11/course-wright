import React, {useContext, useEffect, useRef, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {motion} from "framer-motion";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineMail, AiOutlineLogin } from 'react-icons/ai'
import Logo from "../Logo";
import useAuth from "../../hooks/useAuth";
import useMemoryState from "../../hooks/useMemoryState";
import axios from "../../api/axios"
import Loading from "../Loading";
import toast from "react-hot-toast";

const SIGN_IN_URL = "/auth"

const SignInPage = (props) => {
    const { auth, setAuth } = useAuth()
    const emailRef = useRef()
    const [email, setEmail] = useMemoryState("", "email")
    const [password, setPassword] = useState("")
    const [pwdVisible, setPwdVisible] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from.pathname || '/'
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleSignIn = async (e) => {
        e.preventDefault()
        const id = toast.loading("Signing you in...")
        setLoading(true)
        try {
            const response = await axios.post(
                SIGN_IN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            )
            setEmail("")
            setPassword("")

            const { user, accessToken } = response.data
            setAuth({ user, accessToken })
            toast.success(`Welcome ${ user.firstName }!`, { id: id })
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                toast.error('No Server Response', { id: id })
            } else if (err.response?.status === 400) {
                toast.error("Missing Username or Password", { id: id })
            } else if (err.response?.status === 401) {
                toast.error("Incorrect Email or password.", { id: id })
                setPassword("")
            } else {
                toast.error("Login Failed", { id: id })
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        loading ? <Loading/> :
        <motion.div
            initial={{ opacity: 0, y: "-1vh" }}
            animate={{ opacity: 1, y:0 }}
            transition={{ ease: "anticipate", duration: 1}}
            exit={{opacity: 0, scale: 0}}
            className={"overflow-hidden h-full dialog bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 items-center flex justify-center"}>
            <Logo/>
            <form
                onSubmit={ handleSignIn }
                className={"h-4/5 drop-shadow-2xl w-1/3 box-border flex items-center flex-col justify-center rounded-lg"}>
                <div><h1 className={"border-b-2 border-gray-100 mb-2 p-2 text-white text-2xl"}>Sign In</h1></div>
                <div className={"h-30 w-full flex items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineMail className={"bg-white p-2 text-indigo-500 rounded-full"} size={ 45 }/></div>
                    <input type={ "email" }
                           ref={ emailRef }
                           value={ email }
                           onChange={(e) => setEmail(e.target.value)}
                           className={"bg-white inline rounded-full p-3 w-5/6 text-xl m-2"}
                           placeholder={ "Email" }/>
                </div>

                <div className={"h-30 w-full flex items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><RiLockPasswordLine className={"bg-white text-indigo-500 p-2 rounded-full"} size={ 45 }/></div>
                    <input
                        className={"bg-white inline rounded-full p-3 w-5/6 text-xl m-2"}
                        placeholder={"Password"}
                        value={ password }
                        onChange={(e) => setPassword(e.target.value)}
                        type={pwdVisible ? "text" : "password"}/>
                </div>
                <div className={"h-30 w-full flex items-center justify-center"}>
                    <div className={"flex justify-center items-center rounded-lg w-1/7"}><AiOutlineLogin className={"bg-white p-2 text-indigo-500 rounded-full"} size={ 45 }/></div>
                    <motion.button
                        whileTap={{ scale: .9 }}
                        onClick={handleSignIn}
                        className={"bg-white inline rounded-full text-indigo-500 p-3 w-5/6 text-xl m-2"}>
                        Log In</motion.button>
                </div>
                <p
                    className={"text-right text-gray-200 p-2"}>Don't have an account? <a className={"text-gray-700 underline"} href={"/create-account"}>Create one!</a></p>
            </form>
        </motion.div>
    );
}

export default SignInPage;