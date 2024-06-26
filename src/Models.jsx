import { CookiesProvider, useCookies } from 'react-cookie'
import Login from './Login.jsx'
import Create from './Createmodel.jsx'
import Loader from './Loader.jsx'
import {useNavigation} from 'react-router-dom'

function Models() {
    // const navigation = useNavigation()
    const [cookies, setCookie] = useCookies(['user'])

    function dealWithLogin(check) {
        setCookie('user', check.data.cookie, { path: '/' })
    }


    return (
        <CookiesProvider>
            <div>{cookies.user || cookies.user == 'undefined' ? <Create cookie={cookies.user} /> : <Login handleLogin={dealWithLogin} />}</div>
        </CookiesProvider >
    )
}


export default Models;