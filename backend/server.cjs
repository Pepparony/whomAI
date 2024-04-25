// Import all required packages
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('../models/userSchema.cjs')
const cors = require('cors')
const Anthropic = require('@anthropic-ai/sdk');
const session = require('express-session')
const bcrypt = require('bcrypt')


// Setting up the session to store user cookies
app.use(express.urlencoded({ extended: true }));
const sessionConfig = {
    secret: '83asdniq9129qnnqd9100',
    resave: false,
    saveUninitialized: true,
}
app.use(session(sessionConfig))
app.use(express.json());


// Add needed packages into the app, cors for the request and JSON to communicate data
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get variables from the ENV file - Includes API key
require('dotenv/config')

//setting up the MongoDB database
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_URL, dbOptions)
    .then(() => { console.log("Database is connected") })
    .catch(err => console.log(err))

// The post request to access the API data
app.post('/done', async (req, res) => {
    try {
        const anthropic = new Anthropic({
            apiKey: process.env.API_KEY
        });
        const msg = await anthropic.messages.create({
            model: 'claude-2.1',
            max_tokens: 1024,
            messages: [
                { "role": "user", "content": `${req.body.messages}` }
            ]
        });
        // Send the JSON
        res.send(msg.content)
    }
    catch (err) {
        console.log(err)
    }
})


app.post('/register', async (req, res) => {
    try {
    const { email, username, password } = req.body;
    const search = await User.findOne({ email: email })
    if (search) {
        return res.json({
            error: 'email is already in use'
        })
    }
    if (!password) {
        return res.json({
            error: 'password is required'
        })
    }
    if (!email) {
        return res.json({
            error: 'email is required'
        })
    }
    if (!username) {
        return res.json({
            error: 'username is required'
        })
    }
    else {
        const finalPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            email: email,
            username: username,
            userPassword: finalPassword,
        })
        await user.save()
        req.session.user_id = user._id;
        return res.json(user)
    }
}
catch(err) {
    console.log(err)
}
})

// The Localhost port that the server is being hosted on
app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000')
})