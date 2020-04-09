import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'



class ChatItem extends Component {
    showItemDetail= ()=> {
        this.props.onClick(this.props.param)
    }
    render() {
        const userName = this.props.userName
        const avator = this.props.avator
        const lastChat = this.props.lastChat
        const chatTime = this.props.chatTime
        const notNotice = this.props.status? '🔇':''
        const unReadNum = this.props.unReadNum
        const className = this.props.className
        return (
            <Fragment>
                <li className={className ==='active'?"chats-item active":'chats-item'} onClick={ this.showItemDetail }>
                    <div className="chats-item-button js-chat-button" role="button">
                        <img className="profile-image" src={ avator } alt={ userName } />
                        <header className="chats-item-header">
                            <h3 className="chats-item-title">{ userName }</h3>
                            <time className="chats-item-time">{ chatTime }</time>
                        </header>
                        <div className="chats-item-content">
                            <p className="chats-item-last" dangerouslySetInnerHTML={{__html:lastChat}}></p>
                            <ul className="chats-item-info">
                                <li className="chats-item-info-item">
                                    <span className={notNotice ? 'icon-silent':unReadNum?'unread-messsages':''}>{notNotice || unReadNum || ''}</span>
                                </li>
                            </ul>
                        </div>
                    </div>            
                 </li>
            </Fragment>
        )
    }
}

ChatItem.propTypes = {
    userName: PropTypes.string,
    status: PropTypes.bool,
    avator: PropTypes.string,
    lastChat: PropTypes.string
}
ChatItem.defaultProps = {
    status: '',
    avator: 'http://bit.ly/37SNAl8',
    lastChat: '',
    chatTime: '昨日',
    unread: 0
}

export default ChatItem