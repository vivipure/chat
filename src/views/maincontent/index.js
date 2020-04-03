import React, { Component } from 'react';
import UserBox from '../../component/userbox'


class MainContent extends Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }
    showInfo= ()=>{
        this.props.showInfo && this.props.showInfo()
    }
    render() {
        return (
            <main className="main-content">
                        <header className="common-header">
                            <UserBox userName='啊这波肉蛋葱鸡' status="online" showInfo={ this.showInfo } />
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
                        {/* <ol className="messanger-list">
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
                        </ol> */}
                        </div>    
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