import React, { Component } from 'react';
import './weather.css';

class WeatherBar extends Component {
    render() {
        return (
            <div className="weatherBar">
                <div className="conditionsBar">
                    <span>{this.props.sky}</span><span onClick={this.props.onClick}>{this.props.temp}</span>
                </div>
                <div className="locationBar">
                    <span>{this.props.location}</span>
                </div>
            </div>
        );
    }
}

export default WeatherBar;