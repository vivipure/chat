import React, { Component } from 'react';

class TextBlock extends Component {
    render() {
        const text = this.props.text
        const type = this.props.type
        const isSeen = this.props.isSeen
        const time = this.props.time
        return (
            <li className={type === 'you' ? 'common-message is-you':'common-message is-other'}>
                    {/* 渲染html 内容 */}
                    {
                        type === 'you' ? <p> {this.props.sender}</p>: <p>{this.props.sender}</p>
                    }



                    <p className="common-message-content" dangerouslySetInnerHTML={{__html: text}}>
                    </p>
                    {
                        type === 'you' ? isSeen === true ? <span className="status is-seen" >✔️✔️</span>:<span className="status" >✔️✔️</span>: ''
                    }
                    <time>{time}</time>
            </li>
        )
    }
}
export default TextBlock