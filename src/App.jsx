import { useState } from 'react'
import axios from 'axios'

function App() {

  const [viewPasscode, setViewPasscode] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function editEmail(evt) {
    const email = evt.target.value
    setEmail(email)
    return email
  }
  
  const editUsername = (evt) => {
    const username = evt.target.value
    setUsername(username)
    return username
  }

  function editPassword(evt) {
    const password = evt.target.value
    setPassword(password)
    return password
  }

  function viewPassword() {
    setViewPasscode(true)
  }

  const signUp = async() => {
    try{
    const check = await axios.post('http://localhost:3000/register', {email: email, username: username, userPassword: password})
  }
  catch (err) {
    console.log(err)
    res.send(err)
  }
  }

  return (
    <div className="grid place-items-center bg-gray-100 h-screen w-screen font-main">
      <div className="bg-white w-2/5 h-4/5 border shadow-xl">
        <div className="flex flex-col place-items-start ml-[10%] h-[25%] justify-center space-y-1">
          <h2 className="font-bold text-4xl">whomAI</h2>
          <p className="text-lg">Create an account to talk to your AI friend</p>
        </div>
        <section className="flex flex-col h-[40%] w-full place-items-center space-y-10">
          <input onChange={editEmail} value={email} className="w-4/5 rounded-lg py-3 px-2 outline-blue-500 border border-black" type="email" name="email" placeholder='Email'/>
          <input onChange={editUsername} value={username} className="w-4/5 rounded-lg py-3 px-2 outline-blue-500 border border-black" type="text" name="username" placeholder='Username'/>
          {viewPasscode == true ? <div className="flex border border-black rounded-lg bg-white w-4/5 jusitfy-between"> <input onChange={editPassword} value={password} className="rounded-lg w-4/5 py-3 px-2 outline-none" type="text" name="password" placeholder="Password"/>
            <button className="" onClick={viewPassword}>-_-</button> </div> : <div className="flex border border-black rounded-lg bg-white w-4/5 jusitfy-between"> <input onChange={editPassword} value={password} className="rounded-lg w-4/5 py-3 px-2 outline-none" type="password" name="password" placeholder="Password"/>
            <button className="" onClick={viewPassword}>-_-</button> </div>}
        </section>
        <div className="h-[35%] w-4/5 ml-[10%] flex flex-col justify-evenly">
        <a className="text-blue-500 hover:underline self-center text-lg" href="">Already have an account?</a>
          <section className="flex w-full justify-evenly">
            <div className="text-lg">Git</div>
            <div className="text-lg">Google</div>
            <div className="text-lg">Appple</div>
          </section>
          <button className="self-center bg-blue-500 text-gray-100 py-4 w-3/5 rounded-lg">Register</button>
        </div>
      </div>
    </div>
  )
}

export default App
