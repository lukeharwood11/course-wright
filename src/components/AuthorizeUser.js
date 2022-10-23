import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthorizeUser = () => {
    const { auth } = useAuth()
    const location = useLocation()
    return (
        <>
            { auth?.user ? <Outlet/> : <Navigate to="sign-in" replace={true} state={{from: location}}/> }
        </>
    );
}

export default AuthorizeUser;