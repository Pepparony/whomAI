import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Testing from './testing.jsx'
import Homepage from './Homepage.jsx'
import Login from './Login.jsx'
import Models from './Models.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />}/>
        <Route exact path="/register" element={<App />}/>
        <Route exact path="/testing" element={<Testing />} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/models' element={<Models/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode >,
)
