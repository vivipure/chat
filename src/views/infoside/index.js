import React, { Component } from 'react';

class InfoSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }
    changeOpen() {
         this.setState({
            open: !this.state.open
        })
    }
    render() {
        return (
             <aside className={this.state.open ? 'main-info':'main-info u-hide u-hide' }>    
                        <header className="common-header">
                            <button className="common-button js-close-main-info" onClick={this.changeOpen.bind(this)}>
                                <span className="icon">❌</span>
                            </button>
                            <div className="common-header-content">
                            <h3 className="common-header-title">Info</h3>
                            </div>
                        </header>
                        <div className="main-info-content">
                            <section className="common-box">
                            <img className="main-info-image" src="https://bit.ly/37SNAl8" alt="CSS Masters Israel" />
                            <h4 className="big-title">CSS Masters Israel</h4>
                            <p className="info-text">Created 6/11/2013 at 22:45</p>
                            </section>
                            <section className="common-box">
                            <h5 className="section-title">Description</h5>
                            <p>Out main channel of the comunity is on Fecbook: <a href="https://www.facebook.com/groups/css.masters.israel/">http://bit.ly/2Up8On5</a></p>
                            </section>
                            <section className="common-box">
                            <h5 className="section-title">Other content</h5>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto odit voluptatem magnam sequi dolorem soluta assumenda ipsum iusto culpa velit repudiandae vitae minus minima corporis labore sit, molestias, a ut!</p>
                            </section>
                        </div>
            </aside>
        )
    }
}
export default InfoSide