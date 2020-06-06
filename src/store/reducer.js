const defaultState = {
    // normal, phone
    mode: 'normal',
    contentShow: false,
    chat_room: '',
    tempUser: `user${(Math.random()*1000).toFixed(3)*1000}` //暂时随机生成用户
}
// 定义action
export default (state = defaultState, action) => {
    let newS = JSON.parse(JSON.stringify(state))
    if (action.type === 'change_mode') {
        newS.mode = action.value
        return newS
    }
    if (action.type === 'content_show') {
        newS.contentShow = action.value
        return newS
    }
    if (action.type === 'chat_room') {
        newS.chat_room = action.value
        return newS
    }
    return state 
}