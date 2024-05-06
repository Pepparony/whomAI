import {useParams} from 'react-router-dom'
import axios from 'axios'
import Notfound from './Notfound.jsx'
import {useState, useEffect} from 'react'


function Chatting() {
   const params = useParams()
   const userID = params.userID
   const name = params.name
   const [msg, setMsg] = useState('')
   const [response, setResponse] = useState('')


   const editMsg = (evt) => {
       const message = evt.target.value
       setMsg(message)
   }
  


   async function sendMessage(){
       try {
       setMsg('')
       const response = await axios.post('http://localhost:3000/request', {identity: userID, messages:msg})
       if(response) {
           setResponse(response.data[0].text)
       }
       if(!response) {
           console.log('No response came back :(, refer to backend console for error information')
       }
       else {
           console.log('request was never sent to the backend')
       }
   }
   catch(err) {
       console.log(`there was an error: ${err}`)
   }
   }
   function messagesInfo() {
       return (<section className="h-[90%] flex flex-col place-items-center justify-center">
       <img src="/src/assets/robotWithRemovedBackground.png" alt="" />
           <div className="text-center text-xl text-white">What up?</div>
   </section>)
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
           <div>
               <p className="text-gray-100">{response}</p>
           </div>
   </section>
           <section className="h-[10%] bg-zinc-800 grid place-items-center w-full">
               <div className="flex h-3/5 w-full justify-center space-x-3">
               <input onChange={editMsg} value={msg} className="border border-zinc-700 bg-zinc-800 text-white rounded-xl py-1 px-2" type="text" placeholder="How are you?"/>
               <button onClick={sendMessage} className="text-gray-100">≥≥≥</button>
               </div>
           </section>
       </div>
   )
}


export default Chatting;