const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    modelName: {
        type:String,
        required: true,
    },
    modelDescription: {
        type: String,
        required: true,
    },
    frequentWords: {
        type: String,
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateAdded:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("model", modelSchema)