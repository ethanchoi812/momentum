import React from 'react';
import '../../styles/clockBar.css'

const ClockBar = props => {
    return (
        <div className="clockBar" onClick={props.handleClick}>{props.time}</div>
    );
};

ClockBar.propTypes = {
    time: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
};

export default ClockBar;
