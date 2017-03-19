import React from 'react';
//import '../../styles/clockBar.css'

const ClockBar = props => {
    return (
        <h1 className="clockBar" onClick={props.handleClick}>{props.time}</h1>
    );
};

ClockBar.propTypes = {
    time: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
};

export default ClockBar;
