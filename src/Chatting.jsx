import {useParams} from 'react-router-dom'
import axios from 'axios'
import Notfound from './Notfound.jsx'

function Chatting() {
    const params = useParams()
    const userID = params.userID
    const name = params.name
    // async function getData() {
    //     const check = await axios.post('http://localhost:3000/chat', { identity: userID })
    //     if(check.data.message === 'no model found') {
    //         return(
    //             <Notfound/>
    //         )
    //     }
    //     if(check) {
    //         return(
    //             <>
    //             <div>You are not chatting with this model:</div>
    //             <div>{check.data.message}</div>
    //             </>
    //         )
    //     }
    // }

    async function sendMessage(){
        const response = await axios.post('http://localhost:3000/request', {identity: userID})

        if(!response) {
            console.log('No response came back :(, refer to backend console for error information')
        }
    }
    return (
        <div className="flex flex-col h-screen w-screen bg-zinc-800">
            <section className="flex flex-col place-items-center place-self-center w-4/5 h-[5%] md:h-[10%] bg-zinc-800">
                <a href="/details" className="font-bold text-3xl tracking-wide text-gray-100">{name}</a>
                <a className="text-blue-500 hover:underline hidden md:inline" href="/details">details about model</a>
            </section>
            <section className="h-[90%] flex flex-col place-items-center justify-center">
                <img src="/src/assets/robotWithRemovedBackground.png" alt="" />
                    <div className="text-center text-xl text-white">What up?</div>
            </section>
            <section className="h-[10%] bg-zinc-800 grid place-items-center w-full">
                <div className="flex h-3/5 w-full justify-center space-x-3">
                <input className="border border-zinc-700 bg-zinc-800 text-white rounded-xl py-1 px-2" type="text" placeholder="How are you?"/>
                <button onClick={sendMessage} className="text-gray-100">≥≥≥</button>
                </div>
            </section>
        </div>
    )
}

export default Chatting;