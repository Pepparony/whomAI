import { CookiesProvider, useCookies  } from 'react-cookie'
import Login from './Login.jsx'
import Chatting from './Chatting.jsx'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Chat() {

    // const params = useParams()
    // const userID = params.userID

    // async function getData() {
    //     const check = await axios.post('http://localhost:3000/chat', { identity: userID })
    //     if(check.data.message === 'no model found') {
    //         return check.data.message
    //         console.log(check.data.message)
    //     }
    //     if(check) {
    //         return check.data.model
    //         console.log('sup bitches')
    //     }
    // }
    // getData()

    const [cookies, setCookie] = useCookies(['user'])
    
    function dealWithLogin(check) {
        setCookie('user', check.data.cookie, { path: '/' })
    }

    
    return (    
        <CookiesProvider>
            <div>{cookies.user || cookies.user == 'undefined' ? <Chatting  cookie={cookies.user}/> : <Login handleLogin={dealWithLogin}/>}</div>
        </CookiesProvider >
    )
}


export default Chat;