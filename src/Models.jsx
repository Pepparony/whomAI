import { CookiesProvider, useCookies  } from 'react-cookie'
import Login from './Login.jsx'
import Testing from './testing.jsx'

function Models() {

    const [cookies, setCookie] = useCookies(['user'])
    
    function dealWithLogin(check) {
        setCookie('user', check.data.cookie, { path: '/' })
    }

    return (    
        <CookiesProvider>
            <div>{cookies.user ? <Testing /> : <Login handleLogin={dealWithLogin}/>}</div>
        </CookiesProvider >
    )
}


export default Models;