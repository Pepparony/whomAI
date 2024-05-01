import { CookiesProvider, useCookies  } from 'react-cookie'
import Login from './Login.jsx'
import Create from './Createmodel.jsx'
import axios from 'axios'

function Models() {

    const [cookies, setCookie] = useCookies(['user'])
    
    function dealWithLogin(check) {
        setCookie('user', check.data.cookie, { path: '/' })
    }

    const userID = cookies.user

    async function findModels() {
        const response = await axios.post('http://localhost:300/mymodels', {userID})
        return response.data.message
    }
    
    return (    
        <CookiesProvider>
            <div>{cookies.user || cookies.user == 'undefined' ? <Create searchModels={findModels} cookie={cookies.user}/> : <Login handleLogin={dealWithLogin}/>}</div>
        </CookiesProvider >
    )
}


export default Models;