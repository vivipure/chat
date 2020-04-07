import mongoose from 'mongoose'

// 用户聊天记录
let chat = new mongoose.Schema({
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

module.exports =  chat
