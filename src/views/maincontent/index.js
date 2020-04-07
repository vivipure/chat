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
            socket: '',
            ...store.getState()
        }
        store.subscribe(this.storeChange)
    }
    showInfo= ()=>{
        this.props.showInfo && this.props.showInfo()
    }
    storeChange = async () => {
        await this.setState(store.getState())
        await this.getRoomDetail()
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
        this.chat()
         
    }
    chat = () => {
        const socket = io('http://localhost:52000')
        // 组件保存socket
        this.setState({
            socket
        })
        // 连接
        socket.on('connect', ()=> {
        })
        
        // 加入群组房间 
        socket.emit('join', { 
             name: this.state.tempUser,
             room: this.state.chat_room
          }, (error) => {
            if(error) {
                alert(error);
            }
        })
        socket.on('message', message => {
            console.log(message)
            let temp = this.state.chatList.slice()
            this.state.chatList.push()
            this.setState({
                chatList: temp.concat([message])
            })
        });
    }
    sendMessage = () => {
        let content = this.refs.messagebox.innerHTML
        if(content) {
            this.state.socket.emit('sendMessage',content)
            this.refs.messagebox.innerHTML = ''
        }
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
                        <div className="text-input" id="message-box" placeholder="Type a message" contentEditable='true' ref="messagebox"></div>
                            <button id="voice-button" className="common-button"><span className="icon">🎤</span></button>
                            <button id="submit-button" className="common-button" onClick={this.sendMessage}><span className="icon">➤</span></button>
                        </div>  
                    </main>
        )
    }
}
export default MainContent