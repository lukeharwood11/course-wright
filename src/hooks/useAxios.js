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
            if (error?.response?.status === 403 && !config.retry) {
                config.retry = true
                const accessToken = await refresh()
                setAuth(p => {
                    return {
                        ...p,
                        accessToken
                    }
                })
                console.log("Failed Setting header.")
                config.headers['Authorization'] = `Bearer ${accessToken}`
                return axiosPrivate(config)
            }
            return Promise.reject(error);
        });
    
        const request = axiosPrivate.interceptors.request.use((config) => {
            if (auth.accessToken) {
                console.log("Attempted to set Header Again")
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`
            } else {
                console.log("Skipping setting auth")
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