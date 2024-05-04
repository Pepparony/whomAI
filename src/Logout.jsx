import { useState } from "react";
import axios from 'axios'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
function Logout() {
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies(['user'])

    function handleLogout() {
        removeCookie('user', { path: '/' })
        return navigate('/login')
    }


    return (
            <button className="bg-blue-400 py-2 px-7 rounded-full transition-all duration-200 hover:bg-blue-500" onClick={handleLogout}>Logout</button>
    )
}


export default Logout;