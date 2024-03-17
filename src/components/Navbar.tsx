import { Link, NavLink } from "react-router-dom"
import { FaTelegram } from "react-icons/fa"
import { useAuthContext } from "../context/AuthContext"
import { RiArrowDownSLine } from "react-icons/ri";
import Popup from 'reactjs-popup';
import '../css/popup.css'

const Navbar = () => {
    const { nickname, isAuthenticated, logOut } = useAuthContext()

    return (
        <div className="border-b border-gray-600 py-3 text-white px-5 sm:px-9">
            <ul className="flex justify-between">
                <div className="flex">
                    <NavLink to='/' className="font-bold text-xl pr-3">6 Inches</NavLink>
                    <ul className="items-center gap-3 sm:gap-5 text-xl line pl-3 flex">
                        <NavLink className={({ isActive }) => isActive ? "text-base transition-colors lg:text-lg border-b border-b-transparent" : "text-gray-400 text-base  border-b border-b-transparent hover:border-gray-400 transition-colors lg:text-lg"} to='/'>Home</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "text-base transition-colors lg:text-lg border-b border-b-transparent" : "text-gray-400 text-base  border-b border-b-transparent hover:border-gray-400 transition-colors lg:text-lg"} to='/authorization'>Auth</NavLink>
                        <NavLink className={({ isActive }) => isActive ? "text-base transition-colors lg:text-lg border-b border-b-transparent" : "text-gray-400 text-base  border-b border-b-transparent hover:border-gray-400 transition-colors lg:text-lg"} to='/registration'>Registration</NavLink>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    {(nickname && isAuthenticated) && <Popup position='bottom center' trigger={(<button className="flex items-center gap-1 hover:text-gray-400 transition-colors"><RiArrowDownSLine />  <span className="hidden sm:block">{nickname}</span></button>)}><Link className="transition-colors hover:text-gray-400" to='/'>My page</Link><button className="transition-colors hover:text-gray-400 underline" onClick={logOut}>Log out</button></Popup>}
                    <NavLink to='https://t.me/taurin_n'>
                        <FaTelegram size='29' cursor='pointer' className="hover:fill-slate-500 transition-colors" />
                    </NavLink>
                </div>
            </ul>
        </div>
    )
}

export default Navbar