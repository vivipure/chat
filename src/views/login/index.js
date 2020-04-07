import React, { Component } from 'react';

import './index.scss'
// import axios from 'axios'



const wave = require('../../icons/wave.png')
const svgIcon = require('../../icons/loginbackground.svg')
class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            disabled: true,
            press: false
        }
    }
    loginBtn = (e) => {
        // 阻止默认表单提交事件
        e.preventDefault()
        let login = this.refs.login
        if (!login.classList.contains('processing')) {
            login.classList.add('processing')
            setTimeout(() => {
                // 验证部分
                let cls = this.state.password === 'admin' ? 'success' : 'error';
                login.classList.add(cls);
                // 动画部分
                if (cls === 'error') {
                    setTimeout(() => {
                        login.classList.remove('processing', cls);
                        this.refs.dots.innerHTML = ''
                        this.setState(
                                {
                                    disabled: true,
                                    password: ''
                                }
                            )
                    }, 2000);
                    setTimeout(() => {
                        this.refs.passw.style.setProperty('--cursor-x', 0 + 'px');
                    }, 600);
                }else {
                    this.props.history.push('/')
                }
            }, 1500);
        }
        
    }
    inputChange = (e) => {
        let t = e.target

        
        if (t.type === 'text') {
            this.setState({
                userName: t.value
            })
        }else {
            if (t.value.length>16) {
                return 
            }
            // password 输入框逻辑
            // 模拟输入 *
            if (t.value.length > this.state.password.length) {
                this.refs.dots.appendChild(document.createElement('i'))
            }
            this.refs.passw.style.setProperty('--cursor-x', t.value.length * 10 + 'px')
            
            this.setState({
                password: t.value,
                disabled: !t.value.length
            })
        }
        
    }
    keydownChange = (e) => {
        // 正在输入时 按下提交后处理时 回车和删除时
        if (this.state.press || this.refs.login.classList.contains('processing') ||(this.state.password.length > 15 && e.keyCode !== 8 && e.keyCode !== 13)) {
            e.preventDefault();
        }
        this.setState({
            press: true
        })
        setTimeout(() => {
            this.setState({
                press: false
            })
        }, 50)
        // 删除键
        if(e.keyCode === 8) {
            let end = this.refs.dots.lastChild
            if(end !== undefined && end) {
                // 删除特效
                end.classList.add('remove');
                setTimeout(() => end.remove(), 50);
            }
        }
    }
    render() {
        return (
            <div className="login-container">
                    <img  className="wave" src={wave} alt=""/>

                <div className="bgimg">
                    <img src={svgIcon} alt=""/>
                </div>
                <div className="login-content">
                    <form id="login-form" readOnly ref="login">
                    <svg className="logo"  >
                        <use xlinkHref="#logo" />
                    </svg>
                    <h1>登录</h1>
                    <div className="input email">
                        <input type="text" value={this.state.userName}  placeholder=" " onChange={this.inputChange} />
                        <label>Email</label>
                    </div>
                    <div className="input password" ref="passw">
                        <div className="dots" ref="dots"></div>
                        <input type="password" 
                                value={ this.state.password }  
                                placeholder=" " 
                                onChange={this.inputChange}
                                onKeyDown={this.keydownChange}
                                />
                        <label>Password</label>
                        <div className="cursor"></div>
                        <div className="line">
                            <svg>
                                <use xlinkHref="#line" />
                            </svg>
                        </div>
                        <div className="tick">
                            <svg>
                                <use xlinkHref="#tick" />
                            </svg>
                        </div>
                    </div>
                    <button disabled={this.state.disabled} onClick={ this.loginBtn }>
                        <svg viewBox="0 0 16 16">
                            <circle strokeOpacity=".1" cx="8" cy="8" r="6"></circle>
                            <circle className="load" cx="8" cy="8" r="6"></circle>
                        </svg>
                        <span>Submit</span>
                    </button>
                    <div className="login-bottom">
                        <p>注册账号</p>
                        <p>忘记密码</p>
                    </div>
                </form>
                </div>
                

                {/* svg icons */}
                <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" id="logo">
                        <path d="M33.0457936,22 L44,22 C44,34.1502645 34.1912695,44 22.0915872,44 C16.0417461,44 10.5646429,41.5375661 6.6,37.5563492 L14.3462931,29.7786761 C16.3285751,31.7689899 19.0669207,33 22.0915872,33 C25.1013453,33 27.827598,31.7810952 29.8075146,29.8080513 L22,22 L33.0457936,22.001001 C33.0457936,22.0006673 33.0457936,22.0003337 33.0457936,22 Z M21.9084128,0 C27.958756,0 33.4362661,2.4628426 37.400987,6.44464202 L29.6552,14.2228233 C27.6728001,12.2316284 24.9338388,11 21.9084128,11 C15.8585716,11 10.9542064,15.9248678 10.9542064,22 L10.954,22 L0,22 C0,9.8497355 9.8087305,0 21.9084128,0 Z"></path>
                    </symbol>
                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 22" id="line">
                        <path d="M0,11 L180,11 C240,11.00344 300,13.6718267 360,19.00516 C450,27.00516 450,-4.99483997 540,3.00516003 C600,8.33849336 660,11.00344 720,11 L900,11"></path>
                    </symbol>
                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 28" id="tick">
                        <path d="M3,12.5026479 L7,16.5026479 L13,9.50264792 C29.6216402,-12.0066881 40.3541164,26.00516 19,26.0026479 L-3.37507799e-13,26.0026479"></path>
                    </symbol>
                </svg>

            </div>
        )
    }
}
export default Demo