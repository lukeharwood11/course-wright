import axios from "../api/axios";
import useAuth from '../hooks/useAuth'

const useLogout = () => {

    const { setAuth } = useAuth()

    return async () => {
        axios.get('/logout', {
            "Content-Type": "application/json",
            withCredentials: true
        }).catch(e => console.log(e))
        setAuth({})
    }
}

export default useLogout