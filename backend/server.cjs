// Import all required packages

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const User = require('../models/userSchema.cjs')
const cors = require('cors')
const Anthropic = require('@anthropic-ai/sdk');
const session = require('express-session')
const bcrypt = require('bcrypt')
const Model = require('../models/modelsSchema.cjs')

// Setting up the session to store user cookies
app.use(express.urlencoded({ extended: true }));
const sessionConfig = {
    secret: 'BigHomieBalling',
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
require('dotenv').config()

//setting up the MongoDB database
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });
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
        if (!search) {
            const finalPassword = await bcrypt.hash(password, 12)
            const user = await User.create({
                email: email,
                username: username,
                userPassword: finalPassword,
            })
            await user.save()
            return res.json({
                message: 'whomAI account created successfully',
                cookie: user._id
            })
        }
        else {
            return res.json({
                error: 'email is already in use'
            })
        }
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({
                erorr: 'error'
            })
        }
        const result = await bcrypt.compare(password, user.userPassword)
        if (result) {
            req.session.user_id = user._id
            return res.json({
                message: 'Login successful, welcome back',
                cookie: user._id,
                redirectLink: 'http://localhost5173'
            })
        }
        else {
            return res.json({
                error: 'error'
            })
        }
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/createmodel', async (req, res) => {
    try {
        const { name, frequentWords, description,sampleText, author } = req.body
        if (!name) {
            return res.json({
                error: 'You must provide a name'
            })
        }
        if (!description) {
            return res.json({
                error: 'You must provide a description'
            })
        }
        else {
            const model = await Model.create({
                modelName: name,
                frequentWords: frequentWords,
                modelDescription: description,
                sampleText: sampleText,
                author: author,
            })
            await model.save()
            return res.json({
                message: 'model was created successfully'
            })
        }
    }
    catch (err) {
        console.log(`error at createmodel post route: ${err}`)
    }
})

app.post('/mymodels', async (req,res) => {
    try{
        const {identity} = req.body
        const model = await Model.find({
            author: identity
        })
        if(!model) {
            return res.json({
                message: 'You dont have any models'
            })
        }
        if(model) {
            return res.json({
                message: model
            })
        }
    }
    catch(err) {
        console.log(`error on post request to /mymodels ${err}`)
    }
})

// The Localhost port that the server is being hosted on
app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000')
})