import React, { Component } from 'react';

class TextBlock extends Component {
    render() {
        const {text, type, isSeen, time} = this.props

        return (
            <li className={type === 'you' ? 'common-message is-you':'common-message is-other'} data-sender={this.props.sender.substr(0,1)}>
                    <p className="common-message-content" dangerouslySetInnerHTML={{__html: text}}>
                    </p>
                    {
                        type === 'you' ? isSeen === true ? <span className="status is-seen" aria-label="right" role="img" >✔️✔️</span>:<span className="status" aria-label="right" role="img" >✔️✔️</span>: ''
                    }
                    <time>{time}</time>
            </li>
        )
    }
}
export default TextBlock