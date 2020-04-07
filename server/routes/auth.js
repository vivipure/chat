const express = require("express")
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const config = require('../config')

const {registerValidation, loginValidation} = require('../utils/vaildation')


/**
* @desc 注册用户 
* @method POST
* @params {email: '',name:'',password:''}
* @return {user: user_id,msg: '创建成功'}  
*/ 
router.post('/register', async (req, res) => {
    const error = registerValidation(req)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // 检查是否存在
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) {
        return res.status(400).send('emial already exist')
    }
    //  hash password 密码加密
    const salt = await bcrypt.genSalt(10)  //加盐值
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // 创建用户
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        await user.save()
        res.send({
            user: user._id,
            msg: '创建成功'
        })
    }catch(err) {
        res.status(400).send(err)
    }
})

/**
* @desc 用户登录 
* @method POST
* @params {email: '',,password:''}
* @return {token}  
*/ 
router.post('/login', async (req, res) => {
    let error = loginValidation(req)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // email check already in db
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).send('Email or password is not ook')
    }
    //  check password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
        return res.status(400).send('Invalid Password')
    }
    // create and assign to token
    const token = jwt.sign({_id: user._id}, config.TOKEN_SECRET, {
            expiresIn: 60*60*24  // 1天过期
    })
    res.header('auth-token', token).send(token)
    
})


module.exports = router