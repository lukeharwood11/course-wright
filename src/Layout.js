import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const Layout = () => {

    //            <Helmet>
    //                 <meta charSet="utf-8" />
    //                 <title>Course Wright</title>
    //             </Helmet>

    return (
        <main className="w-full h-full">

            <Outlet/>
        </main>
    )
}

export default Layout;