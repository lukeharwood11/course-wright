import Select from "react-select";
import AsyncSelect from "react-select/async";
import useAxios from "../../../hooks/useAxios";
import {useEffect, useRef, useState} from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import AsyncCreatableSelect from "react-select/async-creatable";
import toast from "react-hot-toast";
import { motion } from 'framer-motion'

const NewAccountEntry = ({ handleAddNewAccount }) => {

    const axios = useAxios()
    const submitRef = useRef()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [entry, setEntry] = useState({})
    const [emailValue, setEmailValue] = useState({})
    const studentOption = { value: { role: 40 }, label: "student" }
    const [typeValue, setTypeValue] = useState(studentOption)

    const options = [
        studentOption,
        { value: { role: 22 }, label: "teacher" },
        { value: { role: 21 }, label: "teacher/admin"}
    ]

    const handleAdd = () => {
        if (!emailValue.email) {
            toast.error("Missing email")
            return
        }
        if (firstName === "" || lastName === "") {
            toast.error("Please add first/last name")
            return
        }
        const account = {
            email: emailValue.email.label,
            firstName: firstName,
            lastName: lastName,
            role: typeValue.value.role,
            id: entry.id
        }

        handleAddNewAccount(account, (success, err) => {
            if (success) {
                toast.success("Added user!")
                // reset everything if it worked
                setEmailValue({})
                setFirstName("")
                setLastName("")
                setEntry({})
                setTypeValue(studentOption)
            }
            if (err) {
                toast.error(err)
            }
        })
    }

    const loadOptions = (input, callback) => {
        axios.get(`/search/users`, { params: { text: input } })
            .then( (r) => {
                callback(r.data.results.map(a => {
                    return {
                        label: a.email,
                        value: a
                    }
                }))
            })
            .catch((err) => {
                callback([])
            })
    }

    const handleEmailSelect = (option) => {
        if (option) {
            setFirstName(option.value.firstName)
            setLastName(option.value.lastName)
            setEntry(option.value)
            setEmailValue({ email: { label: option.label, value: option.label } })
            submitRef.current.focus()
        } else {
            // if there is no entry stored, clear it
            // otherwise leave it since it's a user defined email
            if (entry.email) {
                setFirstName("")
                setLastName("")
            }
            setEmailValue({})
            setEntry({})
        }
    }

    const handleCreate = (email) => {
        if (firstName === entry.firstName && lastName === entry.lastName) {
            setFirstName("")
            setLastName("")
        }
        setEntry({})
        setEmailValue({ email: { label: email, value: email } })
    }

    const allowChange = (e) => {
        return !(entry.firstName && entry.lastName);
    }
    // if the user doesn't exist in the database, it must be a student
    return (
        <motion.div layout className={"grid gap-2 mt-2 p-4 rounded-md dark-text new-account-entry"}>
            <p>Add Member</p>
            <div className={"new-account-entry-grid-top"}>
                <AsyncCreatableSelect
                    className={"text-cursor"}
                    formatCreateLabel={(label) => `Add temporary profile: ${label}`}
                    placeholder={"Email"}
                    value={ emailValue.email }
                    // force the component to re-render when the email value changes
                    key={"email-input-" + emailValue.email}
                    onCreateOption={ handleCreate }
                    onChange={ handleEmailSelect }
                    menuPortalTarget={document.body} menuPosition={'fixed'}
                    isClearable cacheOptions loadOptions={loadOptions} />
                <Select
                    isDisabled={entry.email === undefined}
                    isSearchable={false}
                    options={ options }
                    value={ entry.email === undefined ? studentOption : typeValue }
                    onChange={ (value) => setTypeValue(value)}
                />
            </div>
            <div className={"new-account-entry-grid-bottom "}>
                <input disabled={!allowChange()} className={`${allowChange() ? "" : "bg-blue-200"} new-account-entry-input`} placeholder={"First Name"} onChange={(e) => {
                    setFirstName(e.target.value)
                }} value={ firstName }/>
                <input disabled={!allowChange()} className={`${allowChange() ? "" : "bg-blue-200"} new-account-entry-input`} placeholder={"Last Name"} onChange={(e) => {
                    setLastName(e.target.value)
                }} value={ lastName }/>
                <button ref={submitRef} onClick={ handleAdd } className={"new-account-button flex justify-center items-center"}><AiOutlineUserAdd size={ 30 }/></button>
            </div>
        </motion.div>
    )
}

export default NewAccountEntry