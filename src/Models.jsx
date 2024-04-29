import { CookiesProvider, useCookies } from 'react-cookie'
import Login from './Login.jsx'
import Testing from './testing.jsx'
import axios from 'axios'

function Models() {


    async function logIn() {
        const inputBox = document.getElementById('emailBox')
        const passwordInputBox = document.getElementById('passwordInputBox')
        const header = document.getElementById('header')
        try {
            const check = await axios.post('http://localhost:3000/login', { email: email, password: password })
            if (check.data.error === 'email is required') {
                inputBox.classList.add('text-red-500')
                inputBox.value = check.data.error
            }
            if (check.data.error === 'password is required') {
                passwordInputBox.classList.add('text-red-500')
                passwordInputBox.value = check.data.error
            }
            if (check.data.error === 'error') {
                header.classList.add('text-red-500')
                header.innerText = 'whomAI - incorrect login'
            }
            if (check.data.message) {
                setCookie('user', check.data.cookie, { path: '/' })
                return navigate('/')
            }
            else {
                console.log(check)
                header.classList.add('text-red-500')
                header.innerText = 'whomAI - incorrect login'
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <CookiesProvider>
            <div>{cookies.user ? <div>Hello world</div>: <Login onLoggy={logIn}/>}</div>
        </CookiesProvider >
    )
}


export default Models;