import React from 'react';
//import '../../styles/clockBar.css'

const ClockBar = props => {
    return (
        <h1 className="clockBar">
            <span className="clockBox" onClick={props.handleClick}>{props.time}</span>
        </h1>
    );
};

ClockBar.propTypes = {
    time: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
};

export default ClockBar;
