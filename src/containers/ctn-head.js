import React, { Component } from 'react';


class Head extends Component {
    render() {
        return (
            <div>
                <h1>Megamillions Statistic App {this.props.version}</h1>
            </div>
        )
    }
}


export default Head;