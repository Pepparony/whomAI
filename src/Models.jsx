import { CookiesProvider, useCookies  } from 'react-cookie'
import Login from './Login.jsx'
import Create from './Createmodel.jsx'

function Models() {

    const [cookies, setCookie] = useCookies(['user'])
    
    function dealWithLogin(check) {
        setCookie('user', check.data.cookie, { path: '/' })
    }

    return (    
        <CookiesProvider>
            <div>{cookies.user ? <Create/> : <Login handleLogin={dealWithLogin}/>}</div>
        </CookiesProvider >
    )
}


export default Models;