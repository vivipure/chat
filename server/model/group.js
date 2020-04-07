const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        min: 4
    },
    groupType: {
        type: String,
        min: 4
    },
    groupDescription: {
        type: String,
        min: 4
    },
    groupIcon: {
        type: String,
        default: 'http://img1.imgtn.bdimg.com/it/u=2759056295,3677356734&fm=26&gp=0.jpg'
    }
})

module.exports = mongoose.model('group', groupSchema)