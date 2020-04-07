const CHANGE_MODE = 'change_mode'
const CONTENT_SHOW = 'content_show'
const Chat_Room = 'chat_room'

// 判断当前屏幕尺寸 设置模式
export const changeModeAction = value => ({
    type: CHANGE_MODE,
    value
})

//  手机状态下控制content 显示
export const changeContentShow = value => ({
    type: CONTENT_SHOW,
    value
})

export const setChatRoom = value => ({
    type: Chat_Room,
    value
})