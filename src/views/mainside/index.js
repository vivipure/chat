import React, { Component } from 'react';
import store from '../../store'
import { changeContentShow } from '../../store/actionType'

import Search from '../../component/search'
import UserBox from '../../component/userbox'
import ChatItem from '../../component/chatitem'
import { setChatRoom}  from '../../store/actionType'


import request from '../../utils/request'

// img
// const img1 = require('../../icons/avator_1.jpg')
// const img2 = require('../../icons/avator_2.jpg')
// const img3 = require('../../icons/avator_3.jpg')
// const img4 = require('../../icons/avator_4.jpg')
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
    showItem = (id) => {
        if (this.state.mode === 'phone') {
            const action = changeContentShow(true)
            store.dispatch(action)
        }
        let action = setChatRoom(id)
        store.dispatch(action)

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
    storeChange = () => {
        this.setState(store.getState())
    }
    back = () => {
        this.props.login()
    }
    render() {
        return (
                <aside className="main-side">
                   <header className="common-header">
                        <div className="common-header-start" onClick={ this.back }>
                            <UserBox userName='啊这波肉蛋葱鸡' avator={img5} type="main" />
                        </div>
                        <nav className="common-nav">
                            <ul className="common-nav-list">
                                <li className="common-nav-item">
                                    <button className="common-button">
                                        <span className="icon">🕘</span>
                                    </button>
                                </li>
                                <li className="common-nav-item">
                                    <button className="common-button">
                                        <span className="icon icon-status">💬</span>
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
                                        <ChatItem userName={ item.groupName } status={ false } unReadNum={ 0 } lastChat={ 'item.lastChat' } chatTime={ new Date().toLocaleDateString() } avator={item.groupIcon} param={item._id} key={item._id} onClick={this.showItem} />
                                    )
                                })
                            }
                            {
                                this.state.chatitems.length === 0 ? (<p>暂时没有群组哦</p>):''
                            }
                                        
                        </ul>             
                    </section>             
                </aside>
        )
    }
}
export default MainSide