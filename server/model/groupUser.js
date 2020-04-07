const mongoose = require('mongoose')

const groupUserSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        min: 4
    },
    userNames: {
        type: Array
    }
})

module.exports = mongoose.model('groupUser', groupUserSchema)