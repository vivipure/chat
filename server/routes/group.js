const express = require("express")
const router = express.Router()
const Group = require('../model/group')
const GroupChat = require('../model/groupChat')


/**
* @desc 创建群组 (内部test)
* @method POST
* @params {name: ''}
* @return {user: group._id,msg: '创建成功'}  
*/ 
router.post('/add',async (req, res) => {
    const group = new Group({
        groupName: req.body.name
    })
    try {
        await group.save()
        res.send({
            user: group._id,
            msg: '创建成功'
        })
    }catch(err) {
        res.status(400).send(err)
    }
})

/**
* @desc 群组列表 
* @method GET
* @return {data:[...groupList]}}  
*/ 
router.get('/list',async (req, res) => {
    let groupList =await Group.find()
    // 浅拷贝数组
    let newGroup = JSON.parse(JSON.stringify(groupList)) 
    // 找到最新的聊天记录
    for (let i in newGroup) {
        let last = await GroupChat.find({
            groupId: newGroup[i]._id
        }).sort({
            _id: -1
        }).limit(1)

        newGroup[i].lastChat = (last.length && last[0].content) || ''
        newGroup[i].lastChatTime = (last.length && last[0].chatTime) || ''
    }
    if (newGroup && newGroup.length) {
        res.send(newGroup)
    }else {
        res.send([])
    }

})

/**
* @desc 群组详情(用户,聊天记录 .etc )[限制最后20条]
* @method post
* @params {id: id}
* @return {data:{}}}  
*/ 
router.post('/detail',async (req, res) => {
    const group =await Group.findOne({
        _id: req.body.id
    })
    let chatRecord = await GroupChat.find({
        groupId: req.body.id
    }).sort({
        _id: -1
    }).limit(20)
    chatRecord = chatRecord.reverse()
    if (group) {
        group.chatRecord = chatRecord
        let data = {
            detail: group,
            chat: chatRecord
        }
        res.send(data)
       
    }else {
        res.status(400).send("can't find any group")
    }

})


/**
* @desc 添加聊天记录(群组)
* @method POST
* @params {sender: '',content: '',groupId: ''}
* @return {user: group._id,msg: '创建成功'}  
*/ 
router.post('/addChat',async (req, res) => {
    const {sender, content, groupId} = req.body
    if (sender && content && groupId) {
        const groupchat = new GroupChat({
            sender,
            content,
            groupId
        })
    try {
        await groupchat.save()
        res.send('add ok')

    }catch(err) {
        res.status(400).send(err)
    }

    }else {
        res.status(400).send('Invalid params')
    }
})


module.exports = router