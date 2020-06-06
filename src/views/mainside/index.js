import React, { Component } from 'react';
import store from '../../store'
import { changeContentShow } from '../../store/actionType'

import Search from '../../component/search'
import UserBox from '../../component/userbox'
import ChatItem from '../../component/chatitem'
import { setChatRoom}  from '../../store/actionType'


import request from '../../utils/request'

const img5 = require('../../icons/avator_5.jpg')




class MainSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatitems: [],
            ...store.getState()
        }
        store.subscribe(this.storeChange)
    }
    showItem = async (id) => {
        if (this.state.mode === 'phone') {
            const action = changeContentShow(true)
            store.dispatch(action)
        }
        let action = setChatRoom(id)
        await store.dispatch(action)
        this.props.showContent()
    }
    // 组件挂载完成时被执行
    componentDidMount() {
        request({
            url: '/group/list',
            method: 'get'
        }).then(res => {
            
            this.setState({
                chatitems: res.data
            })
        })

    }
    componentWillUnmount() {
        let action = setChatRoom('')
        store.dispatch(action)
    }
    storeChange = () => {
        this.setState(store.getState())
    }
    back = () => {
        this.props.login()
    }
    timeParse = (time) => {
        if (time === '') {
            return new Date().toLocaleDateString()
        }
        let d = new Date(time)
        let gapTime = Date.now()- d.getTime()
        if (gapTime < 24*60*60*1000) {
            return `${d.getHours()}:${d.getMinutes()}`
        }else if (gapTime < 2*24*60*60*1000) {
            return `昨日`
        }else {
            return d.toLocaleDateString()
        }
    } 
    render() {
        return (
                <aside className="main-side">
                   <header className="common-header">
                        <div className="common-header-start" onClick={ this.back }>
                            <UserBox userName='Admin' avator={img5} type="main" />
                        </div>
                        <nav className="common-nav">
                            <ul className="common-nav-list">
                                <li className="common-nav-item">
                                    <button className="common-button">
                                        <span className="icon" role="img" aria-label="time">🕘</span>
                                    </button>
                                </li>
                                <li className="common-nav-item">
                                    <button className="common-button" title="清空所有信息">
                                        <span className="icon icon-status" role="img" aria-label="img">💬</span>
                                    </button>
                                </li>
                                <li className="common-nav-item">
                                    <button className="common-button">
                                        <span className="icon icon-menu" aria-label="menu"></span>
                                    </button>
                                </li>
                            </ul>
                        </nav>       
                    </header>
                    <section className="common-alerts"></section>
                    <Search />
                    <section className="chats">
                        <ul className="chats-list">
                            {
                                this.state.chatitems.map(item => {
                                    return (
                                        // <ChatItem userName={ item.groupName } status={ item.status } unReadNum={ item.unReadNum } lastChat={ item.lastChat } chatTime={ item.chatTime } avator={item.avator} param={item.id} key={item.id} onClick={this.showItem} />
                                        <ChatItem userName={ item.groupName } status={ false } unReadNum={ 0 } lastChat={ item.lastChat } chatTime={ this.timeParse(item.lastChatTime) } avator={item.groupIcon} param={item._id} key={item._id} onClick={this.showItem} className={this.chat_room === item._id ? 'active':'normal'} />
                                    )
                                })
                            }
                            {
                                this.state.chatitems.length === 0 ? (<p className="emptyGroup">暂时没有群组哦</p>):''
                            }
                                        
                        </ul>             
                    </section>             
                </aside>
        )
    }
}
export default MainSide