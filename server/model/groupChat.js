const mongoose = require('mongoose')


let chatRecordSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
        min: 4
    },
    sender: {
        type: String,
        required: true,
        min: 4
    },
    content: {
        type: String,
        required: true
    },
    chatTime: {
        type: Date,
        default: Date.now
    }
})


module.exports =  mongoose.model('groupChat', chatRecordSchema)
