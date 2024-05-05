import {useParams} from 'react-router-dom'
import axios from 'axios'
import Notfound from './Notfound.jsx'

function Chatting() {
    const params = useParams()
    const userID = params.userID

    async function getData() {
        const check = await axios.post('http://localhost:3000/chat', { identity: userID })
        if(check.data.message === 'no model found') {
            return(
                <Notfound/>
            )
        }
        if(check) {
            
        }
    }

    return(
        <>
        <div>You are now chatting with the bot</div>
        <div>{userID}</div>
        </>
    )
}

export default Chatting;