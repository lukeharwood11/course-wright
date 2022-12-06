import axios from "../api/axios";
import useAuth from '../hooks/useAuth'
import toast from "react-hot-toast";

const useLogout = () => {

    const { setAuth } = useAuth()

    return async () => {
        const id = toast.loading("Logging out...")

        axios.get('/logout', {
            "Content-Type": "application/json",
            withCredentials: true
        }).catch(e => console.log(e)).finally(() => {
            toast("👋", { id: id })
        })

        setAuth({})
    }
}

export default useLogout