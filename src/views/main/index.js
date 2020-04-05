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
    render() {
        return (
            <div>
                <section className="main-grid"> 
                    <MainSide login={ this.goLogin } /> 
                    <MainContent showInfo={this.showInfo}/> 
                    <InfoSide ref='childRef' />
                </section> 
            </div>

        )
    }
}

export default MainFrame