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
    onRef= (ref) => {
        console.log(ref)
        this.child = ref
    }
    showInfo= ()=> {
        console.log(7676777)
        this.child.changeOpen()
    }
    render() {
        return (
            <div>
                <section className="main-grid"> 
                    <MainSide /> 
                    <MainContent showInfo={this.showInfo}/> 
                    <InfoSide onRef={this.onRef} />
                </section>

            </div>

        )
    }
}

export default MainFrame