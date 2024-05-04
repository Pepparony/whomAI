import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Testing from './testing.jsx'
import Homepage from './Homepage.jsx'
import Models from './Models.jsx'
import Chat from './Chat.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/chat" element={<Chat/>}/>
        <Route exact path="/" element={<Models />}/>
        <Route exact path="/register" element={<App/>}/>
        <Route exact path="/testing" element={<Testing />} />
        <Route exact path='/login' element={<Models/>} />
        <Route exact path='/models' element={<Models/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode >,
)
