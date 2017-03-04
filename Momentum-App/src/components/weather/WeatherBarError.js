import React from 'react';
import '../../styles/weather.css'

const WeatherBarError = props => {
    return (
        <div className="weatherBar">
                {props.msg}
            </div>
    );
};

WeatherBarError.propTypes = {
    msg: React.PropTypes.string.isRequired
};

export default WeatherBarError;