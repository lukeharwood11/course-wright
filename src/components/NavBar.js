import React, {Component} from 'react'


export class NavBar extends Component {

    render() {
        // TODO add a different option for other pages
        return (
            <React.Fragment>
            <nav className="flex items-center justify-between bg-blue-500">
                <a className="rounded-md px-2 text-white font-bold text-2xl m-2" href="#">Course Builder</a>
                <div className="" id="navbarSupportedContent">
                    <ul className="flex justify-around w-full">
                        <li className="p-1 rounded-md hover:bg-white hover:text-blue-500 transition-colors m-2 text-white font-bold text-1xl"><a className="nav-link" href="#">Home</a></li>
                        <li className="p-1 rounded-md hover:bg-white hover:text-blue-500 transition-colors m-2 text-white font-bold text-1xl"><a className="nav-link" href="#">About</a></li>
                        <li className="p-1 rounded-md hover:bg-white hover:text-blue-500 transition-colors m-2 text-white font-bold text-1xl"><a className="nav-link" href="#">Contact</a></li>
                        <li className="p-1 rounded-md hover:bg-white hover:text-blue-500 transition-colors m-2 text-white font-bold text-1xl"><a className="nav-link active" aria-current="page" href="#">Log In</a></li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
        );
    }
}