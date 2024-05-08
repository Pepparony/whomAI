import { useParams } from 'react-router-dom'
import axios from 'axios'
import Notfound from './Notfound.jsx'
import { useState, useEffect } from 'react'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


function Chatting() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const params = useParams()
    const userID = params.userID
    const name = params.name
    const [msg, setMsg] = useState('')
    const [response, setResponse] = useState('')
    const [responseLog, setResponseLog] = useState([])


    const editMsg = (evt) => {
        const message = evt.target.value
        setMsg(message)
    }

    async function sendMessage() {
        try {
            const firstMessage = document.getElementById('firstMessage')
            const image = document.getElementById('image')
            const message = document.getElementById('message')
            setResponseLog(msg)
            setMsg('')
            const response = await axios.post('http://localhost:3000/request', { identity: userID, messages: msg })
            if (response) {
                firstMessage.classList.add('hidden')
                setResponse(response.data[0].text)
                setResponseLog(response.data[0].text)
                const allResponses = responseLog.map((response, index) => (
                    <div>
                        <div key={index}>{response}</div>
                    </div>
                ));
                image.classList.remove('hidden')
                message.classList.remove('hidden')
            }
            if (!response) {
                console.log('No response came back :(, refer to backend console for error information')
            }
            else {
                console.log('request was never sent to the backend')
            }
        }
        catch (err) {
            console.log(`there was an error: ${err}`)
        }
    }

    function messagesInfo() {
        return (<section className="h-[90%] flex flex-col place-items-center justify-center">
            <img src="/src/assets/robotWithRemovedBackground.png" alt="" />
            <div className="text-center text-xl text-blue-500">What up?</div>
        </section>)
    }
    return (
        <div className="flex flex-col h-screen w-screen bg-zinc-800">
            <section className="flex flex-col place-items-center place-self-center w-4/5 h-[5%] md:h-[10%] bg-zinc-800">
                <div>
                    <Button onClick={handleOpen}><div className="text-gray-100 text-2xl">{name}</div></Button>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <div className="flex flex-col bg-zinc-700 py-4 px-2 space-y-3">
                            <div className="text-lg">Model information:</div>
                            <div>Name: {name}</div>
                            <div>Model ID: {userID}</div>
                        </div>
                    </Backdrop>
                </div>
            </section>
            <section className="h-[90%] flex flex-col place-items-center justify-center">
                <div id="firstMessage">
                    <img src="/assets/robotWithRemovedBackground.png" alt="" />
                    <div className="text-center text-xl text-blue-500">What up?</div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex justify-center">
                        <img className="h-1/6 sm:h-1/4 hidden" src="/assets/robotWithRemovedBackground.png" alt="" id="image" />
                        <p className="text-blue-500 w-2/3 border border-blue-500 py-4 pl-6 rounded-lg h-fit hidden" id="message">{responseLog}</p>
                    </div>
                </div>
            </section>
            <section className="h-[10%] bg-zinc-800 grid place-items-center w-full">
                <div className="flex h-3/5 w-full justify-center space-x-3">
                    <input onChange={editMsg} value={msg} className="border border-zinc-700 bg-zinc-800 text-white rounded-xl py-1 px-2" type="text" placeholder="How are you?" />
                    <button onClick={sendMessage} className="text-gray-100"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 5H8V9H6V3H22V21H6V15H8V19H20V5Z" fill="currentColor" /><path d="M13.0743 16.9498L11.6601 15.5356L14.1957 13H2V11H14.1956L11.6601 8.46451L13.0743 7.05029L18.024 12L13.0743 16.9498Z" fill="currentColor" /></svg></button>
                </div>
            </section>
        </div>
    )
}


export default Chatting;