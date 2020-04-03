import React, { Component } from 'react';


class Search extends Component {
    render() {
        return (
            <section className="common-search">
                <input type="search" className="text-input" placeholder="Search or start new chat" />
            </section>
        )
    }
}
export default Search