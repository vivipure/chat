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

                            {/* <TextBlock text='This is my CSS/HTML Revers Engineering for WhatsApp' type="you" isSeen={true} time="14:11" />
                            <TextBlock text='Just take a look' type="you" isSeen={true} time="14:12" />
                            <TextBlock text='Who are you?' type="other" isSeen={true} time="14:33" />
                            <TextBlock text={ long } type="you" isSeen={false} time="14:41" />
                            <TextBlock text="Who's those peoples on the contact list?" type="other" isSeen={true} time="14:43" /> */}
                        </ol>
                        </div>  
        )
    }
}
export default ChatContent


     // const long = `
        // I’m Elad Shechter, a Web Developer specializing in CSS & HTML design and architecture.<br/><br/>
        // Woking as a CSS Architect and evangelist at <a href="https://animaapp.com" target="_blank">AnimaApp.com</a>.<br/><br/>

        // A bit more about myself:<br/>
        // - Writer of various globally known CSS articles<br/>
        // - CSS speaker.<br/>
        // - Founder of CSS Masters Israel Community<br/><br/>

        // You can see more of my stuff on my website <a href="https://eladsc.com/" tarhet="_blank">eladsc.com</a>
        // `