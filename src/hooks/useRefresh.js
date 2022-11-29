import axios from "../api/axios";
import useAuth from './useAuth'

const useRefresh = () => {

    const { setAuth } = useAuth()

    return async () => {
        const response = await axios.get("/refresh", {withCredentials: true});
        const {user, accessToken} = response.data
        setAuth({user, accessToken})
        return accessToken
    };
};

export default useRefresh;