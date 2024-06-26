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
            <button className="text-blue-500 text-lg" onClick={handleLogout}>Logout</button>
    )
}


export default Logout;