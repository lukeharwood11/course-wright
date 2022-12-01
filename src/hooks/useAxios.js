import { axiosPrivate } from "../api/axios";
import { useEffect } from 'react'
import useAuth from './useAuth'
import useRefresh from './useRefresh'

const useAxios = () => {

    const { auth, setAuth } = useAuth()
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
            }
            return Promise.reject(error);
        });
    
        const request = axiosPrivate.interceptors.request.use((config) => {
            // if we are retrying we already set the accessToken
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