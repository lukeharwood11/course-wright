import React, {createContext, useEffect, useRef, useState} from "react";
import useMemoryState from "../hooks/useMemoryState";

export const CreateAccountContext = createContext({})

const CreateAccountProvider = ({children}) => {
    const nameRef = useRef()
    const emailRef = useRef()
    const lastNameRef = useRef()
    const passwordRef = useRef()
    const [accountType, setAccountType] = useMemoryState("", "accountType")
    const [firstName, setFirstName] = useMemoryState("", "formFirstName")
    const [lastName, setLastName] = useMemoryState("", "formLastName")
    const [email, setEmail] = useMemoryState("", "formEmail")
    const [emailMsg, setEmailMsg] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [pwdMsg, setPwdMsg] = useState("")
    const [repeatPwdMsg, setRepeatPwdMsg] = useState("")

    const clearMemoryState = () => {
        window.sessionStorage.setItem("formFirstName", JSON.stringify(""))
        window.sessionStorage.setItem("formLastName", JSON.stringify(""))
        window.sessionStorage.setItem("formEmail", JSON.stringify(""))
        window.sessionStorage.setItem("accountType", JSON.stringify(""))
        window.sessionStorage.setItem("slide-index", JSON.stringify(""))
    }

    return (
        <CreateAccountContext.Provider
            value={{
                nameRef, emailRef, accountType, setAccountType, passwordRef, lastNameRef,
                firstName, setFirstName, lastName, setLastName, emailMsg, setEmailMsg,
                email, setEmail, password, setPassword, repeatPassword, setRepeatPassword,
                msg, setMsg, pwdMsg, setPwdMsg, repeatPwdMsg, setRepeatPwdMsg, clearMemoryState
        }}>
            {children}
        </CreateAccountContext.Provider>
    );
}

export default CreateAccountProvider