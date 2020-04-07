import mongoose from 'mongoose'

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
    receiver: {
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
        default: new Date().toLocaleDateString
    }
})


module.exports =  chatRecordSchema
