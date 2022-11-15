import useMemoryState from "../hooks/useMemoryState";
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "../api/axios";
import useCreateAccountContext from "../hooks/useCreateAccountContext";
import AccountTypeSlide from "./AccountTypeSlide";
import StudentInfoSlide from "./StudentInfoSlide";
import toast from "react-hot-toast";


const CreateAccountSlideBox = ({ setLoading }) => {
    const [index, setIndex] = useMemoryState(0, "slide-index")
    const navigate = useNavigate()
    const {
        emailRef, accountType, emailMsg, setEmailMsg,
        firstName, setFirstName, lastName, setLastName,
        email, setEmail, password, setPassword, setRepeatPassword,
        setMsg, clearMemoryState
    } = useCreateAccountContext()

    /**
     * Only useful if more slides are added in the future
     * Display every slide one at a time with a next and back button to toggle
     */
    const handleNext = () => {
        setIndex(1)
    }

    const handleBack = () => {
        // note, this assumes that a back arrow
        // will only be placed only if one can go back
        setIndex(0)
    }

    const validInput = () => {
        return true
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault()
        setLoading(true)
        const id = toast.loading("Creating New Account...")
        if (validInput()) {
            try {
                await axios.post(
                    "/create-account", JSON.stringify({
                        firstName, lastName, email, password, type: accountType
                    }),
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                )
                // successful, so clear from memory
                clearMemoryState()
                toast.success("Account Created!", { id: id })
                navigate("/sign-in")
            } catch (e) {
                if (!e?.response) {
                    toast.error("No Server Response.", { id: id })
                } else if (e?.response.status === 409) {
                    setEmail("")
                    toast.error("Email already exists.", { id: id })
                    setMsg("")
                } else if (e?.response.status === 403) {
                    toast.error(e?.message, { id: id })
                } else {
                    toast.error("Failed to create account... please try again.", { id: id })
                }
            }
        } else {
            toast.error("Check to see that all required fields are filled out.", { id: id })
        }
        setLoading(false)
    }

    return (
        <>
            {accountType === "" || index === 0 ?
                <AccountTypeSlide key={0} handleNext={ handleNext }/>
                : <StudentInfoSlide key={1}  handleCreateAccount={ handleCreateAccount } handleBack={ handleBack }/>
            }
        </>
    )
}

export default CreateAccountSlideBox
