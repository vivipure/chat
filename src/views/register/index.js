import React, { useState, useRef, useEffect, createContext, useContext, useImperativeHandle, forwardRef } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import request from "../../utils/request";
import { isEmail, passwordCheck } from "../../utils/validate";


// 图片引用
const wave = require('../../icons/wave.png')
const svgIcon = require('../../icons/loginbackground.svg')

// 请求库


toast.configure({
    osition: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
})


const FormContext = createContext()
const { Provider} = FormContext

// 输入框 hook
function Input(props, ref) {
    const {
        value,
        setValue,
    } = useContext(FormContext)
    const { label } = props
    const inputEl = useRef(null)
    const dotsEl = useRef(null)
    // 暴露给父组件的方法
    useImperativeHandle(ref, (x=0)=>({
        setStyle: ()=>{
           inputEl.current.style.setProperty('--cursor-x', x*10 + 'px')
        },
        clearDots: ()=> {
            dotsEl.current.innerHTML = ''
        }
    }))
    
    function keydownChange(e) {
        if ((value.length > 15 && e.keyCode !== 8 && e.keyCode !== 13)) {
            e.preventDefault();
        }
        // 删除键
        if(e.keyCode === 8) {
            let end = dotsEl.current.lastChild
            if(end !== undefined && end) {
                // 删除特效
                end.classList.add('remove');
                setTimeout(() => end.remove(), 50);
            }
        }
    }
    function inputChange (e) {
        let t = e.target.value
        if (t.length>16) {
            return 
        }
        // password 输入框逻辑
        // 模拟输入 *
        if (t.length > value.length) {
            dotsEl.current.appendChild(document.createElement('i'))
        }
        inputEl.current.style.setProperty('--cursor-x', t.length * 10 + 'px')
        setValue(t)
    }
    return (
            <div className="input password" ref={inputEl}>
                <div className="dots" ref={dotsEl}></div>
                <input type="password" 
                    value={ value }  
                    placeholder=" " 
                    onChange={inputChange}
                    onKeyDown={keydownChange}
                    />
                <label>{label}</label>
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
    )
}
// 暴露给父组件
let InputP = forwardRef(Input)
// form 组件
function Register() {
    // state
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [disable, setDisable] = useState(true)
    const [press, setPress] = useState(false)
    
    // ref
    const loginEl = useRef(null)
    const passElOne = useRef(null)
    const passElTwo = useRef(null)
    // 路由
    const history = useHistory()
    // 传值
    const passD1 = {
        value: password,
        setValue: setPassword,
    }
    const passD2 = {
        value: confirmPass,
        setValue: setConfirmPass,
    }

    useEffect(() => {
        setDisable(!userName || !confirmPass || !password || confirmPass !== password)
       
        if (userName && confirmPass && confirmPass === password ) {
            loginEl.current.classList.add('processing')
            loginEl.current.classList.add('success')
        }else {
            loginEl.current.classList.remove('processing')
            loginEl.current.classList.remove('success')
        }
    },[confirmPass, password, userName])
    // 验证部分
    const checkUser = () => {
        if (!isEmail(userName)) {
            return {
                error: '🔊 邮箱地址格式错误'
            }
        }
        return passwordCheck(password)
    }
    
    
    // 登录
    function submit(e) {
            e.preventDefault()
            const login = loginEl.current
            if (press === true) return
            setPress(true) 
                // 验证部分
                let { error } = checkUser()
                let cls = error ? 'error' : 'success';
                login.classList.add(cls);
               
                // 动画部分
                if (cls === 'error') {
                     toast(error)
                    setTimeout(() => {
                        login.classList.remove('processing', cls);
                        passElOne.current.clearDots()
                        passElTwo.current.clearDots()
                        setDisable(true)
                        setPassword('')
                        setPress(false)
                    }, 2000);
                    setTimeout(() => {
                       passElOne.current.setStyle(0)
                       passElTwo.current.setStyle(0)
                    }, 600);
                    
                }else {
                    const name = userName.split('@')[0]
                    let params = {
                        name,
                        email: userName,
                        password: confirmPass
                    }
                        setPress(false)

                    request({
                        url: '/user/register',
                        method: 'post',
                        data: params
                    }).then(res => {
                        history.push('/login?from=register')
                    })
                }
    }
    function login() {
        history.push('/login')
    }
    return (
          <div className="login-container">
                <img  className="wave" src={wave} alt=""/>
                <div className="bgimg">
                    <img src={svgIcon} alt=""/>
                </div>
                <div className="login-content">
                    <form className="login-form" readOnly ref={loginEl}>
                        <div className="login">
                             <svg className="logo"  >
                                <use xlinkHref="#logo" />
                            </svg>
                            <h1>注册</h1>
                            <div className="input email">
                                <input type="text" value={userName}  placeholder=" " onChange={e => {setUserName(e.target.value)}} />
                                <label>用户名</label>
                            </div>
                            <div className="input email">
                                <input type="text" value={userName}  placeholder=" " onChange={e => {setUserName(e.target.value)}} />
                                <label>邮箱</label>
                            </div>
                            <Provider value={passD1}>
                                <InputP ref={passElOne} label="请输入你的密码" />
                            </Provider>
                            <Provider value={passD2}>
                                <InputP ref={passElTwo} label="确认你的密码" />
                            </Provider>
                            <button disabled={disable} onClick={ submit }>
                                <svg viewBox="0 0 16 16">
                                    <circle strokeOpacity=".1" cx="8" cy="8" r="6"></circle>
                                    <circle className="load" cx="8" cy="8" r="6"></circle>
                                </svg>
                                <span>Submit</span>
                            </button>
                            <div className="login-bottom" style={{ justifyContent:"flex-end"}}>
                                <p onClick={login}>已有账号，快去登录</p>
                                
                            </div>
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



export default Register