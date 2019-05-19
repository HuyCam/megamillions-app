import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import action
import { mode, enableMode } from '../actions/actions';

class Head extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.changeMode(e.target.name);
    }

    render() {
        return (
            <div className="head">
                <h1>Megamillions Statistic App</h1>
                <div className="mode">
                    <button name={mode.RANGE50} onClick={this.handleClick}>Recent 50 draws</button>
                    <button name={mode.RANGE100} onClick={this.handleClick}>Recent 100 draws</button>
                    <button name={mode.FULL} onClick={this.handleClick}>All draws</button>
                </div>
                <p>159 draws is number of draws since Megamillions change their winning rules.</p>
            </div>
        )
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        changeMode: bindActionCreators(enableMode, dispatch)
    }
}

export default connect(null, mapDispatchToProp)(Head);