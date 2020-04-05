const defaultState = {
    // normal, phone
    mode: 'normal',
    contentShow: false
}
// 定义action

export default (state = defaultState, action) => {
    if (action.type === 'change_mode') {
        let newS = JSON.parse(JSON.stringify(state))
        newS.mode = action.value
        return newS
    }
    if (action.type === 'content_show') {
        let newS = JSON.parse(JSON.stringify(state))
        newS.contentShow = action.value
        return newS
    }
    return state 
}