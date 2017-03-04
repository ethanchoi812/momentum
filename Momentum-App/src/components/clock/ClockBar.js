import React, { Component } from 'react';
import '../../styles/clockBar.css'

class ClockBar extends Component {
    render() {
        return (
            <div className="clockBar" onClick={this.props.handleClick}>{this.props.time}</div>
        );
    }
}

export default ClockBar;

