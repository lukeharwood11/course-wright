import { axiosPrivate } from "../api/axios";
import { useEffect } from 'react'
import useAuth from './useAuth'
import useRefresh from './useRefresh'
import {useLocation, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const useAxios = () => {

    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const refresh = useRefresh()
    
    useEffect(() => {

        const response = axiosPrivate.interceptors.response.use( (response) => {
            return response;
          }, async (error) => {
            const config = error.config
            if (error?.response?.status === 403 && !config._retry) {
                config._retry = true
                // useRefresh() sets the auth state
                const accessToken = await refresh()
                config.headers['Authorization'] = `Bearer ${accessToken}`
                // destructuring and converting config.headers to json to fix DOM exception
                return axiosPrivate({
                    ...config,
                    headers: config.headers.toJSON()
                })
            } else if (error?.response?.status === 403) {
                toast.error("Session expired. Please Sign in.")
                navigate("/sign-in", { replace: true, state: { from: location }})
            }
            return Promise.reject(error);
        });
    
        const request = axiosPrivate.interceptors.request.use((config) => {
            // if we are retrying we already set the accessToken, so skip
            if (!config._retry && auth.accessToken) {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`
            }
            return config;
          }, (error) => Promise.reject(error));

        return () => {
            axiosPrivate.interceptors.response.eject(response)
            axiosPrivate.interceptors.request.eject(request)
        }
    }, [auth, refresh])

    return axiosPrivate

}

export default useAxios;