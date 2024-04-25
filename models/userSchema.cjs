const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type:String, required: true,},
    username: {type: String, required: true},
    userPassword: {type: String, required: true,},
    dateAdded: {type:Date, default: Date.now()}
})

module.exports = mongoose.model("User", userSchema);
;