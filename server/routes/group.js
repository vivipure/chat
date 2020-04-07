const express = require("express")
const router = express.Router()
const Group = require('../model/group')


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
* @desc 群组列表 (内部test)
* @method GET
* @return {data:[...groupList]}}  
*/ 
router.get('/list',async (req, res) => {
    let groupList =await Group.find()
    if (groupList && groupList.length) {
        res.send(groupList)
    }else {
        res.status(400).send("can't find any group")
    }

})


module.exports = router