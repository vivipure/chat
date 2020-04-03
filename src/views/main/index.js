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
    render() {
        return (
            <div>
                <section className="main-grid"> 
                    <MainSide /> 
                    <MainContent showInfo={this.showInfo}/> 
                    <InfoSide ref='childRef' />
                </section>

            </div>

        )
    }
}

export default MainFrame