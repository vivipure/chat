import React, { Component } from 'react'
import './index.scss'

import UserBox from '../../component/userbox'
// import ChatItem from '../../component/chatitem'
// import Search from '../../component/search'
import MainSide from '../mainside'

class MainFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    render() {
        return (
            <div>
                <section className="main-grid"> 
                    <MainSide /> 
                    {/* <aside className="main-side">
                        <header className="common-header">
                        <div className="common-header-start">
                            <UserBox userName='啊这波肉蛋葱鸡' avator="http://bit.ly/3b6qNEw" type="main" />
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
                                            <ChatItem userName={ item.userName } status={ item.status } unReadNum={ item.unReadNum } lastChat={ item.lastChat } chatTime={ item.chatTime } avator={item.avator} key={item.id}/>
                                        )
                                    })
                                }
                                
                            </ul>
                        </section>
                    </aside>   */}
                    <main className="main-content">
                        <header className="common-header">
                            {/* userBOX */}
                            <UserBox userName='啊这波肉蛋葱鸡' status="online" />
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
                        <div className="messanger">
                        <ol className="messanger-list">
                            <li className="common-message is-time">
                            <p className="common-message-content">
                                Today
                            </p>          
                            </li>
                            <li className="common-message is-you">
                            <p className="common-message-content">
                                This is my CSS/HTML Revers Engineering for WhatsApp
                            </p>
                            <span className="status is-seen">✔️✔️</span>
                            <time datetime>14:11</time>
                            </li>
                            <li className="common-message is-you">
                            <p className="common-message-content">
                                Just take a look
                            </p>
                            <span className="status is-seen">✔️✔️</span>
                            <time datetime>14:12</time>
                            </li> 
                            <li className="common-message is-other">        
                            <p className="common-message-content">
                                Who are you?
                            </p>
                            <time datetime>14:33</time>          
                            </li>
                            <li className="common-message is-you">        
                            <p className="common-message-content">            
                                I’m Elad Shechter, a Web Developer specializing in CSS & HTML design and architecture.<br/><br/>
                                Woking as a CSS Architect and evangelist at <a href="https://animaapp.com" target="_blank">AnimaApp.com</a>.<br/><br/>

                                A bit more about myself:<br/>
                                - Writer of various globally known CSS articles<br/>
                                - CSS speaker.<br/>
                                - Founder of CSS Masters Israel Community<br/><br/>

                                You can see more of my stuff on my website <a href="https://eladsc.com/" tarhet="_blank">eladsc.com</a>
                            
                            </p>
                            <span className="status is-seen">✔️✔️</span>
                            <time datetime>14:41</time>
                            </li>
                            <li className="common-message is-other">        
                            <p className="common-message-content">
                                Who's those peoples on the contact list?
                            </p>
                            <time datetime>14:33</time>          
                            </li>
                            <li className="common-message is-you">        
                            <p className="common-message-content">
                                These are friends from our comunity "<a href="https://www.facebook.com/groups/css.masters.israel/" target="_blank">CSS Masters Israel</a>".<br/>
                                Beside it we have anoather global comunity channel, called" 
                                <a href="https://www.facebook.com/groups/css.master/" target="_blank">CSS Masters</a>", if you love CSS, you are all welcome to join.
                            </p>
                            <span className="status">✔️✔️</span>
                            <time datetime>14:34</time>
                            </li>
                            <li className="common-message is-you">        
                            <p className="common-message-content">
                                If you want to know how I created reverse engineering to WhatsApp web, you can read my article 
                                <a href="https://blog.animaapp.com/reverse-engineering-whatsapp-webs-css-9239293009f4?utm_medium=blog&utm_source=elad-css&utm_content=reverse-whatsapp&utm_campaign=css-reverse" target="_blank">"Reverse Engineering WhatsApp Web's CSS"</a>
                            </p>
                            <span className="status">✔️</span>
                            <time datetime>14:43</time>
                            </li>
                            <li className="common-message is-you">        
                            <p className="common-message-content">
                                Beside it you can follow me on twitter:<br/>
                                <a className="twitter" href="https://twitter.com/eladsc"><span className="twitter-user">@eladsc</span></a>
                            </p>
                            <span className="status">✔️</span>
                            <time datetime>14:43</time>
                            </li>
                        </ol>
                        </div>    
                        <div className="message-box">
                        <button className="common-button"><span className="icon">😃</span></button>
                        <div className="text-input" id="message-box" placeholder="Type a message" contentEditable='true'></div>
                        <button id="voice-button" className="common-button"><span className="icon">🎤</span></button>
                        <button id="submit-button" className="common-button"><span className="icon">➤</span></button>
                        </div>  
                    </main>
                    <aside className="main-info u-hide">    
                        <header className="common-header">
                            <button className="common-button js-close-main-info"><span className="icon">❌</span></button>
                            <div className="common-header-content">
                            <h3 className="common-header-title">Info</h3>
                            </div>
                        </header>
                        <div className="main-info-content">
                            <section className="common-box">
                            <img className="main-info-image" src="https://bit.ly/37SNAl8" alt="CSS Masters Israel" />
                            <h4 className="big-title">CSS Masters Israel</h4>
                            <p className="info-text">Created 6/11/2013 at 22:45</p>
                            </section>
                            <section className="common-box">
                            <h5 className="section-title">Description</h5>
                            <p>Out main channel of the comunity is on Fecbook: <a href="https://www.facebook.com/groups/css.masters.israel/">http://bit.ly/2Up8On5</a></p>
                            </section>
                            <section className="common-box">
                            <h5 className="section-title">Other content</h5>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto odit voluptatem magnam sequi dolorem soluta assumenda ipsum iusto culpa velit repudiandae vitae minus minima corporis labore sit, molestias, a ut!</p>
                            </section>
                        </div>
                    </aside>
                </section>

            </div>

        )
    }
}

export default MainFrame