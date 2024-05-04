import { CookiesProvider, useCookies  } from 'react-cookie'
import Login from './Login.jsx'
import Chatting from './Chatting.jsx'

function Chat() {

    const [cookies, setCookie] = useCookies(['user'])
    
    function dealWithLogin(check) {
        setCookie('user', check.data.cookie, { path: '/' })
    }

    
    return (    
        <CookiesProvider>
            <div>{cookies.user || cookies.user == 'undefined' ? <Chatting cookie={cookies.user}/> : <Login handleLogin={dealWithLogin}/>}</div>
        </CookiesProvider >
    )
}


export default Chat;