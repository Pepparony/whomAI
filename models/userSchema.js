const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type:String, required: true,},
    userName: {type: String, required: true},
    userPassword: {type: String, required: true,},
    dateAdded: {type:Date, default: Date.now()}
})

const Users = mongoose.model("Users", userSchema ,'users')
const allSchemas = {"Users": Users,}

module.exports = userSchema;