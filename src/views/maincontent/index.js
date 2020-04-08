import React, { Component } from 'react';

import store from '../../store'
import ChatContent from '../chatcontent'
import UserBox from '../../component/userbox'

import request from '../../utils/request'
import io from "socket.io-client";


const img1 = require('../../icons/avator_1.jpg')


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
    showInfo= ()=>{
        this.props.showInfo && this.props.showInfo()
    }
    storeChange = async () => {
        await this.setState(store.getState())
    }
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
            })
        })
        if (this.state.chat_room in this.state.groupList) {
            console.log('你已经连过这个房间了')
            // 找到此连接
            let socket = this.state.sockets.find(item => item.groupId === this.state.chat_room)
            await socket.socket.emit('join', {
                name: this.state.tempUser,
                room: this.state.chat_room
            })
        }else {
            this.chat()

        }
         
    }
    chat = async () => {
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
            console.log(message)
            let temp = this.state.chatList.slice()
            this.state.chatList.push()
            await this.setState({
                chatList: temp.concat([message])
            })
            this.refs.messagecontent.scrollToBottom()
        });
    }
    sendMessage = () => {
        let content = this.refs.messagebox.innerHTML
        if(content) {
            let socket = this.state.sockets.find(item => item.groupId === this.state.chat_room)
           socket.socket.emit('sendMessage',content)
            this.refs.messagebox.innerHTML = ''
        }
    }
   handleFocus = () => {
        this.refs.messagecontent.scrollToBottom()
        setTimeout(() => {
            this.refs.messagecontent.scrollToBottom()
            
        }, 550);
   }
    render() {
        return (
            <main className={ this.state.contentShow === true ? "main-content show-content":"main-content" }>
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
                        <ChatContent  chatList={this.state.chatList} ref="messagecontent" />
                        <div className="message-box">
                            <button className="common-button">
                                <span className="icon">😃</span>
                            </button>
                        <div className="text-input" id="message-box" placeholder="Type a message" contentEditable='true' ref="messagebox" onFocus={this.handleFocus} onTouchStart={this.handleFocus}></div>
                            <button id="voice-button" className="common-button"><span className="icon">🎤</span></button>
                            <button id="submit-button" className="common-button" onClick={this.sendMessage}><span className="icon">➤</span></button>
                        </div>  
                    </main>
        )
    }
}
export default MainContent