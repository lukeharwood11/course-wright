import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const Layout = () => {

    return (
        <main className="w-full h-full">
            <Toaster/>
            <Outlet/>
        </main>
    )
}

export default Layout;