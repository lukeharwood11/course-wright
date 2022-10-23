import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useRefresh from '../hooks/useRefresh'
import Loading from '../components/Loading'

const RefreshHandler = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { auth } = useAuth()
    const refresh = useRefresh()

    useEffect(() => {
        if (!auth?.accessToken) {
            setIsLoading(true)
            refresh().catch(e => console.log("Invalid Cookie")).finally(() => setIsLoading(false))
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            {isLoading
                ? <Loading/>
                : <Outlet/>
            }
        </>
    );
}

export default RefreshHandler;