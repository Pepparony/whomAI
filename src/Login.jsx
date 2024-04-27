import { useState, useEffect } from "react"
import axios from 'axios'
// import { useNavigate } from "react-router-dom";

function Login() {

    const [viewPasscode, setViewPasscode] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    function editEmail(evt) {
      const email = evt.target.value
      setEmail(email)
      return email
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
  
    async function logIn(){
      const inputBox = document.getElementById('emailBox')
      const passwordInputBox = document.getElementById('passwordInputBox')
      const header = document.getElementById('header')
      try {
        const check = await axios.post('http://localhost:3000/login', { email: email, password: password })
        if(check.data.error === 'email is required') {
            inputBox.classList.add('text-red-500')
            inputBox.value = check.data.error
        }
        if(check.data.error === 'password is required') {
            passwordInputBox.classList.add('text-red-500')
            passwordInputBox.value = check.data.error
        }
        if(check.data.error === 'error') {
          header.classList.add('text-red-500')
          header.innerText = 'whomAI - incorrect login'
        }
        if(check.data.message) {
            alert(check.data.message)
        }
        else {
          console.log(check)
          header.classList.add('text-red-500')
          header.innerText = 'whomAI - incorrect login'
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  
    useEffect(() => {
      document.title = 'whomAI | Login'
    })
    return (
  
      <div className="grid place-items-center bg-gray-100 h-screen w-screen font-main">
        <div className="bg-white w-2/5 h-4/5 border shadow-xl">
          <div className="flex flex-col place-items-start ml-[10%] h-[25%] justify-center space-y-1">
            <h2 className="font-bold text-4xl" id="header">whomAI</h2>
            <p className="text-lg">Log in to talk to your AI friend</p>
          </div>
          <section className="flex flex-col h-[50%] w-full place-items-center space-y-14">
            <input onChange={editEmail} value={email} className="w-4/5 rounded-lg py-3 px-2 outline-blue-500 border border-black" type="email" name="email" placeholder='Email' id="emailBox"/>
            {viewPasscode == true ? <div className="flex border border-black rounded-lg bg-white w-4/5 jusitfy-between"> <input onChange={editPassword} value={password} className="rounded-lg w-4/5 py-3 px-2 outline-none" type="text" name="password" placeholder="Password" id="passwordInputBox"/>
              <button className="" onClick={viewPassword}>-_-</button> </div> : <div className="flex border border-black rounded-lg bg-white w-4/5 jusitfy-between"> <input onChange={editPassword} value={password} className="rounded-lg w-4/5 py-3 px-2 outline-none" type="password" name="password" placeholder="Password" id="passwordInputBox"/>
              <button className="" onClick={viewPassword}>-_-</button> </div>}
            <button onClick={logIn} type="submit" className="self-center bg-blue-500 text-gray-100 py-4 w-3/5 rounded-lg">Register</button>
          <section className="flex w-full justify-between h-[50%] flex-col space-y-8">
            <div className="w-4/5 ml-[10%] flex justify-evenly">
              <div className="text-lg">Git</div>
              <div className="text-lg">Google</div>
              <div className="text-lg">Appple</div>
            </div>
            <a className="text-blue-500 hover:underline self-center text-lg" href="/register">Don't have an account?</a>
          </section>
          </section>
        </div>
      </div>
    )
  }

export default Login;