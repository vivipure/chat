import React, { Component } from 'react'
import './index.scss'

import MainContent from '../maincontent'
import MainSide from '../mainside'
import InfoSide from '../infoside'




class MainFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    showInfo= ()=> {
        this.refs.childRef.changeOpen()
    }
    goLogin = () => {
        this.props.history.push('/login')
    }
    showContent = () => {
        this.refs.main.getRoomDetail()
    }
    render() {
        return (
            <div>
                <section className="main-grid"> 
                    <MainSide login={ this.goLogin } showContent={this.showContent} /> 
                    <MainContent showInfo={this.showInfo} ref="main" /> 
                    <InfoSide ref='childRef'  />
                </section> 
            </div>
        )
    }
}

export default MainFrame