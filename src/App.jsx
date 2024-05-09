import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {CookiesProvider, useCookies} from 'react-cookie'

function App() {
  const navigate = useNavigate()

  // useState to update the input boxes
  const [viewPasscode, setViewPasscode] = useState(false)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // useState for cookie and session storage
  const [cookies, setCookie] = useCookies(['user'])

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

  function viewPassword(e) {
    e.preventDefault()
    setViewPasscode(true)
  }

  async function signUp(){
    const inputBox = document.getElementById('emailBox')
    const passwordInputBox = document.getElementById('passwordInputBox')
    const usernameInputBox = document.getElementById('usernameInputBox')
    try {
      const check = await axios.post('https://whom-ai.vercel.app/register', { email: email, username: username, password: password })
      if (check.data.error === 'email is already in use') {
        inputBox.classList.add('text-red-500')
        inputBox.value = 'email is already in use'
      }
      if(check.data.error === 'password is required') {
        setViewPasscode(true)
        passwordInputBox.classList.add('text-red-500')
        passwordInputBox.value = 'You must create a password'
      }
      if(check.data.error === 'email is required') {
        inputBox.classList.add('text-red-500')
        inputBox.value = 'You must provide an email'
      }
      if(check.data.error === 'username is required') {
        usernameInputBox.classList.add('text-red-500')
        usernameInputBox.value = 'You must create a username'
      }
      else if(check.data.message) {
        setCookie('user', check.data.cookie, { path: '/' })
        return navigate('/')
      }
    }
    catch (err) {
      console.log(err)
    }
    // console.log('You clicked the submit button')
  }

  useEffect(() => {
    document.title = 'whomAI | Register'
  })
  return (

    <div className="grid place-items-center bg-gray-100 h-screen w-screen font-main">
      <div className="bg-white w-4/5 h-4/5 border shadow-xl md:w-3/5 lg:w-2/5">
        <div className="flex flex-col place-items-start ml-[10%] h-[25%] justify-center space-y-1">
          <h2 className="font-bold text-5xl md:text-5xl text-center md:place-self-start">whomAI</h2>
          <p className="text-lg hidden lg:inline">Create an account to talk to your AI friend</p>
        </div>
        <section className="flex flex-col h-[35%] w-full place-items-center space-y-10">
          <input onChange={editUsername} value={username} className="w-4/5 rounded-lg py-3 px-2 outline-blue-500 border border-black" type="text" name="username" placeholder='Username' id="usernameInputBox"/>
          <input onChange={editEmail} value={email} className="w-4/5 rounded-lg py-3 px-2 outline-blue-500 border border-black" type="email" name="email" placeholder='Email' id="emailBox"/>
          {viewPasscode == true ? <div className="flex border border-black rounded-lg bg-white w-4/5 jusitfy-between"> <input onChange={editPassword} value={password} className="rounded-lg w-4/5 py-3 px-2 outline-none" type="text" name="password" placeholder="Password" id="passwordInputBox"/>
            <button className="" onClick={viewPassword}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="currentColor" /></svg></button> </div> : <div className="flex border border-black rounded-lg bg-white w-4/5 jusitfy-between"> <input onChange={editPassword} value={password} className="rounded-lg w-4/5 py-3 px-2 outline-none" type="password" name="password" placeholder="Password" id="passwordInputBox"/>
            <button className="" onClick={viewPassword}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C17.5915 3 22.2898 6.82432 23.6219 12C22.2898 17.1757 17.5915 21 12 21C6.40848 21 1.71018 17.1757 0.378052 12C1.71018 6.82432 6.40848 3 12 3ZM12 19C7.52443 19 3.73132 16.0581 2.45723 12C3.73132 7.94186 7.52443 5 12 5C16.4756 5 20.2687 7.94186 21.5428 12C20.2687 16.0581 16.4756 19 12 19Z" fill="currentColor" /></svg></button> </div>}
          <button onClick={signUp} type="submit" className="self-center bg-blue-500 text-gray-100 py-4 w-3/5 rounded-lg">Register</button>
        <section className="flex w-full justify-between h-full flex-col">
          <div className="w-4/5 ml-[10%] flex justify-evenly">
            <div className="text-lg">Git</div>
            <div className="text-lg">Google</div>
            <div className="text-lg">Appple</div>
          </div>
          <a className="text-blue-500 hover:underline self-center text-lg" href="/login">Already have an account?</a>
        </section>
        </section>
      </div>
    </div>
  )
}

export default App
