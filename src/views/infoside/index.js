import React, { Component } from 'react';

class InfoSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
  
    changeOpen() {
         this.setState({
            open: !this.state.open
        })
    }
    
    render() {
        const {
            groupName,
            groupIcon,
            desc,
            create_date,
            users
        } = this.props.group
        return (
             <aside className={this.state.open ? 'main-info':'main-info u-hide' }>    
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
                            <img className="main-info-image" src={groupIcon} alt="CSS Masters Israel" />
                            <h4 className="big-title">{groupName}</h4>
                            <p className="info-text">创建于{new Date(create_date).toLocaleDateString()} </p>
                            </section>
                            <section className="common-box">
                            <h5 className="section-title">简介</h5>
                            <p>{
                                desc
                            }</p>
                            </section>
                            <section className="common-box">
                                <h5 className="section-title">在线成员</h5>
                                {
                                    users && users.map(item => {
                                        return (
                                            <p className="activeUser" key={item.id}>{item.name}</p>
                                        )
                                    })
                                }
                                
                            </section>
                        </div>
            </aside>
        )
    }
}
export default InfoSide