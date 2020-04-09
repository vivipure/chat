import React, { Component, Fragment } from 'react';

import store from '../../store'
import ChatContent from '../chatcontent'
import UserBox from '../../component/userbox'
import "./index.scss"

import request from '../../utils/request'
import io from "socket.io-client";


const img1 = require('../../icons/avator_1.jpg')
const emptyImg = require("../../icons/onlinechat.svg")

const iteminarray = (item,arr) => {
    
}

class MainContent extends Component {
    constructor(props) {
        super(props)
        this.state={
            userName: '',
            avator: '',
            chatList: [],
            sockets: [],
            groupList:[],
            ...store.getState()
        }
        store.subscribe(this.storeChange)
    }
    // 展示群组信息
    showInfo= ()=>{
        this.props.showInfo && this.props.showInfo()
    }
    // 订阅state
    storeChange = async () => {
        await this.setState(store.getState())
    }
    // 获取群组信息
    getRoomDetail = async () => {

        if (this.state.chat_room === 0) return
        await request({
            url: '/group/detail',
            method: 'post',
            data: {
                id: this.state.chat_room
            }
        }).then(res => {
            let data = res.data.detail
            let chat = res.data.chat
            this.setState({
                userName: data.groupName,
                avator: data.groupIcon,
                chatList: chat,
                group: data
            })
        })
        this.refs.messagecontent.scrollToBottom()
        let index = this.state.groupList.findIndex(item => item === this.state.chat_room)

        if (index !== -1) {
        }else {
            this.startChat()
        }
    }
    // 建立socket 连接
    startChat = async () => {
        const socket = await io('http://localhost:52000')
        // 组件保存socket
        await this.setState({
            sockets: this.state.sockets.concat([{
                groupId: this.state.chat_room,
                socket: socket
            }]),
            groupList: this.state.groupList.concat([this.state.chat_room])
        })

        // 连接
        await socket.on('connect', ()=> {
        })
        // 加入群组房间 
        await socket.emit('join', { 
             name: this.state.tempUser,
             room: this.state.chat_room
          }, (error) => {
            if(error) {
                console.log(error);
            }
        })
        socket.on('message',async message => {
            let temp = this.state.chatList.slice()
            this.state.chatList.push()
            await this.setState({
                chatList: temp.concat([message])
            })
            this.refs.messagecontent.scrollToBottom()
        });
        socket.on('roomData', message => {
            const {users} = message
            this.state.group.users = users

        })
    }
    // 发送信息
    sendMessage = async () => {
        console.time('message')
        await this.socketStateCheck()
        let content = this.refs.messagebox.innerHTML
        if(content) {
            let socket = this.state.sockets.find(item => item.groupId === this.state.chat_room)
            socket.socket.emit('sendMessage',content)
            this.refs.messagebox.innerHTML = ''
        }
        console.timeEnd('message')

    }
    // 聊天界面
    chatBlock = () => {
        return (
                <main className={ this.state.contentShow === true ? "main-content show-content":"main-content" }>
                        {/* 头部 */}
                        <header className="common-header">
                            <UserBox userName={this.state.userName || '肉蛋冲击'} status="online" avator={this.state.avator || img1} showInfo={ this.showInfo } />
                            <nav className="common-nav">
                                <ul className="common-nav-list">
                                    <li className="common-nav-item">
                                    <button className="common-button">
                                        <span className="icon">🔎</span>
                                    </button>
                                    </li>
                                    <li className="common-nav-item">
                                    <button className="common-button">
                                        <span className="icon icon-attach">📎</span>
                                    </button>
                                    </li>
                                    <li className="common-nav-item">
                                    <button className="common-button u-animation-click js-side-info-button">
                                        <span className="icon icon-menu" aria-label="menu"></span>
                                    </button>
                                    </li>
                                </ul>
                                </nav>
                        </header>
                        {/* 聊天框 */}
                        <ChatContent  chatList={this.state.chatList} ref="messagecontent" />
                        {/* 输入框 */}
                        <div className="message-box">
                            <button className="common-button">
                                <span className="icon">😃</span>
                            </button>
                            <div className="text-input" id="message-box" placeholder="Type a message" contentEditable='true' ref="messagebox" onFocus={this.handleFocus} onTouchStart={this.handleFocus}>
                            </div>
                            <button id="voice-button" className="common-button"><span className="icon">🎤</span></button>
                            <button id="submit-button" className="common-button" onClick={this.sendMessage}><span className="icon">➤</span></button>
                        </div>  
                </main>
        )
    }
    // 初始界面
    emptyBlock = () => {
        return (
             <main className='maincontent emptycontent'>
                <strong>我需要一段扯淡的文字，来填充这里</strong>
                <img src={emptyImg} alt=""/>
            </main>
        )
    }
    // socket状态检测
    socketStateCheck = async () => {
        const socket = this.state.sockets.find(item => item.groupId === this.state.chat_room).socket
        // 重连状态
        if (socket.connected === false && socket.disconnected === true) {
            console.warn('你已经断线了,尝试重连')
            await socket.connect()
            await socket.emit('join', {
                name: this.state.tempUser,
                room: this.state.chat_room
            },(error) => {
            if(error) {
                console.log(error);
            }
            })
        }

    }
    // 处理移动端 键盘弹起事件
    handleFocus = () => {
        this.refs.messagecontent.scrollToBottom()
        setTimeout(() => {
            this.refs.messagecontent.scrollToBottom()
        }, 550);
    }
    componentDidMount() {
        this.getRoomDetail()
    }
    
    render() {
        return (
            <Fragment>
                {
                    this.state.mode === 'normal' && this.state.chat_room === 0 ? this.emptyBlock() : this.chatBlock()
                }
            </Fragment>
           
        )
    }
}
export default MainContent