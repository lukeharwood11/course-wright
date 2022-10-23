import axios from "../api/axios";
import useAuth from './useAuth'

const useRefresh = () => {

    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get("/refresh", { withCredentials: true });
        const { user, accessToken } = response.data
        setAuth({ user, accessToken })
    };
    return refresh;
};

export default useRefresh;