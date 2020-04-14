const isEmail = (email) => {
    let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/g
    return reg.test(email)
}

const passwordCheck = (pass) => {
    let reg = /^[a-z0-9A-Z]+$/
    if(!reg.test(pass)) {
        return {
            error: '密码只能为数字或者字母'
        }
    }
    if (pass.length < 4 && pass.length>12) {
        return {
            error: '密码的长度为4到12位'
        }
    }

    return {
        error: null
    } 
}

export  {
    isEmail,
    passwordCheck
}