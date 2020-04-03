import React, { Component, Fragment  } from 'react'
import PropTypes from 'prop-types'

import { changeContentShow } from '../../store/actionType'
import store from '../../store'


class UserBox extends Component {
    back = () => {
        const action = changeContentShow(false)
        store.dispatch(action)
    }
    render() {
        const userName = this.props.userName
        const status = this.props.status
        const avator = this.props.avator || 'http://bit.ly/37SNAl8'
        const type = this.props.type
        const show = this.props.showInfo
        return (
            <Fragment>
                <div className="common-header-start">  
                            {
                                type === 'normal' ?
                                <button className="common-button is-only-mobile u-margin-end js-back" onClick={this.back}>
                                    <span className="icon icon-back">⬅</span>
                                </button> : ''
                            }
                            <button className={ type === 'normal' ? 'u-flex js-side-info-button':'u-flex js-user-nav' } onClick={ show }>
                                <img className="profile-image" src={ avator } alt={ userName } />
                                <div className="common-header-content">
                                <h2 className="common-header-title">{ userName }</h2>
                                {
                                    status ? <p className="common-header-status">{ status }</p>:''
                                }
                                
                                </div>
                            </button>       
                    </div>
            </Fragment>
        )
    }
}
UserBox.propTypes = {
    userName: PropTypes.string,
    status: PropTypes.string,
    avator: PropTypes.string
}
UserBox.defaultProps = {
    avator: 'http://bit.ly/37SNAl8',
    type: 'normal'
}

export default UserBox