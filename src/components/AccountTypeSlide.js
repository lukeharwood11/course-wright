import React, {useState} from "react";
import {FaBookReader} from "react-icons/fa";
import {GiTeacher} from "react-icons/gi";
import {VscOrganization} from "react-icons/vsc";
import AccountTypeButton from "./AccountTypeButton";
import { accountTypes } from "../api/constants";
import useCreateAccountContext from "../hooks/useCreateAccountContext";

export const AccountTypeSlide = ({ handleNext }) => {
    const { accountType, setAccountType } = useCreateAccountContext()
    const validate = () => {

    }

    const compareType = (t) => {
        return accountType === t
    }

    const validInput = () => {
        return accountType === ""
    }

    return (
        <div className={"h-4/5 drop-shadow-2xl w-1/3 box-border flex items-center flex-col justify-center rounded-lg"}>
            <h1 className={"logo text-white text-5xl"}>Select an Account Type</h1>
            <div className={"flex flex-wrap justify-around rounded-lg p-4"}>
                <AccountTypeButton onClick={() => setAccountType(accountTypes.STUDENT)} selected={accountType} target={accountTypes.STUDENT}><FaBookReader className={"mr-1"}/>Student</AccountTypeButton>
                <AccountTypeButton onClick={() => setAccountType(accountTypes.TEACHER)} selected={accountType} target={accountTypes.TEACHER}><GiTeacher className={"mr-1"}/>Teacher</AccountTypeButton>
            </div>
            { /* back and forward button */ }
            <div className={"flex mt-3"}>
                <AccountTypeButton  onClick={ handleNext } disabled={validInput()} ignore>Next</AccountTypeButton>
            </div>
        </div>
    )
}

export default AccountTypeSlide