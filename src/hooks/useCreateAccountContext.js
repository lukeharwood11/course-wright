import { CreateAccountContext } from "../context/CreateAccountContext";
import { useContext } from 'react'

const useCreateAccountContext = () => {
    return useContext(CreateAccountContext)
}

export default useCreateAccountContext