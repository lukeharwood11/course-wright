import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import useLogout from "../../hooks/useLogout";


const HomePage = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()
    return (
        <div className={"flex flex-col w-full h-full justify-center items-center"}>
            <h1 className={"text-5xl"}>Home Page</h1>
            { auth?.user && <h2 className={"text-3xl bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 rounded-lg text-white"}>Currently Logged in! Hello {auth.user.firstName}!</h2>}
            <button
                onClick={() => navigate("/dashboard")}
                className={"m-10 text-3xl logo bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white rounded-lg"}>Dashboard
            </button>
            <button
                onClick={
                    () => {
                        logout()
                    }
                }
                className={"m-10 text-3xl logo bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500 text-white rounded-lg"}>Logout
            </button>

        </div>
    );
}

export default HomePage;