// Import all required packages
const express = require('express')
const app = express()
const cors = require('cors')
const Anthropic = require('@anthropic-ai/sdk');

// Add needed packages into the app, cors for the request and JSON to communicate data
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Get variables from the ENV file - Includes API key
require('dotenv').config();

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
              {"role": "user", "content": `${req.body.messages}`}
            ]
          });
          // Send the JSON
        res.send(msg.content)
    }
    catch (err) {
        console.log(err)
    }
})

// The Localhost port that the server is being hosted on
app.listen(3000, (req, res) => {
    console.log('LISTENING ON PORT 3000')
})