import React, { Component } from 'react';
import store from '../../store'
import { changeContentShow } from '../../store/actionType'

import Search from '../../component/search'
import UserBox from '../../component/userbox'
import ChatItem from '../../component/chatitem'


// img
const img1 = require('../../icons/avator_1.jpg')
const img2 = require('../../icons/avator_2.jpg')
const img3 = require('../../icons/avator_3.jpg')
const img4 = require('../../icons/avator_4.jpg')
const img5 = require('../../icons/avator_5.jpg')

class MainSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
             chatitems:  [
                {
                    userName: '肉蛋冲击',
                    status: 'not',
                    lastChat: '我对不起你啊，呜呜呜呜',
                    chatTime: '2020/12/02',
                    id: 1,
                    unReadNum: 2,
                    avator: img1
                },
                {
                    id: 4,
                    userName: '基希卡',
                    status: '',
                    unReadNum: 2,
                    lastChat: '我还是忘不了你。。',
                    chatTime: '12:05',
                    avator: img2
                },
                {
                    id: 5,
                    userName: '罗伯特.强哥',
                    status: '',
                    unReadNum: 10,
                    lastChat: 'See you at Yerucham!',
                    chatTime: '12:05',
                    avator: img3
                },
                {
                    id: 6,
                    userName: '一代大侠',
                    status: '',
                    unReadNum: 0,
                    lastChat: '仙人抚我顶，很顶',
                    chatTime: '12:05',
                    avator: img4
                }
            ],
            ...store.getState()
        }
        store.subscribe(this.storeChange)
    }
    showItem= (id) => {
        if (this.state.mode === 'phone') {
            const action = changeContentShow(true)
            store.dispatch(action)
        }
    }
    storeChange = () => {
        this.setState(store.getState())
    }
    back = () => {
        this.props.login()
    }
    render() {
        console.log(this.props)

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
                                        <ChatItem userName={ item.userName } status={ item.status } unReadNum={ item.unReadNum } lastChat={ item.lastChat } chatTime={ item.chatTime } avator={item.avator} param={item.id} key={item.id} onClick={this.showItem} />
                                    )
                                })
                            }
                                        
                        </ul>             
                    </section>             
                </aside>
        )
    }
}
export default MainSide