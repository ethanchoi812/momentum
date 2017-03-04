import React, { Component } from 'react';
import '../../styles/weather.css'

class WeatherBarError extends Component {
    render() {
        return (
            <div className="weatherBar">
                {this.props.msg}
            </div>
        );
    }
}

export default WeatherBarError;