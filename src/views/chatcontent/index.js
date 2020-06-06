import React, { Component } from 'react';

import TextBlock from '../../component/textblock'
import store from '../../store'


/**
* @desc 聊天框组件
* @params chatList
* [content,sender,chatTime]
*/ 
class ChatContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...store.getState()
        }
    }
    scrollToBottom = () => {
       const y =  this.refs.msgbox.scrollHeight
       this.refs.msgbox.scrollTo(0, y)
    }
    render() {
        return (
            <div className="messanger" ref="msgbox">
                        <ol className="messanger-list">
                            <li className="common-message is-time">
                                <p className="common-message-content">
                                    Today
                                </p>          
                            </li>
                            {
                                this.props.chatList.map((item) => {
                                    return (
                                        item.sender === 'system'? (
                                            <li className="common-message is-time" key={item.chatTime}>
                                                <p className="common-message-content">
                                                    {item.content}
                                                </p>          
                                        </li>
                                        
                                        ):
                                        <TextBlock text={item.content} type={item.sender === this.state.tempUser? 'you':'other'} sender={item.sender} isSeen={true} time={new Date(item.chatTime).toLocaleTimeString()} key={item.chatTime} />
                                    )
                                })
                            }
                            
                        </ol>
                        </div>  
        )
    }
}
export default ChatContent
