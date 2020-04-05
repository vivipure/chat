import React, { Component } from 'react';

import store from '../../store'

import ChatContent from '../chatcontent'
import UserBox from '../../component/userbox'

const img1 = require('../../icons/avator_1.jpg')

class MainContent extends Component {
    constructor(props) {
        super(props)
        this.state={
            ...store.getState()
        }
        store.subscribe(this.storeChange)
    }
    showInfo= ()=>{
        this.props.showInfo && this.props.showInfo()
    }
    storeChange = () => {
        this.setState(store.getState())
    }
    render() {
        return (
            <main className={ this.state.contentShow === true ? "main-content show-content":"main-content" }>
                        <header className="common-header">
                            <UserBox userName='肉蛋冲击' status="online" avator={img1} showInfo={ this.showInfo } />
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
                        <ChatContent />
                        <div className="message-box">
                            <button className="common-button">
                                <span className="icon">😃</span>
                            </button>
                        <div className="text-input" id="message-box" placeholder="Type a message" contentEditable='true'></div>
                            <button id="voice-button" className="common-button"><span className="icon">🎤</span></button>
                            <button id="submit-button" className="common-button"><span className="icon">➤</span></button>
                        </div>  
                    </main>
        )
    }
}
export default MainContent