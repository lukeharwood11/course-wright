import useMemoryState from "../hooks/useMemoryState";
import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "../api/axios";
import useCreateAccountContext from "../hooks/useCreateAccountContext";
import AccountTypeSlide from "./AccountTypeSlide";
import StudentInfoSlide from "./StudentInfoSlide";


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

                navigate("/sign-in")
            } catch (e) {
                if (!e?.response) {
                    setMsg("No Server Response.")
                } else if (e?.response.status === 409) {
                    setEmail("")
                    setEmailMsg("Email already exists.")
                    setMsg("")
                } else if (e?.response.status === 403) {
                    setMsg(e?.message)
                } else {
                    setMsg("Failed to create account... please try again.")
                }
            }
        } else {
            setMsg("Check to see that all required fields are filled out.")
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
