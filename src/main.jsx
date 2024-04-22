import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import App from './App.jsx'
import './index.css'
import Testing from './testing.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/testing">
            <Testing />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
)
